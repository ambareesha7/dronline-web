<template>
  <div class="PatientVitals__wrapper">
    <div class="PatientVitals__section">
      <div class="PatientVitals__section-header-row">
        <div class="PatientVitals__section-col">
          <div class="title-uppercase">
            {{ $t('health_info.recently_updated_by') }}
          </div>
          <specialist-card
            v-if="vitals.specialist"
            :specialist="vitals.specialist"
            :show-role="true">
          </specialist-card>
        </div>
        <div class="PatientVitals__section-col">
          <div class="title-uppercase">
            {{ $t('patients.record_id') }}
          </div>
          <div
            class="PatientVitals__record-link"
            @click="openRecord(vitals.recordId)">
            {{ vitals.recordId }}
            <i class="icon-angle-right PatientVitals__record-link-icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="PatientVitals__section">
      <div class="title-uppercase">
        {{ $t('patients.physical_exam') }}
      </div>
      <div
        class="form-row PatientVitals__value"
        v-html="vitals.physicalExam">
      </div>
    </div>
    <div class="PatientVitals__section">
      <div class="title-uppercase">
        {{ $t('health_info.bmi') }}
      </div>
      <div class="PatientVitals__section-row">
        <div class="form-row--cols PatientVitals__section-col">
          <div class="form-col PatientVitals__label">
            {{ $t('global.height') }}
          </div>
          <div
            class="form-col PatientVitals__value"
            v-html="height || '&mdash;'">
          </div>
        </div>
        <div class="form-row--cols PatientVitals__section-col">
          <div class="form-col PatientVitals__label">
            {{ $t('global.weight') }}
          </div>
          <div
            class="form-col PatientVitals__value"
            v-html="weight || '&mdash;'">
          </div>
        </div>
        <div class="form-row--cols PatientVitals__section-col">
          <div class="form-col PatientVitals__label">
            {{ $t('global.result') }}
          </div>
          <div
            class="form-col PatientVitals__value"
            v-html="bmiResult"></div>
        </div>
      </div>
    </div>
    <div class="PatientVitals__section">
      <div class="title-uppercase">
        {{ $t('health_info.blood_pressure') }}
      </div>
      <div class="PatientVitals__section-row">
        <div class="form-row--cols PatientVitals__section-col">
          <div class="form-col PatientVitals__label">
            {{ $t('health_info.systolic') }}
          </div>
          <div
            class="form-col PatientVitals__value"
            v-html="vitals.bloodPressureSystolic || '&mdash;'">
          </div>
        </div>
        <div class="form-row--cols PatientVitals__section-col">
          <div class="form-col PatientVitals__label">
            {{ $t('health_info.diastolic') }}
          </div>
          <div
            class="form-col PatientVitals__value"
            v-html="vitals.bloodPressureDiastolic || '&mdash;'">
          </div>
        </div>
      </div>
    </div>
    <div class="PatientVitals__section">
      <div class="title-uppercase">
        {{ $t('health_info.heart_rate') }}
      </div>
      <div class="PatientVitals__section-row">
        <div class="form-row--cols PatientVitals__section-col">
          <div class="form-col PatientVitals__label">
            {{ $t('health_info.pulse') }}
          </div>
          <div
            class="form-col PatientVitals__value"
            v-html="vitals.pulse || '&mdash;'">
          </div>
        </div>
      </div>
    </div>
    <div class="PatientVitals__section">
      <div class="title-uppercase">
        {{ $t('health_info.respiratory_rate') }}
      </div>
      <div class="PatientVitals__section-row">
        <div class="form-row--cols PatientVitals__section-col">
          <div class="form-col PatientVitals__label">
            {{ $t('health_info.breaths_min') }}
          </div>
          <div
            class="form-col PatientVitals__value"
            v-html="vitals.respiratoryRate || '&mdash;'">
          </div>
        </div>
      </div>
    </div>
    <div class="PatientVitals__section">
      <div class="title-uppercase">
        {{ $t('health_info.temperature') }}
      </div>
      <div class="PatientVitals__section-row">
        <div class="form-row--cols PatientVitals__section-col">
          <div class="form-col PatientVitals__label">
            {{ $t('health_info.body_heat_celsium') }}
          </div>
          <div
            class="form-col PatientVitals__value"
            v-html="temperature">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { number } from '@/utils/filters';
import SpecialistCard from '@/components/global/specialist_card/specialist-card';

export default {
  name: 'PatientVitals',
  components: {
    SpecialistCard
  },
  props: {
    vitals: {
      type: Object,
      required: true
    }
  },
  computed: {
    height() {
      return (this.vitals.height || {}).value;
    },
    weight() {
      return (this.vitals.weight || {}).value;
    },
    bmiResult() {
      const w = this.weight || 0;
      const h = (this.height || 0) / 100;
      return (w && h) ? number(w / (h ** 2), 2) : '&mdash;';
    },
    temperature() {
      return this.vitals.bodyTemperature ? number(this.vitals.bodyTemperature, 1) : '&mdash;';
    }
  },
  methods: {
    openRecord(recordId) {
      this.$emit('close'); // needed for vitals history
      this.$router.push({
        name: 'patient-record',
        params: { patientId: this.$route.params.id, id: recordId }
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-vitals.scss";
</style>
