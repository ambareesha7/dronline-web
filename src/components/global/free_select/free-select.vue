<template>
  <div class="FreeSelect">
    <input
      :class="{
            'is-danger': errors.has(inputId),
            filled: value
          }"
      :id="inputId"
      :name="inputId"
      :ref="inputId"
      autocomplete="off"
      class="form-field FreeSelect__input"
      v-model="value"
      v-validate="'required'"
      data-vv-delay="500"
      :data-vv-as="label"
      @focus="openOptions"
      @blur="closeOptions"
      @keyup="keyUp"
    />
    <label
      class="form-label label-inner FreeSelect__label-inner"
      @click="$refs[inputId].focus()"
    >{{ label }}</label>
    <i class="icon-caret multiselect-caret FreeSelect__caret" @click="$refs[inputId].focus()"></i>
    <transition name="appear-from-top" appear>
      <div
        v-if="showOptions && options.length"
        ref="options"
        class="FreeSelect__options view-transition"
      >
        <div
          v-for="option in options"
          :key="option"
          class="FreeSelect__option"
          @mousedown="selectOption(option)"
        >{{ option }}</div>
      </div>
    </transition>
    <span v-if="errors.has(inputId)" class="form-help is-danger">{{ errors.first(inputId) }}</span>
  </div>
</template>

<script>
export default {
  name: 'FreeSelect',
  inject: ['$validator'],

  props: {
    index: {
      required: false,
      type: Number
    },
    name: {
      required: true,
      type: String
    },
    label: {
      required: true,
      type: String
    },
    options: {
      required: true,
      type: Array
    },
    optionsLoader: {
      required: false,
      type: Function
    }
  },
  data() {
    return {
      value: '',
      showOptions: false
    };
  },
  computed: {
    inputId() {
      let id = this.name;
      if (this.index) {
        id = `${id}_${this.index}`;
      }
      return id;
    }
  },
  methods: {
    setAsyncOptions(value) {
      if (this.optionsLoader) {
        this.optionsLoader(value);
      }
    },
    openOptions() {
      this.setAsyncOptions(this.value);
      this.showOptions = true;
    },
    closeOptions() {
      setTimeout(() => {
        this.showOptions = false;
      }, 100);
    },
    selectOption(option) {
      this.value = option;
      this.$emit('change', this.value);
      this.closeOptions();
    },
    keyUp(e) {
      this.setAsyncOptions(e.target.value);
      this.value = e.target.value;
      this.$emit('change', this.value);
    }
  }
};
</script>

<style scoped lang="scss">
@import "free-select.scss";
</style>
