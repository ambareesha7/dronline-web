import Vue from 'vue';
import api from '@/api';
import {cloneDeep} from 'lodash';
import { decode, encode } from '@/utils/proto';
import { getIndexByParam } from '@/utils';
import { parseError } from '@/utils/error-parser';

const state = {
  timeline: [],
  recordId: null,
  openedForm: null,
  editableEntity: null,
  timelineSpecialists: [],
  entityComments: [],
  commentsNextToken: null
};

const getters = {
  timeline: state => state.timeline,
  recordId: state => state.recordId,
  openedForm: state => state.openedForm,
  editableEntity: state => state.editableEntity,
  timelineSpecialists: state => state.timelineSpecialists,
  entityComments: state => state.entityComments,
  commentsNextToken: state => state.commentsNextToken
};

const actions = {
  async fetchPatientTimeline({ commit, state }) {
    const data = await api.fetchPatientTimeline(state.recordId);
    const response = decode('GetTimelineResponse', data);
    const timeline = response.timeline.timelineItems.map(v => {
      switch (v.item) {
        case 'call':
          v.specialist = response.specialists
            .find(specialist => specialist.id === v.call.specialistId);
          break;
        case 'dispatchRequest':
          v.specialist = response.specialists
            .find(specialist => specialist.id === v.dispatchRequest.requesterId);
          break;
        case 'vitals':
          v.specialist = response.specialists
            .find(specialist => specialist.id === v.vitals.nurseId);
          break;
        case 'vitalsV2':
          v.specialist = response.specialists
            .find(specialist => specialist.id === v.vitalsV2.providedByNurseId);
          v = {
            ...v,
            item: 'vitals',
            vitals: v.vitalsV2
          };
          break;
        case 'doctorInvitation':
          v.specialist = response.specialists
            .find(specialist => specialist.id === v.doctorInvitation.specialistId);
          break;
        case 'providedHpi':
          v.specialist = response.specialists
            .find(specialist => specialist.id === v.providedHpi.specialistId);
          break;
        case 'orderedTests':
          v.specialist = response.specialists
            .find(specialist => specialist.id === v.orderedTests.specialistId);
          break;
        case 'medications':
          v.specialist = response.specialists
            .find(specialist => specialist.id === v.medications.specialistId);
          break;
        default:
          break;
      }
      return v;
    });
    commit('setTimeline', timeline);
    commit('setTimelineSpecialists', response.specialists);
    return { response };
  },

  async provideVitals({ commit }, { patientId, recordId, vitalsParams }) {
    try {
      const payload = encode('CreateNewVitalsRequest', {
        vitalsParams
      });
      const data = await api.provideVitals(patientId, recordId, payload);
      return { data };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async orderTests({ commit }, { patientId, recordId, items }) {
    try {
      const payload = encode('CreateOrderedTestsRequest', {items});
      const data = await api.orderTests(patientId, recordId, payload);
      return { data };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async assignMedications({ commit }, { patientId, recordId, items }) {
    try {
      const payload = encode('AssignMedicationsRequest', {items});
      const data = await api.assignMedications(patientId, recordId, payload);
      return { data };
    } catch ({ data }) {
      const error = parseError(decode('ErrorResponse', data));
      return { error };
    }
  },

  async inviteSpecialist({ dispatch, state }, { categoryId, patientId, currentSessionId, callId }) {
    const payload = {
      inviteDoctorCategory: {
        categoryId,
        patientId,
        recordId: state.recordId,
        currentSessionId
      }
    };
    dispatch(
      'socket/sendChannelMessage',
      {
        channel: `call:${callId}`,
        event: 'invite_doctor_category',
        payload
      },
      { root: true }
    );
  },

  async fetchTimelineEntityComments({ commit, state }, params) {
    const data = await api.fetchTimelineEntityComments(params, {
      next_token: state.commentsNextToken
    });
    const response = decode('GetTimelineItemCommentsResponse', data);
    commit('setTimelineEntityComments', response);
    return { response };
  },

  async addComment({ commit }, { body, params }) {
    try {
      const payload = encode('CreateTimelineItemCommentRequest', { body });
      const data = await api.addTimelineEntityComment({ ...params, data: payload });
      const response = decode('CreateTimelineItemCommentResponse', data);
      commit('addTimelineEntityComent', response);
      return { response };
    } catch ({ data }) {
      return { error: parseError(decode('ErrorResponse', data)) };
    }
  }
};

const mutations = {
  setRecordId(state, id) {
    state.recordId = id;
  },

  setTimeline(state, timeline) {
    state.timeline = timeline;
  },

  setTimelineSpecialists(state, specialists) {
    state.timelineSpecialists = specialists;
  },

  resetTimeline(state) {
    state.timeline = [];
    state.openedForm = null;
    state.timelineSpecialists = [];
  },

  setOpenedForm(state, form) {
    state.openedForm = form;
  },

  addTimelineEntity(state, newItem) {
    if (newItem.recordId === Number(state.recordId)) {
      newItem.timelineItem.specialist = newItem.specialist;
      const entity = newItem.timelineItem.item === 'vitalsV2' ?
        {
          ...newItem.timelineItem,
          item: 'vitals',
          vitals: newItem.timelineItem.vitalsV2
        } :
        newItem.timelineItem;
      state.timeline.unshift(entity);
    }
  },

  updateTimelineEntity(state, entity) {
    const index = getIndexByParam(state.timeline, 'id', entity.id);
    Vue.set(state.timeline, index, entity);
  },

  setEditableEntity(state, entity) {
    state.editableEntity = cloneDeep(entity);
  },

  setTimelineEntityComments(state, { timelineItemComments, specialists, nextToken }) {
    state.entityComments = state.entityComments.concat(timelineItemComments.map(c => ({
      ...c,
      specialist: specialists.find(s => c.commentedBySpecialistId === s.id)
    })));
    state.commentsNextToken = (nextToken && nextToken !== '') ? nextToken : null;
  },

  addTimelineEntityComent(state, { timelineItemComment, specialist }) {
    state.entityComments = [{
      ...timelineItemComment,
      specialist
    }].concat(state.entityComments);
  },

  clearComments(state) {
    state.entityComments = [];
    state.commentsNextToken = null;
  },

  receivedNewComment(state, { timelineItemId, updatedCommentsCounter }) {
    const index = getIndexByParam(state.timeline, 'id', timelineItemId);
    Vue.set(state.timeline, index, {
      ...state.timeline[index],
      item: state.timeline[index].item,
      commentsCounter: updatedCommentsCounter
    });
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
