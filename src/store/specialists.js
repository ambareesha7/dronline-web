import Vue from 'vue';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { parseError } from '@/utils/error-parser';

const state = {
  specialists: [],
  nextToken: null,
  totalCount: null,
  query: null,
  membership: null,
  showOnlineOnly: false,
  specialistsPresences: []
};

const getters = {
  specialists: state => state.specialists,
  nextToken: state => state.nextToken,
  totalCount: state => state.totalCount,
  query: state => state.query,
  membership: state => state.order,
  showOnlineOnly: state => state.showOnlineOnly,
  specialistsPresences: state => state.specialistsPresences
};

const actions = {
  async fetchSpecialists({ commit, state }) {
    const params = {
      next_token: state.nextToken,
      filter: state.query === '' ? null : state.query,
      membership: state.membership
    };
    const data = await api.fetchSpecialists(state.showOnlineOnly, params);
    const response = decode('GetSpecialistsResponse', data);
    commit('setSpecialists', response);
    return { response };
  },

  async fetchSpecialistsInCategory({ commit, state}, id) {
    const data = await api.fetchSpecialistsInCategory(id);
    const response = decode('GetSpecialistsInCategoryResponse', data);
    commit('setSpecialists', response);
    return { response };
  },

  setShowOnlineOnly({ commit, dispatch }, value) {
    commit('clearSpecialists');
    commit('setShowOnlineOnly', value);
    dispatch('fetchSpecialists');
  },

  setMembershipPackage({ commit, dispatch }, membership) {
    commit('setMembership', membership);
    commit('clearSpecialists');
    dispatch('fetchSpecialists');
  },

  setQuery({ commit, dispatch}, query) {
    commit('setQuery', query);
    commit('clearSpecialists');
    dispatch('fetchSpecialists');
  }
};

const mutations = {
  setSpecialists(state, { specialists, nextToken }) {
    state.specialists = state.specialists.concat(specialists);
    state.nextToken = (nextToken && nextToken !== '') ? nextToken : null;
  },

  clearSpecialists(state) {
    state.specialists = [];
    state.nextToken = null;
  },

  setShowOnlineOnly(state, value) {
    state.showOnlineOnly = value;
  },

  setMembership(state, value) {
    state.membership = value;
  },

  setQuery(state, query) {
    state.query = query;
  },

  clearQuery(state) {
    state.query = null;
  },

  setSpecialistsPresences(state, presences) {
    state.specialistsPresences = presences;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
