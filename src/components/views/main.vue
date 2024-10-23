<template>
  <div class="MainView__wrapper" :class="{ authorized: isAuthorized, navbarDisabled: !navbarEnabled }">
    
    <the-sidebar v-if="isAuthorized && sidebarEnabled"/>
    
    <trial-end-reminder />

    <the-navbar v-if="navbarEnabled"/>

    <pricing-notice v-if="isAuthorized && $route.name === 'dashboard'"/>

    <the-banner v-if="isAuthorized && status && status.banner"/>

    <transition appear :name="$route.meta.appearance" mode="out-in">
      <router-view :key="$route.name"/>
    </transition>
    
    <the-footer v-if="isAuthorized && footerEnabled"/>
    
    <vue-progress-bar/>
    
    <call-room v-if="callOpened && isAuthorized"/>
    
    <the-guide v-if="showGuide"/>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TheNavbar from '@/components/the_navbar/the-navbar';
import TheBanner from '@/components/the_banner/the-banner';
import TheSidebar from '@/components/the_sidebar/the-sidebar';
import TheFooter from '@/components/the_footer/the-footer';
import TheGuide from '@/components/the_guide/the-guide';
import PricingNotice from '@/components/pricing_notice/pricing-notice';
import CallRoom from '@/components/call/call_room/call-room';
import TrialEndReminder from '@/components/membership/trial_end_reminder/trial-end-reminder';

export default {
  components: {
    TheNavbar,
    TheBanner,
    TheSidebar,
    TheFooter,
    TheGuide,
    CallRoom,
    TrialEndReminder,
    PricingNotice
  },
  mounted() {
    this.setIsPaymentEnabled();
  },
  computed: {
    ...mapGetters('oauth', [
      'authorized'
    ]),
    ...mapGetters('call', [
      'callOpened'
    ]),
    ...mapGetters('layouts', [
      'showGuide'
    ]),
    ...mapGetters('profile', [
      'isExternalDoctor', 'status'
    ]),
    isAuthorized() {
      return this.authorized && this.$route.name !== 'registration';
    },
    sidebarEnabled() {
      return !this.$route.meta.disable_sidebar;
    },
    navbarEnabled() {
      return !this.$route.meta.disable_navbar;
    },
    footerEnabled() {
      return !this.$route.meta.disable_footer;
    }
  },
  methods: {
    ...mapActions('membership', [
      'setIsPaymentEnabled'
    ])
  }
};
</script>
