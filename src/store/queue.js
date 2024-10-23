import Vue from 'vue';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { playOnce } from '@/utils/sounds';
import { ntfy } from '@/utils/notifications';

const state = {
  patientsQueue: null,
  nursesQueue: null,
  toDoctorQueues: {},
  toDoctorQueue: null
};

const getters = {
  patientsQueue: state => state.patientsQueue || [],
  nursesQueue: state => state.nursesQueue || [],
  toDoctorQueue: state => state.toDoctorQueue || []
};

const actions = {
  async fetchPatientsQueue({ commit}) {
    const data = await api.fetchPatientsQueue();
    const response = decode('GetPatientsQueueResponse', data);
    commit('setPatientsQueue', response.patientsQueue.patientsQueueEntries);
    return {response};
  },

  async fetchNursesQueue({ commit}) {
    const data = await api.fetchNursesQueue();
    const response = decode('GetPendingNurseToGPCallsResponse', data);
    commit('setNursesQueue', response.pendingCalls.pendingCalls);
    return {response};
  },

  async fetchToDoctorQueue({ commit}) {
    const categoriesData = await api.fetchMedicalCategories();
    const { medicalCategories } = decode('specialist_profile.GetMedicalCategoriesResponse', categoriesData);
    const promises = medicalCategories.map(async ({ id }) => {
      const data = await api.fetchToDoctorQueue(id);
      const response = decode('GetDoctorCategoryInvitationsResponse', data);
      commit('setToDoctorQueue', response.doctorCategoryInvitations);
    });
    await Promise.all(promises);
    return { };
  },

  joinCall({ dispatch, rootState }, startCall) {
    const payload = { startCall };
    dispatch(
      'socket/sendChannelMessage',
      { channel: 'gp', event: 'start_call', payload },
      { root: true }
    );
  },

  answerCallFromNurse({ dispatch, rootState }, nurseId) {
    const payload = {
      answerCallFromNurse: { nurseId }
    };
    dispatch(
      'socket/sendChannelMessage',
      { channel: rootState.profile.role, event: 'answer_call_from_nurse', payload },
      { root: true }
    );
  },

  answerCallToDoctor({ dispatch, rootState }, entity) {
    const payload = {
      acceptDoctorCategoryInvitation: {
        categoryId: entity.categoryId,
        callId: entity.callId
      }
    };
    dispatch(
      'socket/sendChannelMessage',
      {
        channel: rootState.profile.role,
        event: 'accept_doctor_category_invitation',
        payload
      },
      { root: true }
    );
  },

  joinNursesQueue({ dispatch }, { patientId, recordId }) {
    const payload = {
      callGp: {
        patientId,
        recordId
      }
    };
    dispatch(
      'socket/sendChannelMessage',
      { channel: 'nurse', event: 'call_gp', payload },
      { root: true }
    );
  },

  leaveNursesQueue({ dispatch }) {
    dispatch(
      'socket/sendChannelMessage',
      { channel: 'nurse', event: 'cancel_call_to_gp' },
      { root: true }
    );
  }
};

const mutations = {
  setPatientsQueue(state, queue) {
    state.patientsQueue = queue;
    if (state.patientsQueue.length) {
      playOnce('queue-incoming');
      ntfy.send('notifications.new_invitation_to_video_call');
    }
  },

  setNursesQueue(state, queue) {
    state.nursesQueue = queue;
    if (state.nursesQueue.length) {
      playOnce('queue-incoming');
      ntfy.send('notifications.new_invitation_to_video_call');
    }
  },

  setToDoctorQueue(state, { categoryId, invitations }) {
    Vue.set(state.toDoctorQueues, categoryId, invitations);
    let toDoctorQueue = [];
    Object.keys(state.toDoctorQueues).forEach(key => {
      toDoctorQueue = toDoctorQueue.concat(state.toDoctorQueues[key].map(entity => ({
        ...entity,
        categoryId: key
      })));
    });
    toDoctorQueue.sort((a, b) => a.joinTimestamp > b.joinTimestamp);
    Vue.set(state, 'toDoctorQueue', toDoctorQueue);
    if (state.toDoctorQueue.length) {
      playOnce('queue-incoming');
      ntfy.send('notifications.new_invitation_to_video_call');
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
