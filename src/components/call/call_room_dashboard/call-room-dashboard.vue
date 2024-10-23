<template>
  <transition
    appear
    name="CallRoomDashboard__wrapper"
    @after-enter="afterEnter"
    @before-leave="beforeLeave">
    <div
      v-if="showDashboard"
      class="CallRoomDashboard__wrapper"
      :class="size">
      <div class="CallRoomDashboard__header">
        <div
          v-if="isMaximized"
          class="CallRoomDashboard__tabs">
          <div
            class="CallRoomDashboard__tab ripple"
            v-for="tab in tabs"
            :key="tab"
            :class="{
              active: currentView === tab
            }"
            @click="setView(tab)">
            {{ labels[tab] }}
          </div>
        </div>
        <div
          class="CallRoomDashboard__toggle-view ripple"
          @click="toggleView">
          <i
            :class="[isMaximized ? 'icon-minimize' : 'icon-maximize']"
            class="CallRoomDashboard__toggle-view-icon"></i>
          <div class="CallRoomDashboard__toggle-view-label">
            {{ $t('call_room.minimize') }}
          </div>
        </div>
      </div>

      <div
        class="CallRoomDashboard__content"
        v-if="isMaximized">
        <transition
          appear
          name="slide-right-to-left"
          mode="out-in">
          <component
            v-if="showContent"
            :is="component"
            :key="component">
          </component>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { snakeToKebabCase } from '@/utils/filters';
import CallRoomDashboardTimeline from './call_room_dashboard_timeline/call-room-dashboard-timeline';
import CallRoomDashboardInformation from './call_room_dashboard_information/call-room-dashboard-information';
import CallRoomDashboardMedicalSummary from './call_room_dashboard_medical_summary/call-room-dashboard-medical-summary';

export default {
  name: 'CallRoomDashboard',

  components: {
    CallRoomDashboardTimeline,
    CallRoomDashboardInformation,
    CallRoomDashboardMedicalSummary
  },

  data() {
    return {
      tabs: ['timeline', 'information', 'medical_summary'],
      labels: {
        timeline: this.$t('global.timeline'),
        information: this.$t('global.information'),
        medical_summary: this.$t('global.med_summary')
      },
      currentView: 'information',
      showContent: false
    };
  },

  computed: {
    ...mapGetters('call', [
      'size',
      'fullScreen'
    ]),

    isMaximized() {
      return this.size === 'maximized';
    },

    showDashboard() {
      return !this.fullScreen;
    },

    component() {
      return `call-room-dashboard-${snakeToKebabCase(this.currentView)}`;
    }
  },

  methods: {
    ...mapMutations('call', ['setSize']),

    toggleView() {
      this.setSize(this.isMaximized ? 'minimized' : 'maximized');
    },

    setView(view) {
      this.currentView = view;
    },

    afterEnter() {
      this.showContent = true;
    },

    beforeLeave() {
      this.showContent = false;
    }
  }
};
</script>

<style lang="scss">
@import "call-room-dashboard.scss";
</style>
