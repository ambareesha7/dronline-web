<template>
  <div class="CallRoomDashboardTimeline__wrapper">
    <div class="CallRoomDashboardTimeline__content custom-scrollbar-container">
      <div class="CallRoomDashboardTimeline__started">
        {{ $t('call_room.timeline_started') }}
      </div>

      <timeline-entity
        v-for="(entity, index) in timeline"
        :key="index"
        :entity="entity"
        :class="{'first': index === 0, 'last': index === (timeline.length - 1)}">
      </timeline-entity>

      <div
        v-if="callEnded"
        class="CallRoomDashboardTimeline__ended">
        {{ $t('call_room.timeline_ended') }}
      </div>
    </div>

    <timeline-menu>
    </timeline-menu>

    <component
      :is="timelineForm"
      :patient-id="recipientPatientId">
    </component>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { kebabToPascalCase } from '@/utils/filters';
import TimelineForms from '@/components/timeline/timeline_forms';
import TimelineMenu from '@/components/timeline/timeline_menu/timeline-menu';
import TimelineEntity from '@/components/timeline/timeline_entity/timeline-entity';

export default {
  name: 'CallRoomDashboardTimeline',

  components: {
    TimelineMenu,
    TimelineEntity,
    ...TimelineForms
  },

  computed: {
    ...mapGetters('patientTimeline', [
      'recordId',
      'timeline',
      'openedForm'
    ]),
    ...mapGetters('call', [
      'callEnded',
      'recipientPatientId'
    ]),
    timelineForm() {
      const name = `timeline-${this.openedForm}-form`;
      const exist = kebabToPascalCase(name) in TimelineForms;
      return exist ? name : null;
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.leaveRecordChannel(this.recipientPatientId);
    this.resetTimeline();
  },

  methods: {
    ...mapActions('patientTimeline', ['fetchPatientTimeline']),
    ...mapMutations('patientTimeline', ['resetTimeline']),
    ...mapActions('socket', ['joinRecordChannel']),
    ...mapMutations('socket', ['leaveRecordChannel']),
    init() {
      this.fetchPatientTimeline();
      this.joinRecordChannel(this.recordId);
    }
  }
};
</script>

<style lang="scss">
@import "call-room-dashboard-timeline.scss";
</style>
