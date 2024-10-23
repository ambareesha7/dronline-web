const state = {
  lang: localStorage.getItem('lang') || 'en'
};

const getters = {
  lang: state => state.lang
};

const actions = {
  async setLanguage({ commit }, payload) {
    if (payload in window.i18n.messages) {
      commit('setLang', payload);
    } else {
      try {
        const res = await import(`@/lang/${payload}.json`);
        window.i18n.setLocaleMessage(payload, res);
        commit('setLang', payload);
      } catch (e) {
        console.log(e);
      }
    }
  }
};

const mutations = {
  setLang(state, payload) {
    const dir = ['ar', 'fa', 'ur'].includes(payload) ? 'rtl' : 'ltr';
    window.i18n.locale = payload;
    state.lang = payload;
    localStorage.setItem('lang', payload);
    document.getElementsByTagName('html')[0].setAttribute('lang', payload);
    document.getElementsByTagName('html')[0].setAttribute('dir', dir);
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
