<template>
  <div class="TimelineEntitySpecialistCard">
    <div
      class="TimelineEntitySpecialistCard__avatar"
      :style="specialistAvatar"
      :class="{ online }">
    </div>
    <div class="TimelineEntitySpecialistCard__info">
      <div class="TimelineEntitySpecialistCard__info__name">
        {{ specialist.firstName }} {{ specialist.lastName }}
      </div>
      <div class="TimelineEntitySpecialistCard__info__role">
        {{ specialistRole }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { USER_ROLE } from '@/constants';

export default {
  name: 'TimelineEntitySpecialistCard',

  props: {
    specialist: {
      required: true,
      type: Object
    }
  },

  computed: {
    ...mapGetters('specialists', ['specialistsPresences']),
    specialistRole() {
      return this.$t(`user_roles.${USER_ROLE[this.specialist.type]}`);
    },
    specialistAvatar() {
      return { 'background-image': `url(${this.specialist.avatarUrl})` };
    },
    online() {
      return (
        this.specialist.type === 3 &&
        this.specialistsPresences.includes(this.specialist.id)
      );
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-specialist-card.scss";
</style>
