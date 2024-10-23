<template>
  <div
    v-if="editableBio"
    class="ProfileAchievementEdit__wrapper">
      
    <div class="ProfileAchievementEdit__section">
      <div class="ProfileAchievementEdit__section-title">
        {{ $t('profile.bio') }}
      </div>
      <div class="ProfileAchievementEdit__section-content">
        <div class="form-row">
          <textarea
            :class="{
              'is-danger': errors.has('description'),
              'filled': description
            }"
            id="description"
            name="description"
            class="form-textarea ProfileAchievementEdit__bio"
            v-model="description"
            v-validate="'required|max:1200'"
            data-vv-delay="500"
            :data-vv-as="$t('global.description')"
            ref="description">
          </textarea>
          <label
            for="description"
            class="form-label label-inner">
            {{ $t('global.description') }}
          </label>
          <span
            v-if="errors.has('description')"
            class="form-help is-danger"
            data-cy="ProfileAchievementEdit__number-validation-error">
            {{ errors.first('description') }}
          </span>
        </div>
      </div>
    </div>

    <div class="ProfileAchievementEdit__section">
      <div class="ProfileAchievementEdit__section-title">
        {{ $t('profile.education') }}
      </div>
      <div class="ProfileAchievementEdit__section-content">
        <education-form
          v-for="(form, index) in education"
          :key="index"
          :form="form"
          :index="index"
          :length="education.length"
          @set-form="f => setForm({ form: f, index, field: 'education' })"
          @remove="removeForm({ index, field: 'education'})">
        </education-form>

        <div
          v-if="education.length < 7"
          @click="addForm('education')"
          class="ProfileAchievementEdit__add-form form-actions pull-right">
          <i class="icon-plus ProfileAchievementEdit__add-form-icon"/>
          {{ $t('profile.add_new_school') }}
        </div>
      </div>
    </div>

    <div class="ProfileAchievementEdit__section">

      <div class="ProfileAchievementEdit__applicable">
        <div class="ProfileAchievementEdit__applicable-content">
          <div class="ProfileAchievementEdit__section-title">
            {{ $t('profile.work_experience') }}
          </div>
          <div class="ProfileAchievementEdit__applicable-switch">
            <switcher @onchange="workExpApplicableOnChange" :value="workExpApplicable"/>
            <div class="ProfileAchievementEdit__applicable-text">
              Applicable
            </div>
          </div>
        </div>
      </div>
    
      <div class="ProfileAchievementEdit__section-content" v-if="workExpApplicable">
        <experience-form
          v-for="(form, index) in experience"
          :key="index"
          :form="form"
          :index="index"
          :length="experience.length"
          @set-form="f => setForm({ form: f, index, field: 'workExperience' })"
          @remove="removeForm({ index, field: 'workExperience'})">
        </experience-form>

        <div
          v-if="experience.length < 7"
          @click="addForm('workExperience')"
          class="ProfileAchievementEdit__add-form form-actions pull-right">
          <i class="icon-plus ProfileAchievementEdit__add-form-icon"/>
          {{ $t('profile.add_new_institution') }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import EducationForm from '@/components/form/education_form/education-form';
import ExperienceForm from '@/components/form/experience_form/experience-form';
import Switcher from '@/components/global/switcher/switcher';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('profile');
const editableFieldModel = field => ({
  get() {
    return this.editableBio[field];
  },
  set(value) {
    this.setEditableBioField({ field, value });
  }
});

export default {
  name: 'ProfileAchievementEdit',
  components: {
    EducationForm,
    ExperienceForm,
    Switcher
  },
  data() {
    return {
      workExpApplicable: false
    };
  },
  inject: ['$validator'],
  computed: {
    ...mapGetters(['bio', 'editableBio']),
    description: editableFieldModel('description'),
    education() {
      return (this.editableBio || {}).education;
    },
    experience() {
      return (this.editableBio || {}).workExperience;
    }
  },
  async beforeMount() {
    await this.fetchBio();
    const bio = localStorage.getItem('registration-bio');
    this.setEditableBio(bio ? JSON.parse(bio) : null);
    if (!this.editableBio.education.length) this.addForm('education');
    if (!this.editableBio.workExperience.length) this.addForm('workExperience');

    if(this.editableBio['workExperience'] && this.editableBio['workExperience'][0] && this.editableBio['workExperience'][0]['endYear']) {
      this.workExpApplicable = true
    }
  },
  methods: {
    ...mapActions([
      'updateBio',
      'fetchBio'
    ]),
    ...mapMutations([
      'setEditableBio',
      'setEditableBioField',
      'setRegistrationStep'
    ]),
    setForm({ form, index, field }) {
      this.setEditableBioField({
        field,
        value: this.editableBio[field].map((v, i) => (
          i === index ? form : v
        ))
      });
    },
    removeForm({ index, field }) {
      this.$delete(this.editableBio[field], index);
      this.setEditableBioField({
        field,
        value: this.editableBio[field]
      });
    },
    addForm(field) {
      this.setEditableBioField({
        field,
        value: [
          ...this.editableBio[field],
          {}
        ]
      });
    },
    workExpApplicableOnChange(value) {
      this.workExpApplicable = value
      if(!value) {
        delete this.editableBio['workExperience']
      }
    },
  }
};
</script>
<style scoped lang="scss">
@import "profile-achievement-edit.scss";
</style>
