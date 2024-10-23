import cookie from 'vue-cookie';
import api from '@/api';
import router from '@/router';
import { encode, decode } from '@/utils/proto';
import { parseError } from '@/utils/error-parser';

const state = {
  auth_token: cookie.get('auth_token')
};

const getters = {
  authorized: state => state.auth_token != null
};

const actions = {
  async init({ dispatch, commit, state, rootState }) {
    if (router.history && router.history.pending && router.history.pending.name === 'familyMemberCall') return;

    if (state.auth_token) {
      dispatch('team/fetchTeamDetails', {}, { root: true });

      const allowed = await dispatch('profile/checkProfileStatus', {}, { root: true });
      dispatch('profile/fetchBasicInfo', {}, { root: true });
      if (allowed) {
        dispatch('socket/init', {}, { root: true });
        dispatch('profile/checkPendingMedicalSummary', {}, { root: true });
        if (rootState.profile.role === 'external' && !cookie.get('guidePassed')) {
          setTimeout(() => commit('layouts/toggleGuide', true, { root: true }), 2000);
        }
      }
      dispatch('medicalCategories/fetchAllMedicalCategories', {}, { root: true });
      dispatch('firebase/initMessaging', {}, { root: true });
    }
  },
  signOut({ commit, dispatch, state }) {
    if (state.authorized) dispatch('firebase/unregisterDevice', null, { root: true });
    commit('logout');
    commit('profile/clearAllowedViews', null, { root: true });
    router.push({ name: 'sign-in' });
  },
  async signIn({ commit, dispatch }, credentials) {
    try {
      const payload = encode('LoginRequest', credentials);
      const data = await api.signIn(payload);
      const response = decode('LoginResponse', data);
      commit('setToken', response.authToken);
      commit('profile/setRole', response.type, {root: true});
      dispatch('init');
      return { response };
    } catch (response) {
      const error = response.status === 401 ?
        window.i18n.t('authorisation.invalid_credentials') :
        parseError(decode('ErrorResponse', response.data));
      return { error };
    }
  },
  async signUp({ state }, credentials) {
    try {
      const payload = encode('SignupRequest', {email: credentials.email, password: credentials.password});
      const response = await api.signUp(payload, credentials.signUpType);
      return { response };
    } catch ({data}) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async verify({ commit, dispatch }, verificationToken) {
    try {
      const payload = encode('panel_authentication.VerifyRequest', {verificationToken});
      const data = await api.verifySignUp(payload);
      const response = decode('panel_authentication.VerifyResponse', data);
      commit('setToken', response.authToken);
      commit('profile/setRole', 4, {root: true});
      dispatch('init');
      return { response };
    } catch ({data}) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async passwordRecoveryRequest({ commit }, email) {
    const payload = encode('SendPasswordRecoveryRequest', { email });
    try {
      const response = await api.passwordRecoveryRequest(payload);
      return { response };
    } catch ({data}) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async recoverPassword({ commit }, form) {
    try {
      const payload = encode('RecoverPasswordRequest', form);
      const response = await api.recoverPassword(payload);
      return { response };
    } catch ({ data }) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async changePassword({ commit }, form) {
    try {
      const payload = encode('ChangePasswordRequest', form);
      const response = await api.changePassword(payload);
      return { response };
    } catch ({ data }) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async confirmChangePassword({ dispatch }, form) {
    try {
      const payload = encode('ConfirmPasswordChangeRequest', form);
      const response = await api.confirmPasswordChange(payload);
      dispatch('signOut');
      return { response };
    } catch ({ data }) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  }
};

const mutations = {
  logout(state) {
    state.auth_token = null;
    cookie.delete('auth_token');
    cookie.delete('usBoardUser');
  },

  setToken(state, auth_token) {
    state.auth_token = auth_token;
    cookie.set('auth_token', auth_token);
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
