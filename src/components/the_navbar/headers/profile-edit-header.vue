<template>
  <div class="ProfileEditHeader__wrapper">
    <slot name="icon"></slot>
    <breadcrumbs
      :steps="breadcrumbs">
      <div
        class="ProfileEditHeader__avatar"
        :style="avatarStyle">
      </div>
    </breadcrumbs>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProfileEditHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('global.my_profile'),
          disabled: true
        }
      ]
    };
  },

  computed: {
    ...mapGetters('profile', ['basicInfo']),

    avatarStyle() {
      if (!this.basicInfo) return null;
      return {'background-image': `url(${this.basicInfo.profileImageUrl})`};
    }
  }
};
</script>
<style scoped lang="scss">
.ProfileEditHeader {
  &__avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #9B9B9B;
    background-position: center;
    background-size: cover;
    margin-right: 4px;
  }
}
</style>
