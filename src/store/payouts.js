import Vue from 'vue';
import api from '@/api';
import { cloneDeep } from 'lodash';
import { decode, encode } from '@/utils/proto';

const state = {
  editablePayoutsCredentials: {},
  payoutsCredentials: null,
  pendingWithdrawals: null,
  withdrawalsSummary: null
};

const getters = {
  editablePayoutsCredentials: state => state.editablePayoutsCredentials,
  pendingWithdrawals: state => state.pendingWithdrawals,
  withdrawalsSummary: state => state.withdrawalsSummary
};

const actions = {
  async fetchPayoutsCredentials({ commit }) {
    const data = await api.fetchPayoutsCredentials();
    const response = decode('payouts.GetCredentialsResponse', data);
    commit('setPayoutsCredentials', response.credentials);
    return { response };
  },

  async updatePayoutsCredentials({ state, commit }) {
    try {
      const payload = encode('payouts.UpdateCredentialsRequest', {
        credentials: state.editablePayoutsCredentials
      });
      const data = await api.updatePayoutsCredentials(payload);
      const response = decode('payouts.GetCredentialsResponse', data);
      commit('setPayoutsCredentials', response.credentials);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async fetchPendingWithdrawals({ commit }) {
    const data = await api.fetchPendingWithdrawals();
    const response = decode('payouts.GetPendingWithdrawalsResponse', data);
    commit('setPendingWithdrawals', response.pendingWithdrawals);
    return { response };
  },

  async fetchWithdrawalsSummary({ commit }) {
    const data = await api.fetchWithdrawalsSummary();
    const response = decode('payouts.GetWithdrawalsSummaryResponse', data);
    commit('setWithdrawalsSummary', response.withdrawalsSummary);
    return { response };
  }
};

const mutations = {
  setPayoutsCredentials(state, payoutsCredentials) {
    state.payoutsCredentials = payoutsCredentials;
  },

  setEditablePayoutsCredentials(state) {
    if (state.payoutsCredentials) {
      state.editablePayoutsCredentials = cloneDeep(state.payoutsCredentials);
    } else {
      state.editablePayoutsCredentials = {};
    }
  },

  resetEditablePayoutsCredentials(state) {
    state.editablePayoutsCredentials = cloneDeep(state.payoutsCredentials);
  },

  setEditablePayoutsCredentialsField(state, { field, value }) {
    if (state.editablePayoutsCredentials) {
      Vue.set(state.editablePayoutsCredentials, field, value);
      Vue.set(state, 'editablePayoutsCredentials', {
        ...state.editablePayoutsCredentials
      });
    }
  },

  setPendingWithdrawals(state, pendingWithdrawals) {
    state.pendingWithdrawals = pendingWithdrawals;
  },

  setWithdrawalsSummary(state, withdrawalsSummary) {
    state.withdrawalsSummary = withdrawalsSummary;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

