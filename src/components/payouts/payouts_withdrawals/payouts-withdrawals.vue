<template>
  <div class="PayoutsWithdrawals__wrapper">
    <payouts-withdrawals-summary v-if="activeTab === 'summary'" />
    <payouts-withdrawals-history v-if="activeTab === 'history'" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PayoutsWithdrawalsSummary from '@/components/payouts/payouts_withdrawals/payouts_withdrawals_summary/payouts-withdrawals-summary';
import PayoutsWithdrawalsHistory from '@/components/payouts/payouts_withdrawals/payouts_withdrawals_history/payouts-withdrawals-history';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('payouts');

export default {
  name: 'PayoutsWithdrawals',

  props: {
    activeTab: {
      required: true,
      type: String,
      validator: value => ['summary', 'history'].includes(value)
    }
  },

  components: {
    PayoutsWithdrawalsSummary,
    PayoutsWithdrawalsHistory
  },

  data() {
    return {

    };
  },

  computed: {
    ...mapGetters(['pendingWithdrawals'])
  },
  methods: {
    ...mapActions([
      'fetchPendingWithdrawals'
    ])
  }
};
</script>

<style scoped lang="scss">
@import "payouts-withdrawals.scss";
</style>
