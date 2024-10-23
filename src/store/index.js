import Vue from 'vue';
import Vuex from 'vuex';
import oauth from './oauth';
import socket from './socket';
import notifications from './notifications';
import settings from './settings';
import layouts from './layouts';
import queue from './queue';
import call from './call';
import patientTimeline from './patient-timeline';
import patientRecords from './patient-records';
import availability from './availability';
import dispatches from './dispatches';
import profile from './profile';
import patients from './patients';
import patient from './patient';
import membership from './membership';
import medicalCategories from './medical-categories';
import firebase from './firebase';
import specialists from './specialists';
import nurses from './nurses';
import visits from './visits';
import team from './team';
import encounters from './encounters';
import specialistEncounters from './specialist-encounters';
import tests from './tests';
import medications from './medications';
import procedures from './procedures';
import payouts from './payouts';
import usboard from './usboard';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    oauth,
    socket,
    notifications,
    settings,
    layouts,
    queue,
    call,
    patientTimeline,
    patientRecords,
    availability,
    dispatches,
    profile,
    patients,
    patient,
    membership,
    medicalCategories,
    firebase,
    specialists,
    nurses,
    visits,
    team,
    encounters,
    specialistEncounters,
    tests,
    medications,
    procedures,
    payouts,
    usboard
  }
});
