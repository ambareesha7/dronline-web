<template>
  <transition-group
    appear
    name="appear-from-top"
    mode="out-in"
    tag="div"
    class="FormFieldMultiselect__wrapper"
    :class="{ vertical, subform, wide }">
    <div
      v-if="edit"
      key="edit"
      class="form-row FormFieldMultiselect__edit">
      <div class="form-label">
        {{ field.label }}
      </div>
      <div
        class="FormFieldMultiselect__options"
        :class="{'is-danger': errors.has(ref)}">
        <div
          v-for="(option, index) in field.multiselect.options"
          :key="index"
          class="FormFieldMultiselect__option">
          <checkbox
            :value="choices.includes(option.label)"
            @change="value => selectOption(option, value)">
            {{ option.label }}
          </checkbox>
          <div
            v-if="choices.includes(option.label) && option.subform.length"
            key="subform"
            class="FormFieldMultiselect__subform edit-mode">
            <component
              v-for="(subfield, i) in option.subform"
              :key="i"
              :is="`form-field-${subfield.value}`"
              :field="subfield"
              :edit="true"
              :vertical="vertical"
              @set-field="value => setSubformValue(value, index, i)">
            </component>
          </div>
        </div>
        <input
          :class="{'filled': value.length}"
          class="form-hidden-validator form-field"
          type="number"
          :name="ref"
          :value="value.length"
          v-validate="'required|min_value:1'"
          data-vv-delay="500"
          :data-vv-as="field.label"/>
        <span
          v-if="errors.has(ref)"
          class="form-help is-danger">
          {{ errors.first(ref) }}
        </span>
      </div>
    </div>

    <div
      v-else
      key="view"
      class="FormFieldMultiselect__view">
      <div :class="vertical ? 'form-row' : 'form-row--cols'">
        <div
          v-if="field.label"
          class="FormFieldMultiselect__label form-col">
          {{ field.label }}
        </div>
        <div class="FormFieldMultiselect__value form-col">
          <div
            v-if="value.length"
            class="FormFieldMultiselect__choices">
            <div
              v-for="(choice, index) in value"
              :key="index"
              class="FormFieldMultiselect__choice"
              :class="{
                split: index !== (value.length - 1),
                'with-subforms': haveSubforms
              }">
              <div v-if="isNoneSelected" class="badge-blue">{{ $t('global.negative') }}</div>
              <span class="FormFieldMultiselect__choice-value" v-else>{{ choice.label }}</span>
              <div
                v-if="choice.subform.length"
                class="FormFieldMultiselect__subform view-mode">
                <component
                  v-for="(subfield, i) in choice.subform"
                  :key="i"
                  :is="`form-field-${subfield.value}`"
                  :field="subfield"
                  :edit="false"
                  :subform="true"
                  :show-label="false">
                </component>
              </div>
            </div>
          </div>
          <span v-else>
            &mdash;
          </span>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { mapMutations } from 'vuex';
import Checkbox from '@/components/global/checkbox/checkbox';

export default {
  name: 'FormFieldMultiselect',

  components: {
    Checkbox,
    FormFieldSelect: () => import('@/components/form/form_fields/form_field_select/form-field-select'),
    FormFieldMultiselect: () => import('@/components/form/form_fields/form_field_multiselect/form-field-multiselect'),
    FormFieldString: () => import('@/components/form/form_fields/form_field_string/form-field-string'),
    FormFieldInteger: () => import('@/components/form/form_fields/form_field_integer/form-field-integer'),
    FormFieldMonth: () => import('@/components/form/form_fields/form_field_month/form-field-month')
  },

  inject: ['$validator'],

  props: {
    field: {
      required: true,
      type: Object
    },
    edit: {
      type: Boolean
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
    value() {
      return this.field.multiselect.choices;
    },
    choices() {
      return this.field.multiselect.choices.map(v => v.label);
    },
    isNoneSelected() {
      return !!this.field.multiselect.choices.find(option => option.label.toLowerCase() === 'none');
    },
    haveSubforms() {
      return !!this.value.find(choice => choice.subform.length);
    }
  },

  methods: {
    setSubformValue(value, field_index, subfield_index) {
      this.$set(this.field.multiselect.options[field_index].subform, subfield_index, value);
    },

    selectOption(option, value) {
      if (value) {
        this.field.multiselect.choices.forEach((o, i) => {
          if (o.label === option.label) this.$delete(this.field.multiselect.choices, i);
        });
      } else {
        if (option.distinct) {
          this.$set(this.field.multiselect, 'choices', []);
        } else {
          this.field.multiselect.choices.forEach((o, i) => {
            if (o.distinct) this.$delete(this.field.multiselect.choices, i);
          });
        }
        this.field.multiselect.choices.push(option);
      }
      this.$emit('set-field', {
        ...Object.assign({}, this.field),
        value: this.field.value
      });
    }
  }
};
</script>

<style lang="scss">
@import "form-field-multiselect.scss";
</style>
