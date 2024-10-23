<template>
  <div class="RegistrationStep8__wrapper">
    <div class="RegistrationStep8__col">
      <transition name="fade">
        <div class="RegistrationStep8__banner"></div>
      </transition>
    </div>
    <div class="RegistrationStep8__col">
      <transition
        appear
        name="appear-from-right"
        mode="out-in">
        <div class="PasswordRecoveryStep7__wrapper">
          <div class="PasswordRecoveryStep7__header">
            <router-link
              :to="{ name: 'dashboard' }"
              class="PasswordRecoveryStep7__header-logo-container"
              data-cy="PasswordRecovery__home-link">
              <img
                src="/static/images/logo.png"
                class="PasswordRecoveryStep7__header-logo" />
            </router-link>
          </div>

          <div class="PasswordRecoveryStep7__content">
            <div class="title PasswordRecoveryStep7__title">
              Your account has been registered 
            </div>
            <div class="form-description PasswordRecoveryStep7__description">
              We must verify your account. It might take up to 3 working days. You will be informed after we process your application.
            </div>

            <div class="form-actions full">
              <btn
                @onclick="end"
                btn-class="submit"
                btn-label="Finish">
              </btn>
            </div>
          </div>
        </div>

      </transition>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapMutations, mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'RegistrationStep8',

  computed: {
    ...mapGetters(['registrationComplete']),
  },

  methods: {
    ...mapActions(['checkProfileStatus']),
    async end() {
      await this.checkProfileStatus();

      this.$router.push({ name: 'dashboard' });
    },
    ...mapMutations([
      'setRegistrationComplete'
    ]),
  },

  beforeMount() {
    if(!this.registrationComplete) {
      this.$router.push({ name: 'dashboard' });
    }
  },
  beforeDestroy() {
    this.setRegistrationComplete(false)
  }
};
</script>

<style scoped lang="scss">
@import "registration-step-8.scss";
</style>
