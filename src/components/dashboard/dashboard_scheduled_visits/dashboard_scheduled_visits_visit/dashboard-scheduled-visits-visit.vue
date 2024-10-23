<template>
  <tr class="DashboardScheduledVisitsVisit__queue-entity">
    <td class="table-body-cell">
      <div
        v-if="visit.patient"
        class="flex-container">
        <div
          class="DashboardScheduledVisitsVisit__avatar"
          :style="{ 'background-image': `url(${visit.patient.avatarUrl})` }"
        >
          <i v-if="visit.patient.isInsured"
            class="icon_is-insured-badge
            DashboardScheduledVisitsVisit__avatar__is-insured-badge"
          />
        </div>
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
          :btn-label="$t('global.details')">
        </btn>
      </div>
    </td>
    <td
      v-if="perspective === 'gp'"
      class="table-body-cell">
      {{ visit.scheduledAt | moment('DD.MM.YYYY') }}
    </td>
    <td class="table-body-cell">
      {{ visit.startsAt | moment('hh:mm A &bullet; DD.MM.YYYY') }}
    </td>
    <td
      v-if="perspective === 'gp'"
      class="table-body-cell">
      <div
        v-if="visit.specialist"
        class="flex-container">
        <div
          class="DashboardScheduledVisitsVisit__avatar"
          :style="{ 'background-image': `url(${visit.specialist.avatarUrl})` }"></div>
        <div class="table-body-cell-text">
          {{ visit.specialist.firstName }} {{ visit.specialist.lastName }}
        </div>
      </div>
      <div v-else>&mdash;</div>
    </td>
    <td class="table-body-cell actions">
      <div class="DashboardScheduledVisitsVisit__action-container"
        v-tooltip.left="tooltip">
        <div
          class="DashboardScheduledVisitsVisit__action"
          :class="{ 'unavailable': callOpened || !available || calling }"
          @click="call(visit.id)">
          <i class="icon-phone-call phone-call-action-icon"></i>
        </div>
      </div>
    </td>
    <td
      v-if="perspective === 'doctor'"
      class="table-body-cell">
      <div class="flex-container centered">
        <btn
          class="DashboardScheduledVisitsVisit__cancel-btn"
          @onclick="cancel(visit)"
          btn-class="blue small"
          :btn-label="$t('global.cancel')">
        </btn>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import ConfirmModal from '@/components/global/confirm_modal/confirm-modal';
import PatientRecordReasonModal from '@/components/patients/patient_record/patient_record_reason_modal/patient-record-reason-modal';
import UsBoardSecondOpinionModal from '@/components/us_board/us_board_second_opinion_modal/us-board-second-opinion-modal';

export default {
  name: 'DashboardScheduledVisitsVisit',

  components: {
    ConfirmModal
  },

  props: {
    visit: {
      type: Object,
      required: true
    },
    now: {
      type: Number,
      required: true
    },
    perspective: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      calling: false
    };
  },

  computed: {
    ...mapGetters('profile', [
      'isGP'
    ]),
    ...mapGetters('team', [
      'isAdmin'
    ]),
    ...mapGetters('call', [
      'callOpened'
    ]),
    available() {
      return this.perspective === 'gp' ||
        (this.visit.startsAt <= this.now && (this.visit.startsAt + 1800) > this.now);
    },
    tooltip() {
      if (this.callOpened) return null;
      return {
        content: this.available ?
          this.$t('dashboard.call_to_patient') :
          this.$t('dashboard.you_can_make_call_from', [this.$moment(this.visit.startsAt * 1000).format('hh:mm A')]),
        class: 'custom-tooltip--white'
      };
    }
  },

  methods: {
    ...mapActions('call', [
      'visitCall'
    ]),
    ...mapActions('visits', [
      'cancelVisit'
    ]),
    ...mapActions('usboard', [
      'fetchUSBoard2ndOpinionByVisitId'
    ]),
    async call(visitId) {
      this.calling = true;
      await this.visitCall({ visitId, isGP: this.perspective === 'gp', visitDetails: this.visit.type ? this.visit : null });
      setTimeout(() => {
        this.calling = false;
      }, 1000);
    },
    cancel({id}) {
      this.$modal.show(
        ConfirmModal,
        {
          content: this.$t('visits.confirm_cancel'),
          desc: this.$t('visits.confirm_cancel_desc'),
          confirm: () => this.cancelVisit(id)
        },
        {
          name: 'confirm-modal',
          width: 470,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          clickToClose: true,
          transition: 'from-top-to-bottom'
        }
      );
    },
    async showReason({ id, recordId, patientId, type }) {

      if(type && type == 2) {
        
        let opinion = await this.fetchUSBoard2ndOpinionByVisitId(id);

        this.$modal.show(
          UsBoardSecondOpinionModal,
          {
            opinion: opinion
          },
          {
            name: 'us-board-second-opinion-modal',
            width: '90%',
            height: '90%',
            adaptive: true,
            clickToClose: false,
            transition: 'from-right-to-left'
          }
        );

        return
      }
      
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
  @import "dashboard-scheduled-visits-visit.scss";
</style>
