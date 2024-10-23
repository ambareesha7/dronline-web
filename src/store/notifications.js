import Vue from 'vue';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { parseError } from '@/utils/error-parser';
import { getIndexByParam } from '@/utils';

const state = {
  notifications: [],
  specialists: [],
  nextToken: null,
  unreadNotificationsCounter: 0
};

const getters = {
  notifications: state => state.notifications,
  specialists: state => state.specialists,
  nextToken: state => state.nextToken,
  unreadNotificationsCounter: state => state.unreadNotificationsCounter
};

const actions = {
  async fetchNotifications({ commit, state }) {
    const params = { next_token: state.nextToken };
    const data = await api.fetchNotifications(params);
    const response = decode('GetNotificationsResponse', data);
    commit('setNotificationSections', response);
    return { response };
  },

  async markAllAsRead({ commit, state }) {
    try {
      await api.markAllNotificationsAsRead();
      commit('setUnreadNotificationsCounter', 0);
      commit('markAsRead');
      return { };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async markAsRead({ commit }, id) {
    try {
      const data = await api.markNotificationAsRead(id);
      const response = decode('MarkNotificationAsReadResponse', data);
      commit('setUnreadNotificationsCounter', response.unreadNotificationsCounter);
      commit('markAsRead', id);
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  }
};

const mutations = {
  setNotificationSections(state, {
    notifications,
    specialists,
    unreadNotificationsCounter,
    nextToken
  }) {
    state.notifications = state.notifications.concat(notifications);
    state.specialists = state.specialists.concat(specialists);
    state.nextToken = (nextToken && nextToken !== '') ? nextToken : null;
    state.unreadNotificationsCounter = unreadNotificationsCounter;
  },
  setUnreadNotificationsCounter(state, unreadNotificationsCounter) {
    state.unreadNotificationsCounter = unreadNotificationsCounter;
  },
  markAsRead(state, id) {
    const setAsRead = index => Vue.set(state.notifications, index, {
      ...state.notifications[index],
      read: true,
      type: state.notifications[index].type
    });
    if (id) {
      const index = getIndexByParam(state.notifications, 'id', id);
      setAsRead(index);
    } else {
      state.notifications.forEach((n, i) => {
        setAsRead(i);
      });
    }
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
