<template>
  <div class="TimelineEntityCall__wrapper">
    <div class="TimelineEntityCall__header">
      <div class="TimelineEntityCall__header-col">
        <div class="TimelineEntityCall__specialist-card">
          <div
            class="TimelineEntityCall__specialist-card-avatar"
            :style="specialistAvatar"
            :class="{ online }">
          </div>
          <div class="TimelineEntityCall__specialist-card-info">
            <div class="TimelineEntityCall__specialist-card-name">
              {{ entity.specialist.firstName }} {{ entity.specialist.lastName }}
            </div>
            <div class="TimelineEntityCall__specialist-card-role">
              {{ specialistRole }}
            </div>
          </div>
        </div>
      </div>
      <div class="TimelineEntityCall__header-col">
        <div class="TimelineEntityCall__title">
          {{ $t('call_room.connected') }}
        </div>
        <div class="TimelineEntityCall__time">
          {{ entity.timestamp | moment('YYYY/MM/DD hh:mm A') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { USER_ROLE } from '@/constants';

export default {
  name: 'TimelineEntityCall',

  props: {
    entity: {
      required: true,
      type: Object
    }
  },

  computed: {
    ...mapGetters('specialists', ['specialistsPresences']),
    specialistRole() {
      return this.$t(`user_roles.${USER_ROLE[this.entity.specialist.type]}`);
    },
    specialistAvatar() {
      return {'background-image': `url(${this.entity.specialist.avatarUrl})`};
    },
    online() {
      return (
        this.entity.specialist.type === 3 &&
        this.specialistsPresences.includes(this.entity.specialist.id)
      );
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-call.scss";
</style>
