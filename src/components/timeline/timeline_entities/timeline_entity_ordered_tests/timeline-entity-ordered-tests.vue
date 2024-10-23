<template>
  <div class="TimelineEntityOrderedTests__wrapper">
    <div class="TimelineEntityOrderedTests__header">
      <div class="TimelineEntityOrderedTests__header-col">
        <timeline-entity-specialist-card :specialist="entity.specialist" />
      </div>
      <div class="TimelineEntityOrderedTests__header-col">
        <div class="TimelineEntityOrderedTests__title">
          {{ $t('call_room.ordered_tests') }}
        </div>
        <div class="TimelineEntityOrderedTests__time">
          {{ entity.timestamp | moment('YYYY/MM/DD hh:mm A') }}
        </div>
      </div>
    </div>
    <div class="TimelineEntityOrderedTests__items">
      <div
        class="TimelineEntityOrderedTests__item"
        v-for="(item, index) in entity.orderedTests.items"
        :key="index">
        <div class="form-row--cols">
          <div class="form-col TimelineEntityOrderedTests__item__test-details-label">
            {{ $t('global.name') }}
          </div>
          <div class="form-col TimelineEntityOrderedTests__item__test-details-value">
            {{ item.test.name }}
          </div>
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityOrderedTests__item__test-details-label">
            {{ $t('global.description') }}
          </div>
          <div class="form-col TimelineEntityOrderedTests__item__test-details-value">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimelineEntitySpecialistCard from '@/components/timeline/timeline_entity_specialist_card/timeline-entity-specialist-card';
import { createNamespacedHelpers } from 'vuex';

const { mapMutations } = createNamespacedHelpers('patientTimeline');
export default {
  name: 'TimelineEntityOrderedTests',

  props: {
    entity: {
      required: true,
      type: Object
    }
  },

  components: {
    TimelineEntitySpecialistCard
  },

  methods: {
    ...mapMutations(['setOpenedForm', 'setEditableEntity']),
    edit() {
      this.setEditableEntity(this.entity);
      this.setOpenedForm('order-tests');
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-ordered-tests.scss";
</style>
