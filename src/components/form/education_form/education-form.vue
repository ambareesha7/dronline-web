<template>
  <div class="EducationForm__wrapper">
    <div
      v-if="length > 1"
      class="EducationForm__header">
      <div class="EducationForm__title">
        #{{ index + 1 }} {{ $t('profile.university') }}
      </div>
      <div
        @click="$emit('remove')"
        class="EducationForm__remove"
        data-cy="EducationForm__remove">
        {{ $t('global.remove') }}
      </div>
    </div>
    <div class="form-row">
      <input
        :name="`education_school_${index}`"
        :id="`education_school_${index}`"
        type="text"
        class="form-field"
        :class="{
          'is-danger': errors.has(`education_school_${index}`),
          'filled': school
        }"
        v-model="school"
        v-validate="'required|min:2'"
        data-vv-delay="500"
        :data-vv-as="$t('profile.university')"/>
      <label
        class="form-label label-inner"
        :for="`education_school_${index}`">
        {{ $t('profile.university') }}
      </label>
      <span
        v-if="errors.has(`education_school_${index}`)"
        class="form-help is-danger">
        {{ errors.first(`education_school_${index}`) }}
      </span>
    </div>
    <div class="form-row">
      <input
        :name="`education_field_${index}`"
        :id="`education_field_${index}`"
        type="text"
        class="form-field"
        :class="{
          'is-danger': errors.has(`education_field_${index}`),
          'filled': field
        }"
        v-model="field"
        v-validate="'required|min:2'"
        data-vv-delay="500"
        :data-vv-as="$t('profile.field_of_study')"/>
      <label
        class="form-label label-inner"
        :for="`education_field_${index}`">
        {{ $t('profile.field_of_study') }}
      </label>
      <span
        v-if="errors.has(`education_field_${index}`)"
        class="form-help is-danger">
        {{ errors.first(`education_field_${index}`) }}
      </span>
    </div>
    <div class="form-row">
      <input
        :name="`education_degree_${index}`"
        :id="`education_degree_${index}`"
        type="text"
        class="form-field"
        :class="{
          'is-danger': errors.has(`education_degree_${index}`),
          'filled': degree
        }"
        v-model="degree"
        v-validate="'required|min:2'"
        data-vv-delay="500"
        :data-vv-as="$t('profile.degree')"/>
      <label
        class="form-label label-inner"
        :for="`education_degree_${index}`">
        {{ $t('profile.degree') }}
      </label>
      <span
        v-if="errors.has(`education_degree_${index}`)"
        class="form-help is-danger">
        {{ errors.first(`education_degree_${index}`) }}
      </span>
    </div>
    <div class="form-row--cols">
      <div class="form-col EducationForm__col-half">
        <input
          :name="`education_start_${index}`"
          :id="`education_start_${index}`"
          type="text"
          class="form-field"
          :class="{
            'is-danger': errors.has(`education_start_${index}`),
            'filled': start
          }"
          v-model="start"
          v-validate="`required|digits:4|min_value:1900|max_value:${currentYear}`"
          data-vv-delay="500"
          :data-vv-as="$t('profile.start_year')"/>
        <label
          class="form-label label-inner"
          :for="`education_start_${index}`">
          {{ $t('profile.start_year') }}
        </label>
        <span
          v-if="errors.has(`education_start_${index}`)"
          class="form-help is-danger">
          {{ errors.first(`education_start_${index}`) }}
        </span>
      </div>
      <div class="form-col EducationForm__col-half">
        <input
          :name="`education_end_${index}`"
          :id="`education_end_${index}`"
          type="text"
          class="form-field"
          :class="{
            'is-danger': errors.has(`education_end_${index}`),
            'filled': end
          }"
          v-model="end"
          v-validate="`required|digits:4|min_value:${start}|max_value:${maxYear}`"
          data-vv-delay="500"
          :data-vv-as="$t('profile.end_year')"/>
        <label
          class="form-label label-inner"
          :for="`education_end_${index}`">
          {{ $t('profile.end_year') }}{{ $t('profile.or_expected') }}
        </label>
        <span
          v-if="errors.has(`education_end_${index}`)"
          class="form-help is-danger">
          {{ errors.first(`education_end_${index}`) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';

const editableFieldModel = field => ({
  get() {
    return this.form[field];
  },
  set(value) {
    this.$emit('set-form', {
      ...this.form,
      [field]: value
    });
  }
});

export default {
  name: 'EducationForm',
  inject: ['$validator'],
  props: {
    form: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: Number
    },
    length: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      maxYear: new Date().getFullYear() + 10
    };
  },
  computed: {
    school: editableFieldModel('school'),
    field: editableFieldModel('fieldOfStudy'),
    degree: editableFieldModel('degree'),
    start: editableFieldModel('startYear'),
    end: editableFieldModel('endYear')
  }
};
</script>

<style scoped lang="scss">
  @import "education-form.scss";
</style>
