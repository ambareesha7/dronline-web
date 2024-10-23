import { decode, encode } from '@/utils/proto';
import api from '../api';

const state = {
  teamId: null,
  formattedAddress: null,
  isAdmin: false,
  isOwner: false,
  invitations: [],
  name: null,
  logoUrl: null
};

const getters = {
  teamId: state => state.teamId,
  formattedAddress: state => state.formattedAddress,
  isAdmin: state => state.isAdmin,
  isOwner: state => state.isOwner,
  invitations: state => state.invitations,
  name: state => state.name,
  logoUrl: state => state.logoUrl
};

const actions = {
  async fetchTeamDetails({ _state, commit }) {
    const data = await api.getTeamDetails();
    const response = decode('MyTeam', data);
    commit('setTeamDetails', response);

    const invitationsData = await api.getTeamInvitations();
    const invitationsResponse = decode('TeamInvitations', invitationsData);
    commit('setTeamInvitations', invitationsResponse);
  }
};

const mutations = {
  setTeamDetails(state, details) {
    if (details.teamId > 0) {
      state.teamId = details.teamId;
      state.formattedAddress = details.formattedAddress;
    } else {
      state.teamId = null;
    }

    state.isAdmin = details.isCurrentUserAdmin;
    state.isOwner = details.isCurrentUserOwner;
    state.name = details.name;
    state.logoUrl = details.logoUrl;
  },
  setTeamInvitations(state, resp) {
    state.invitations = resp.invitations;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
