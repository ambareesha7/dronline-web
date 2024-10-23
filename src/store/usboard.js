import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { parseError } from '@/utils/error-parser';
import Vue from 'vue';

const state = {
    opinions: [],
};

const getters = {
    opinions: state => state.opinions,
};

const actions = {
  async fetchUSBoard2ndOpinions({ commit, state }) {
    const data = await api.fetchUSBoard2ndOpinions();
    const response = decode('visits.GetSpecialistsUSBoardOpinions', data);
    commit('setUSBoard2ndOpinions', response.requestedOpinions);
    return { response };
  },

  async fetchUSBoard2ndOpinionDetails({commit, state }, request_id) {
    const data = await api.fetchUSBoard2ndOpinionDetails(request_id);
    const response = decode('visits.USBoardRequestDetails', data);
    return response;
  },

  async fetchUSBoard2ndOpinionByVisitId({commit, state }, visit_id) {
    const data = await api.fetchUSBoard2ndOpinionByVisitId(visit_id);
    const response = decode('visits.USBoardRequestDetails', data);
    return response;
  },

  async updateUSBoard2ndOpinion({commit, state }, info) {
    try {
        const payload = encode('visits.PostUSBoardSpecialistOpinion', {
            specialistOpinion: info.opinion
        });
        const data = await api.updateUSBoard2ndOpinion(payload, info.id);
        const response = decode('visits.USBoardRequestDetails', data);
        return { response };
    } catch (data) {
        const error = decode('ErrorResponse', data);
        Vue.prototype.$toastr.e('Error!');
        return { error };
    }
      
  },

  async saveUSBoard2ndOpinion({commit, state }, info) {
    try {
        const payload = encode('visits.PostUSBoardSpecialistOpinion', {
            specialistOpinion: info.opinion
        });
        const data = await api.saveUSBoard2ndOpinion(payload, info.id);
        const response = decode('visits.USBoardRequestDetails', data);
        Vue.prototype.$toastr.s('Opinion Saved!');
        return { response };
    } catch (data) {
        const error = decode('ErrorResponse', data);
        Vue.prototype.$toastr.e('Error!');
        return { error };
    }
      
  },

  async acceptUSBoard2ndOpinion({ commit }, request_id) {
    try {
      await api.acceptUSBoard2ndOpinion(request_id);
      Vue.prototype.$toastr.s('Request Accepted!');
      return { };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      Vue.prototype.$toastr.e('Error!');
      return { error };
    }
  },

  async rejectUSBoard2ndOpinion({ commit }, request_id) {
    try {
      await api.rejectUSBoard2ndOpinion(request_id);
      Vue.prototype.$toastr.s('Request Rejected!');
      return { };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      Vue.prototype.$toastr.e('Error!');
      return { error };
    }
  }
};

const mutations = {
  setUSBoard2ndOpinions(state, opinions) {
    state.opinions = state.opinions.concat(opinions);
  },

  clearUSBoard2ndOpinions(state) {
    state.opinions = [];
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
