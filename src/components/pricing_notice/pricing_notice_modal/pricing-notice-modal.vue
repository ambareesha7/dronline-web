<template>
    <div class="PricingNotice__wrapper">
      <div class="PricingNotice__header">
        <i class="icon-close PricingNotice__header-close" @click="close"></i>
      </div>
  
      <div class="PricingNotice__content">

        <img src="/static/images/circle-notice.png"/>

        <h2 class="PricingNotice__description-one">
            Online payments for appointments will be available soon. Please, add pricing for your services. 
        </h2>

        <div class="PricingNotice__description-two">
            If prices stay not updated your future appointments will be out of charge
        </div>

        <div class="PricingNotice__footer-actions">
            <btn @onclick="updatePricing" class="PricingNotice__footer-update-your-pricing-now" btn-class="submit" :btn-label="$t('global.update_your_pricing_now')"></btn>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PricingNotice',
    props: {
        onClose: {
            type: Function
        }
    },
    methods: {
        updatePricing() {
            this.$emit('close');
            this.onClose();
            localStorage.setItem('pricing-notice-modal-closed', JSON.stringify(true));
            this.$router.push({ name: 'profile-edit' });
            setTimeout(function(){
                document.getElementById("profile-edit-pricing").scrollIntoView();
            }, 1000);
        },
        close() {
            this.$emit('close');
            this.onClose();
        },
    }
  };
  </script>
  <style scoped lang="scss">
  @import "pricing-notice-modal.scss";
  </style>
  