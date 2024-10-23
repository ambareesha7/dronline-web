<template>
  <div class="TimelineEntityVitals__wrapper">

    <div class="TimelineEntityVitals__header">
      <div class="TimelineEntityVitals__header-col">
        <div
          v-if="entity.specialist"
          class="TimelineEntityVitals__specialist-card">
          <div
            class="TimelineEntityVitals__specialist-card-avatar"
            :style="specialistAvatar">
          </div>
          <div class="TimelineEntityVitals__specialist-card-info">
            <div class="TimelineEntityVitals__specialist-card-name">
              {{ entity.specialist.firstName }} {{ entity.specialist.lastName }}
            </div>
            <div class="TimelineEntityVitals__specialist-card-role">
              {{ specialistRole }}
            </div>
          </div>
        </div>
      </div>
      <div class="TimelineEntityVitals__header-col">
        <div class="TimelineEntityVitals__title">
          {{ $t('call_room.provided_vitals') }}
        </div>
        <div class="TimelineEntityVitals__time">
          {{ entity.timestamp | moment('YYYY/MM/DD hh:mm A') }}
        </div>
      </div>
    </div>

    <div class="TimelineEntityVitals__content">
      <div class="TimelineEntityVitals__section">
        <div class="title-uppercase">
          {{ $t('patients.physical_exam') }}
        </div>
        <div class="form-row TimelineEntityVitals__value">
          {{ entity.vitals.physicalExam }}
        </div>
      </div>
      <div class="TimelineEntityVitals__section">
        <div class="title-uppercase">
          {{ $t('health_info.bmi') }}
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityVitals__label">
            {{ $t('global.height') }}
          </div>
          <div class="form-col TimelineEntityVitals__value">
            {{ entity.vitals.height.value }}
          </div>
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityVitals__label">
            {{ $t('global.weight') }}
          </div>
          <div class="form-col TimelineEntityVitals__value">
            {{ entity.vitals.weight.value }}
          </div>
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityVitals__label">
            {{ $t('global.result') }}
          </div>
          <div
            class="form-col TimelineEntityVitals__value"
            v-html="bmiResult"></div>
        </div>
      </div>
      <div class="TimelineEntityVitals__section">
        <div class="title-uppercase">
          {{ $t('health_info.blood_pressure') }}
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityVitals__label">
            {{ $t('health_info.systolic') }}
          </div>
          <div class="form-col TimelineEntityVitals__value">
            {{ entity.vitals.bloodPressureSystolic }}
          </div>
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityVitals__label">
            {{ $t('health_info.diastolic') }}
          </div>
          <div class="form-col TimelineEntityVitals__value">
            {{ entity.vitals.bloodPressureDiastolic }}
          </div>
        </div>
      </div>
      <div class="TimelineEntityVitals__section">
        <div class="title-uppercase">
          {{ $t('health_info.heart_rate') }}
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityVitals__label">
            {{ $t('health_info.pulse') }}
          </div>
          <div class="form-col TimelineEntityVitals__value">
            {{ entity.vitals.pulse }}
          </div>
        </div>
      </div>
      <div class="TimelineEntityVitals__section">
        <div class="title-uppercase">
          {{ $t('health_info.respiratory_rate') }}
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityVitals__label">
            {{ $t('health_info.breaths_min') }}
          </div>
          <div class="form-col TimelineEntityVitals__value">
            {{ entity.vitals.respiratoryRate }}
          </div>
        </div>
      </div>
      <div class="TimelineEntityVitals__section">
        <div class="title-uppercase">
          {{ $t('health_info.temperature') }}
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityVitals__label">
            {{ $t('health_info.body_heat_celsium') }}
          </div>
          <div class="form-col TimelineEntityVitals__value">
            {{ entity.vitals.bodyTemperature | number(1) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { USER_ROLE } from '@/constants';
import { number } from '@/utils/filters';

export default {
  name: 'TimelineEntityVitals',
  props: {
    entity: {
      required: true,
      type: Object
    }
  },
  filters: {
    number
  },
  computed: {
    specialistRole() {
      return this.$t(`user_roles.${USER_ROLE[this.entity.specialist.type]}`);
    },
    specialistAvatar() {
      return {'background-image': `url(${this.entity.specialist.avatarUrl})`};
    },
    bmiResult() {
      const w = this.entity.vitals.weight.value || 0;
      const h = (this.entity.vitals.height.value || 0) / 100;
      return (w && h) ? number(w / (h ** 2), 2) : '&mdash;';
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-vitals.scss";
</style>
