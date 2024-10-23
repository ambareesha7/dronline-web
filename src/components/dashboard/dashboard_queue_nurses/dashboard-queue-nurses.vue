<template>
  <div class="DashboardQueueNurses__wrapper">
    <div class="title">
      {{ $t('global.nurses') }} {{ amount }}
    </div>

    <div class="DashboardQueueNurses__content">
      <table
        v-if="nursesQueue.length && !status.banner"
        class="table shaded-outline">
        <thead class="table-head">
        <tr>
          <th class="table-head-cell">{{ $t('global.details') }}</th>
          <th class="table-head-cell">
            <div class="flex-container centered">
              {{ $t('global.reason') }}
            </div>
          </th>
          <th class="table-head-cell">{{ $t('global.id') }}</th>
          <th class="table-head-cell">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(entity, index) in nursesQueue"
          :key="index"
          class="DashboardQueueNurses__queue-entity">
          <td class="table-body-cell">
            <div class="flex-container">
              <div
                class="DashboardQueueNurses__avatar"
                :style="{ 'background-image': `url(${entity.nurse.avatarUrl})` }"></div>
              <div class="table-body-cell-text">
                {{ entity.nurse.firstName }} {{ entity.nurse.lastName}}
              </div>
            </div>
          </td>
          <td class="table-body-cell">
            <div class="flex-container centered">
              <btn
                @onclick="showReason(entity)"
                btn-class="blue small"
                :btn-label="$t('global.see')">
              </btn>
            </div>
          </td>
          <td class="table-body-cell">
            {{ entity.nurse.id }}
          </td>
          <td class="table-body-cell actions">
            <div
              class="DashboardQueueNurses__action"
              :class="{ 'inactive': callOpened }"
              @click="join(entity)">
              <i class="icon-phone-call phone-call-action-icon"></i>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div
        v-else
        class="table-no-result shaded-outline">
        <div class="table-no-result-title">
          {{ $t('dashboard.no_nurses_in_queue') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PatientRecordReasonModal from '@/components/patients/patient_record/patient_record_reason_modal/patient-record-reason-modal';

export default {
  name: 'DashboardQueueNurses',

  computed: {
    ...mapGetters('profile', ['status']),
    ...mapGetters('queue', ['nursesQueue']),
    ...mapGetters('call', ['callOpened']),
    amount() {
      return this.nursesQueue.length ? `(${this.nursesQueue.length})` : null;
    }
  },

  mounted() {
    this.fetchNursesQueue();
  },

  methods: {
    ...mapActions('queue', ['fetchNursesQueue', 'answerCallFromNurse']),
    join({ nurse }) {
      this.answerCallFromNurse(nurse.id);
    },
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
  @import "dashboard-queue-nurses.scss";
</style>
