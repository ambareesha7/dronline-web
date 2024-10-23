import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import libphonenumber from 'google-libphonenumber';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { extractCountryFromPhoneNumber } from '@/utils';
import { ntfy } from '@/utils/notifications';
import { generateActionUrl } from '@/utils/firebase-messaging-helper';
import constPaths from '@/constants/constant-paths';

const initFirebase = () => {
  firebase.initializeApp({
    apiKey: constPaths.FIREBASE_API_KEY,
    authDomain: constPaths.FIREBASE_AUTH_DOMAIN,
    databaseURL: constPaths.FIREBASE_DATABSE_URL,
    projectId: constPaths.FIREBASE_PROJECT_ID,
    storageBucket: constPaths.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: constPaths.FIREBASE_MESSAGING_SENDER_ID
  });
};
initFirebase();

const state = {
  recaptchaVerifier: null,
  confirmationResult: null,
  phoneNumber: null,
  messaging: null,
  messagingToken: null
};

const getters = {
  phoneNumber: state => state.phoneNumber
};

const actions = {
  checkPhoneNumber({ state }, phone) {
    const noExcepetion = func => {
      let ret;
      try {
        ret = func();
      } catch (err) {
        ret = false;
      } finally {
        return ret;
      }
    };
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const PNF = libphonenumber.PhoneNumberFormat;
    const { iso2_code } = extractCountryFromPhoneNumber(phone) || {};

    const pn = noExcepetion(() => (phoneUtil.parse(phone, iso2_code)));
    return phoneUtil.format(
      pn,
      PNF.E164
    );
  },

  async authorize({ commit, dispatch }, phone_number) {
    if (state.recaptchaVerifier) {
      state.recaptchaVerifier.clear();
      commit('setRecaptchaVerifier', null);
    }
    if (state.phoneNumber) commit('setPhoneNumber', null);
    commit('setRecaptchaVerifier', new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {size: 'invisible'}
    ));

    const phoneNumber = await dispatch('checkPhoneNumber', phone_number);
    commit('setPhoneNumber', phoneNumber);
    firebase.auth().signInWithPhoneNumber(phoneNumber, state.recaptchaVerifier)
      .then(confirmationResult => {
        commit('setConfirmationResult', confirmationResult);
      }).catch(error => {
        if (state.recaptchaVerifier) {
          state.recaptchaVerifier.clear();
          commit('setRecaptchaVerifier', null);
        }
      });
  },

  verify({ state }, code) {
    if (!state.confirmationResult) return { error: { message: 'Wrong phone number' }};
    return state.confirmationResult.confirm(code)
      .then(response => firebase.auth().currentUser.getIdToken(true))
      .then(idToken => ({ firebase_token: idToken }), error => ({error}));
  },

  async initMessaging({ commit, state }) {
    if (state.messaging) firebase.app().delete().then(() => initFirebase());
    commit('setMessaging');
    state.messaging.usePublicVapidKey(constPaths.FIREBASE_PUBLIC_VAPID_KEY);
    const getToken = () => {
      state.messaging.getToken()
        .then(firebase_token => {
          commit('setMessagingToken', firebase_token);
          api.registerDevice(
            encode(
              'RegisterDeviceRequest',
              { firebaseToken: state.messagingToken }
            )
          );
        })
        .catch(err => {
          console.warn('An error occurred while retrieving firebase messaging token. ', err);
        });
    };
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(
        `/static/firebase-messaging-sw-${process.env.NODE_ENV === 'production' ? 'prod' : 'staging'}.js`
      )
        .then(registration => {
          console.log('SW registration successful, scope is:', registration.scope);
          state.messaging.useServiceWorker(registration);
          getToken();
          state.messaging.onTokenRefresh(() => getToken());
        }).catch(err => {
          console.warn('SW registration error:', err);
        });
    }
    state.messaging.onMessage(payload => {
      ntfy.send({
        title: payload.notification.title,
        icon: '/static/images/logo-big.png',
        body: payload.notification.body,
        url: generateActionUrl(payload.data.action)
      });
    });
  },

  unregisterDevice({ state }) {
    return api.unregisterDevice(
      encode(
        'RegisterDeviceRequest',
        { firebaseToken: state.messagingToken }
      )
    );
  }
};

const mutations = {
  setRecaptchaVerifier(state, recaptchaVerifier) {
    state.recaptchaVerifier = recaptchaVerifier;
  },

  setConfirmationResult(state, confirmationResult) {
    state.confirmationResult = confirmationResult;
  },

  setPhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },

  setMessaging(state) {
    state.messaging = firebase.messaging();
  },

  setMessagingToken(state, token) {
    state.messagingToken = token;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
