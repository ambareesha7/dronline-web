import Vue from 'vue';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { getIndexByParam, generateUuid } from '@/utils';

const state = {
  records: [],
  nextToken: null,
  record: null,
  medicalSummaries: [],
  medicalSummary: null,
  medicalSummaryProvided: null,
  latestMedicalSummary: null,
  documents: []
};

const getters = {
  records: state => state.records,
  nextToken: state => state.nextToken,
  record: state => state.record,
  medicalSummaries: state => state.medicalSummaries,
  medicalSummary: state => state.medicalSummary,
  medicalSummaryProvided: state => state.medicalSummaryProvided,
  latestMedicalSummary: state => state.latestMedicalSummary,
  documents: state => state.documents
};

const actions = {
  async fetchPatientRecords({ commit }, id) {
    try {
      const data = await api.fetchPatientRecords(id, state.nextToken);
      const response = decode('GetPatientRecordsResponse', data);
      commit('setRecords', response);
      return {response};
    } catch ({data}) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },
  async fetchPatientUploadedDocuments({ commit }, id) {
    try {
      const data = await api.fetchPatientUploadedDocuments(id);
      const response = decode('visits.GetUploadedDocuments', data);
      commit('setUploadedDocuments', response);
      return {response};
    } catch ({data}) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },
  async fetchPatientRecord({ commit }, params) {
    const data = await api.fetchPatientRecord(params);
    const response = decode('GetPatientRecordResponse', data);
    commit('setRecord', response);
    return { response };
  },

  async endPatientVisit({ commit }, params) {
    await api.closePatientRecord(params);
    const data = await api.fetchPatientRecord(params);
    const response = decode('GetPatientRecordResponse', data);
    commit('updateSingleRecord', response.patientRecord);
    return { response };
  },

  async saveMedicalSummary({ state, commit }, { patient_id, record_id }) {
    try {
      if (!state.medicalSummaryProvided) commit('setMedicalSummaryProvided', generateUuid());
      return { };
    } catch ({data}) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async addMedicalSummary({ state, commit }, { patient_id, record_id }) {
    try {
      if (!state.medicalSummaryProvided) commit('setMedicalSummaryProvided', generateUuid());

      const {conditions, procedures, ...summaryData} = state.medicalSummary;
      const payloadObject = {
        conditions: conditions.map(({id}) => id),
        procedures: procedures.map(({id}) => id),
        medicalSummaryData: summaryData,
        requestUuid: state.medicalSummaryProvided
      };
      const payload = encode('AddMedicalSummaryRequest', payloadObject);
      await api.addMedicalSummary({
        data: payload,
        patient_id,
        record_id
      });
      return { };
    } catch ({data}) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async fetchMedicalSummary({ commit }, params) {
    const data = await api.fetchMedicalSummary(params);
    const response = decode('GetMedicalSummariesResponse', data);
    commit('setMedicalSummaries', response.medicalSummaries);
  },

  async fetchLatestMedicalSummary({ commit }, params) {
    const data = await api.fetchLatestMedicalSummary(params);
    const response = decode('GetLatestMedicalSummaryResponse', data);
    commit('setLatestMedicalSummary', response.medicalSummary);
  }
};

const mutations = {
  setRecords(state, { patientRecords, nextToken, specialists }) {
    state.records = state.records.concat(patientRecords.map(record => {
      if (record.type === 'manually') {
        record.createdBy = specialists.find(({id}) => id === record.manually.createdBySpecialistId);
      }
      record.with = specialists.find(({id}) => id === record[record.type].withSpecialistId);
      return record;
    }));
    state.nextToken = (nextToken && nextToken !== '') ? nextToken : null;
  },
  setUploadedDocuments(state, documents) {
    state.documents = documents;
  },
  addRecord(state, record) {
    state.records.push(record);
  },

  clearRecords(state) {
    state.records = [];
    state.nextToken = null;
  },

  setRecord(state, { patientRecord, specialists }) {
    state.record = patientRecord;
    state.record.with = specialists
      .find(({id}) => id === patientRecord[patientRecord.type].withSpecialistId);
    if (patientRecord.type === 'manually') {
      state.record.createdBy = specialists
        .find(({id}) => id === patientRecord.manually.createdBySpecialistId);
    }
  },

  updateSingleRecord(state, record) {
    const index = getIndexByParam(state.records, 'recordId', record.recordId);
    Vue.set(state.records, index, record);
  },

  setMedicalSummaries(state, medicalSummaries) {
    state.medicalSummaries = medicalSummaries;
  },

  setLatestMedicalSummary(state, medicalSummary) {
    state.latestMedicalSummary = medicalSummary;
  },

  clearMedicalSummary(state) {
    state.medicalSummary = null;
    state.medicalSummaryProvided = null;
  },

  setMedicalSummaryProvided(state, id) {
    state.medicalSummaryProvided = id;
  },

  setMedicalSummaryField(state, { field, value }) {
    if (!state.medicalSummary) state.medicalSummary = {};
    Vue.set(state.medicalSummary, field, value);
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
