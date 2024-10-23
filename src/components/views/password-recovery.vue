<template>
  <div class="PasswordRecovery__wrapper">
    <div class="PasswordRecovery__col">
      <transition
        name="fade">
        <div
          :style="banner.style"
          :key="banner.key"
          class="PasswordRecovery__banner"></div>
      </transition>
    </div>
    <div class="PasswordRecovery__col">
      <transition
        appear
        name="slide-right-to-left"
        mode="out-in">
        <component
          :is="currentStep"
          :key="currentStep"
          @set-step="v => step = v"
          :password-recovery-token="password_recovery_token">
        </component>
      </transition>
    </div>
  </div>
</template>

<script>
import PasswordRecoveryStep1 from '@/components/authorisation/password_recovery/password_recovery_step_1/password-recovery-step-1';
import PasswordRecoveryStep2 from '@/components/authorisation/password_recovery/password_recovery_step_2/password-recovery-step-2';
import PasswordRecoveryStep3 from '@/components/authorisation/password_recovery/password_recovery_step_3/password-recovery-step-3';
import PasswordRecoveryStep4 from '@/components/authorisation/password_recovery/password_recovery_step_4/password-recovery-step-4';
import bannerSlideshow from '@/mixins/banner-slideshow';

export default {
  name: 'PasswordRecovery',

  mixins: [bannerSlideshow],

  components: {
    PasswordRecoveryStep1,
    PasswordRecoveryStep2,
    PasswordRecoveryStep3,
    PasswordRecoveryStep4
  },

  data() {
    return {
      step: null,
      password_recovery_token: null,
      banner_images_amount: 5,
      banner_image_template: 'banner-'
    };
  },

  computed: {
    currentStep() {
      return this.step ? `password-recovery-step-${this.step}` : false;
    }
  },

  mounted() {
    this.checkQuery();
  },

  methods: {
    checkQuery() {
      if (this.$route.params.password_recovery_token) {
        this.step = 3;
        this.password_recovery_token = this.$route.params.password_recovery_token;
        this.$router.replace({params: {password_recovery_token: null}});
      } else {
        this.step = 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.PasswordRecovery {
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
