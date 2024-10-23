import Vue from 'vue';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { parseError } from '@/utils/error-parser';

const state = {
  callOpened: false,
  callType: null,
  callDetails: null,
  callEnded: false,
  token: null,
  sessionId: null,
  apiKey: null,
  size: 'minimized',
  fullScreen: false,
  mainScreenHovered: false,
  holdControls: false,
  recipientPatientId: null,
  initializing: false,
  publisher: null,
  streams: [],
  videoAccessible: false,
  selectedStream: null,
  activeStream: null,
  activeSubscriber: null,
  callId: null,
  patientLocation: null
};

const getters = {
  callOpened: state => state.callOpened,
  callType: state => state.callType,
  callDetails: state => state.callDetails,
  callEnded: state => state.callEnded,
  token: state => state.token,
  sessionId: state => state.sessionId,
  apiKey: state => state.apiKey,
  size: state => state.size,
  fullScreen: state => state.fullScreen,
  showControls: state => state.mainScreenHovered || state.holdControls,
  recipientPatientId: state => state.recipientPatientId,
  initializing: state => state.initializing,
  publisher: state => state.publisher,
  streams: state => state.streams,
  videoAccessible: state => state.videoAccessible,
  selectedStream: state => state.selectedStream,
  activeStream: state => state.selectedStream || state.activeStream,
  activeSubscriber: state => state.activeSubscriber,
  callId: state => state.callId,
  patientLocation: state => state.patientLocation
};

const actions = {
  callEstablished({ commit, dispatch }, data) {
    commit('openCall');
    commit('setCall', data);
    commit('setRecipientPatientId', data.patientId);
    commit('patientTimeline/setRecordId', data.recordId, { root: true });
    dispatch('socket/joinCallChannel', data.callId, { root: true });
  },
  endCall({ commit, state }) {
    commit('socket/leaveCallChannel', state.callId, { root: true });
    commit('endCall');
  },
  endCallForAll({ dispatch, state }) {
    dispatch(
      'socket/sendChannelMessage',
      {
        channel: `call:${state.callId}`,
        event: 'end_call_for_all',
        payload: {}
      },
      { root: true }
    );
  },
  async nurseCallToPatient({ commit, dispatch }, { patientId, recordId }) {
    try {
      const payload = encode('NursePatientCallRequest', { patientId, recordId });
      const data = await api.nurseCallToPatient(payload);
      const response = decode('NursePatientCallResponse', data);
      commit('openCall');
      commit('setCall', {
        ...response,
        token: response.nurseSessionToken
      });
      commit('setRecipientPatientId', response.patientId);
      commit('patientTimeline/setRecordId', recordId, { root: true });
      dispatch('socket/joinCallChannel', response.callId, { root: true });
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },
  async specialistCallToPatient({ commit, dispatch }, { patientId }) {
    try {
      let { payload, data, response } = {};
      payload = encode('SpecialistPatientCallRequest', { patientId });
      data = await api.specialistCallToPatient(payload);
      response = decode('SpecialistPatientCallResponse', data);
      commit('openCall');
      commit('setCall', {
        ...response,
        token: response.specialistSessionToken
      });
      commit('setRecipientPatientId', response.patientId);
      commit('patientTimeline/setRecordId', response.recordId, { root: true });
      dispatch('socket/joinCallChannel', response.callId, { root: true });
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },
  async familyMemberInvitationCall({ commit }, { invitationId }) {
    try {
      const data = await api.fetchFamilyMemberCallInvitation(invitationId);
      const response = decode('GetFamilyMemberInvitationResponse', data);
      commit('openCall');
      commit('setCall', {
        callId: response.invitation.callId,
        token: response.invitation.sessionToken,
        sessionId: response.invitation.sessionId,
        apiKey: response.apiKey
      });
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },
  async fetchPatientLocation({ commit, state }) {
    const data = await api.fetchPatientLocation(state.callId);
    const response = decode('GetPatientLocationCoordinatesResponse', data);
    commit('setPatientLocation', response.patientLocationCoordinates);
    return { response };
  },
  async visitCall({ commit, dispatch }, { visitId, isGP, visitDetails }) {
    try {
      let { payload, data, response } = {};
      if (isGP) {
        payload = encode('PendingVisitCallRequest', { visitId });
        data = await api.pendingVisitCall(payload);
        response = decode('PendingVisitCallResponse', data);
      } else {
        payload = encode('DoctorPendingVisitCallRequest', { visitId });
        data = await api.doctorPendingVisitCall(payload);
        response = decode('DoctorPendingVisitCallResponse', data);
      }

      if(visitDetails) {
        commit('setCallType', visitDetails.type)
        commit('setCallDetails', visitDetails)
      }

      commit('openCall');
      commit('setCall', {
        ...response,
        token: isGP ? response.gpSessionToken : response.doctorSessionToken
      });
      commit('setRecipientPatientId', response.patientId);
      commit('patientTimeline/setRecordId', response.recordId, { root: true });
      dispatch('socket/joinCallChannel', response.callId, { root: true });
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  }
};

const mutations = {
  callInitializing(state, initializing = true) {
    state.initializing = initializing;
  },

  setCallType(state, type) {
    state.callType = type
  },

  setCallDetails(state, details) {
    state.callDetails = details
  },

  openCall(state) {
    state.callOpened = true;
  },

  setNtsInfo(state, ntsInfo) {
    state.ntsInfo = ntsInfo;
  },

  closeCall(state) {
    state.callOpened = false;
    state.callEnded = false;
  },

  setCall(state, { token, sessionId, apiKey, callId }) {
    state.token = token;
    state.sessionId = sessionId;
    state.apiKey = apiKey;
    state.initializing = false;
    state.callId = callId;
  },

  endCall(state) {
    state.token = null;
    state.sessionId = null;
    state.apiKey = null;
    state.callEnded = true;
    state.streams = [];
    state.publisher = null;
    state.activeStream = null;
    state.activeSubscriber = null;
  },

  setFullScreen(state, flag) {
    state.fullScreen = flag;
  },

  setSize(state, size) {
    if (state.size === size) return;
    state.size = `resizing ${size}`;
    setTimeout(() => {
      state.size = size;
    }, 220);
  },

  setMainScreenHovered(state, flag) {
    state.mainScreenHovered = flag;
  },

  setHoldControls(state, hold) {
    state.holdControls = hold;
  },

  setRecipientPatientId(state, patientId) {
    state.recipientPatientId = patientId;
  },

  setPublisher(state, publisher) {
    state.publisher = publisher;
  },

  addStream(state, stream) {
    state.streams.push(stream);
  },

  removeStream(state, stream) {
    const idx = state.streams.indexOf(stream);
    if (idx > -1) {
      Vue.delete(state.streams, idx);
    }
  },

  setVideoAccessible(state, flag) {
    state.videoAccessible = flag;
  },

  selectStream(state, stream) {
    const selectedStreamId = state.selectedStream ? state.selectedStream.id : null;
    if (selectedStreamId === stream.id) {
      Vue.set(state, 'selectedStream', null);
    } else {
      Vue.set(state, 'selectedStream', stream);
    }
  },

  setActiveStream(state, stream) {
    Vue.set(state, 'activeStream', stream);
  },

  setActiveSubscriber(state, subscriber) {
    state.activeSubscriber = subscriber;
  },

  setPatientLocation(state, patientLocation) {
    state.patientLocation = patientLocation;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

// todo remove for real calls
setTimeout(() => {
  // mutations.setRecipientPatientId(state, 3);
  // state.callOpened = true;
}, 2000);