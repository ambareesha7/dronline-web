const state = {
  showGuide: false
};

const getters = {
  showGuide: state => state.showGuide
};

const actions = {
};

const mutations = {
  toggleGuide(state, flag) {
    state.showGuide = flag;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
