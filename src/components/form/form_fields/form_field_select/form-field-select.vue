<template>
  <transition-group
    appear
    name="appear-from-top"
    mode="out-in"
    tag="div"
    class="FormFieldSelect__wrapper"
    :class="{ vertical, subform, wide }">
    <div
      v-if="edit"
      key="edit"
      class="form-row FormFieldSelect__edit">
      <multiselect
        v-model="value"
        :options="field.select.options"
        value="label"
        label="label"
        placeholder=""
        :ref="ref">
        <i
          class="icon-caret multiselect-caret"
          slot="caret"
          slot-scope="{ toggle }"
          @mousedown.prevent.stop="toggle"></i>
      </multiselect>
      <input
        :class="{'filled': value}"
        class="form-hidden-validator form-field"
        v-validate="'required'"
        :data-vv-name="ref"
        data-vv-delay="500"
        :data-vv-as="field.label"
        type="text"
        :value="value"/>
      <label
        class="form-label label-inner"
        @click="$refs[ref].$el.focus()">
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
      class="FormFieldSelect__view">
      <div :class="vertical ? 'form-row' : 'form-row--cols'">
        <div class="form-col FormFieldSelect__label">
          {{ field.label }}
        </div>
        <div
          class="form-col FormFieldSelect__value"
          v-html="value ? value.label : '&mdash;'">
        </div>
      </div>
    </div>

    <div
      v-if="value && value.subform.length"
      key="subform"
      class="FormFieldSelect__subform"
      :class="[edit ? 'edit-mode' : 'view-mode']">
      <component
        v-for="(subfield, index) in value.subform"
        :key="subfield.uuid"
        :is="`form-field-${subfield.value}`"
        :field="subfield"
        :edit="edit"
        :subform="true"
        @set-field="value => setSubformValue(value, index)">
      </component>
    </div>
  </transition-group>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'FormFieldSelect',

  inject: ['$validator'],

  components: {
    FormFieldSelect: () => import('@/components/form/form_fields/form_field_select/form-field-select'),
    FormFieldMultiselect: () => import('@/components/form/form_fields/form_field_multiselect/form-field-multiselect'),
    FormFieldString: () => import('@/components/form/form_fields/form_field_string/form-field-string'),
    FormFieldInteger: () => import('@/components/form/form_fields/form_field_integer/form-field-integer'),
    FormFieldMonth: () => import('@/components/form/form_fields/form_field_month/form-field-month')
  },

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
        return this.field.select.choice;
      },
      set(value) {
        this.field.select.choice = value;
        this.$emit('set-field', {
          ...Object.assign({}, this.field),
          value: this.field.value
        });
      }
    }
  },

  methods: {
    setSubformValue(value, index) {
      this.$set(this.field.select.choice.subform, index, value);
      this.$emit('set-field', {
        ...Object.assign({}, this.field),
        value: this.field.value
      });
    }
  }
};
</script>

<style lang="scss">
@import "form-field-select.scss";
</style>
