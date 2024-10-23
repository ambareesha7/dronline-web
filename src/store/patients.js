import Vue from 'vue';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { parseError } from '@/utils/error-parser';

const state = {
  patients: [],
  filter: null,
  nextToken: null
};

const getters = {
  patients: state => state.patients,
  filter: state => state.filter,
  nextToken: state => state.nextToken
};

const actions = {
  async fetchPatients({ commit, state, rootState }) {
    const params = {
      next_token: state.nextToken,
      external: rootState.profile.role === 'external',
      filter: state.filter
    };
    const data = await api.fetchPatients(params);
    const response = decode('GetPatientsResponse', data);
    commit('setPatients', response);
    return { response };
  },

  async invitePatient({ commit }, invitation) {
    try {
      const payload = encode('InvitePatientRequest', { invitation });
      await api.invitePatient(payload);
      return { };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async createPatient({ commit }, firebaseToken) {
    try {
      const payload = encode('CreatePatientRequest', { firebaseToken });
      const data = await api.createPatient(payload);
      const response = decode('CreatePatientResponse', data);
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  setFilter({ dispatch, commit }, filter) {
    commit('setFilter', filter);
    commit('clearPatients');
    dispatch('fetchPatients');
  },

  resetFilter({ dispatch, commit }) {
    commit('resetFilter');
    commit('clearPatients');
    dispatch('fetchPatients');
  }
};

const mutations = {
  setPatients(state, { patients, nextToken }) {
    state.patients = state.patients.concat(patients);
    state.nextToken = (nextToken && nextToken !== '') ? nextToken : null;
  },

  clearPatients(state) {
    state.patients = [];
    state.nextToken = null;
  },

  setFilter(state, filter) {
    state.filter = filter;
  },

  resetFilter(state) {
    state.filter = null;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
