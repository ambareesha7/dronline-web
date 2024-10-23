<template>
  <div class="ProfileMenu__wrapper">
    <div
      class="ProfileMenu__card-container"
      @click="toggleMenu">
      <div class="ProfileMenu__card">
        <div
          class="ProfileMenu__card-avatar"
          :style="avatarStyle">
          <div
            v-if="unreadNotificationsCounter"
            class="ProfileMenu__notifications-indicator"></div>
        </div>
        <div class="ProfileMenu__card-greeting">
          {{ $t('sidebar.hi_to', [userName]) }}
        </div>
      </div>
      <i class="icon-caret ProfileMenu__card-caret"></i>
    </div>

    <transition
      name="scale-vertically"
      mode="out-in">
      <div
        v-on-click-outside="toggleMenu"
        class="ProfileMenu__dropdown"
        v-if="isOpen">
        <div
          v-if="isExternalDoctor"
          class="ProfileMenu__dropdown-action blue"
          @click="toggleGuide(true);toggleMenu();">
          {{ $t('global.show_demo') }}
        </div>
        <div
          class="ProfileMenu__dropdown-action"
          @click="goTo('notifications')">
          {{ $t('notifications.notifications') }}
          <div
            v-if="unreadNotificationsCounter"
            class="ProfileMenu__notifications-badge">
            {{ unreadNotificationsCounter }}
          </div>
        </div>
        <div
          class="ProfileMenu__dropdown-action"
          @click="goTo('profile')">
          {{ $t('global.my_profile') }}
        </div>
        <div
          class="ProfileMenu__dropdown-action ProfileMenu__logout"
          @click="signOut">
          {{ $t('global.log_out') }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ProfileMenu',

  data() {
    return {
      isOpen: false
    };
  },

  computed: {
    ...mapGetters('profile', [
      'basicInfo',
      'isExternalDoctor'
    ]),
    ...mapGetters('notifications', [
      'unreadNotificationsCounter'
    ]),

    userName() {
      return this.basicInfo ?
        `${this.basicInfo.firstName} ${this.basicInfo.lastName}` :
        null;
    },
    avatarStyle() {
      if (!this.basicInfo) return null;
      return {'background-image': `url(${this.basicInfo.profileImageUrl})`};
    }
  },

  mounted() {
    this.fetchNotifications();
  },

  methods: {
    ...mapActions('oauth', [
      'signOut'
    ]),
    ...mapActions('notifications', [
      'fetchNotifications'
    ]),
    ...mapMutations('layouts', [
      'toggleGuide'
    ]),
    goTo(name) {
      this.toggleMenu();
      this.$router.push({name});
    },
    toggleMenu(e) {
      if (e) e.stopPropagation();
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
<style scoped lang="scss">
@import "profile-menu.scss";
</style>
