<template>
  <div class="Registration__wrapper">
    <div
      class="content Registration__content">
      <transition
        appear
        name="slide-right-to-left"
        mode="out-in">
        <component
          :is="currentStep"
          :key="currentStep">
        </component>
      </transition>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import RegistrationStep1 from '@/components/authorisation/registration/registration_step_1/registration-step-1';
import RegistrationStep2 from '@/components/authorisation/registration/registration_step_2/registration-step-2';
import RegistrationStep3 from '@/components/authorisation/registration/registration_step_3/registration-step-3';
import RegistrationStep4 from '@/components/authorisation/registration/registration_step_4/registration-step-4';
import RegistrationStep5 from '@/components/authorisation/registration/registration_step_5/registration-step-5';
import RegistrationStep6 from '@/components/authorisation/registration/registration_step_6/registration-step-6';
import RegistrationStep7 from '@/components/authorisation/registration/registration_step_7/registration-step-7';

const { mapGetters, mapMutations } = createNamespacedHelpers('profile');
export default {
  name: 'Registration',

  components: {
    RegistrationStep1,
    RegistrationStep2,
    RegistrationStep3,
    RegistrationStep4,
    RegistrationStep5,
    RegistrationStep6,
    RegistrationStep7
  },

  computed: {
    ...mapGetters(['registrationStep']),
    currentStep() {
      return this.registrationStep ? `registration-step-${this.registrationStep}` : false;
    }
  },

  mounted() {
    this.setRegistrationStep(1); 
  },

  beforeDestroy() {
    localStorage.removeItem('registration-location');
    localStorage.removeItem('registration-medical-categories');
    localStorage.removeItem('registration-medical-credentials');
  },

  methods: {
    ...mapMutations(['setRegistrationStep'])
  }
};
</script>

<style lang="scss" scoped>
.Registration {
  &__wrapper {
    background: #EFF7FF;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    z-index: 1;
  }

}
</style>
