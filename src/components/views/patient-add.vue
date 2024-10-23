<template>
  <div class="PatientAdd__wrapper">
    <div class="PatientAdd__header">
      <div
        @click="cancel({name: 'dashboard'})"
        class="PatientAdd__header-logo-container ripple">
        <img
          src="/static/images/logo.png"
          class="PatientAdd__header-logo" />
      </div>

      <div class="PatientAdd__process process">
        <div
          class="process-step"
          v-for="(step, index) in steps"
          :key="index"
          :class="{
            'active': currentStep === step.number,
            'inactive': currentStep > step.number
          }"
          :data-cy="`PatientCreate__step-${index + 1}`">
          <div class="process-step-number">
            {{ step.number }}
          </div>
          <div class="process-step-label">
            {{ step.label }}
          </div>
        </div>
      </div>
      <div
        @click="cancel({name: 'emr'})"
        class="PatientAdd__header-close"
        data-cy="PatientCreate__cancel-button">
        <i class="icon-close"></i>
      </div>
    </div>
    <transition
      name="fade"
      mode="out-in">
      <component
        :is="componentName"
        :key="componentName"
        @set-step="setStep">
      </component>
    </transition>
  </div>
</template>

<script>
import PatientCreateStep1 from '@/components/patients/patients_new_patient/patient_create/patient_create_step_1/patient-create-step-1';
import PatientCreateStep2 from '@/components/patients/patients_new_patient/patient_create/patient_create_step_2/patient-create-step-2';
import PatientConfirmCancelationModal from '@/components/patients/patients_new_patient/patient_confirm_cancelation_modal/patient-confirm-cancelation-modal';

export default {
  name: 'PatientAdd',

  components: {
    PatientCreateStep1,
    PatientCreateStep2
  },

  data() {
    return {
      currentStep: 1,
      steps: [
        { number: 1, label: this.$t('global.phone_number') },
        { number: 2, label: this.$t('global.verification_code') }
      ]
    };
  },

  computed: {
    componentName() {
      return `patient-create-step-${this.currentStep}`;
    }
  },

  mounted() {
    window.onbeforeunload = e => {
      if (!e) e = window.event;
      e.cancelBubble = true;
      e.returnValue = this.$t('patients.confirm_cencelation_title');
      if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
  },

  beforeDestroy() {
    window.onbeforeunload = null;
  },

  methods: {
    setStep(step) {
      this.currentStep = step;
    },
    cancel(state) {
      this.$modal.show(
        PatientConfirmCancelationModal,
        {
          confirm: () => this.$router.push(state)
        },
        {
          name: 'patient-confirm-cancelation-modal',
          width: 470,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          clickToClose: false,
          transition: 'from-top-to-bottom'
        }
      );
    }
  }
};
</script>

<style lang="scss">
.PatientAdd {
  &__wrapper {
    width: 100%;
    height: 100vh;
    background-color: #f9f9f9;
    transition: transform .16s ease-out, opacity .2s ease-out;
    position: absolute;
  }

  &__header {
    height: 80px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1001;
    top: 0;
    right: 0;
    left: 0;

    &-logo {
      height: 26px;
      &-container {
        position: absolute;
        left: 24px;
      }
    }

    &-close {
      color: #4a4a4a;
      cursor: pointer;
      font-size: 14px;
      position: absolute;
      right: 24px;
    }
  }

  &__process {
    width: 320px;
  }
}
</style>
