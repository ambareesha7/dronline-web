<template>
  <div class="ProfileHeader__wrapper">
    <div class="ProfileHeader__col">
      <slot name="icon"></slot>
      <breadcrumbs
        :steps="breadcrumbs">
        <div
          class="ProfileHeader__avatar"
          :style="avatarStyle">
        </div>
      </breadcrumbs>
    </div>
    <div class="ProfileHeader__col">
      <btn
        @onclick="goToEdit"
        btn-class="blue-filled"
        class="ProfileHeader__edit"
        :btn-label="$t('profile.edit_profile')">
      </btn>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProfileHeader',

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
  },

  methods: {
    goToEdit() {
      this.$router.push({ name: 'profile-edit' });
    }
  }
};
</script>
<style scoped lang="scss">
.ProfileHeader {
  &__avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #9B9B9B;
    background-position: center;
    background-size: cover;
    margin-right: 4px;
  }

  &__edit {
    height: 40px;
  }
}
</style>
