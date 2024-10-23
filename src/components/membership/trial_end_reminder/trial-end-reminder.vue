<template>
  <div v-show="trialEndDate && !neverShowAgain" class="TrialEndReminder__container">
    <span>
      <span>{{ $t('membership.trial_end_reminder_1', [trialEndDate]) }}</span>
      <router-link
          class="TrialEndReminder__link"
          :to="{ name: 'membership' }">
          {{ $t('membership.membership') }}
      </router-link>
      <span>{{ $t('membership.trial_end_reminder_2') }}</span>
    </span>
    <btn
        @onclick="hide()"
        btn-class="blue"
        :btn-label="$t('membership.hide_trial_end_reminder')">
    </btn>
  </div>
</template>

<script>
import api from '@/api';
import { encode, decode } from '@/utils/proto';

export default {
  name: 'TrialEndReminder',
  data() {
    return {
      trialEndDate: null,
      neverShowAgain: false
    };
  },
  methods: {
    async setTrialState() {
      const data = await api.checkProfileStatus();
      const { status: {trialEndsAt} } = decode('specialist_profile.GetStatusResponse', data);

      const isTrialActive = trialEndsAt > this.$moment().unix();

      if (isTrialActive) {
        const diff = trialEndsAt - this.$moment().unix();
        const daysDiff = parseInt(this.$moment.duration(diff, 'seconds').asDays(), 10);
        if (daysDiff < 7) {
          this.trialEndDate = this.$moment.unix(trialEndsAt).format('YYYY-MM-DD');
        }
      }
    },
    checkHide() {
      this.neverShowAgain = !!localStorage.getItem('hide-trial-end-reminder');
    },
    hide() {
      localStorage.setItem('hide-trial-end-reminder', 'yes');
      this.checkHide();
    }
  },
  beforeMount() {
    this.setTrialState();
    this.checkHide();
  }
};
</script>

<style lang="scss">
  @import 'trial-end-reminder.scss';
</style>
