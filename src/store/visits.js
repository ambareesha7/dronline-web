import Vue from 'vue';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { parseError } from '@/utils/error-parser';

const stateKey = isGP => (isGP ? 'gpVisits' : 'specialistVisits');

const state = {
  visitCancelled: null,
  gpVisits: {
    visits: [],
    nextToken: null,
    totalCount: 0
  },
  specialistVisits: {
    visits: [],
    nextToken: null,
    totalCount: 0
  }
};

const getters = {
  gpVisits: state => state.gpVisits,
  specialistVisits: state => state.specialistVisits,
  visitCancelled: state => state.visitCancelled
};

const actions = {
  async fetchScheduledVisits({ commit, state }, {type, isGP}) {
    const key = stateKey(isGP);

    const params = {
      next_token: state[key].nextToken
    };
    const data = await api.fetchScheduledVisits(params, type, isGP);
    let decodedMessage;
    if (type === 'pending') {
      decodedMessage = isGP ? 'GetPendingVisitsResponse' : 'GetDoctorPendingVisitsResponse';
    }
    if (type === 'ended') {
      decodedMessage = 'GetEndedVisitsResponse';
    }
    const response = decode(decodedMessage, data);
    commit('setVisits', {isGP, ...response});
    return { response };
  },

  async cancelVisit({commit, state}, id) {
    const data = await api.cancelVisit(id);
    if(data) {
      state.visitCancelled = true
    }
  }
};

const mutations = {
  setVisitCancelled(state) {
    state.visitCancelled = null
  },
  setVisits(state, { isGP, visits, nextToken, patients = [], specialists = [] }) {
    const key = stateKey(isGP);

    state[key].visits = []

    visits.forEach(v => state[key].visits.push({
      ...v,
      patient: patients.find(p => p.id === v.patientId),
      specialist: specialists.find(s => s.id === v.scheduledWith)
    }));

    state[key].totalCount += visits.length;
    state[key].nextToken = (nextToken && nextToken !== '') ? nextToken : null;
  },
  clearVisits(state, { isGP }) {
    const key = stateKey(isGP);

    Vue.set(state, key, {
      visits: [],
      nextToken: null,
      totalCount: null
    });
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
