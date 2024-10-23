import Vue from 'vue';
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { parseError } from '@/utils/error-parser';
import { cloneDeep } from 'lodash';
import { capitalize } from '@/utils/filters';
import { CHILDREN_RELATIONSHIP, PARENT_RELATIONSHIP } from '@/constants';

const state = {
  address: null,
  editableAddress: null,
  insurance: null,
  basicInfo: null,
  editableBasicInfo: null,
  histories: null,
  editableSocialHistory: null,
  editableMedicalHistory: null,
  editableSurgicalHistory: null,
  editableFamilyHistory: null,
  editableAllergyHistory: null,
  editableImmunizationHistory: null,
  vitals: null,
  vitalsHistory: [],
  vitalsHistoryNextToken: null,
  hpi: null,
  editableHpi: null,
  editableSection: false,
  editableBlock: false,
  editableSectionFields: [],
  hpiHistory: null,
  adult: null,
  children: null,
  reviewOfSystem: null,
  editableReviewOfSystem: null,
  reviewOfSystemHistory: [],
  reviewOfSystemNextToken: null
};

const getters = {
  address: state => state.address,
  basicInfo: state => state.basicInfo,
  editableBasicInfo: state => state.editableBasicInfo,
  editableAddress: state => state.editableAddress,
  histories: state => state.histories || {},
  editableSocialHistory: state => state.editableSocialHistory,
  editableMedicalHistory: state => state.editableMedicalHistory,
  editableSurgicalHistory: state => state.editableSurgicalHistory,
  editableFamilyHistory: state => state.editableFamilyHistory,
  editableAllergyHistory: state => state.editableAllergyHistory,
  editableImmunizationHistory: state => state.editableImmunizationHistory,
  vitals: state => state.vitals || {},
  vitalsHistory: state => state.vitalsHistory,
  vitalsHistoryNextToken: state => state.vitalsHistoryNextToken,
  hpi: state => state.hpi || {},
  editableHpi: state => state.editableHpi,
  editableSection: state => state.editableSection,
  editableSectionFields: state => state.editableSectionFields,
  hpiHistory: state => state.hpiHistory,
  adult: state => state.adult,
  children: state => state.children,
  reviewOfSystem: state => state.reviewOfSystem,
  editableReviewOfSystem: state => state.editableReviewOfSystem,
  reviewOfSystemHistory: state => state.reviewOfSystemHistory,
  reviewOfSystemHistoryNextToken: state => state.reviewOfSystemNextToken
};

const actions = {
  async fetchPatientAddress({ commit }, id) {
    const data = await api.fetchPatientAddress(id);
    const response = decode('patient_profile.GetAddressResponse', data);
    commit('setAddress', response.address);
    return { response };
  },

  async fetchPatientInsurance({ commit }, id) {
    const data = await api.fetchPatientInsurance(id);
    const response = decode('patient_profile.GetInsuranceResponse', data);
    commit('setInsurance', response.insurance);
    return { response };
  },

  async updatePatientAddress({ state, commit }, id) {
    try {
      const payload = encode('patient_profile.UpdateAddressRequest', {
        address: state.editableAddress
      });
      const data = await api.updatePatientAddress(payload, id);
      const response = decode('patient_profile.UpdateAddressResponse', data);
      commit('setAddress', response.address);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async fetchPatientBasicInfo({ commit }, id) {
    const data = await api.fetchPatientBasicInfo(id);
    const response = decode('patient_profile.GetBasicInfoResponse', data);
    commit('setBasicInfo', response.basicInfo);
    return { response };
  },

  async updatePatientBasicInfo({ state, commit }, id) {
    try {
      const payload = encode('patient_profile.UpdateBasicInfoRequest', {
        basicInfoParams: state.editableBasicInfo
      });
      const data = await api.updatePatientBasicInfo(payload, id);
      const response = decode('patient_profile.UpdateBasicInfoResponse', data);
      commit('setBasicInfo', response.basicInfo);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async fetchPatientHistory({ commit }, patientId) {
    const data = await api.fetchPatientHistory(patientId);
    commit('setHistories', decode('GetHistoryResponse', data));
  },

  async fetchVitals({ commit }, patientId) {
    const data = await api.fetchLatestVitals(patientId);
    commit('setVitals', decode('GetVitalsResponse', data));
  },

  async fetchVitalsHistory({ commit }, patientId) {
    const data = await api.fetchVitalsHistory(
      patientId,
      { next_token: state.vitalsHistoryNextToken }
    );
    commit('setVitalsHistory', decode('GetVitalsHistoryResponse', data));
  },

  async fetchPatientHPI({ state, commit }, params) {
    const data = await api.fetchPatientHPI(params);
    commit('setHPI', decode('GetHPIResponse', data).hpi);
  },

  async fetchHpiHistory({ commit }, params) {
    const data = await api.fetchHpiHistory(params);
    commit('setHpiHistory', decode('GetHPIHistoryResponse', data).hpis);
  },

  async updateSection({ state, commit, dispatch }, { patient_id, record_id }) {
    const form = {};
    let response;
    form[state.editableSection] = {
      fields: cloneDeep(state.editableSectionFields)
    };
    switch (state.editableBlock) {
      case 'histories':
        response = await dispatch('updateHistory', { patient_id, form });
        commit('updateSection');
        break;
      case 'hpi':
        response = await dispatch('updateHpi', { patient_id, record_id, form });
        commit('updateSection');
        break;
      default:
        break;
    }
    return response;
  },

  async updateHistory({ commit }, { patient_id, form }) {
    try {
      const payload = encode('UpdateHistoryRequest', form);
      const data = await api.updatePatientHistory(patient_id, payload);
      const response = decode('UpdateHistoryResponse', data);
      commit('setHistories', response);
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async updatePatientHistories({ commit }, id) {
    try {
      const form = {};
      [
        'social',
        'medical',
        'surgical',
        'family',
        'allergy',
        'immunization'
      ].forEach(section => {
        form[section] = state[`editable${capitalize(section)}History`];
      });
      const payload = encode('patient_profile.UpdateAllHistoryRequest', form);
      const response = await api.updatePatientHistories(id, payload);
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async updateHpi({ commit }, { patient_id, record_id, form }) {
    try {
      const payload = encode('UpdateHPIRequest', form);
      const data = await api.updatePatientHPI({ patient_id, record_id, data: payload });
      const response = decode('UpdateHPIResponse', data);
      commit('setHPI', response.hpi);
      commit('setEditableHpi');
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async addNewVisit({ state }, patientId) {
    try {
      const data = await api.addNewVisit(patientId);
      const response = decode('CreateMedicalRecordResponse', data);
      return { response };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async fetchPatientRelationships({ commit }, patientId) {
    const data = await api.fetchPatientRelationships(patientId);
    commit('setRelations', decode('GetRelationshipResponse', data));
  },

  async fetchPatientReviewOfSystem({ commit }, patientId) {
    const data = await api.fetchPatientReviewOfSystem(patientId);
    commit('setReviewOfSystem', decode('GetReviewOfSystemResponse', data));
  },

  async fetchReviewOfSystemHistory({ commit, state }, patientId) {
    const data = await api.fetchReviewOfSystemHistory(
      patientId,
      { next_token: state.reviewOfSystemNextToken }
    );
    commit('setReviewOfSystemHistory', decode('GetReviewOfSystemHistoryResponse', data));
  },
  async updateReviewOfSystems({ commit, state }, patientId) {
    const payload = encode('UpdateReviewOfSystemRequest', {
      reviewOfSystem: state.editableReviewOfSystem.form
    });
    const data = await api.updateReviewOfSystems(patientId, payload);
    const response = decode('UpdateReviewOfSystemResponse', data);
    commit('setReviewOfSystem', response);
    return { response };
  }
};

const mutations = {
  setAddress(state, address) {
    state.address = address;
  },

  setInsurance(state, insurance) {
    state.insurance = insurance;
  },

  setEditableAddress(state) {
    if (state.address) {
      state.editableAddress = cloneDeep(state.address);
    } else {
      state.editableAddress = {};
    }
  },

  resetEditableAddress(state) {
    state.editableAddress = null;
  },

  setEditableAddressField(state, { field, value }) {
    if (state.editableAddress) {
      Vue.set(state.editableAddress, field, value);
      Vue.set(state, 'editableAddress', {
        ...state.editableAddress
      });
    }
  },

  setBasicInfo(state, basicInfo) {
    state.basicInfo = basicInfo;
  },

  setEditableBasicInfo(state) {
    if (state.basicInfo) {
      state.editableBasicInfo = cloneDeep(state.basicInfo);
    } else {
      state.editableBasicInfo = {};
    }
  },

  resetEditableBasicInfo(state) {
    state.editableBasicInfo = null;
  },

  setEditableBasicInfoField(state, { field, value }) {
    if (state.editableBasicInfo) {
      Vue.set(state.editableBasicInfo, field, value);
      Vue.set(state, 'editableBasicInfo', {
        ...state.editableBasicInfo
      });
    }
  },

  setHistories(state, histories) {
    state.histories = histories;
  },

  setEditableHistories(state) {
    [
      'social',
      'medical',
      'surgical',
      'family',
      'allergy',
      'immunization'
    ].forEach(section => {
      state[`editable${capitalize(section)}History`] = state.histories ?
        cloneDeep(state.histories[section]) : {};
    });
  },

  resetEditableHistories(state) {
    [
      'social',
      'medical',
      'surgical',
      'family',
      'allergy',
      'immunization'
    ].forEach(section => {
      state[`editable${capitalize(section)}History`] = null;
    });
  },

  setEditableHistoryField(state, { section, field, index }) {
    const sectionName = `editable${capitalize(section)}History`;
    if (state[sectionName]) {
      Vue.set(state[sectionName].fields, index, field);
      Vue.set(state, sectionName, {
        ...state[sectionName]
      });
    }
  },

  setVitals(state, { vitals, specialists }) {
    state.vitals = {
      ...vitals,
      specialist: specialists[0]
    };
  },

  clearVitals(state) {
    state.vitals = null;
  },

  setHPI(state, hpi) {
    state.hpi = hpi;
  },

  setEditableHpi(state) {
    state.editableHpi = cloneDeep(state.hpi.form);
  },

  setEditableHpiField(state, { index, field }) {
    Vue.set(state.editableHpi.fields, index, field);
  },

  updateHpi(state) {
    state.hpi = state.editableHpi;
  },

  setHpiHistory(state, hpis) {
    state.hpiHistory = hpis;
  },

  setEditableSection(state, { section, block }) {
    state.editableSection =
      section && state.editableSection !== section ? section : null;
    state.editableBlock = state.editableSection ? block : null;
    if (state.editableSection) {
      state.editableSectionFields = [];
      state[block][section].fields.forEach(field => {
        state.editableSectionFields.push(cloneDeep(field));
      });
    } else {
      state.editableSectionFields = [];
    }
  },

  clearEditableSection(state) {
    state.editableBlock = null;
    state.editableSection = null;
    state.editableSectionFields = [];
  },

  setSectionField(state, { field, index }) {
    Vue.set(state.editableSectionFields, index, field);
  },

  updateSection(state) {
    Vue.set(
      state[state.editableBlock][state.editableSection],
      'fields',
      state.editableSectionFields
    );
  },

  clearRelations(state) {
    state.adult = null;
    state.children = null;
  },

  setRelations(state, { adult, children }) {
    state.adult = adult ? {
      ...adult,
      gender: window.i18n.t(`global.${PARENT_RELATIONSHIP[adult.title]}`)
    } : null;
    state.children = children ? children.children.map(child => ({
      ...child,
      gender: window.i18n.t(`global.${CHILDREN_RELATIONSHIP[child.title]}`)
    })) : null;
  },

  setReviewOfSystem(state, { reviewOfSystem }) {
    state.reviewOfSystem = reviewOfSystem;
  },

  clearReviewOfSystem(state) {
    state.reviewOfSystem = null;
    state.reviewOfSystemHistory = [];
    state.reviewOfSystemNextToken = null;
  },
  setEditableReviewOfSystem(state) {
    state.editableReviewOfSystem = cloneDeep(state.reviewOfSystem);
  },
  setEditableReviewOfSystemField(state, { field, index }) {
    Vue.set(state.editableReviewOfSystem.form.fields, index, field);
  },
  clearEditableReviewOfSystem(state) {
    state.editableReviewOfSystem = null;
  },
  setReviewOfSystemHistory(state, { reviewOfSystemHistory, nextToken, specialists }) {
    state.reviewOfSystemHistory = state.reviewOfSystemHistory
      .concat(reviewOfSystemHistory
        .map(ros => ({
          ...ros,
          specialist: specialists.find((({ id}) => ros.providedBySpecialistId === id))
        })));
    state.reviewOfSystemNextToken = nextToken;
  },
  clearReviewOfSystemHistory(state) {
    state.reviewOfSystemHistory = [];
    state.reviewOfSystemNextToken = null;
  },
  setVitalsHistory(state, { vitalsHistory, nextToken, specialists }) {
    state.vitalsHistory = state.vitalsHistory
      .concat(vitalsHistory
        .map(vitals => ({
          ...vitals,
          specialist: specialists.find((({ id}) => vitals.providedByNurseId === id))
        })));
    state.vitalsHistoryNextToken = nextToken;
  },
  clearVitalsHistory(state) {
    state.vitalsHistory = [];
    state.vitalsHistoryNextToken = null;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
