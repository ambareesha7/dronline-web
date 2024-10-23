
<template>
  <div class="PayoutsWithdrawalsSummary__wrapper">
    <div class="PayoutsWithdrawalsSummary__section">
      <div class="PayoutsWithdrawalsSummary__section-title">
          {{ $t('payouts.incoming_withdraw')}}
      </div>
      <div class="PayoutsWithdrawalsSummary__section-amount">
          <div class="PayoutsWithdrawalsSummary__section-amount__label">
            {{ $t('payouts.amount') }}
          </div>
          <div class="PayoutsWithdrawalsSummary__section-amount__value">
            ${{ withdrawalsSummary.incomingWithdraw }}
          </div>
      </div>
      <div class="PayoutsWithdrawalsSummary__section-info">
        {{ $t('payouts.incoming_withdraw_info', [daysTillWithdraw])}}
      </div>
    </div>
    <div class="PayoutsWithdrawalsSummary__section">
      <div class="PayoutsWithdrawalsSummary__section-title">
        {{ $t('payouts.earned_this_month')}}
      </div>
      <div class="PayoutsWithdrawalsSummary__section-amount">
        <div class="PayoutsWithdrawalsSummary__section-amount__label">
          {{ $t('payouts.amount') }}
        </div>
        <div class="PayoutsWithdrawalsSummary__section-amount__value">
          ${{ withdrawalsSummary.earnedThisMonth }}
        </div>
      </div>
      <div class="PayoutsWithdrawalsSummary__section-info">
        {{ $t('payouts.earned_this_month_info') }}
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('payouts');

export default {
  name: 'PayoutsWithdrawalsSummary',

  components: {},

  data() {
    return {

    };
  },

  mounted() {
    this.fetchWithdrawalsSummary();
  },
  computed: {
    ...mapGetters(['withdrawalsSummary']),
    daysTillWithdraw() {
      const monthEnd = this.$moment().endOf('month');
      const now = this.$moment();
      return monthEnd.diff(now, 'days');
    }
  },
  methods: {
    ...mapActions([
      'fetchWithdrawalsSummary'
    ])
  }
};
</script>

<style scoped lang="scss">
@import "payouts-withdrawals-summary.scss";
</style>
