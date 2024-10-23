<template>
  <div class="MembershipPackageSelect__wrapper">
    <div class="MembershipPackageSelect__header">
      <div class="MembershipPackageSelect__header-logo-container">
        <img
          src="/static/images/logo.png"
          class="MembershipPackageSelect__header-logo" />
      </div>

      <h2 class="MembershipPackageSelect__header-title">
        {{ $t('membership.select_new_plan') }}
      </h2>
      <i
        class="icon-close MembershipPackageSelect__header-close"
        @click="$emit('close')"></i>
    </div>

    <div class="MembershipPackageSelect__content">
      <h2 class="MembershipPackageSelect__trial-end-warning"
        v-if="(currentType === 'PLATINUM' && isTrialActive)">
        {{ $t('membership.purchase_will_end_trial') }}
      </h2>
      <div v-if="!isPaymentEnabled" class="badge-red MembershipPackageSelect__description-demo">
        {{ $t('membership.demo') }}
      </div>
      <div v-if="!isPaymentEnabled" class="MembershipPackageSelect__description-demo-text">
        You can change membership levels and see what they offer.
      </div>
      <div class="MembershipPackageSelect__packages">
        <div
          class="MembershipPackageSelect__package"
          v-for="(pkg, index) in packages"
          :key="index"
          :class="[
            pkg.type === currentType ? 'current' : null,
            pkg.type === selectedType ? 'selected' : null,
            pkg.type.toLowerCase()
          ]">
          <div class="MembershipPackageSelect__package-content">
            <div
              v-if="pkg.type === currentType"
              class="badge-gray MembershipPackageSelect__badge">
              {{ $t('membership.current_plan') }}
            </div>

            <div v-if="pkg.price > 0" class="MembershipPackageSelect__package-price-container">
              <div class="MembershipPackageSelect__package-price-currency">
                &dollar;
              </div>
              <i18n
                class="MembershipPackageSelect__package-price"
                path="membership.price_per_mo"
                tag="div">
                <div class="MembershipPackageSelect__package-price-value">
                  {{ pkg.price | number }}
                </div>
              </i18n>
            </div>
            <div v-else class="MembershipPackageSelect__package-price-container">
              <div class="MembershipPackageSelect__package-price-value">
                {{ $t('membership.price_free') }}
              </div>
            </div>

            <div class="MembershipPackageSelect__package-name">
              {{ pkg.name }}
            </div>
            <div class="MembershipPackageSelect__package-feature-list">
              <div
                class="MembershipPackageSelect__package-feature"
                v-for="(feature, f_index) in pkg.features"
                :key="f_index">
                <i class="icon-check-small MembershipPackageSelect__package-feature-icon"></i>
                <i18n
                  class="MembershipPackageSelect__package-feature-label"
                  :class="{ 'inherits': feature.bold }"
                  path="global.concatenate"
                  tag="div">
                  {{ feature.text }}
                  <i
                    v-if="feature.description"
                    class="icon-question-circle-o MembershipPackageSelect__package-feature-info"
                    v-tooltip.top="feature.description"></i>
                </i18n>
              </div>
            </div>
          </div>
          <div class="MembershipPackageSelect__package-actions">
            <btn
              v-if="!(pkg.type === 'PLATINUM' && isTrialActive)"
              class="MembershipPackageSelect__package-choose"
              @onclick="select(pkg)"
              btn-class="submit"
              :btn-label="
                pkg.type === currentType ?
                $t('global.choosen') :
                $t('authorisation.choose_to_buy')
              ">
            </btn>

            <!-- Trial is active -->
            <btn
              v-if="(pkg.type === 'PLATINUM' && isTrialActive)"
              class="MembershipPackageSelect__package-trial-to-paid-platinum"
              @onclick="select(pkg)"
              btn-class="submit"
              :btn-label="$t('authorisation.choose_to_buy')">
            </btn>
          </div>
        </div>
      </div>
      <div class="MembershipPackageSelect__description">
        <span class="MembershipPackageSelect__description-text-bold">
          {{ $t('membership.if_you_want_to_utilize') }}
        </span>
        <span class="MembershipPackageSelect__description-text">
          {{ $t('membership.each_plan_billed_monthly') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { number } from '@/utils/filters';
import MembershipPackageConfirmSubmitting from '@/components/membership/membership_package_confirm_submitting/membership-package-confirm-submitting';

const { mapGetters, mapActions } = createNamespacedHelpers('membership');

export default {
  name: 'MembershipPackageSelect',
  filters: {
    number
  },
  props: {
    onchange: {
      type: Function
    },
    isTrialActive: {
      type: Boolean
    }
  },
  data() {
    return {
      selected: null,
      processing: false
    };
  },
  computed: {
    ...mapGetters([
      'packages',
      'currentPackage',
      'isPaymentEnabled'
    ]),
    currentType() {
      return this.currentPackage ? this.currentPackage.type : null;
    },
    selectedType() {
      return this.selected ? this.selected.type : null;
    }
  },

  beforeMount() {
    this.init();
  },

  methods: {
    ...mapActions([
      'fetchCurrentPackage',
      'fetchSubscriptionStatus',
      'fetchPackages',
      'subscribe'
    ]),
    async init() {
      await this.fetchPackages();
      if (!this.currentPackage) await this.fetchCurrentPackage();
      this.selected = this.currentPackage;
      this.fetchSubscriptionStatus();
    },
    select(p) {
      this.selected = p;
      this.submit();
    },
    submit() {
      this.$modal.show(
        MembershipPackageConfirmSubmitting,
        {
          confirm: () => this.submitSubscribtion(this.selected.type),
          from: this.currentPackage,
          to: this.selected
        },
        {
          name: 'membership-package-confirm-submitting-modal',
          width: 470,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          clickToClose: false,
          transition: 'from-top-to-bottom'
        },
        {
          'before-close': () => {
            this.selected = this.currentPackage;
          }
        }
      );
    },
    redirect(url) {
      localStorage.setItem('payment_requester', 'membership');
      window.location.href = url;
    },
    submitSubscribtion(type) {
      this.processing = true;
      this.subscribe(type).then(({ redirectUrl, error }) => {
        if (redirectUrl) {
          this.redirect(redirectUrl);
        } else if (error) {
          this.error = error[Object.keys(error)[0]].message;
        } else {
          this.$emit('close');
        }
        this.processing = false;
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "membership-package-select-modal.scss";
</style>
