import Vue from 'vue';
import api from '@/api';
import { encode, decode } from '@/utils/proto';
import categoryHelper from '@/utils/categoryHelper';

const state = {
  medicalCategories: []
};

const getters = {
  medicalCategories: state => state.medicalCategories
};

const actions = {
  async fetchAllMedicalCategories({ commit }) {
    const data = await api.fetchAllMedicalCategories();
    const response = decode('medical_categories.GetAllMedicalCategoriesResponse', data);
    commit('setAllMedicalCategories', categoryHelper.assignSpecialities(response.categories));
    return { response };
  }
};

const mutations = {
  setAllMedicalCategories(state, medicalCategories) {
    state.medicalCategories = medicalCategories;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
