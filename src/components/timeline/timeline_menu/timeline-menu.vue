<template>
  <div class="TimelineMenu__wrapper">
    <div
      class="TimelineMenu__trigger"
      :class="{'active': isOpen}"
      @click="toggleMenu">
      <i class="icon-plus"></i>
    </div>

    <transition
      name="TimelineMenu__dropdown"
      mode="out-in">
      <div
        v-if="isOpen"
        v-on-click-outside="toggleMenu"
        class="TimelineMenu__dropdown">
        <div
          v-if="!isNurse"
          class="TimelineMenu__action"
          @click="openForm('assign-medications')">
          {{ $t('call_room.assign_medications') }}
          <i class="icon_medications TimelineMenu__action-icon"></i>
        </div>
        <div
          class="TimelineMenu__action"
          @click="openForm('order-tests')">
          {{ $t('call_room.order_tests') }}
          <i class="icon_order-tests TimelineMenu__action-icon"></i>
        </div>
        <div
          v-if="!callEnded"
          class="TimelineMenu__action"
          @click="openForm('invite')">
          {{ $t('call_room.invite_specialist') }}
          <i class="icon_invite TimelineMenu__action-icon"></i>
        </div>
        <div
          v-if="dispatchAllowed"
          class="TimelineMenu__action"
          @click="openForm('dispatch')">
          {{ $t('call_room.dispatch_triage_unit_request') }}
          <i class="icon_dispatch TimelineMenu__action-icon"></i>
        </div>
        <div
          v-if="isNurse"
          class="TimelineMenu__action"
          @click="openForm('vitals')">
          {{ $t('call_room.provide_vitals') }}
          <i class="icon_vitals TimelineMenu__action-icon"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'TimelineMenu',

  data() {
    return {
      isOpen: false
    };
  },

  computed: {
    ...mapGetters('profile', [
      'isGP',
      'isNurse',
      'isDoctor',
      'isInternalDoctor',
      'isExternalDoctor'
    ]),
    ...mapGetters('membership', [
      'includesGoldFeatures'
    ]),
    ...mapGetters('call', [
      'callEnded',
      'callType'
    ]),
    dispatchAllowed() {

      if(this.callType && this.callType == 2) {
        return false
      }

      return (this.isInternalDoctor ||
        this.isGP) ||
        (this.isExternalDoctor && this.includesGoldFeatures);
    }
  },

  methods: {
    ...mapMutations('patientTimeline', ['setOpenedForm']),
    toggleMenu(e) {
      if (e) e.stopPropagation();
      this.isOpen = !this.isOpen;
    },
    openForm(form) {
      this.setOpenedForm(form);
      this.toggleMenu();
    }
  }
};
</script>

<style lang="scss">
@import "timeline-menu.scss";
</style>
