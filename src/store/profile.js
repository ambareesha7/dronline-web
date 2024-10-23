import cookie from 'vue-cookie';
import Vue from 'vue';
import api from '@/api';
import { cloneDeep } from 'lodash';
import { encode, decode } from '@/utils/proto';
import categoryHelper from '@/utils/categoryHelper';
import router from '@/router';
import { USER_ROLE } from '@/constants';

const state = {
  role: localStorage.getItem('role') || 'gp',
  basicInfo: {},
  editableBasicInfo: null,
  bio: {},
  editableBio: null,
  medicalCategories: null,
  editableMedicalCategories: null,
  medicalCredentials: {},
  editableMedicalCredentials: null,
  location: {},
  editableLocation: null,
  paymentsInfo: {},
  editablePaymentsInfo: null,
  credentials: {},
  registrationStep: null,
  registrationComplete: false,
  allowedViews: [],
  insuranceProviders: [],
  availableInsuranceProviders: {},
  status: null,
  categoriesPrices: null,
  countries: [],
  countryCode: {},
  pricingNoticeModal: null,
  usBoardUser: cookie.get('usBoardUser')
};

const getters = {
  role: state => state.role,
  isGP: state => state.role === 'gp',
  isNurse: state => state.role === 'nurse',
  isDoctor: state => ['doctor', 'external'].includes(state.role),
  isInternalDoctor: state => state.role === 'doctor',
  isExternalDoctor: state => state.role === 'external',
  basicInfo: state => state.basicInfo,
  editableBasicInfo: state => state.editableBasicInfo,
  bio: state => state.bio,
  editableBio: state => state.editableBio,
  medicalCategories: state => state.medicalCategories,
  editableMedicalCategories: state => state.editableMedicalCategories,
  medicalCredentials: state => state.medicalCredentials,
  editableMedicalCredentials: state => state.editableMedicalCredentials,
  location: state => state.location,
  editableLocation: state => state.editableLocation,
  paymentsInfo: state => state.paymentsInfo,
  editablePaymentsInfo: state => state.editablePaymentsInfo,
  credentials: state => state.credentials,
  registrationStep: state => state.registrationStep,
  registrationComplete: state => state.registrationComplete,
  allowedViews: state => state.allowedViews,
  categoriesPrices: state => state.categoriesPrices,
  insuranceProviders: state => state.insuranceProviders,
  availableInsuranceProviders: state => state.availableInsuranceProviders,
  status: state => state.status,
  countries: state => state.countries,
  countryCode: state => state.countryCode,
  pricingNoticeModal: state => state.pricingNoticeModal,
  usBoardUser: state => state.usBoardUser
};

const actions = {
  async checkIfPayoutsTabEnabled({ commit }) {
    const data = await api.checkIfPayoutsTabEnabled();
    const response = decode('feature_flags.VerifyResponse', data);
    return response.enabled;
  },
  async checkProfileStatus({ state, commit }) {
    commit('clearAllowedViews');
    const data = await api.checkProfileStatus();
    const { status } = decode('specialist_profile.GetStatusResponse', data);

    commit('setStatus', { ...status, banner: !status.onboardingCompleted || status.approvalStatus === 1 ? true : false });

    let allowed; 
    
    if (status.approvalStatus === 3 && state.role === 'external') {
      const message = 'Your account has been rejected by DrOnline admin.';
      allowed = [
        { state: { name: 'profile' }, message },
        { state: { name: 'profile-edit' }, message }
      ];
    }

    if (allowed) {
      if (!allowed.find(({ state }) => state.name === router.currentRoute.name)) {
        router.push(allowed[0].state);
      }
      Vue.prototype.$toastr.w(allowed[0].message);
      commit('setAllowedViews', allowed);
    }

    return !state.allowedViews.length;
  },

  async checkPendingMedicalSummary({ state }) {
    const data = await api.checkPendingMedicalSummary();
    const { pendingMedicalSummary } = decode('GetPendingMedicalSummaryResponse', data);
    if (pendingMedicalSummary) {
      router.push({
        name: 'patient-record',
        params: {
          patientId: pendingMedicalSummary.patientId,
          id: pendingMedicalSummary.recordId
        },
        query: {
          pending_medical_summary: true
        }
      });
    }
  },

  async uploadProfileImage({ commit }, file) {
    const data = await api.getProfileImageUrls({
      file_name: file.name,
      content_type: file.type
    });
    const urls = decode('UploadResponse', data);
    await api.uploadProfileImage({
      upload_url: urls.uploadUrl,
      content_type: file.type,
      file
    });
    return urls.downloadUrl;
  },

  async fetchBasicInfo({ commit }) {
    const data = await api.fetchBasicInfo();
    const response = decode('specialist_profileV2.GetBasicInfoResponseV2', data);
    commit('setBasicInfo', response.basicInfo);
    return { response };
  },
  
  async updateBasicInfo({ state, commit }) {
    let requestPayload = state.editableBasicInfo
    requestPayload['address'] = state.editableLocation
    try {
      const payload = encode('specialist_profileV2.UpdateBasicInfoRequestV2', {
        basicInfo: requestPayload
      });
      const data = await api.updateBasicInfo(payload);
      const response = decode('specialist_profileV2.UpdateBasicInfoResponseV2', data);
      commit('setBasicInfo', response.basicInfo);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async fetchBio({ commit }) {
    const data = await api.fetchBio();
    const response = decode('specialist_profile.GetBioResponse', data);
    commit('setBio', response.bio);
    return { response };
  },

  async updateBio({ state, commit }) {
    try {
      const payload = encode('specialist_profile.UpdateBioRequest', {
        bio: state.editableBio
      });
      const data = await api.updateBio(payload);
      const response = decode('specialist_profile.UpdateBioResponse', data);
      commit('setBio', response.bio);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async fetchBiov2({ commit }) {
    const data = await api.fetchDescription();
    const response = decode('specialist_profileV2.GetProfileDescriptionResponseV2', data);
    return { response };
  },

  async updateBiov2({ state, commit }) {
    try {
      const payload = encode('specialist_profileV2.UpdateProfileDescriptionRequestV2', {
        profileDescription: state.editableBio
      });
      const data = await api.updateDescription(payload);
      const response = decode('specialist_profileV2.UpdateProfileDescriptionResponseV2', data);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async updateEducation({ state, commit }) {
    try {
      const payload = encode('specialist_profileV2.UpdateEducationRequestV2', {
        education: state.editableBio.education
      });
      const data = await api.updateEducation(payload);
      const response = decode('specialist_profileV2.UpdateEducationResponseV2', data);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async updateWorkExperience({ state, commit }) {
    try {
      const payload = encode('specialist_profileV2.UpdateWorkExperienceRequestV2', {
        workExperience: state.editableBio.workExperience
      });
      const data = await api.updateWorkExperience(payload);
      const response = decode('specialist_profileV2.UpdateWorkExperienceResponseV2', data);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },
  
  async fetchAvailableInsuranceProviders({ commit }, country) {
    const data = await api.fetchAvailableInsuranceProviders({ country: country });
    const response = decode('insurance.GetProvidersResponse', data);
    commit('setAvailableInsuranceProviders', { providers: response.providers, country: country });
    return { response };
  },

  async fetchInsuranceProviders({ commit }) {
    const data = await api.fetchInsuranceProviders();
    const response = decode('specialist_profileV2.GetInsuranceProvidersV2', data);
    commit('setInsuranceProviders', response.insuranceProviders);
    return { response };
  },

  async updateInsuranceProviders({ commit }, insuranceProvidersPayload) {
    try {
      const payload = encode('specialist_profileV2.UpdateInsuranceProvidersRequestV2', {
        insuranceProviders: insuranceProvidersPayload
      });
      const data = await api.updateInsuranceProviders(payload);
      const response = decode('specialist_profileV2.UpdateInsuranceProvidersResponseV2', data);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }

  },

  async fetchCategoriesPrices({ commit }) {
    const data = await api.fetchPrices();
    const response = decode('specialist_profile.GetPricesResponse', data);
    for (let index = 0; index < response.categoriesPrices.length; index++) {
      if(!response.categoriesPrices[index]['currency']) {
        response.categoriesPrices[index]['currency'] = null
      }
    }
    commit('setCategoriesPrices', response.categoriesPrices);
    return { response };
  },

  async updateCategoryPrices({ _state, commit }, categoryPrices) {
    try {
      const payload = encode('specialist_profile.UpdatePricesRequest', { categoryPrices });
      const data = await api.updatePrices(payload);
      const response = decode('specialist_profile.UpdatePricesResponse', data);
      commit('setCategoryPrices', response.categoryPrices);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async fetchMedicalCategories({ dispatch, state, commit, rootState }) {

    await dispatch('medicalCategories/fetchAllMedicalCategories', {}, { root: true });

    const allMedicalCategories = rootState.medicalCategories.medicalCategories;
    
    const data = await api.fetchMedicalCategories();
    
    const response = decode('specialist_profile.GetMedicalCategoriesResponse', data);

    commit('setMedicalCategories', categoryHelper.assignCategories(
      allMedicalCategories,
      response.medicalCategories
    ));

    return { response };
  },

  async fetchMedicalCredentials({ commit }) {
    const data = await api.fetchMedicalCredentials();
    const response = decode('specialist_profile.GetMedicalCredentialsResponse', data);
    commit('setMedicalCredentials', response.medicalCredentials);
    return { response };
  },

  async fetchMedicalCredentialsV2({ commit }) {
    const data = await api.fetchMedicalInfo();
    const response = decode('specialist_profileV2.GetMedicalInfoResponseV2', data);
    commit('setMedicalCredentials', response.medicalCredentials);
    return { response };
  },

  async updateMedicalCategories({ state, commit, rootState }) {
    try {
      const medicalCategories = categoryHelper.extractCategories(
        state.editableMedicalCategories
      );
      const payload = encode('specialist_profile.UpdateMedicalCategoriesRequest', {
        medicalCategories
      });
      const data = await api.updateMedicalCategories(payload);
      const response = decode('specialist_profile.UpdateMedicalCategoriesResponse', data);
      const allMedicalCategories = rootState.medicalCategories.medicalCategories;
      commit('setMedicalCategories', categoryHelper.assignCategories(
        allMedicalCategories,
        response.medicalCategories
      ));
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async updateMedicalCredentials({ state, commit }) {
    try {
      const payload = encode('specialist_profile.UpdateMedicalCredentialsRequest', {
        medicalCredentials: state.editableMedicalCredentials
      });
      const data = await api.updateMedicalCredentials(payload);
      const response = decode('specialist_profile.UpdateMedicalCredentialsResponse', data);
      commit('setMedicalCredentials', response.medicalCredentials);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async updateMedicalInfo({ state, commit }) {
    try {
      const medicalCategories = categoryHelper.extractCategories(
        state.editableMedicalCategories
      );

      const payload = encode('specialist_profileV2.UpdateMedicalInfoRequestV2', {
        medicalInfo: {
          medicalCategories,
          medicalCredentials: state.editableMedicalCredentials
        }
      })

      const data = await api.updateMedicalInfo(payload);
      const response = decode('specialist_profileV2.UpdateMedicalInfoResponseV2', data);
      return { response };
    } catch (data) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async fetchLocation({ commit }) {
    try {
      const data = await api.fetchLocation();
      const response = decode('specialist_profile.GetLocationResponse', data);
      commit('setLocation', response.location);
    } catch ({data}) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async updateLocation({ state, commit }) {
    try {
      const payload = encode('specialist_profile.UpdateLocationRequest', {
        location: state.editableLocation
      });
      const data = await api.updateLocation(payload);
      const response = decode('specialist_profile.UpdateLocationResponse', data);
      commit('setLocation', response.location);
      return { response };
    } catch ({data}) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  },

  async fetchCredentials({ commit }) {
    const data = await api.fetchCredentials();
    const response = decode('GetCredentialsResponse', data);
    commit('setCredentials', response.credentials);
    return { response };
  },

  async requestAccountDelete() {
    try {
      const payload = encode('SendSpecialistAccountDeletionRequest', {});
      const response = await api.requestAccountDelete(payload);
      return { response };
    } catch ({ data }) {
      const error = decode('ErrorResponse', data);
      return { error };
    }
  }
};

const mutations = {
  setUSBoardUser(state, value) {
    state.usBoardUser = value
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

  setBio(state, bio) {
    state.bio = bio;
  },

  setEditableBio(state) {
    if (state.bio) {
      state.editableBio = cloneDeep(state.bio);
    } else {
      state.editableBio = {};
    }
  },

  setEditableBioField(state, { field, value }) {
    if (state.editableBio) {
      Vue.set(state.editableBio, field, value);
      Vue.set(state, 'editableBio', {
        ...state.editableBio
      });
    }
  },

  setCategoryPrices(state, categoryPrices) {
    const categoriesPrices = state.categoriesPrices
      .map(p => (p.medicalCategoryId === categoryPrices.medicalCategoryId ? categoryPrices : p));
    Vue.set(state, 'categoriesPrices', categoriesPrices);
  },

  setCategoriesPrices(state, categoriesPrices) {
    Vue.set(state, 'categoriesPrices', categoriesPrices);
  },

  setInsuranceProviders(state, insuranceProviders) {
    Vue.set(state, 'insuranceProviders', insuranceProviders);
  },

  addInsuranceProvider(state, provider) {
    state.insuranceProviders.push(provider)
  },

  removeInsuranceProvider(state, provider) {
    state.insuranceProviders.splice(state.insuranceProviders.findIndex(el => el.id === provider.id), 1);
  },

  setAvailableInsuranceProviders(state, data) {
    state.availableInsuranceProviders[data.country] = data.providers
  },

  setMedicalCategories(state, medicalCategories) {
    state.medicalCategories = medicalCategories;
  },

  setEditableMedicalCategories(state, categories) {
    state.editableMedicalCategories = state.medicalCategories || categories
      ? cloneDeep(categories || state.medicalCategories)
      : [];
  },

  setEditableMedicalCategoriesField(state, { field, value }) {
    if (state.editableMedicalCategories) {
      Vue.set(state.editableMedicalCategories, field, value);
    }
  },
  setCategoriesPricesField(state, { field, value, index }) {
    state.categoriesPrices[index][field] = value ? value.id : null
  },

  resetEditableMedicalCategories(state) {
    state.editableMedicalCategories = null;
  },

  addCountry(state) {
    state.countries.push('');
  },
  addCountrytoIndex(state, {index, id}) {
    Vue.set(state.countries, index, id);
  },
  removeCountry(state, index) {
    Vue.delete(state.countries, index);
  },

  addCountryCode(state, countryCode) {
    state.countryCode = countryCode
  },

  setPricingNoticeModal(state, val){
    state.pricingNoticeModal = val
  },

  setCountries(state, countries) {
    state.countries = countries;
  },

  addMedicalCategory(state) {
    state.editableMedicalCategories.push({});
  },

  removeMedicalCategory(state, index) {
    Vue.delete(state.editableMedicalCategories, index);
  },

  setMedicalCredentials(state, credentials) {
    state.medicalCredentials = credentials;
  },

  setEditableMedicalCredentials(state, medicalCredentials) {
    state.editableMedicalCredentials = state.medicalCredentials || medicalCredentials
      ? cloneDeep(medicalCredentials || state.medicalCredentials)
      : {};
  },

  resetEditableMedicalCredentials(state) {
    state.editableMedicalCredentials = null;
  },

  setEditableMedicalCredentialsField(state, { field, value }) {
    if (state.editableMedicalCredentials) {
      Vue.set(state.editableMedicalCredentials, field, value);
      Vue.set(state, 'editableMedicalCredentials', {
        ...state.editableMedicalCredentials
      });
    }
  },
  setRegistrationStep(state, step) {
    state.registrationStep = step;
  },
  setRegistrationComplete(state, value) {
    state.registrationComplete = value;
  },
  setLocation(state, location) {
    state.location = location;
  },

  setEditableLocation(state, savedLocation) {
    state.editableLocation = state.location || savedLocation
      ? cloneDeep(savedLocation || state.location)
      : {};
  },

  replaceEditableLocation(state, location) {
    state.editableLocation = location;
  },

  setEditableLocationField(state, { field, value }) {
    if (state.editableLocation) {
      Vue.set(state.editableLocation, field, value);
      Vue.set(state, 'editableLocation', {
        ...state.editableLocation
      });
    }
  },
  setPaymentsInfo(state, paymentsInfo) {
    state.paymentsInfo = paymentsInfo;
  },

  setEditablePaymentsInfo(state) {
    if (state.paymentsInfo) {
      state.editablePaymentsInfo = cloneDeep(state.paymentsInfo);
    } else {
      state.editablePaymentsInfo = {};
    }
  },

  setEditablePaymentsInfoField(state, { field, value }) {
    if (state.editablePaymentsInfo) {
      Vue.set(state.editablePaymentsInfo, field, value);
    }
  },

  setCredentials(state, credentials) {
    state.credentials = credentials;
  },

  setRole(state, type) {
    const role = USER_ROLE[type];
    localStorage.setItem('role', role);
    Vue.set(state, 'role', role);
  },

  setAllowedViews(state, allowedViews) {
    state.allowedViews = allowedViews;
  },

  setStatus(state, status) {
    state.status = status
  },

  clearAllowedViews(state) {
    state.allowedViews = [];
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
