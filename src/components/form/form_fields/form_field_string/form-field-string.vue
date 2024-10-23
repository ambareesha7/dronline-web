<template>
  <transition-group
    appear
    name="appear-from-top"
    mode="out-in"
    tag="div"
    class="FormFieldString__wrapper"
    :class="{ vertical, subform, showLabel, wide }">
    <div
      v-if="edit"
      key="edit"
      class="form-row FormFieldString__edit">
      <input
        v-if="fieldType === 'input'"
        :class="{
          'filled': value,
          'is-danger': errors.has(ref)
        }"
        class="form-field"
        type="text"
        v-model="value"
        :id="ref"
        :data-vv-name="ref"
        v-validate="'required|min:2'"
        :data-vv-as="field.label"
        data-vv-delay="500"/>
      <textarea
        v-else-if="fieldType"
        :class="{
          'filled': value,
          'is-danger': errors.has(ref)
        }"
        class="form-textarea"
        v-model="value"
        :id="ref"
        :data-vv-name="ref"
        v-validate="'required|min:2'"
        :data-vv-as="field.label"
        data-vv-delay="500">
      </textarea>
      <label
        class="form-label label-inner"
        :for="ref">
        {{ field.label }}
      </label>
      <span
        v-if="errors.has(ref)"
        class="form-help is-danger">
        {{ errors.first(ref) }}
      </span>
    </div>

    <div
      v-else
      key="view"
      class="FormFieldString__view">
      <div
        v-if="showLabel"
        :class="vertical ? 'form-row' : 'form-row--cols'">
        <div class="form-col FormFieldString__label">
          {{ field.label }}
        </div>
        <div
          class="form-col FormFieldString__value"
          v-html="value || '&mdash;'">
        </div>
      </div>
      <div v-else-if="value">
        &nbsp;&mdash;&nbsp;{{ value }}
      </div>
    </div>
  </transition-group>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'FormFieldString',


  inject: ['$validator'],

  props: {
    field: {
      required: true,
      type: Object
    },
    edit: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    subform: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    wide: {
      type: Boolean,
      default: true
    },
    fieldType: {
      type: String,
      default: 'input'
    }
  },

  data() {
    return {
      id: new Date().getTime()
    };
  },

  computed: {
    ref() {
      return `${this.field.value}_${this.field.label.split(' ').join('-')}_${this.id}`;
    },
    value: {
      get() {
        return this.field.string.value;
      },
      set(value) {
        this.field.string.value = value;
        this.field.string.isSet = !!value;
        this.$emit('set-field', {
          ...Object.assign({}, this.field),
          value: this.field.value
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "form-field-string.scss";
</style>
