import Vue from 'vue';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { parseError } from '@/utils/error-parser';

const state = {
  nurses: [],
  nextToken: null,
  totalCount: null,
  query: null
};

const getters = {
  nurses: state => state.nurses,
  nextToken: state => state.nextToken,
  totalCount: state => state.totalCount,
  query: state => state.query
};

const actions = {
  async fetchNurses({ commit, state }) {
    const params = {
      next_token: state.nextToken,
      filter: state.query === '' ? null : state.query
    };
    commit('setNurses', { nurses: [
      {
        title: 1,
        firstName: 'Jane',
        lastName: 'Doe'
      }
    ] });
  },

  setQuery({ commit, dispatch}, query) {
    commit('setQuery', query);
    commit('clearNurses');
    dispatch('fetchNurses');
  }
};

const mutations = {
  setNurses(state, { nurses, nextToken }) {
    state.nurses = state.nurses.concat(nurses);
    state.nextToken = (nextToken && nextToken !== '') ? nextToken : null;
  },

  clearNurses(state) {
    state.nurses = [];
    state.nextToken = null;
  },

  setQuery(state, query) {
    state.query = query;
  },

  clearQuery(state) {
    state.query = null;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
