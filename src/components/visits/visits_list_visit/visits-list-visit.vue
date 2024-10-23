<template>
  <tr class="VisitsListVisit__wrapper">
    <td class="table-body-cell">
      <div
        v-if="visit.patient"
        class="flex-container">
        <div
          class="VisitsListVisit__avatar"
          :style="{ 'background-image': `url(${visit.patient.avatarUrl})` }"></div>
        <div class="table-body-cell-text">
          {{ visit.patient.firstName }} {{ visit.patient.lastName }}
        </div>
      </div>
      <div v-else>&mdash;</div>
    </td>
    <td class="table-body-cell">
      <div class="flex-container centered">
        <btn
          @onclick="showReason(visit)"
          btn-class="blue small"
          :btn-label="$t('global.see')">
        </btn>
      </div>
    </td>
    <td class="table-body-cell">
      <div v-if="isGP | isAdmin">{{ visit.startsAt | moment('YYYY/MM/DD') }}</div>
      <div v-else>{{ visit.startsAt | moment('hh:mm A') }}</div>
    </td>
    <td class="table-body-cell">
      {{
        visit.startsAt | moment(
          (isGP || isAdmin) ? 'hh:mm A &bullet; YYYY/MM/DD' : 'YYYY/MM/DD'
        )
      }}
    </td>
    <td
      v-if="isGP || isAdmin"
      class="table-body-cell">
      <div
        v-if="visit.specialist"
        class="flex-container">
        <div
          class="VisitsListVisit__avatar"
          :style="{ 'background-image': `url(${visit.specialist.avatarUrl})` }"></div>
        <div class="table-body-cell-text">
          {{ visit.specialist.firstName }} {{ visit.specialist.lastName }}
        </div>
      </div>
      <div v-else>&mdash;</div>
    </td>
    <td class="table-body-cell actions">
      <router-link
        class="VisitsListVisit__action"
        :to="{
          name: 'patient-record',
          params: { patientId: visit.patientId, id: visit.recordId }
        }">
        <i class="icon-angle-right"></i>
      </router-link>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';
import PatientRecordReasonModal from '@/components/patients/patient_record/patient_record_reason_modal/patient-record-reason-modal';

export default {
  name: 'VisitsListVisit',

  props: {
    visit: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters('profile', [
      'isGP'
    ]),
    ...mapGetters('team', [
      'isAdmin'
    ])
  },

  methods: {
    showReason({ recordId, patientId }) {
      this.$modal.show(
        PatientRecordReasonModal,
        {
          recordId,
          patientId
        },
        {
          name: 'patient-record-reason-modal',
          width: '100%',
          height: '100%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        }
      );
    }
  }
};
</script>

<style scoped lang="scss">
  @import "visits-list-visit.scss";
</style>
