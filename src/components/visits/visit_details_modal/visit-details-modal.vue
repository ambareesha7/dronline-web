<template>
  <div class="VisitDetailsModal__wrapper">
    <div class="VisitDetailsModal__header">
      <div class="VisitDetailsModal__header-logo-container">
        <img
          src="/static/images/logo.png"
          class="VisitDetailsModal__header-logo" />
      </div>

      <div class="VisitDetailsModal__header-col">
        <h2 class="VisitDetailsModal__header-title">
          {{ $t('visits.visit_details') }}
        </h2>
        <div
          v-if="visitState === 1"
          class="badge-green">
          {{ $t('calendar.scheduled') }}
          {{visitState}}
        </div>
      </div>
      <i
        class="icon-close VisitDetailsModal__header-close"
        @click="close"></i>
    </div>

    <div class="VisitDetailsModal__content">
      <div class="VisitDetailsModal__section">
        <div class="VisitDetailsModal__section-header">
          <div class="VisitDetailsModal__section-title">
            {{ $t('patients.patient_details') }}
          </div>
          <div>
            <btn
              class="DashboardScheduledVisitsVisit__cancel-btn"
              @onclick="cancel()"
              btn-class="red"
              :btn-label="$t('global.cancel_visit')">
            </btn>
          </div>
        </div>
        <div class="VisitDetailsModal__section-content VisitDetailsModal__patient-details">
          <table class="table">
            <colgroup>
              <col class="VisitDetailsModal__patient-details-col">
              <col class="VisitDetailsModal__patient-details-col">
              <col class="VisitDetailsModal__patient-details-col">
            </colgroup>
            <thead class="table-head">
            <tr>
              <th class="table-head-cell VisitDetailsModal__patient-details-cell">
                {{ $t('global.patient') }}
                <div
                  v-if="visitState === 1"
                  class="btn-blue small VisitDetailsModal__see-vitals"
                  @click="showVitals">
                  {{ $t('visits.see_vitals') }}
                </div>
              </th>
              <th class="table-head-cell VisitDetailsModal__patient-details-cell">
                {{ $t('global.category_chosen') }}
              </th>
              <th class="table-head-cell VisitDetailsModal__patient-details-cell">
                {{ $t('global.date_time') }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="table-body-cell VisitDetailsModal__patient-details-cell">
                <div
                  v-if="basicInfo"
                  class="VisitDetailsModal__patient-card">
                  <div
                    class="VisitDetailsModal__patient-card-avatar"
                    :style="{'background-image': `url(${basicInfo.avatarUrl})`}"></div>
                  <div class="VisitDetailsModal__patient-card-info">
                    <div class="VisitDetailsModal__patient-card-name">
                      {{ basicInfo.firstName }} {{ basicInfo.lastName }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="table-body-cell VisitDetailsModal__patient-details-cell">
                {{ medicalCategoryName }}
              </td>
              <td class="table-body-cell VisitDetailsModal__patient-details-cell">
                <div class="VisitDetailsModal__patient-details-date-time">
                  <span>
                    {{ startTime | moment('YYYY/MM/DD') }}
                  </span>
                  <span>
                    {{ startTime | moment('hh:mm A') }}
                  </span>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="VisitDetailsModal__section">

        <div class="tabs">

          <div class="tab ripple" :class="{ 'active': tabName === 'hpi' }" @click="tabName = 'hpi'">
            <div class="tab-label">{{ $t('global.hpi_full') }}</div>
          </div>

          <div class="tab ripple" :class="{ 'active': tabName === 'attached_files' }" @click="tabName = 'attached_files'">
            <div class="tab-label">{{ $t('global.attached_files') }}</div>
          </div>

        </div>

        <div class="VisitDetailsModal__section-content" v-if="!loading">
          <div
            v-if="tabName === 'hpi'"
            v-for="(field, index) in hpi.form.fields"
            :key="index"
            class="VisitDetailsModal__block"
            :data-index="index + 1">
            <component
              :is="`form-field-${field.value}`"
              :field="field"
              :edit="false"
              :vertical="true">
            </component>
          </div>
          <div v-if="tabName === 'attached_files'">
            <patient-attachments :record_id="recordId"/>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FormFields from '@/components/form/form_fields';
import ConfirmModal from '@/components/global/confirm_modal/confirm-modal';
import PatientAttachments from '@/components/patients/patient_record/patient_attachments/patient-attachments';
import { decode } from '@/utils/proto';
import api from '@/api';

export default {
  name: 'VisitDetailsModal',

  components: {
    ...FormFields,
    ConfirmModal,
    PatientAttachments
  },

  props: {
    patientId: {
      required: true
    },
    recordId: {
      required: true
    },
    startTime: {
      required: true
    },
    visitState: {
      type: Number
    },
    onClose: {
      type: Function
    },
    visitId: {
      required: true
    }
  },

  data() {
    return {
      medicalCategoryName: null,
      loading: true,
      tabName: 'hpi',
    };
  },

  computed: {
    ...mapGetters('patient', [
      'hpi',
      'basicInfo'
    ]),
    ...mapGetters('medicalCategories', [
      'medicalCategories'
    ]),
    insertedAt() {
      return this.hpi.insertedAt ?
        this.$moment(this.hpi.insertedAt.timestamp).format('YYYY/MM/DD hh:mm A') :
        null;
    }
  },

  async beforeMount() {
    this.loading = true
    await this.fetchPatientBasicInfo(this.patientId);
    await this.fetchPatientHPI({
      patient_id: this.patientId,
      record_id: this.recordId
    });

    const data = await this.fetchVisit();
    const response = decode('GetVisitResponse', data);
    let categoryName = response.medicalCategory.name;
    const parentCategoryId = response.medicalCategory.parentCategoryId;
    if (parentCategoryId) {
      const parentCategoryName = this.medicalCategories
        .find(({id}) => id === parentCategoryId).name;
      categoryName = `${parentCategoryName} > ${categoryName}`;
    }
    this.medicalCategoryName = categoryName;
    this.loading = false
  },
  methods: {
    ...mapActions('patient', [
      'fetchPatientHPI',
      'fetchPatientBasicInfo'
    ]),
    ...mapActions('visits', [
      'cancelVisit'
    ]),
    cancel() {
      this.$modal.show(
        ConfirmModal,
        {
          content: this.$t('visits.confirm_cancel'),
          desc: this.$t('visits.confirm_cancel_desc'),
          confirm: () => this.cancelVisit(this.visitId)
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
    showVitals() {
      this.$router.push({
        name: 'patient-record',
        params: { patientId: this.patientId, id: this.recordId }
      });
      this.$nextTick(() => this.$emit('close'));
    },

    close() {
      const date = this.$route.query ? this.$route.query.date : null;
      const query = date ? { date } : null;
      this.$router.replace({ query });
      this.$emit('close');
      if (this.onClose) {
        this.onClose();
      }
    },

    async fetchVisit() {
      return api.fetchVisit(this.visitId);
    }
  }
};
</script>

<style scoped lang="scss">
  @import "visit-details-modal.scss";
</style>
