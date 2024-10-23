<template>
  <div class="SignUp__wrapper">
    <div class="SignUp__col">
      <transition
        name="fade">
        <div
          :style="banner.style"
          :key="banner.key"
          class="SignUp__banner"></div>
      </transition>
    </div>
    <div class="SignUp__col">
      <transition
        appear
        name="appear-from-right"
        mode="out-in">
        <sign-up-form-specialist
          v-if="step === 1 && signUpType != 'hospital-or-clinic'"
          key="form"
          @onsubmit="setStep(2)">
        </sign-up-form-specialist>
        <sign-up-form-hospital
          v-if="step === 1 && signUpType == 'hospital-or-clinic'"
          key="form"
          @onsubmit="setStep(2)">
        </sign-up-form-hospital>
        <check-confirmation-email
          v-else-if="step === 2"
          key="confirmation">
        </check-confirmation-email>
      </transition>
    </div>
  </div>
</template>

<script>
import bannerSlideshow from '@/mixins/banner-slideshow';
import SignUpFormSpecialist from '@/components/authorisation/sign_up_form/sign-up-form-specialist';
import SignUpFormHospital from '@/components/authorisation/sign_up_form/sign-up-form-hospital';
import CheckConfirmationEmail from '@/components/authorisation/check_confirmation_email/check-confirmation-email';

export default {
  name: 'SignUp',

  mixins: [bannerSlideshow],

  components: {
    SignUpFormSpecialist,
    SignUpFormHospital,
    CheckConfirmationEmail
  },

  data() {
    return {
      step: 1,
      banner_images_amount: 5,
      banner_image_template: 'banner-'
    };
  },

  computed: {
    signUpType() {
      return this.$route.query.type;
    }
  },

  methods: {
    setStep(step) {
      this.step = step;
    }
  }
};
</script>

<style lang="scss" scoped>
.SignUp {
  &__wrapper {
    display: flex;
    padding: 40px 30px;
    background: #EFF7FF;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__col {
    width: 50%;
    min-height: 90vh;

    &:nth-child(1) {
       position: relative;
       overflow: hidden;
    }

    &:nth-child(2) {
      background-color: #fff;
      min-width: 370px;
      display: flex;
    }
  }

  &__banner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    // background-size: cover;
    background-size: contain;
    background-position: center;
    transition: opacity 2s ease-in-out;
  }
}

</style>
