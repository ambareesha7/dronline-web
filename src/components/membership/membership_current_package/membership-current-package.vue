<template>
  <div class="MembershipCurrentPackage__wrapper">
    <transition-group
      appear
      name="fade"
      v-if="currentPackage"
      class="MembershipCurrentPackage__content">
      <div
        class="MembershipCurrentPackage__col shaded-outline"
        key="left"
        :class="currentPackageClass">
        <div v-if="isTrialActive && currentPackage.type === 'PLATINUM'"
          class="MembershipCurrentPackage__trial-status-info">
          {{ trialStatusInfo }}
        </div>
        <div class="MembershipCurrentPackage__package-title">
          {{ currentPackage.name }}
        </div>
        <div class="MembershipCurrentPackage__package-price-container">
          <div class="MembershipCurrentPackage__package-price-currency">
            &dollar;
          </div>
          <i18n
            class="MembershipCurrentPackage__package-price"
            path="membership.price_per_mo"
            tag="div">
            <div class="MembershipCurrentPackage__package-price-value">
              {{ currentPackage.price | number }}
            </div>
          </i18n>
        </div>

        <div
          v-if="!isPaymentEnabled"
          class="MembershipCurrentPackage__info">
          <div class="MembershipCurrentPackage__info-description">
            {{ $t('membership.demo_plan_description') }}
          </div>
        </div>
        <!-- <div
          v-if="isPaymentEnabled && isBasic"
          class="MembershipCurrentPackage__info">
          <div class="MembershipCurrentPackage__info-description">
            {{ $t('membership.basic_plan_description') }}
          </div>
        </div> -->
        <div
          v-else
          class="MembershipCurrentPackage__info">
          <div class="MembershipCurrentPackage__info-title">
            {{ $t('membership.next_billing_period') }}
          </div>
          <div class="MembershipCurrentPackage__info-date">
            {{ nextBillingPeriodDate }}
          </div>
          <div
            class="MembershipCurrentPackage__info-description"
            v-html="nextBillingPeriodText">
          </div>
        </div>
        <div class="MembershipCurrentPackage__actions">
          <btn
            class="MembershipCurrentPackage__actions-change"
            @onclick="selectPackage"
            btn-class="white"
            :btn-label="actionLabel">
          </btn>
        </div>
      </div>
      <div
        class="MembershipCurrentPackage__col shaded-outline"
        key="right">
        <div class="MembershipCurrentPackage__package-features-title">
          {{ $t('membership.features') }}
        </div>
        <div class="MembershipCurrentPackage__package-features-list">
          <div
            class="MembershipCurrentPackage__package-feature"
            v-for="(feature, f_index) in currentPackage.features"
            :key="f_index">
            <i class="icon-check-small MembershipCurrentPackage__package-feature-icon"></i>
            <i18n
              class="MembershipCurrentPackage__package-feature-label"
              :class="{ 'inherits': feature.bold }"
              path="global.concatenate"
              tag="div">
              {{ feature.text }}
              <i
                v-if="feature.description"
                class="icon-question-circle-o MembershipCurrentPackage__package-feature-info"
                v-tooltip.top="feature.description"></i>
            </i18n>
          </div>
        </div>
      </div>
    </transition-group>
    <div
      v-else
      class="MembershipCurrentPackage__initializing">
      <spinner></spinner>
    </div>
    <transition
      appear
      name="appear-from-top"
      mode="out-in">
      <div
        v-if="changed"
        class="MembershipCurrentPackage__package-changed">
        {{ $t('membership.plan_has_been_changed') }}
        <i
          class="icon-close MembershipCurrentPackage__package-changed-close"
          @click="changed = false"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '@/api';
import { encode, decode } from '@/utils/proto';
import { createNamespacedHelpers } from 'vuex';
import { number } from '@/utils/filters';
import MembershipPackageSelectModal from '@/components/membership/membership_package_select_modal/membership-package-select-modal';
import { MEMBERSHIP_PLANS_NAMES } from '@/constants';

const { mapActions, mapGetters } = createNamespacedHelpers('membership');

export default {
  name: 'MembershipCurrentPackage',
  data() {
    return {
      changed: false,
      trialStatusInfo: '',
      isTrialActive: false
    };
  },
  filters: {
    number
  },
  computed: {
    ...mapGetters([
      'currentPackage',
      'packageExpirationDate',
      'nextPackage',
      'isPaymentEnabled'
    ]),
    isBasic() {
      return this.currentPackage.type === 'BASIC';
    },
    actionLabel() {
      return this.$t(`global.${this.isBasic ? 'upgrade' : 'change'}`);
    },
    currentPackageClass() {
      return this.currentPackage.type.toLowerCase();
    },
    nextBillingPeriodDate() {
      return this.$moment(((this.packageExpirationDate || {}).timestamp || 0) * 1000)
        .format('YYYY/MM/DD');
    },
    nextBillingPeriodText() {
      return this.nextPackage ?
        this.$t('membership.package_would_be_changed', [this.nextPackage.name, this.nextBillingPeriodDate]) :
        this.$t('membership.current_plan_ends', [this.nextBillingPeriodDate]);
    }
  },

  async mounted() {
    await this.fetchCurrentPackage();
    this.setTrialState();
    this.checkQuery();
  },

  methods: {
    ...mapActions([
      'fetchCurrentPackage',
      'verify'
    ]),

    selectPackage() {
      this.$modal.show(
        MembershipPackageSelectModal,
        {
          isTrialActive: this.isTrialActive
        },
        {
          name: 'membership-package-select-modal',
          width: '100%',
          height: '100%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        }
      );
    },
    async setTrialState() {
      const data = await api.checkProfileStatus();
      const { status: {trialEndsAt} } = decode('specialist_profile.GetStatusResponse', data);

      this.isTrialActive = trialEndsAt > this.$moment().unix();
      if (this.isTrialActive) {
        const diff = trialEndsAt - this.$moment().unix();
        const daysDiff = parseInt(this.$moment.duration(diff, 'seconds').asDays(), 10);
        this.trialStatusInfo = this.$t('membership.trial_days_left', [daysDiff]);
      }
    },
    async checkQuery() {
      if (this.$route.query.orderId) {
        await this.verify(this.$route.query.orderId);
        await this.fetchCurrentPackage();
        this.$router.replace({query: null});
        this.changed = true;
        setTimeout(() => {
          this.changed = false;
        }, 2000);
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "membership-current-package.scss";
</style>
