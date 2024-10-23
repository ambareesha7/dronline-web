<template>
  <div class="ProfileGeneralInfo__wrapper">
    <div
      v-if="basicInfo"
      class="ProfileGeneralInfo__content">
      <div
        :style="avatarUrl"
        class="ProfileGeneralInfo__avatar">
      </div>
      <div class="ProfileGeneralInfo__name">
        {{ name }}
      </div>
      <div class="ProfileGeneralInfo__contacts">
        <span v-if="basicInfo.phoneNumber">
          {{ basicInfo.phoneNumber }},
        </span> {{ credentials.email }}
      </div>
      <div
        v-if="isDoctor && medicalCategories"
        class="ProfileGeneralInfo__categories"
        v-html="categories">
      </div>
    </div>
    <div
      v-else
      class="ProfileGeneralInfo__initializing">
      <spinner></spinner>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'SpecialistGeneralInfo',

  computed: {
    ...mapGetters([
      'isDoctor',
      'basicInfo',
      'medicalCategories',
      'credentials'
    ]),

    name() {
      return `${this.basicInfo.firstName} ${this.basicInfo.lastName}`;
    },

    categories() {
      return this.medicalCategories.map(
        ({ category, speciality }) => (speciality ? speciality.name : category.name)
      ).join(', ') || '&mdash;';
    },

    avatarUrl() {
      if (!this.basicInfo) return null;
      return { 'background-image': `url(${this.basicInfo.profileImageUrl})` };
    }
  }
};
</script>
<style scoped lang="scss">
@import "profile-general-info.scss";
</style>
