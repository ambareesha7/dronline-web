<template>
    <div class="PayoutsWithdrawalsHistory__wrapper">
        <div class="PayoutsWithdrawalsHistory__section">
          <div class="PayoutsWithdrawalsHistory__section-title">
            {{ $t('payouts.earned_this_month')}}
          </div>
          <div class="PayoutsWithdrawalsHistory__section-content">
            <ul class="PayoutsWithdrawalsHistory__list">
              <li class="PayoutsWithdrawalsHistory__list__item"
                v-for="withdrawal in pendingWithdrawals"
                :key="withdrawal.recordId">
                  <div class="PayoutsWithdrawalsHistory__list__item__date">
                    {{ $moment.unix(withdrawal.insertedAt) | moment("YYYY-MM-DD") }}
                  </div>
                  <div class="PayoutsWithdrawalsHistory__list__item__amount">
                    <span class="badge-green">${{ withdrawal.amount }}</span>
                  </div>
                  <i
                    class="icon-angle-right PayoutsWithdrawalsHistory__list__item__arrow">
                  </i>
              </li>
            </ul>
          </div>
          <div class="PayoutsWithdrawalsHistory__section-info">
            {{ $t('payouts.earned_this_month_info') }}
          </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('payouts');

export default {
  name: 'PayoutsWithdrawalsHistory',

  components: {},

  data() {
    return {

    };
  },
  mounted() {
    this.fetchPendingWithdrawals();
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
@import "payouts-withdrawals-history.scss";
</style>
