<template>
  <div class="Payouts__wrapper">
    <div class="Payouts__content content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <h3 class="title">
          {{ $t('payouts.payouts') }}
        </h3>

        <div class="Payouts__tabs">
          <tabs
              :tabs="[
                  {
                      key: 'summary',
                      label: 'payouts.withdrawals'
                  },
                  {
                      key: 'history',
                      label: 'payouts.history'
                  }
              ]"
              :active-tab="activeTab"
              @change="setActiveTab"
          />
        </div>

        <div class="Payouts__section">
          <div class="Payouts__section__credentials">
              <payouts-credentials />
          </div>

          <div class="Payouts__section__tab">
            <payouts-withdrawals :active-tab="activeTab" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tabs from '@/components/global/tabs/tabs';
import PayoutsCredentials from '@/components/payouts/payouts_credentials/payouts-credentials';
import PayoutsWithdrawals from '@/components/payouts/payouts_withdrawals/payouts-withdrawals';

export default {
  name: 'Visits',

  components: {
    Tabs,
    PayoutsCredentials,
    PayoutsWithdrawals
  },

  data() {
    return {
      activeTab: 'summary'
    };
  },

  methods: {
    setActiveTab(activeTab) {
      this.activeTab = activeTab;
    }
  },
  computed: {
    ...mapGetters('profile', ['status'])
  }
};
</script>

<style lang="scss">
.Payouts {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    min-height: 480px;
    border-radius: 4px;
    transition: opacity 0.2s ease-out;
    transition-delay: 0.4s;
  }

  &__section {
      display: flex;
      background: white;


    &__credentials {
        background-color: rgb(251, 253, 255);
    }

    &__credentials,
    &__tab {
        width: 50%;
        padding: 65px 40px;
    }
  }

  &__tabs {
    border-bottom: 1px solid rgb(245, 245, 245);
  }
}
</style>
