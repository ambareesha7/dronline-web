<template>
  <div class="ExperienceForm__wrapper">
    <div
      class="ExperienceForm__header">
      <div class="ExperienceForm__title">
        #{{ index + 1 }} {{ $t('profile.experience') }} 
      </div>
      <div
        v-if="length > 1"
        @click="$emit('remove')"
        class="ExperienceForm__remove"
        data-cy="ExperienceForm__remove">
        {{ $t('global.remove') }}
      </div>
    </div>
    <div class="form-row">
      <input
        :name="`experience_institution_${index}`"
        :id="`experience_institution_${index}`"
        type="text"
        class="form-field"
        :class="{
          'is-danger': errors.has(`experience_institution_${index}`),
          'filled': institution
        }"
        v-model="institution"
        v-validate="'required|min:2'"
        data-vv-delay="500"
        :data-vv-as="$t('profile.institution')"/>
      <label
        class="form-label label-inner"
        :for="`experience_institution_${index}`">
        {{ $t('profile.institution') }}
      </label>
      <span
        v-if="errors.has(`experience_institution_${index}`)"
        class="form-help is-danger">
        {{ errors.first(`experience_institution_${index}`) }}
      </span>
    </div>
    <div class="form-row">
      <input
        :name="`experience_position_${index}`"
        :id="`experience_position_${index}`"
        type="text"
        class="form-field"
        :class="{
          'is-danger': errors.has(`experience_position_${index}`),
          'filled': position
        }"
        v-model="position"
        v-validate="'required|min:2'"
        data-vv-delay="500"
        :data-vv-as="$t('profile.position')"/>
      <label
        class="form-label label-inner"
        :for="`experience_position_${index}`">
        {{ $t('profile.position') }}
      </label>
      <span
        v-if="errors.has(`experience_position_${index}`)"
        class="form-help is-danger">
        {{ errors.first(`experience_position_${index}`) }}
      </span>
    </div>
    <div class="form-row--cols">
      <div class="form-col ExperienceForm__col-half">
        <input
          :name="`experience_start_${index}`"
          :id="`experience_start_${index}`"
          type="text"
          class="form-field"
          :class="{
            'is-danger': errors.has(`experience_start_${index}`),
            'filled': start
          }"
          v-model="start"
          v-validate="`required|digits:4|min_value:1900|max_value:${currentYear}`"
          data-vv-delay="500"
          :data-vv-as="$t('profile.start_year')"/>
        <label
          class="form-label label-inner"
          :for="`experience_start_${index}`">
          {{ $t('profile.start_year') }}
        </label>
        <span
          v-if="errors.has(`experience_start_${index}`)"
          class="form-help is-danger">
          {{ errors.first(`experience_start_${index}`) }}
        </span>
      </div>
      <div class="form-col ExperienceForm__col-half">
        <input
          :name="`experience_end_${index}`"
          :id="`experience_end_${index}`"
          type="text"
          class="form-field"
          :class="{
            'is-danger': errors.has(`experience_end_${index}`),
            'filled': end
          }"
          v-model="end"
          v-validate="endValidation"
          data-vv-delay="500"
          :data-vv-as="$t('profile.end_year')"/>
        <label
          class="form-label label-inner"
          :for="`experience_end_${index}`">
          {{ $t('profile.end_year') }}
        </label>
        <span
          v-if="errors.has(`experience_end_${index}`)"
          class="form-help is-danger">
          {{ errors.first(`experience_end_${index}`) }}
        </span>
      </div>
    </div>
    <div class="form-row">
      <checkbox
        v-model="stillWorking">
        {{ $t('profile.still_work_there') }}
      </checkbox>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import Checkbox from '@/components/global/checkbox/checkbox';

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
  name: 'ExperienceForm',
  components: {
    Checkbox
  },
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
    institution: editableFieldModel('institution'),
    position: editableFieldModel('position'),
    start: editableFieldModel('startYear'),
    end: {
      get() {
        return this.form.endYear || null;
      },
      set(value) {
        this.$emit('set-form', {
          ...this.form,
          endYear: value,
          stillWorking: false
        });
      }
    },
    stillWorking: {
      get() {
        return this.form.stillWorking;
      },
      set(value) {
        this.$emit('set-form', {
          ...this.form,
          stillWorking: value,
          endYear: 0
        });
      }
    },
    endValidation() {
      return this.stillWorking
        ? ''
        : `required|digits:4|min_value:${this.start}|max_value:${this.currentYear}`;
    }
  },
  mounted() {
    if (this.start && !this.end) this.stillWorking = true;
  }
};
</script>

<style scoped lang="scss">
  @import "experience-form.scss";
</style>
