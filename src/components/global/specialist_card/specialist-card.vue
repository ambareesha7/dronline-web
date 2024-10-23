<template>
  <div
    class="SpecialistCard__wrapper"
    :class="{ online }">
    <div class="SpecialistCard__avatar-container">
      <img
        :src="specialist.avatarUrl"
        class="SpecialistCard__avatar"
        :class="{ avatarLoaded }"
        @load="avatarLoaded = true"
      />
      <i v-if="showAdmin" class="icon_admin-tag SpecialistCard__admin-tag" />
    </div>
    <div class="SpecialistCard__info">
      <div class="SpecialistCard__name">
        {{ name }}
      </div>
      <div
        v-if="showRole"
        class="SpecialistCard__role"
        v-html="role">
      </div>
      <div
        v-if="showCategories"
        class="SpecialistCard__categories"
        v-html="categories">
      </div>
    </div>
  </div>
</template>

<script>
import { USER_ROLE } from '@/constants';

export default {
  name: 'SpecialistCard',
  props: {
    specialist: {
      type: Object,
      required: true
    },
    showRole: {
      type: Boolean,
      default: false
    },
    showCategories: {
      type: Boolean,
      default: false
    },
    online: {
      type: Boolean,
      default: false
    },
    showAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      avatarLoaded: false
    };
  },
  computed: {
    name() {
      return `${this.specialist.firstName} ${this.specialist.lastName}`;
    },
    role() {
      return this.$t(`user_roles.${USER_ROLE[this.specialist.type]}`);
    },
    categories() {
      const mc = this.specialist.medicalCategories;
      return mc && mc.length ? mc.map(c => c.name).join(', ') : this.$t('global.no_category');
    }
  }
};
</script>

<style scoped lang="scss">
  @import "specialist-card.scss";
</style>
