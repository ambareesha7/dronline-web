<template>
  <div class="TimelineEntityDisconnected__wrapper">
    <div class="TimelineEntityDisconnected__header">
      <div class="TimelineEntityDisconnected__title">
        {{ $t('call_room.disconnected') }}
      </div>
      <div class="TimelineEntityDisconnected__time">
        {{ entity.inserted_at / 1000 | moment('hh:mm A') }}
      </div>
    </div>

    <div class="TimelineEntityDisconnected__gp-card">
      <div class="TimelineEntityDisconnected__gp-card-avatar"></div>
      <div class="TimelineEntityDisconnected__gp-card-info">
        <div class="TimelineEntityDisconnected__gp-card-name">
          {{ entity.gp.name }}
        </div>
        <div class="TimelineEntityDisconnected__gp-card-role">
          {{ entity.gp.role }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapMutations } = createNamespacedHelpers('patientTimeline');
export default {
  name: 'TimelineEntityDisconnected',

  props: {
    entity: {
      required: true,
      type: Object
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-disconnected.scss";
</style>
