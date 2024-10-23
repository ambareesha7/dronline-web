<template>
  <div class="DashboardQueueToDoctor__wrapper">
    <div class="DashboardQueueToDoctor__content shaded-outline">
      <div class="DashboardQueueToDoctor__header">
        <div class="title-medium">
          {{ $t('dashboard.incoming_calls') }}
        </div>
      </div>
      <table
        v-if="toDoctorQueue.length && !status.banner"
        class="table">
        <thead class="table-head">
        <tr>
          <th class="table-head-cell">{{ $t('global.caller') }}</th>
          <th class="table-head-cell">
            <div class="flex-container centered">
              {{ $t('global.reason') }}
            </div>
          </th>
          <th class="table-head-cell">{{ $t('global.type') }}</th>
          <th class="table-head-cell">{{ $t('global.category') }}</th>
          <th class="table-head-cell">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(entity, index) in toDoctorQueue"
          :key="index"
          class="DashboardQueueToDoctor__queue-entity">
          <td class="table-body-cell">
            <div
              v-if="entity.invitedBy"
              class="flex-container">
              <div
                class="DashboardQueueToDoctor__avatar"
                :style="{ 'background-image': `url(${entity.invitedBy.avatarUrl})` }"></div>
              <div class="table-body-cell-text">
                {{ entity.invitedBy.firstName }} {{ entity.invitedBy.lastName }}
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
            {{ getInviterRole(entity.invitedBy.type) }}
          </td>
          <td class="table-body-cell">
            {{ extractCategory(entity.categoryId) }}
          </td>
          <td class="table-body-cell actions">
            <div
              class="DashboardQueueToDoctor__action"
              :class="{ 'inactive': callOpened }"
              @click="answerCallToDoctor(entity)">
              <i class="icon-phone-call DashboardQueueToDoctor__action-icon"></i>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div
        v-else
        class="table-no-result">
        <div class="table-no-result-title">
          {{ $t('dashboard.no_calls') }}
        </div>
        <div class="DashboardQueueToDoctor__no-results-description">
          {{ $t('dashboard.please_wait_for_call') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import categoryHelper from '@/utils/categoryHelper';
import PatientRecordReasonModal from '@/components/patients/patient_record/patient_record_reason_modal/patient-record-reason-modal';
import { USER_ROLE } from '@/constants';

export default {
  name: 'DashboardQueueToDoctor',

  computed: {
    ...mapGetters('profile', ['status']),
    ...mapGetters('queue', ['toDoctorQueue']),
    ...mapGetters('call', ['callOpened']),
    ...mapGetters('medicalCategories', ['medicalCategories'])
  },

  mounted() {
    this.fetchToDoctorQueue();
  },

  methods: {
    ...mapActions('queue', ['fetchToDoctorQueue', 'answerCallToDoctor']),
    extractCategory(id) {
      const {
        name,
        parentCategoryName
      } = categoryHelper.findSpeciality(this.medicalCategories, id) || {};
      return parentCategoryName ? `${parentCategoryName}, ${name}` : name;
    },
    showReason(entity) {
      this.$modal.show(
        PatientRecordReasonModal,
        {
          recordId: entity.recordId,
          patientId: entity.patientId
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
    },
    getInviterRole(type) {
      return this.$t(`user_roles.${USER_ROLE[type]}`);
    }
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-queue-to-doctor.scss";
</style>
