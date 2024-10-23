import Vue from 'vue';
import { cloneDeep } from 'lodash';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { getIndexByParam } from '@/utils';
import { parseError } from '@/utils/error-parser';
import { TIMESLOT_DURATION_SECONDS } from '@/constants';

let tipTypeTimeout;

const mergeTimeslots = timeslots => {
  const merged = [];
  let groupStartTime;
  const interim = timeslots
    .sort((a, b) => a.startTime - b.startTime)
    .reduce((r, a, i, o) => {
      if (!groupStartTime) groupStartTime = a.startTime;
      const prev = o[i - 1] ? o[i - 1] : {};
      const inGroup = (
        prev.startTime + (prev.duration || TIMESLOT_DURATION_SECONDS) === a.startTime) &&
          (prev.status === a.status && a.status !== 'taken'
          );
      if (!inGroup) groupStartTime = a.startTime;
      r[groupStartTime] = r[groupStartTime] || [];
      r[groupStartTime].push(a);
      return r;
    }, Object.create(null));
  Object.keys(interim).forEach(startTime => {
    let duration = 0;
    const taken = [];
    interim[startTime].forEach(t => {
      duration += t.duration || TIMESLOT_DURATION_SECONDS;
      if (t.status === 'taken') taken.push({ ...t.taken, startTime: t.startTime });
    });
    const slot = {
      ...interim[startTime][0],
      status: interim[startTime][0].status,
      duration
    };
    if (taken.length) slot.taken = taken;
    merged.push(slot);
  });
  return merged;
};

const state = {
  timeslots: null,
  editableTimeslots: null,
  tipType: null,
  addingTimeslotsInProgress: false
};

const getters = {
  timeslots: state => state.editableTimeslots || [],
  tipType: state => state.tipType,
  addingTimeslotsInProgress: state => state.addingTimeslotsInProgress
};

const actions = {
  async fetchTimeslots({ commit }, params) {
    const data = await api.fetchTimeslots(params);
    const response = decode('GetCalendarResponse', data);
    commit('setTimeslots', response.timeslots);
    commit('setTipType', response.timeslots.length ? 'initialized' : 'empty_initialized');
    return { response };
  },

  async addTimeslots({ commit, state }, { timeslotParams, teamMemberId }) {
    commit('addingTimeslotsInProgress', true);
    try {
      const payload = encode('CreateTimeslotsRequest', {
        timeslotParams
      });
      const response = teamMemberId ?
        await api.createTeamMemberTimeslots(teamMemberId, payload) :
        await api.createTimeslots(payload);

      timeslotParams.forEach(timeslot => {
        Vue.delete(timeslot, 'temporary');
        commit('setTimeslots', [
          ...state.timeslots,
          {
            ...timeslot,
            free: {},
            status: 'free'
          }
        ]);
      });
      commit('setTipType', 'saved');
      commit('addingTimeslotsInProgress', false);
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      commit('clearEditable');
      commit('addingTimeslotsInProgress', false);
      return { error };
    }
  },

  async removeTimeslots({ commit }, { timeslotParams, teamMemberId }) {
    try {
      const payload = encode('RemoveTimeslotsRequest', {
        timeslotParams
      });
      const response = teamMemberId ?
        await api.removeTeamMemberTimeslots(teamMemberId, payload) :
        await api.removeTimeslots(payload);
      timeslotParams.forEach(({ id }) => commit('removeTimeslot', id));
      commit('clearEditable');
      commit('setTipType', 'deleted');
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      commit('clearEditable');
      return { error };
    }
  },

  undoLastAction({ commit, state }) {
    // todo
  }
};

const mutations = {
  setTimeslots(state, timeslots) {
    state.timeslots = timeslots.map(t => ({
      ...t,
      status: t.status,
      id: `_${t.startTime}`
    }));
    state.editableTimeslots = mergeTimeslots(cloneDeep(state.timeslots));
  },

  clearEditable(state) {
    state.editableTimeslots = mergeTimeslots(cloneDeep(state.timeslots));
  },

  clearTimeslots(state) {
    state.timeslots = null;
    state.editableTimeslots = null;
  },

  createTimeslot(state, timeslot) {
    state.editableTimeslots = mergeTimeslots([
      ...state.editableTimeslots,
      timeslot
    ]);
  },

  setTimeslot(state, { timeslot, id }) {
    const index = getIndexByParam(state.editableTimeslots, 'id', id);
    Vue.set(state.editableTimeslots, index, timeslot);
  },

  removeTimeslot(state, id) {
    const index = getIndexByParam(state.timeslots, 'id', id);
    Vue.delete(state.timeslots, index);
  },

  setTipType(state, value) {
    state.tipType = value;
    if (tipTypeTimeout) clearTimeout(tipTypeTimeout);
    tipTypeTimeout = setTimeout(() => {
      state.tipType = null;
    }, 7000);
  },

  addingTimeslotsInProgress(state, value) {
    state.addingTimeslotsInProgress = value;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
