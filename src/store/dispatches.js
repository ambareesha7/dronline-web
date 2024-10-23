import Vue from 'vue';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { playOnce } from '@/utils/sounds';
import { ntfy } from '@/utils/notifications';
import { parseError } from '@/utils/error-parser';

const state = {
  dispatches: null,
  dispatch: null,
  dispatchDetails: null,
  currentDispatches: [],
  endedDispatches: [],
  nextToken: null,
  totalCount: null,
  sortBy: null,
  order: null
};

const getters = {
  dispatches: state => state.dispatches,
  dispatch: state => state.dispatch,
  dispatchDetails: state => state.dispatchDetails,
  currentDispatches: state => state.currentDispatches,
  endedDispatches: state => state.endedDispatches,
  nextToken: state => state.nextToken,
  totalCount: state => state.totalCount,
  sortBy: state => state.sortBy,
  order: state => state.order
};

const actions = {
  async fetchDispatches({ commit }) {
    const data = await api.fetchDispatches();
    const response = decode('GetPendingDispatchesResponse', data);
    commit('setDispatches', response);
    return { response };
  },

  async requestDispatchToPatient({ commit }, { patientId, recordId, patientLocation }) {
    try {
      const payload = encode('RequestDispatchToPatientRequest', { patientId, recordId, patientLocation });
      const data = await api.requestDispatchToPatient(payload);
      const response = decode('RequestDispatchToPatientResponse', data);
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async acceptDispatch({ commit }, requestId) {
    try {
      const data = await api.acceptDispatch(requestId);
      const response = decode('TakePendingDispatchResponse', data);
      commit('setDispatch', response);
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async fetchOngoingDispatch({ commit }) {
    const data = await api.fetchOngoingDispatch();
    const response = decode('GetOngoingDispatchResponse', data);
    commit('setDispatch', response);
    return { response };
  },

  async endDispatch({ commit }) {
    try {
      const { requestId } = state.dispatch;
      const response = await api.endDispatch(requestId);
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async fetchCurrentDispatches({ commit }) {
    const data = await api.fetchCurrentDispatches();
    const response = decode('GetCurrentDispatchesResponse', data);
    commit('setCurrentDispatches', response);
    return { response };
  },

  async fetchEndedDispatches({ commit }) {
    const params = {
      next_token: state.nextToken,
      sort_by: state.sortBy,
      order: state.order
    };
    const data = await api.fetchEndedDispatches(params);
    const response = decode('GetEndedDispatchesResponse', data);
    commit('setEndedDispatches', response);
    return { response };
  },

  async fetchDispatchDetails({ commit }, id) {
    const data = await api.fetchDispatch(id);
    const response = decode('GetDispatchDetailsResponse', data);
    commit('setDispatchDetails', response);
    return { response };
  }
};

const mutations = {
  setDispatches(state, { dispatches, specialists, patients }) {
    state.dispatches = dispatches;
    if (dispatches.length) {
      state.dispatches = state.dispatches.map(dispatch => ({
        ...dispatch,
        patient: patients.find(patient => patient.id === dispatch.patientId),
        specialist: specialists.find(specialist => specialist.id === dispatch.requesterId)
      }));
    }
  },

  setDispatch(state, { dispatch, specialist, patient }) {
    if (dispatch) {
      state.dispatch = {
        ...dispatch,
        specialist,
        patient
      };
    }
  },

  resetDispatch(state) {
    state.dispatch = null;
  },

  setDispatchDetails(state, { detailedDispatch, specialist, patient }) {
    if (detailedDispatch) {
      state.dispatchDetails = {
        ...detailedDispatch,
        specialist,
        patient
      };
    }
  },

  resetDispatchDetails(state) {
    state.dispatchDetails = null;
  },

  setCurrentDispatches(state, { specialists, detailedDispatches}) {
    state.currentDispatches = detailedDispatches.map(d => ({
      ...d,
      specialist: d.nurseId ? specialists.find(s => s.id === d.nurseId) : null
    }));
  },

  resetCurrentDispatches(state) {
    state.currentDispatches = [];
  },

  setEndedDispatches(state, { detailedDispatches, nextToken, totalCount, specialists }) {
    detailedDispatches.forEach(d => state.endedDispatches.push({
      ...d,
      specialist: specialists.find(s => s.id === d.nurseId)
    }));
    state.nextToken = (nextToken && nextToken !== '') ? nextToken : null;
    state.totalCount = totalCount;
  },

  resetEndedDispatches(state) {
    state.endedDispatches = [];
    state.nextToken = null;
    state.totalCount = null;
    state.sortBy = null;
    state.order = null;
  },

  setSorting(state, { sortBy, order }) {
    state.sortBy = sortBy;
    state.order = order;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
