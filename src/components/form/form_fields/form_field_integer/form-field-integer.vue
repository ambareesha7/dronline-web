<template>
  <transition-group
    appear
    name="appear-from-top"
    mode="out-in"
    tag="div"
    class="FormFieldInteger__wrapper"
    :class="{ vertical, subform, showLabel, wide }">
    <div
      v-if="edit"
      key="edit"
      class="form-row FormFieldInteger__edit">
      <input
        :class="{
          'filled': (value !== '' && value !== null),
          'is-danger': errors.has(ref)
        }"
        class="form-field"
        type="text"
        v-model="value"
        :name="ref"
        v-validate="'required|numeric'"
        :data-vv-as="field.label"
        :data-vv-name="ref"
        data-vv-delay="500"
        :id="ref"/>
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
      class="FormFieldInteger__view">
      <div
        v-if="showLabel"
        :class="vertical ? 'form-row' : 'form-row--cols'">
        <div class="form-col FormFieldInteger__label">
          {{ field.label }}
        </div>
        <div
          class="form-col FormFieldInteger__value"
          v-html="isValueValid ? value : '&mdash;'">
        </div>
      </div>
      <div v-else-if="isValueValid">
        &nbsp;&mdash;&nbsp;{{ value }}
      </div>
    </div>
  </transition-group>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'FormFieldInteger',

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
        return this.field.integer.value;
      },
      set(value) {
        this.field.integer.value = value;
        this.field.integer.isSet = value !== '' && value !== null;
        this.$emit('set-field', {
          ...Object.assign({}, this.field),
          value: this.field.value
        });
      }
    },
    isValueValid() {
      return this.value !== '' && this.value !== null;
    }
  },

  mounted() {
    if (!this.field.integer.isSet) this.value = 0;
  }
};
</script>

<style lang="scss">
@import "form-field-integer.scss";
</style>
