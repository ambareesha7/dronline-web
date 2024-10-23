<template>
  <div
    class="TableFilter__wrapper"
    :class="{ active, open: isOpen }"
    data-cy="TableFilter__wrapper">
    <div
      class="TableFilter__content"
      @click="toggle"
      data-cy="TableFilter__toggle">
      <div class="TableFilter__label">
        <slot></slot>
        <transition
          appear
          name="slide-top-to-bottom"
          mode="out-in">
          <span
            :key="selectedOptions"
            class="TableFilter__label-selected-amount">
          {{ selectedOptions }}
        </span>
        </transition>
      </div>
      <div class="TableFilter__directions">
        <i
          class="icon-down-dir TableFilter__dropdown-toggle-icon">
        </i>
      </div>
    </div>
    <div
      class="TableFilter__dropdown"
      :class="{ active }"
      v-if="isOpen"
      v-on-click-outside="close"
      data-cy="TableFilter__dropdown">
      <div class="TableFilter__dropdown-options custom-scrollbar-container">
        <div
          class="TableFilter__dropdown-option"
          v-for="option in options"
          :key="option.value">
          <div
            class="TableFilter__dropdown-option-line"
            @click="optionClicked(option)"
            data-cy="TableFilter__option">
            <checkbox v-model="option.selected">
              {{ option.label }}
            </checkbox>
            <i
              v-if="option.suboptions"
              class="icon-caret TableFilter__dropdown-option-caret"
              @click.stop="toggleSuboptions(option.value)"></i>
          </div>
          <div
            v-if="showSuboptions === option.value"
            class="TableFilter__dropdown-suboptions">
            <div
              class="TableFilter__dropdown-suboption"
              :class="{ invalidate: option.selected }"
              v-for="suboption in option.suboptions"
              :key="suboption.value"
              @click="optionClicked(suboption)"
              data-cy="TableFilter__suboption">
              <checkbox v-model="suboption.selected">
                {{ suboption.label }}
              </checkbox>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="active"
        class="TableFilter__reset"
        @click="reset">
        {{ $t('global.reset') }}
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from '@/components/global/checkbox/checkbox';

export default {
  name: 'TableFilter',

  components: {
    Checkbox
  },

  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    field: {
      type: String,
      required: true
    },
    radio: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isOpen: false,
      showSuboptions: false
    };
  },

  computed: {
    active() {
      return !!this.options.filter(o => o.selected).length;
    },
    selectedOptions() {
      return this.active ? `(${this.options.filter(o => o.selected).length})` : null;
    }
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    toggleSuboptions(id) {
      this.showSuboptions = this.showSuboptions === id ? null : id;
    },
    close() {
      this.isOpen = false;
    },
    selectOption(option) {
      if (option.suboptions) {
        option.suboptions = option.suboptions.map(s => ({
          ...s,
          selected: option.selected
        }));
      }
      if (this.radio) {
        this.options.forEach(o => {
          if (o.value !== option.value) o.selected = false;
        });
      }
      this.$emit('change', {
        field: this.field,
        options: this.options
      });
    },
    optionClicked(option) {
      option.selected = !option.selected;
      this.selectOption(option, option.selected);
    },
    reset() {
      this.options.forEach(o => {
        if (o.selected) o.selected = false;
        if (o.suboptions) {
          o.suboptions.forEach(s => {
            if (s.selected) s.selected = false;
          });
        }
      });
      this.$emit('change', {
        field: this.field,
        options: this.options
      });
      this.close();
    }
  }
};
</script>

<style lang="scss">
  @import "table-filter.scss";
</style>
