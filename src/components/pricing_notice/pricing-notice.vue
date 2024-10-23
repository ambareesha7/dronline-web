<template>
  <transition appear name="appear-from-top" mode="out-in">
    <div class="PricingNotic__wrapper" v-if="priceIsZero && pricingNoticeModalClosed && $route.name === 'dashboard'">
      <div class="PricingNotic__container" @click="redirectToProfileEdit">
        <div class="PricingNotic__text_wrapper">
            <div class="PricingNotic__content">
              <div>
                <div class="PricingNotic__title">
                  Update your pricing table
                  <img src="/static/images/circle-notice.png"/>
                </div>
                <div class="PricingNotic__desc">Online payments for appointments will be available soon. Please, add pricing for your services. If prices stay not updated your future appointments will be out of charge</div>
              </div>
              <div class="PricingNotic__arrow">
                <i class="icon-angle-right"></i>
              </div>
            </div>
        </div>
      </div>
    </div>
</transition>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import PricingNoticeModal from './pricing_notice_modal/pricing-notice-modal';

export default {
  name: 'PricingNotic',
  data() {
    return {
      priceIsZero: false,
      pricingNoticeModalClosed: null
    };
  },
  computed: {
      ...mapGetters('profile', ['status', 'categoriesPrices', 'pricingNoticeModal'])
  },
  methods: {
    ...mapActions('profile', ['fetchCategoriesPrices', 'checkProfileStatus']),
    ...mapMutations('profile', ['setPricingNoticeModal']),
    onClose() {
      localStorage.setItem('pricing-notice-modal-closed', JSON.stringify(true));
      this.init();
    },
    redirectToProfileEdit() {
      this.$router.push({ name: 'profile-edit' });
      setTimeout(function(){
        document.getElementById("profile-edit-pricing").scrollIntoView();
      }, 1000);
    },
    async init() {

      await this.checkProfileStatus();

      if(this.status && this.status.approvalStatus === 1) {
        return
      }

      await this.fetchCategoriesPrices();

      let prices = this.categoriesPrices, vm = this

      for (let index = 0; index < prices.length; index++) {
        if(!prices[index]['priceMinutes_15'] || prices[index]['priceMinutes_15'] === 0) {
          vm.priceIsZero = true 
        }
      }

      const pricingNoticeModalClosed = localStorage.getItem('pricing-notice-modal-closed');

      if(pricingNoticeModalClosed && this.priceIsZero) {
        this.setPricingNoticeModal(true)
      }

      if(pricingNoticeModalClosed) {
        this.pricingNoticeModalClosed = true
      } else {
        this.pricingNoticeModalClosed = false
      }

      if(this.priceIsZero && this.pricingNoticeModalClosed === false) {
        this.$modal.show(
          PricingNoticeModal,
          {
            onClose: this.onClose
          },
          {
            name: 'pricing-notice-modal',
            width: 434,
            height: 'auto',
            adaptive: true,
            clickToClose: false,
            transition: 'from-top-to-bottom'
          }
        );
      }
    }
  },
  beforeMount() {
    this.init();
  }
};
</script>
<style lang="scss">
.PricingNotic {
  &__wrapper {
    position: fixed;
    top: 80px;
    left: 207px;
    right: 0;
    z-index: 1001;
    width: 88%;
    background: #FFF8EE;
    transition: background-color .22s ease-in-out;
    padding: 16px 24px;
    transition: transform .22s ease-in-out;
    cursor: pointer;
  }

  &__container {
   display: flex;
  }

  &__text_wrapper {
    width: 100%;
  }

  &__content {
    display: flex;
    justify-content: space-between;
  }

  &__arrow {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    justify-content: center;
    i {
      font-size: 22px;
    }
  }

  &__title {
    color: #FFB244;
    font-size: 18px;
    font-weight: 600;
    img {
      height: 22px;
      width: 22px;
      vertical-align: bottom;
      margin-left: 6px;
    }
  }

  &__desc {
    color: #343434;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    margin-top: 10px;
  }
  
}
</style>
