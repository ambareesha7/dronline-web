import Vue from 'vue';
import api from '@/api';
import { encode, decode } from '@/utils/proto';

const state = {
  packages: [],
  currentPackage: null,
  packageExpirationDate: null,
  nextPackage: null,
  pendingPaymentUrl: null,
  isPaymentEnabled: false
};

const getters = {
  isPaymentEnabled: state => state.isPaymentEnabled,
  packages: state => state.packages,
  currentPackage: state => state.currentPackage,
  packageExpirationDate: state => state.packageExpirationDate,
  nextPackage: state => state.nextPackage,
  pendingPaymentUrl: state => state.pendingPaymentUrl,
  hasBasicPackage: state => (state.currentPackage ? state.currentPackage.type === 'BASIC' : false),
  includesSilverFeatures: state => (state.currentPackage ? ['SILVER', 'GOLD', 'PLATINUM'].includes(state.currentPackage.type) : false),
  includesGoldFeatures: state => (state.currentPackage ? ['GOLD', 'PLATINUM'].includes(state.currentPackage.type) : false),
  hasPlatinumFeatures: state => (state.currentPackage ? state.currentPackage.type === 'PLATINUM' : false)
};

const actions = {
  async fetchPackages({ commit }) {
    const data = await api.fetchPackages();
    const response = decode('GetPackagesListResponse', data);
    commit('setPackages', response.packages);
    return { response };
  },

  async fetchCurrentPackage({ commit }) {
    const data = await api.fetchCurrentPackage();
    const response = decode('GetActivePackageResponse', data);
    commit('setCurrentPackage', response);
    return { response };
  },

  async fetchSubscriptionStatus({ commit }) {
    try {
      const data = await api.fetchSubscriptionStatus();
      const response = decode('GetPendingSubscriptionResponse', data);
      commit('setPendingPaymentUrl', response.redirectUrl);
      return {response};
    } catch (error) {
      return { error };
    }
  },

  async subscribe({ state }, type) {
    try {
      const payload = encode('SubscribeRequest', { type });
      const data = await api.membershipSubscribe(payload);
      const response = decode('SubscribeResponse', data);
      return { redirectUrl: response.redirectUrl };
    } catch ({ data }) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async verify({ state }, orderId) {
    try {
      const payload = encode('membership.VerifyRequest', { orderId });
      const data = await api.membershipVerify(payload);
      const response = decode('membership.VerifyResponse', data);
      return { response };
    } catch ({ data }) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async setIsPaymentEnabled({ commit }) {
    const data = await api.checkIfMembershipPaymentEnabled();
    const response = decode('feature_flags.VerifyResponse', data);
    commit('setPaymentEnabled', response.enabled);
    return { response };
  }
};

const mutations = {
  setPackages(state, packages) {
    state.packages = packages;
  },

  setCurrentPackage(state, { activePackage, expiresAt, nextPackage }) {
    state.currentPackage = activePackage;
    state.packageExpirationDate = expiresAt;
    state.nextPackage = nextPackage;
  },

  setPendingPaymentUrl(state, pendingPaymentUrl) {
    state.pendingPaymentUrl = pendingPaymentUrl;
  },

  setPaymentEnabled(state, enabled) {
    state.isPaymentEnabled = enabled;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
