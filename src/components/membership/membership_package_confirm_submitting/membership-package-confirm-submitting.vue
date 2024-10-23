<template>
  <div class="MembershipPackageConfirmSubmitting__wrapper">
    <div class="MembershipPackageConfirmSubmitting__header">
      <div v-if="!isPaymentEnabled" class="badge-red">
        {{ $t('membership.demo') }}
      </div>
      <div class="MembershipPackageConfirmSubmitting__header-icon">
        &dollar;
      </div>
    </div>
    <div class="MembershipPackageConfirmSubmitting__content">
      <div class="MembershipPackageConfirmSubmitting__title">
        {{ $t('membership.confirm_submitting') }}
      </div>

      <div class="MembershipPackageConfirmSubmitting__description">
        <div>
          {{ $t('membership.confirm_submitting_description') }}
        </div>
        <i18n
          class="MembershipPackageConfirmSubmitting__description-transition"
          path="membership.to_divider"
          tag="div">
          <i18n
            class="MembershipPackageConfirmSubmitting__from-plan"
            path="global.concatenate"
            tag="div">
            {{ from.name }}
            <div class="MembershipPackageConfirmSubmitting__from-plan-price-container">
              &#40;
              <div
                class="MembershipPackageConfirmSubmitting__from-plan-price-currency"
                v-html="from.currency"></div>
              <i18n
                class="MembershipPackageConfirmSubmitting__from-plan-price"
                path="membership.price_per_mo"
                tag="div">
                <div class="MembershipPackageConfirmSubmitting__from-plan-price-value">
                  {{ from.price }}
                </div>
              </i18n>
              &#41;
            </div>
          </i18n>
          <i18n
            class="MembershipPackageConfirmSubmitting__to-plan"
            path="global.concatenate"
            tag="div">
            {{ to.name }}
            <div class="MembershipPackageConfirmSubmitting__to-plan-price-container">
              &#40;
              <div
                class="MembershipPackageConfirmSubmitting__to-plan-price-currency"
                v-html="to.currency"></div>
              <i18n
                class="MembershipPackageConfirmSubmitting__to-plan-price"
                path="membership.price_per_mo"
                tag="div">
                <div class="MembershipPackageConfirmSubmitting__to-plan-price-value">
                  {{ to.price }}
                </div>
              </i18n>
              &#41;
            </div>
          </i18n>
        </i18n>
        <div class="MembershipPackageConfirmSubmitting__description-next-billing">
          {{ nextBilling }}
        </div>
      </div>
      <div class="MembershipPackageConfirmSubmitting__footer form-actions full">
        <btn
          class="MembershipPackageConfirmSubmitting__cancel"
          @onclick="hide"
          btn-class="blue"
          :btn-label="$t('global.no_cancel')">
        </btn>
        <btn
          class="MembershipPackageConfirmSubmitting__confirm"
          @onclick="submit"
          btn-class="green"
          :btn-label="$t('global.yes_confirm')">
        </btn>
      </div>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('membership');

export default {
  name: 'MembershipPackageConfirmSubmitting',

  props: {
    from: {
      required: true,
      type: Object
    },
    to: {
      required: true,
      type: Object
    },
    confirm: {
      required: true,
      type: Function
    }
  },

  computed: {
    ...mapGetters([
      'isPaymentEnabled'
    ]),
    nextBilling() {
      return this.$moment().add(1, 'month').startOf('month').format('YYYY/MM/DD hh:mm A');
    }
  },

  methods: {
    hide() {
      this.$modal.hide('membership-package-confirm-submitting-modal');
    },
    submit() {
      if (this.isPaymentEnabled) {
        this.confirm();
      }
      this.hide();
    }
  }
};
</script>
<style scoped lang="scss">
@import "membership-package-confirm-submitting.scss";
</style>
