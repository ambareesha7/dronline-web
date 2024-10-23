import Vue from 'vue';
import api from '@/api';
import { Socket } from 'phoenix';
import constPaths from '@/constants/constant-paths';
import { decode, encode, decodePhoenix, encodePhoenix } from '@/utils/proto';
import { playOnce } from '@/utils/sounds';
import { ntfy } from '@/utils/notifications';
import router from '@/router';

const ws_log_style = 'color: #eee; background: #222; padding: 3px;';

const state = {
  socket: null,
  channels: {}
};

const getters = {
  socket: state => state.socket
};

const actions = {
  async init({ commit, dispatch, rootState }) {
    const response = await api.getChannelsToken();
    const data = decode('GetTokenResponse', response);
    commit('socketConnect', data.token);

    if (rootState.profile.role === 'gp' || rootState.team.isAdmin) {
      dispatch('joinGpChannel');
    }

    if (rootState.profile.role === 'nurse') {
      dispatch('joinNurseChannel');
    }

    if (rootState.profile.role === 'doctor') {
      dispatch('joinDoctorChannel');
    }

    if (rootState.profile.role === 'external') {
      dispatch('joinExternalDoctorChannel');
    }

    dispatch('joinDoctorPresenceChannel');
  },
  joinGpChannel({ commit, state, dispatch }) {
    commit('joinChannel', 'gp');
    state.channels.gp.on('call_established', payload => {
      console.log('%cCall established:%o', ws_log_style, payload);
      dispatch('callEstablished', payload);
    });
    state.channels.gp.on('patients_queue_update', payload => commit(
      'queue/setPatientsQueue',
      payload.patientsQueueUpdate.patientsQueueEntries,
      { root: true }
    ));
    state.channels.gp.on('pending_nurse_to_gp_calls_update', payload => {
      commit(
        'queue/setNursesQueue',
        payload.pendingNurseToGpCallsUpdate.pendingCalls,
        { root: true }
      );
    });
    state.channels.gp.on('pending_visits_update', payload => {
      commit('visits/clearVisits', {}, { root: true });
      commit(
        'visits/setVisits',
        payload.pendingVisitsUpdate,
        { root: true }
      );
    });
  },
  joinNurseChannel({ commit, state, dispatch }) {
    commit('joinChannel', 'nurse');
    state.channels.nurse.on('pending_dispatches_update', ({ pendingDispatchesUpdate }) => {
      commit('dispatches/setDispatches', pendingDispatchesUpdate, { root: true });
      if (pendingDispatchesUpdate.dispatches.length) {
        playOnce('queue-incoming');
        ntfy.send('notifications.dispatches_queue_updated');
      }
    });
    state.channels.nurse.on('call_established', payload => dispatch('callEstablished', payload));
  },
  joinDoctorChannel({ commit, state, dispatch }) {
    commit('joinChannel', 'doctor');
    state.channels.doctor.on('doctor_category_invitations_update', payload => {
      commit(
        'queue/setToDoctorQueue',
        payload.queueToDoctorUpdate,
        { root: true }
      );
    });
    state.channels.doctor.on('call_established', payload => dispatch('callEstablished', payload));
  },
  joinExternalDoctorChannel({ commit, state, dispatch }) {
    commit('joinChannel', 'external');
    state.channels.external.on('active_package_update', payload => dispatch('membership/fetchCurrentPackage', payload, { root: true }));
    state.channels.external.on('doctor_category_invitations_update', payload => {
      commit(
        'queue/setToDoctorQueue',
        payload.doctorCategoryInvitationsUpdate,
        { root: true }
      );
    });
    state.channels.external.on('call_established', payload => dispatch('callEstablished', payload));
    state.channels.external.on('doctor_pending_visits_update', payload => {
      commit('visits/clearVisits', {}, { root: true });
      commit(
        'visits/setVisits',
        payload.doctorPendingVisitsUpdate,
        { root: true }
      );
    });
  },
  joinRecordChannel({ commit, state, rootState }, recordId) {
    const name = `record:${recordId}`;
    commit('joinChannel', name);
    state.channels[name].on('new_timeline_item', payload => {
      console.log('%cNew timeline item', ws_log_style);
      commit(
        'patientTimeline/addTimelineEntity',
        payload.newTimelineItem,
        { root: true }
      );
    });
    state.channels[name].on('new_timeline_item_comment', payload => {
      commit(
        'patientTimeline/receivedNewComment',
        payload.newTimelineItemComment,
        { root: true }
      );
      const specialist = payload.newTimelineItemComment.specialist;
      const url = router.resolve({
        name: 'patient-record',
        params: {
          patientId: payload.newTimelineItemComment.patientId,
          id: payload.newTimelineItemComment.recordId
        },
        query: {
          timelineItemId: payload.newTimelineItemComment.timelineItemId
        }
      }).href;
      ntfy.send({
        title: 'New comment',
        icon: specialist.avatarUrl,
        body: `${specialist.firstName} ${specialist.lastName} added comment to Record:${payload.newTimelineItemComment.recordId}`,
        url
      });
    });
  },
  joinCallChannel({ commit, state, dispatch}, callId) {
    const name = `call:${callId}`;
    commit('joinChannel', name);
    state.channels[name].on('call_ended', payload => {
      console.log('%call_ended:%o', ws_log_style, payload);
      dispatch('call/endCall', null, { root: true });
    });
  },
  sendChannelMessage({ state }, { channel, event, payload }) {
    console.log(
      `%cSend socket message\nevent: ${event};\nchannel: ${channel};\npayload:%o`,
      ws_log_style,
      payload
    );
    state.channels[channel].push(event, payload, 10000);
  },
  callEstablished({ commit, dispatch }, payload) {
    dispatch(
      'call/callEstablished',
      payload.callEstablished,
      { root: true }
    );
  },
  joinDoctorPresenceChannel({ commit, state, dispatch}) {
    let presences = [];
    commit('joinChannel', 'doctor_presence');
    state.channels.doctor_presence.on('presence_state', ({ presenceState }) => {
      presences = presenceState.presences.map(p => p.id);
      commit(
        'specialists/setSpecialistsPresences',
        presences,
        { root: true }
      );
    });
    state.channels.doctor_presence.on('presence_diff', ({ presenceDiff }) => {
      presenceDiff.joins.forEach(j => presences.push(j.id));
      presenceDiff.leaves.forEach(l => {
        if (presences.includes(l.id)) presences.splice(presences.indexOf(l.id), 1);
      });
      commit(
        'specialists/setSpecialistsPresences',
        presences,
        { root: true }
      );
    });
  }
};

const mutations = {
  socketConnect(state, token) {
    state.socket = new Socket(
      `${constPaths.WS_URL}/channels`,
      {
        encode: (payload, callback) => {
          encodePhoenix(payload, callback);
        },
        decode: (payload, callback) => {
          decodePhoenix(payload, callback);
        },
        params: { token }
      }
    );
    state.socket.connect();
    console.log('%cConnected to socket', ws_log_style);
  },

  async joinChannel(state, channel) {
    Vue.set(state.channels, channel, state.socket.channel(channel, {}));
    state.channels[channel].join();
    console.log(`%cJoin ${channel}'s channel`, ws_log_style);
  },

  leaveRecordChannel(state, recordId) {
    const name = `record:${recordId}`;
    console.log(`%cLeave ${name} channel`, ws_log_style);
    state.channels[name].off('new_timeline_item');
    state.channels[name].leave();
    Vue.delete(state.channels, name);
  },

  leaveCallChannel(state, callId) {
    const name = `call:${callId}`;
    console.log(`%cLeave ${name} channel`, ws_log_style);
    if (state.channels[name]) {
      state.channels[name].leave();
      Vue.delete(state.channels, name);
    }
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
