<template>
  <div class="DashboardQueuePatients__wrapper">
    <div class="title">
      {{ $t('global.patients') }} {{ amount }}
    </div>

    <div class="DashboardQueuePatients__content">
      <table
        v-if="patientsQueue.length && !status.banner"
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
          v-for="(entity, index) in patientsQueue"
          :key="index"
          class="DashboardQueuePatients__queue-entity">
          <td class="table-body-cell">
            <div class="flex-container">
              <div
                class="table-body-cell-avatar DashboardQueuePatients__queue-entity__avatar"
                :style="{ 'background-image': `url(${entity.patient.avatarUrl})` }"
              >
                <i v-if="entity.patient.isInsured"
                  class="icon_is-insured-badge
                  DashboardQueuePatients__queue-entity__avatar__is-insured-badge"
                />
              </div>
              <div class="table-body-cell-text">
                {{ entity.patient.firstName }} {{ entity.patient.lastName }}
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
          <td class="table-body-cell">{{ entity.patient.id }}</td>
          <td class="table-body-cell actions">
            <div
              class="DashboardQueuePatients__action"
              :class="{ 'inactive': callOpened }"
              @click="join(entity.patient)">
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
          {{ $t('dashboard.no_patients_in_queue') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PatientRecordReasonModal from '@/components/patients/patient_record/patient_record_reason_modal/patient-record-reason-modal';

export default {
  name: 'DashboardQueuePatients',

  computed: {
    ...mapGetters('profile', ['status']),
    ...mapGetters('queue', ['patientsQueue']),
    ...mapGetters('call', ['callOpened']),
    amount() {
      return this.patientsQueue.length ? `(${this.patientsQueue.length})` : null;
    }
  },

  mounted() {
    this.fetchPatientsQueue();
  },

  methods: {
    ...mapActions('queue', ['fetchPatientsQueue', 'joinCall']),
    join(patient) {
      this.joinCall({
        caller: 1,
        callerId: patient.id
      });
    },
    showReason(entity) {
      this.$modal.show(
        PatientRecordReasonModal,
        {
          recordId: entity.recordId,
          patientId: entity.patient.id
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
  @import "dashboard-queue-patients.scss";
</style>
