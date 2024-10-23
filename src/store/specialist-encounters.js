import Vue from 'vue';
import api from '@/api';
import { decode } from '@/utils/proto';

const state = {
  specialistId: null,
  encounters: [],
  nextToken: null,
  query: null
};

const getters = {
  encounters: state => state.encounters,
  nextToken: state => state.nextToken,
  query: state => state.query
};

const mutations = {
  setSpecialistId(state, specialistId) {
    state.specialistId = specialistId;
  },
  setEncounters(state, {encounters, nextToken}) {
    Vue.set(state, 'encounters', state.encounters.concat(encounters));
    state.nextToken = nextToken || null;
  },
  clearEncounters(state) {
    Vue.set(state, 'encounters', []);
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
  async fetchEncounters({ commit }) {
    const params = {
      next_token: state.nextToken,
      specialist_id: state.specialistId,
      ...state.query
    };

    const data = await api.fetchSpecialistEncounters(params);
    const response = decode('emr.SpecialistEncountersResponse', data);

    const nextToken = response.nextToken;
    const encounters = response.encounters.map(
      encounter => ({
        ...encounter,
        patient: response.patients.find(patient => patient.id === encounter.patientId)
      })
    );

    commit('setEncounters', {encounters, nextToken});
    return { response };
  },

  setQuery({ commit, dispatch}, query) {
    commit('setQuery', query);
    commit('clearEncounters');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
