<template>
  <div class="ProfileAchievements__wrapper">
    <div class="ProfileAchievements__section">
      <div class="ProfileAchievements__section-header">
        <div class="ProfileAchievements__section-title">
          {{ $t('profile.bio') }}
        </div>
        <div
          v-if="showShrinkOption"
          class="ProfileAchievements__toggle-shrink"
          @click="toggleShrinked">
          {{ $t('global.see_something', [$t(`global.${shrinked ? 'full' : 'less'}`)]) }}
        </div>
      </div>
      <div class="ProfileAchievements__section-content">
        <div
          class="ProfileAchievements__bio-description"
          :style="{'max-height': `${showShrinkOption && shrinked ? shrinkedHeight : fullHeight}px`}"
          :class="{ shrinked: showShrinkOption && shrinked }"
          v-html="bio.description || '&mdash;'"
          :data-content="bio.description"
          ref="bio">
        </div>
      </div>
    </div>
    <div
      class="ProfileAchievements__section"
      v-for="(education, index) in bio.education"
      :key="`education_${index}`">
      <div class="ProfileAchievements__section-header">
        <div class="ProfileAchievements__section-title">
          {{ $t('profile.education') }} {{ bio.education.length > 1 ? `#${index + 1}` : null }}
        </div>
      </div>
      <div class="ProfileAchievements__section-content">
        <div class="ProfileAchievements__section-row">
          <div class="ProfileAchievements__section-row-label">
            {{ $t('profile.school') }}
          </div>
          <div class="ProfileAchievements__section-row-value">
            {{ education.school }}
          </div>
        </div>
        <div class="ProfileAchievements__section-row">
          <div class="ProfileAchievements__section-row-label">
            {{ $t('profile.field') }}
          </div>
          <div class="ProfileAchievements__section-row-value">
            {{ education.fieldOfStudy }}
          </div>
        </div>
        <div class="ProfileAchievements__section-row">
          <div class="ProfileAchievements__section-row-label">
            {{ $t('profile.degree') }}
          </div>
          <div class="ProfileAchievements__section-row-value">
            {{ education.degree }}
          </div>
        </div>
        <div class="ProfileAchievements__section-row">
          <div class="ProfileAchievements__section-row-label">
            {{ $t('profile.start_year') }}
          </div>
          <div class="ProfileAchievements__section-row-value">
            {{ education.startYear }}
          </div>
        </div>
        <div class="ProfileAchievements__section-row">
          <div class="ProfileAchievements__section-row-label">
            {{ $t('profile.end_year') }}{{ $t('profile.or_expected') }}
          </div>
          <div
            class="ProfileAchievements__section-row-value"
            v-html="education.endYear || '&mdash;'"></div>
        </div>
      </div>
    </div>
    <div
      class="ProfileAchievements__section"
      v-for="(experience, index) in bio.workExperience"
      :key="`experience_${index}`">
      <div class="ProfileAchievements__section-header">
        <div class="ProfileAchievements__section-title">
          {{ $t('profile.experience') }}
          &nbsp;
          {{ bio.workExperience.length > 1 ? `#${index + 1}` : null }}
        </div>
      </div>
      <div class="ProfileAchievements__section-content">
        <div class="ProfileAchievements__section-row">
          <div class="ProfileAchievements__section-row-label">
            {{ $t('profile.institution') }}
          </div>
          <div class="ProfileAchievements__section-row-value">
            {{ experience.institution }}
          </div>
        </div>
        <div class="ProfileAchievements__section-row">
          <div class="ProfileAchievements__section-row-label">
            {{ $t('profile.position') }}
          </div>
          <div class="ProfileAchievements__section-row-value">
            {{ experience.position }}
          </div>
        </div>
        <div class="ProfileAchievements__section-row">
          <div class="ProfileAchievements__section-row-label">
            {{ $t('profile.start_year') }}
          </div>
          <div class="ProfileAchievements__section-row-value">
            {{ experience.startYear }}
          </div>
        </div>
        <div class="ProfileAchievements__section-row">
          <div class="ProfileAchievements__section-row-label">
            {{ $t('profile.end_year') }}
          </div>
          <div
            class="ProfileAchievements__section-row-value"
            v-html="experience.endYear || '&mdash;'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'ProfileAchievements',
  data() {
    return {
      shrinkedHeight: 220,
      fullHeight: 0,
      shrinked: true
    };
  },
  computed: {
    ...mapGetters([
      'bio'
    ]),
    showShrinkOption() {
      return this.fullHeight >= this.shrinkedHeight;
    }
  },
  mounted() {
    this.fullHeight = Number(
      window.getComputedStyle(this.$refs.bio, ':before')
        .height
        .replace('px', '')
    );
  },
  methods: {
    toggleShrinked() {
      this.shrinked = !this.shrinked;
    }
  }
};
</script>
<style scoped lang="scss">
@import "profile-achievements.scss";
</style>
