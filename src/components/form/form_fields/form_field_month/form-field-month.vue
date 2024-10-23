<template>
  <transition-group
    appear
    name="appear-from-top"
    mode="out-in"
    tag="div"
    class="FormFieldMonth__wrapper"
    :class="{ vertical, subform, showLabel, wide }">
    <div
      v-if="edit"
      key="edit"
      class="form-row--cols FormFieldMonth__edit">
      <div class="form-col">
        <multiselect
          v-model="month"
          :ref="ref + '_month'"
          :options="months"
          value="value"
          label="label"
          placeholder="">
          <i
            class="icon-caret multiselect-caret"
            slot="caret"
            slot-scope="{ toggle }"
            @mousedown.prevent.stop="toggle"></i>
        </multiselect>
        <input
          :class="{'filled': month}"
          class="form-hidden-validator form-field"
          type="text"
          :value="month"/>
        <label
          class="form-label label-inner"
          @click="$refs[ref + '_month'].$el.focus()">
          {{ $t('global.month') }}
        </label>
      </div>
      <div class="form-col">
        <multiselect
          v-model="year"
          :ref="ref + '_year'"
          :options="years"
          placeholder="">
          <i
            class="icon-caret multiselect-caret"
            slot="caret"
            slot-scope="{ toggle }"
            @mousedown.prevent.stop="toggle"></i>
        </multiselect>
        <input
          :class="{'filled': year}"
          class="form-hidden-validator form-field"
          type="text"
          :value="year"/>
        <label
          class="form-label label-inner"
          @click="$refs[ref + '_year'].$el.focus()">
          {{ $t('global.year') }}
        </label>
      </div>
    </div>

    <div
      v-else
      key="view"
      class="FormFieldMonth__view">
      <div
        v-if="showLabel"
        :class="vertical ? 'form-row' : 'form-row--cols'">
        <div class="form-col FormFieldMonth__label">
          {{ field.label }}
        </div>
        <div
          class="form-col FormFieldMonth__value"
          v-html="executedValue">
        </div>
      </div>
      <div v-else-if="executedValue">
        &nbsp;&mdash;&nbsp;{{ executedValue }}
      </div>
    </div>
  </transition-group>
</template>

<script>
import { mapMutations } from 'vuex';
import { FULL_MONTHS } from '@/constants';

export default {
  name: 'FormFieldMonth',

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
      currentYear: null,
      id: new Date().getTime(),
      years: []
    };
  },

  computed: {
    ref() {
      return `${this.field.value}_${this.field.label.split(' ').join('-')}_${this.id}`;
    },
    months() {
      return FULL_MONTHS.map((m, i) => ({label: this.$t(m), value: i}));
    },
    value: {
      get() {
        return (this.field.month.value || this.$moment().startOf('month').unix()) * 1000;
      },
      set(value) {
        this.setValue(value);
      }
    },
    month: {
      get() {
        return this.months.find(m => m.value === this.$moment(this.value).get('month'));
      },
      set({ value }) {
        this.value = this.$moment()
          .year(this.year)
          .month(value)
          .startOf('month')
          .unix();
      }
    },
    year: {
      get() {
        return this.$moment(this.value).get('year');
      },
      set(value) {
        this.value = this.$moment()
          .year(Number(value))
          .month(this.month.value)
          .startOf('month')
          .unix();
      }
    },
    executedValue() {
      return this.value ? this.$moment(this.value).format('MM-YYYY') : '&mdash;';
    }
  },

  mounted() {
    this.setDates();
  },

  methods: {
    setDates() {
      this.currentYear = Number(this.$moment().get('year'));
      if (!this.field.month.value) this.setValue(this.$moment().startOf('month').unix());
      for (let i = 0; i <= 100; i++) {
        this.years.push(this.currentYear - i);
      }
    },
    setValue(value) {
      this.field.month.value = value;
      this.field.month.isSet = !!value;
      this.$emit('set-field', {
        ...Object.assign({}, this.field),
        value: this.field.value
      });
    }
  }
};
</script>

<style lang="scss">
@import "form-field-month.scss";
</style>
