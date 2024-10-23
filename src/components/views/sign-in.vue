<template>
  <div class="SignIn__wrapper">
    <div class="SignIn__col">
      <transition
        name="fade">
        <div
          :style="banner.style"
          :key="banner.key"
          class="SignIn__banner"></div>
      </transition>
    </div>
    <div class="SignIn__col">
      <transition
        appear
        name="appear-from-right"
        mode="out-in">
        <sign-in-form></sign-in-form>
      </transition>
    </div>
  </div>
</template>

<script>
import bannerSlideshow from '@/mixins/banner-slideshow';
import SignInForm from '@/components/authorisation/sign_in_form/sign-in-form';

export default {
  name: 'SignIn',

  mixins: [bannerSlideshow],

  data() {
    return {
      banner_images_amount: 5,
      banner_image_template: 'banner-'
    };
  },

  components: {
    SignInForm
  }
};
</script>

<style lang="scss" scoped>
.SignIn {
  &__wrapper {
    display: flex;
    padding: 40px 30px;
    background: #EFF7FF;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__col {
    width: 50%;
    min-height: 90vh;

    &:nth-child(1) {
      position: relative;
      overflow: hidden;
    }

    &:nth-child(2) {
      background-color: #fff;
      min-width: 370px;
      display: flex;
    }
  }

  &__banner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    // background-size: cover;
    background-size: contain;
    background-position: center;
    transition: opacity 2s ease-in-out;
  }
}
</style>
