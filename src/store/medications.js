import Vue from 'vue';
import api from '@/api';
import { decode } from '@/utils/proto';

const state = {
  specialistId: null,
  bundles: [],
  nextToken: null,
  query: null
};

const getters = {
  bundles: state => state.bundles,
  nextToken: state => state.nextToken,
  query: state => state.query
};

const mutations = {
  setSpecialistId(state, specialistId) {
    state.specialistId = specialistId;
  },
  setMedications(state, {bundles, nextToken}) {
    Vue.set(state, 'bundles', state.bundles.concat(bundles));
    state.nextToken = nextToken || null;
  },
  clearMedications(state) {
    Vue.set(state, 'bundles', []);
    state.nextToken = null;
  },
  setQuery(state, query) {
    state.query = query;
  },
  clearQuery(state) {
    state.query = null;
  }
};

const actions = {
  async fetchMedications({ commit }) {
    const params = {
      next_token: state.nextToken,
      specialist_id: state.specialistId,
      ...state.query
    };

    const data = await api.fetchMedications(params);
    const response = decode('emr.GetMedicationsResponse', data);

    const nextToken = response.nextToken;
    const bundles = response.bundles.map(
      bundle => ({
        ...bundle,
        patient: response.patients.find(patient => patient.id === bundle.patientId),
        specialist: response.specialists.find(specialist => specialist.id === bundle.specialistId)
      })
    );

    commit('setMedications', {bundles, nextToken});
    return { response };
  },

  setQuery({ commit, dispatch}, query) {
    commit('setQuery', query);
    commit('clearMedications');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
