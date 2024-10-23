<template>
  <fullscreen-modal-wrapper
    :title="$t('visits.visit_details')"
    @close="$emit('close')">
    <div class="PatientRecordReasonModal__tabs">
      <div class="tabs">
        <div
          class="tab ripple"
          :class="{ 'active': tabName === 'hpi' }"
          @click="setTab('hpi')">
          <div class="tab-label">
            {{ $t('health_info.hpi') }}
          </div>
        </div>
        <div
          class="tab ripple"
          :class="{ 'active': tabName === 'ros' }"
          @click="setTab('ros')">
          <div class="tab-label">
            {{ $t('health_info.review_of_systems') }}
          </div>
        </div>
        <div
          class="tab ripple"
          :class="{ 'active': tabName === 'attached_files' }"
          @click="setTab('attached_files')">
          <div class="tab-label">
            {{ $t('global.attached_files') }}
          </div>
        </div>
      </div>
    </div>
    <div class="PatientRecordReasonModal__content">
      <transition
        appear
        name="slide-right-to-left"
        mode="out-in">
        <div
          class="PatientRecordReasonModal__section"
          v-if="tabName === 'hpi'"
          key="hpi">
          <div class="PatientRecordReasonModal__section-header">
            <div class="PatientRecordReasonModal__section-title" v-if="hpi.insertedAt">
              {{ hpi.insertedAt.timestamp | moment('YYYY/MM/DD hh:mm A') }}
            </div>
          </div>
          <div class="PatientRecordReasonModal__section-content">
            <div
              v-for="(field, index) in hpi.form.fields"
              :key="index"
              class="PatientRecordReasonModal__block"
              :data-index="index + 1">
              <component
                :is="`form-field-${field.value}`"
                :field="field"
                :edit="false"
                :vertical="true">
              </component>
            </div>
          </div>
        </div>
        <div
          class="PatientRecordReasonModal__section"
          v-else-if="tabName === 'attached_files'"
          key="attached_files">
          <div class="PatientRecordReasonModal__section-content">
            <patient-attachments :record_id="recordId"/>
          </div>
        </div>
        <div
          class="PatientRecordReasonModal__section"
          v-else
          key="ros">
          <div class="PatientRecordReasonModal__section-header">
            <div class="PatientRecordReasonModal__section-title">
              {{ reviewOfSystem.insertedAt | moment('YYYY/MM/DD hh:mm A') }}
            </div>
          </div>
          <div class="PatientRecordReasonModal__section-content">
            <review-of-systems-form
              :form-fields="reviewOfSystem.form.fields">
            </review-of-systems-form>
          </div>
        </div>
      </transition>
    </div>
  </fullscreen-modal-wrapper>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FullscreenModalWrapper from '@/components/global/fullscreen_modal_wrapper/fullscreen-modal-wrapper';
import FormFields from '@/components/form/form_fields';
import ReviewOfSystemsForm from '@/components/form/review_of_systems_form/review-of-systems-form';
import PatientAttachments from '@/components/patients/patient_record/patient_attachments/patient-attachments';
import { parseFields } from '@/utils/forms';

export default {
  name: 'PatientRecordReasonModal',

  components: {
    FullscreenModalWrapper,
    ReviewOfSystemsForm,
    ...FormFields,
    PatientAttachments
  },

  props: {
    patientId: {
      required: true
    },
    recordId: {
      required: true
    }
  },

  data() {
    return {
      tabName: 'hpi'
    };
  },

  computed: {
    ...mapGetters('patient', [
      'hpi',
      'reviewOfSystem'
    ])
  },

  beforeMount() {
    this.fetchPatientHPI({
      patient_id: this.patientId,
      record_id: this.recordId
    });
    this.fetchPatientReviewOfSystem(this.patientId);
  },

  methods: {
    ...mapActions('patient', [
      'fetchPatientHPI',
      'fetchPatientReviewOfSystem'
    ]),
    setTab(tab) {
      this.tabName = tab;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-record-reason-modal.scss";
  .PatientRecordReasonModal__section {
    .PatientRecordReasonModal__section-content {
      padding: 24px 40px 24px 40px;
    }
  }
</style>
