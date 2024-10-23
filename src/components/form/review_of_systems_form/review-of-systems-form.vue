<template>
  <div
    class="ReviewOfSystemsForm__wrapper"
    :class="{ grid, edit }">
    <div
      v-if="edit"
      class="ReviewOfSystemsForm__content">
      <component
        v-for="(field, index) in formFields"
        :key="index"
        :is="`form-field-${field.value}`"
        :field="field"
        :edit="true"
        @set-field="field => $emit('set-field', {field, index})">
      </component>
    </div>
    <div
      v-else
      class="ReviewOfSystemsForm__content"
      :class="{ grid }">
      <div
        v-for="(field, index) in reviewOfSystemFields"
        :key="index"
        class="ReviewOfSystemsForm__block">
        <div class="title-uppercase ReviewOfSystemsForm__block-title">
          {{ field.label }}
          <div
            v-if="field.value"
            class="ReviewOfSystemsForm__block-count-badge">
            {{ field.length }}
          </div>
        </div>
        <div class="form-value">
          {{ field.value }}
          <div v-if="!field.value" class="badge-blue">
            {{ $t('global.negative') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormFields from '@/components/form/form_fields';
import { parseFields } from '@/utils/forms';

export default {
  name: 'ReviewOfSystemsForm',

  components: {
    ...FormFields
  },

  props: {
    formFields: {
      type: Array,
      default: () => []
    },
    grid: {
      type: Boolean,
      default: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    reviewOfSystemFields() {
      return parseFields(this.formFields)
        .map(field => ({
          ...field,
          length: field.value.length ? field.value.split(';').length : 0
        }));
    }
  }
};
</script>

<style lang="scss">
@import "review-of-systems-form.scss";
</style>
