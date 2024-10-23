<template>
  <div class="PatientOnboarding__wrapper">
    <div class="PatientOnboarding__header">
      <div
        @click="cancel({name: 'dashboard'})"
        class="PatientOnboarding__header-logo-container ripple">
        <img
          src="/static/images/logo.png"
          class="PatientOnboarding__header-logo" />
      </div>

      <transition
        name="fade"
        mode="out-in">
        <div
          v-if="currentStep < 4"
          key="process"
          class="PatientOnboarding__process process">
          <div
            class="process-step"
            v-for="(step, index) in steps"
            :key="index"
            :class="{
            'active': currentStep === step.number,
            'inactive': currentStep > step.number}">
            <div class="process-step-number">
              {{ step.number }}
            </div>
            <div class="process-step-label">
              {{ step.label }}
            </div>
          </div>
        </div>
        <div
          v-else
          key="title"
          class="title PatientOnboarding__title">
          {{ $t('patients.add_patient_summary') }}
        </div>
      </transition>

      <div
        @click="cancel({name: 'emr'})"
        class="PatientOnboarding__header-close">
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
import PatientOnboardingStep1 from '@/components/patients/patients_new_patient/patient_onboarding/patient_onboarding_step_1/patient-onboarding-step-1';
import PatientOnboardingStep2 from '@/components/patients/patients_new_patient/patient_onboarding/patient_onboarding_step_2/patient-onboarding-step-2';
import PatientOnboardingStep3 from '@/components/patients/patients_new_patient/patient_onboarding/patient_onboarding_step_3/patient-onboarding-step-3';
import PatientOnboardingStep4 from '@/components/patients/patients_new_patient/patient_onboarding/patient_onboarding_step_4/patient-onboarding-step-4';
import PatientConfirmCancelationModal from '@/components/patients/patients_new_patient/patient_confirm_cancelation_modal/patient-confirm-cancelation-modal';

export default {
  name: 'PatientOnboarding',

  components: {
    PatientOnboardingStep1,
    PatientOnboardingStep2,
    PatientOnboardingStep3,
    PatientOnboardingStep4
  },

  data() {
    return {
      currentStep: 1,
      currentSection: null,
      steps: [
        { number: 1, label: this.$t('global.basic_info') },
        { number: 2, label: this.$t('profile.address_info') },
        { number: 3, label: this.$t('profile.medical_info') }
      ]
    };
  },

  computed: {
    componentName() {
      return `patient-onboarding-step-${this.currentStep}`;
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
.PatientOnboarding {
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
        cursor: pointer;
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

  &__title {
     padding: 28px 0;
  }

  &__process, &__title {
    transition: transform .16s ease-out, opacity .2s ease-out;
  }
}
</style>
