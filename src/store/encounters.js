import api from '@/api';
import { decode } from '@/utils/proto';

const state = {
  specialistEncountersStats: {}
};

const getters = {
  specialistEncountersStats: state => state.specialistEncountersStats
};

const mutations = {
  setSpecialistEncountersStats(state, stats) {
    state.specialistEncountersStats = stats;
  }
};

const actions = {
  async fetchSpecialistEncountersStats({ commit }, specialistId) {
    const data = await api.fetchSpecialistEncountersStats({ specialist_id: specialistId });
    const response = decode('emr.SpecialistEncountersStatsResponse', data);
    commit('setSpecialistEncountersStats', response);
    return { response };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
