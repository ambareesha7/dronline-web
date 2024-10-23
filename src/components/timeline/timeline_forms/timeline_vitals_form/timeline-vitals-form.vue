<template>
  <transition
    name="appear-from-bottom"
    appear>
    <div class="TimelineVitalsForm__wrapper">
      <div class="TimelineVitalsForm__header">
        <div class="TimelineVitalsForm__title">
          <i class="icon_vitals TimelineVitalsForm__title-icon"></i>
          {{ $t('call_room.provide_vitals') }}
        </div>
        <div
          class="TimelineVitalsForm__close"
          @click="close">
          <i class="icon-close"></i>
        </div>
      </div>

      <div class="TimelineVitalsForm__content custom-scrollbar-container">
        <div class="TimelineVitalsForm__section">
          <div class="TimelineVitalsForm__section-header">
            <div class="title-uppercase">
              {{ $t('patients.physical_exam') }}
            </div>
          </div>
          <div class="TimelineVitalsForm__section-content">
            <div class="form-row">
              <textarea
                :class="{
                  'is-danger': errors.has('physical_exam'),
                  'filled': form.physicalExam
                }"
                id="physical_exam"
                name="physical_exam"
                class="form-textarea"
                type="text"
                v-model="form.physicalExam"
                v-validate="'required|min:3|max:1000'"
                data-vv-delay="500"
                :data-vv-as="$t('patients.physical_exam')"
                ref="physical_exam"
                @keyup.enter="$refs.height.focus()">
              </textarea>
              <label
                for="physical_exam"
                class="form-label label-inner">
                {{ $t('global.description') }}
              </label>
              <span
                v-if="errors.has('physical_exam')"
                class="form-help is-danger">
                {{ errors.first('physical_exam') }}
              </span>
            </div>
          </div>
        </div>
        <div class="TimelineVitalsForm__section">
          <div class="TimelineVitalsForm__section-header">
            <div class="title-uppercase">
              {{ $t('health_info.bmi') }}
            </div>
          </div>
          <div class="TimelineVitalsForm__section-content">
            <div class="form-row--cols">
              <div class="form-col">
                <input
                  :class="{
                    'is-danger': errors.has('height'),
                    'filled': form.height.value
                  }"
                  id="height"
                  name="height"
                  class="form-field"
                  type="text"
                  v-model="form.height.value"
                  v-validate="'required|numeric'"
                  data-vv-delay="500"
                  :data-vv-as="$t('global.height')"
                  ref="height"
                  @keyup.enter="$refs.weight.focus()" />
                <label
                  for="height"
                  class="form-label label-inner">
                  {{ $t('global.height') }}
                </label>
                <span
                  v-show="errors.has('height')"
                  class="form-help is-danger">
                  {{ errors.first('height') }}
                </span>
              </div>
              <div class="form-col">
                <input
                  :class="{
                    'is-danger': errors.has('weight'),
                    'filled': form.weight.value
                  }"
                  id="weight"
                  name="weight"
                  class="form-field"
                  type="text"
                  v-model="form.weight.value"
                  v-validate="'required|numeric'"
                  data-vv-delay="500"
                  :data-vv-as="$t('global.weight')"
                  ref="weight"
                  @keyup.enter="$refs.systolic.focus()" />
                <label
                  for="weight"
                  class="form-label label-inner">
                  {{ $t('global.weight') }}
                </label>
                <span
                  v-show="errors.has('weight')"
                  class="form-help is-danger">
                  {{ errors.first('weight') }}
                </span>
              </div>
            </div>
            <div class="form-row">
              <div
                id="bmiResult"
                name="bmiResult"
                class="form-field filled"
                v-html="bmiResult">
              </div>
              <label
                for="weight"
                class="form-label label-inner">
                {{ $t('global.result') }}
              </label>
            </div>
          </div>
        </div>
        <div class="TimelineVitalsForm__section">
          <div class="TimelineVitalsForm__section-header">
            <div class="title-uppercase">
              {{ $t('health_info.blood_pressure') }}
            </div>
          </div>
          <div class="TimelineVitalsForm__section-content">
            <div class="form-row--cols">
              <div class="form-col">
                <input
                  :class="{
                    'is-danger': errors.has('systolic'),
                    'filled': form.bloodPressureSystolic
                  }"
                  id="systolic"
                  name="systolic"
                  class="form-field"
                  type="text"
                  v-model="form.bloodPressureSystolic"
                  v-validate="'required|numeric'"
                  data-vv-delay="500"
                  :data-vv-as="$t('health_info.systolic')"
                  ref="systolic"
                  @keyup.enter="$refs.diastolic.focus()" />
                <label
                  for="systolic"
                  class="form-label label-inner">
                  {{ $t('health_info.systolic') }}
                </label>
                <span
                  v-show="errors.has('systolic')"
                  class="form-help is-danger">
                  {{ errors.first('systolic') }}
                </span>
              </div>
              <div class="form-col">
                <input
                  :class="{
                    'is-danger': errors.has('diastolic'),
                    'filled': form.bloodPressureDiastolic
                  }"
                  id="diastolic"
                  name="diastolic"
                  class="form-field"
                  type="text"
                  v-model="form.bloodPressureDiastolic"
                  v-validate="'required|numeric'"
                  data-vv-delay="500"
                  :data-vv-as="$t('health_info.diastolic')"
                  ref="diastolic"
                  @keyup.enter="$refs.pulse.focus()" />
                <label
                  for="diastolic"
                  class="form-label label-inner">
                  {{ $t('health_info.diastolic') }}
                </label>
                <span
                  v-show="errors.has('diastolic')"
                  class="form-help is-danger">
                  {{ errors.first('diastolic') }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="TimelineVitalsForm__section">
          <div class="TimelineVitalsForm__section-header">
            <div class="title-uppercase">
              {{ $t('health_info.heart_rate') }}
            </div>
          </div>
          <div class="TimelineVitalsForm__section-content">
            <div class="form-row">
              <input
                :class="{
                  'is-danger': errors.has('pulse'),
                  'filled': form.pulse
                }"
                id="pulse"
                name="pulse"
                class="form-field"
                type="text"
                v-model="form.pulse"
                v-validate="'required|numeric'"
                data-vv-delay="500"
                :data-vv-as="$t('health_info.pulse')"
                ref="pulse"
                @keyup.enter="$refs.respiratory_rate.focus()" />
              <label
                for="pulse"
                class="form-label label-inner">
                {{ $t('health_info.pulse') }}
              </label>
              <span
                v-show="errors.has('pulse')"
                class="form-help is-danger">
                {{ errors.first('pulse') }}
              </span>
            </div>
          </div>
        </div>
        <div class="TimelineVitalsForm__section">
          <div class="TimelineVitalsForm__section-header">
            <div class="title-uppercase">
              {{ $t('health_info.respiratory_rate') }}
            </div>
          </div>
          <div class="TimelineVitalsForm__section-content">
            <div class="form-row">
              <input
                :class="{
                  'is-danger': errors.has('respiratory_rate'),
                  'filled': form.respiratoryRate
                }"
                id="respiratory_rate"
                name="respiratory_rate"
                class="form-field"
                type="text"
                v-model="form.respiratoryRate"
                v-validate="'required|numeric'"
                data-vv-delay="500"
                :data-vv-as="$t('health_info.respiratory_rate')"
                ref="respiratory_rate"
                @keyup.enter="$refs.temperature.focus()" />
              <label
                for="respiratory_rate"
                class="form-label label-inner">
                {{ $t('health_info.breaths_min') }}
              </label>
              <span
                v-show="errors.has('respiratory_rate')"
                class="form-help is-danger">
                {{ errors.first('respiratory_rate') }}
              </span>
            </div>
          </div>
        </div>
        <div class="TimelineVitalsForm__section">
          <div class="TimelineVitalsForm__section-header">
            <div class="title-uppercase">
              {{ $t('health_info.temperature') }}
            </div>
          </div>
          <div class="TimelineVitalsForm__section-content">
            <div class="form-row">
              <input
                :class="{
                  'is-danger': errors.has('temperature'),
                  'filled': form.bodyTemperature
                }"
                id="temperature"
                name="temperature"
                class="form-field"
                type="text"
                v-model="form.bodyTemperature"
                v-validate="'required|decimal:1'"
                data-vv-delay="500"
                :data-vv-as="$t('health_info.temperature')"
                ref="temperature" />
              <label
                for="temperature"
                class="form-label label-inner">
                {{ $t('health_info.body_heat_celsium') }}
              </label>
              <span
                v-show="errors.has('temperature')"
                class="form-help is-danger">
                {{ errors.first('temperature') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="TimelineVitalsForm__footer">
        <div
          v-if="error"
          class="form-help is-danger TimelineVitalsForm__footer-error">
          {{ error }}
        </div>
        <div
          class="form-actions TimelineVitalsForm__footer-actions"
          :class="{ invalidate: processing }">
          <btn
            @onclick="close"
            btn-class="cancel"
            class="TimelineVitalsForm__cancel"
            :btn-label="$t('global.cancel')">
          </btn>

          <btn
            @onclick="submit"
            btn-class="blue-filled"
            class="TimelineVitalsForm__submit"
            :btn-label="$t('global.provide')">
          </btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { charsLeft, number } from '@/utils/filters';
import TimelineVitalsFormConfirmModal from './timeline_vitals_form_confirm_modal/timeline-vitals-form-confirm-modal';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patientTimeline');

export default {
  name: 'TimelineVitalsForm',

  props: {
    patientId: {
      required: true
    }
  },

  filters: {
    charsLeft
  },

  data() {
    return {
      form: {
        height: {},
        weight: {},
        bloodPressureSystolic: null,
        bloodPressureDiastolic: null,
        pulse: null,
        respiratoryRate: null,
        bodyTemperature: null,
        physicalExam: null
      },
      processing: false,
      error: null
    };
  },

  computed: {
    ...mapGetters([
      'recordId'
    ]),
    bmiResult() {
      const w = this.form.weight.value || 0;
      const h = (this.form.height.value || 0) / 100;
      const result = (w && h) ? w / (h ** 2) : 0;
      return number(result, 2);
    }
  },

  methods: {
    ...mapActions([
      'provideVitals'
    ]),
    ...mapMutations([
      'setOpenedForm'
    ]),

    close() {
      this.setOpenedForm(null);
    },

    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.$modal.show(
            TimelineVitalsFormConfirmModal,
            {
              confirm: async () => {
                const { error } = await this.provideVitals({
                  patientId: this.patientId,
                  recordId: this.recordId,
                  vitalsParams: this.form
                });
                this.processing = false;
                if (error) {
                  this.error = error;
                } else {
                  this.close();
                  this.$toastr.s('Vitals successfully provided.');
                }
              }
            },
            {
              name: 'timeline-vitals-form-confirm-modal',
              width: 470,
              height: 'auto',
              pivotY: 0.3,
              adaptive: true,
              clickToClose: false,
              transition: 'from-top-to-bottom'
            },
            {
              'before-close': () => {
                this.processing = false;
              }
            }
          );
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "timeline-vitals-form.scss";
</style>
