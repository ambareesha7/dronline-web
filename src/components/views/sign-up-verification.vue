<template>
  <div class="SignUpVerification__wrapper">
    <div class="SignUpVerification__wrapper">
      <div class="SignUpVerification__col">
        <transition
          name="fade">
          <div
            :style="banner.style"
            :key="banner.key"
            class="SignUpVerification__banner"></div>
        </transition>
      </div>
      <div class="SignUpVerification__col">
        <spinner></spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import bannerSlideshow from '@/mixins/banner-slideshow';

const { mapActions } = createNamespacedHelpers('oauth');
export default {
  name: 'SignUpVerification',

  mixins: [bannerSlideshow],

  data() {
    return {
      banner_images_amount: 5,
      banner_image_template: 'banner-'
    };
  },

  created() {
    this.verify(this.$route.params.verification_token).then(({error}) => {
      if (error) {
        this.$router.push({name: 'sign-in'});
      } else {
        this.$router.push({name: 'dashboard'});
      }
    });
  },

  methods: {
    ...mapActions(['verify'])
  }
};
</script>

<style lang="scss" scoped>
.SignUpVerification {
  &__wrapper {
    display: flex;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__col {
    width: 50%;
    min-height: 100vh;

    &:nth-child(1) {
       position: relative;
       overflow: hidden;
    }

    &:nth-child(2) {
      background-color: #fff;
      min-width: 370px;
      padding-left: 135px;
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
    background-size: cover;
    background-position: center;
    transition: opacity 2s ease-in-out;
  }
}

</style>
