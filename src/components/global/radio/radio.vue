<template>
  <div class="Radio__wrapper">
    <input class="Radio__input"
      type="radio"
      :value="label"
      :name="name"
      v-model="model"
      :id="id"/>
    <label class="Radio__label" :for="id">
      <i class="icon-check Radio__icon"></i>
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {},
    label: {required: true},
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    id() {
      return `${this.name}_${this.label.toString().replace(/ /g, '-')}`;
    },
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style scoped lang="scss">
html[dir=ltr] .Radio {
  &__wrapper {
    padding: 0 24px 0 32px;
  }
  &__label {
    &:before {
      left: 0;
    }
    &:after {
      left: 0;
    }
  }
  &__icon {
    left: 4px;
  }
}
html[dir=rtl] .Radio {
  &__wrapper {
    padding: 0 32px 0 24px;
  }
  &__label {
    &:before {
      right: 0;
    }
    &:after {
      right: 0;
    }
  }
  &__icon {
    right: 4px;
  }
}
html[dir=ltr],
html[dir=rtl] {
  .Radio {
    &__wrapper {
      position: relative;
      cursor: pointer;
      display: inline-block;
      margin: 10px 0;
    }
    &__input {display: none;}
    &__label {
      cursor: pointer;
      color: #292929;
      font-size: 15px;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        width: 16px;
        height: 16px;
        border: 1px solid #aeaeae;
        border-radius: 100%;
        transition: border-color .2s ease-in-out;
      }
      &:after {
        content: '';
        background: #4496e9;
        position: absolute;
        top: 4px;
        left: 4px;
        width: 8px;
        height: 8px;
        border-radius: 100%;
        transform: scale(0);
        transition: transform .2s ease;
      }
    }

    &__icon {
      font-size: 8px;
      position: absolute;
      top: 0;
      z-index: 1;
      transform: scale(0);
      transition: transform .2s cubic-bezier(.87,-.41,.19,1.44) .16s;
    }
  }
  .Radio__input:checked + .Radio__label:after {
    transform: scale(1);
  }
  .Radio__input:checked + .Radio__label:before {
    border-color: #4496e9;
  }
  .Radio__input:checked + .Radio__label .Radio__icon {
    transform: scale(1);
  }
}
</style>
