<template>
  <div
    class="PatientRecordTimeline__wrapper shaded-outline"
    data-cy="PatientRecord__timeline">
    <div class="PatientRecordTimeline__header">
      <div class="title-medium">
        {{ $t('global.timeline') }}
      </div>
    </div>
    <div class="PatientRecordTimeline__content custom-scrollbar-container">
      <timeline-entity
        v-for="(entity, index) in timeline"
        :key="index"
        :entity="entity"
        :in-call="false"
        :latest-hpi="index === latestHpiIndex"
        :class="{'first': index === 0, 'last': index === (timeline.length - 1)}">
      </timeline-entity>
      <div
        v-if="!timeline.length"
        class="PatientRecordTimeline__no-results">
        {{ $t('timeline.no_entities') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { kebabToPascalCase } from '@/utils/filters';
import TimelineEntity from '@/components/timeline/timeline_entity/timeline-entity';
import TimelineForms from '@/components/timeline/timeline_forms';

export default {
  name: 'PatientRecordTimeline',

  components: {
    TimelineEntity,
    ...TimelineForms
  },

  data() {
    return {
      patientId: this.$route.params.patientId,
      recordId: this.$route.params.id
    };
  },

  computed: {
    ...mapGetters('patientTimeline', [
      'timeline'
    ]),
    latestHpiIndex() {
      return this.timeline.findIndex(entity => entity.item === 'providedHpi');
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.leaveRecordChannel(this.recordId);
    this.resetTimeline();
    this.setRecordId(null);
  },

  methods: {
    ...mapActions('patientTimeline', ['fetchPatientTimeline']),
    ...mapActions('socket', ['joinRecordChannel']),
    ...mapMutations('patientTimeline', ['setRecordId', 'resetTimeline']),
    ...mapMutations('socket', ['leaveRecordChannel']),
    async init() {
      this.setRecordId(this.recordId);
      await this.fetchPatientTimeline();
      this.joinRecordChannel(this.recordId);
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-record-timeline.scss";
</style>
