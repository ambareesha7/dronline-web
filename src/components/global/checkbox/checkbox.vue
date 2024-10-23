<template>
  <div class="Checkbox__wrapper">
    <input class="Checkbox__input"
      type="checkbox"
      v-model="model"
      @change="$emit('change', model)"
      :id="id"/>
    <label
      class="Checkbox__label"
      :for="id"
      @click.stop>
      <i class="icon-ok Checkbox__icon"></i>
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {},
    checked: {type: Boolean},
    data: {}
  },
  data() {
    return {
      id: `checkbox-${(Math.random() * (new Date().getTime())).toFixed()}`
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val, this.data);
      }
    }
  }
};
</script>

<style lang="scss">
  html[dir=ltr] .Checkbox {
    &__wrapper {
     padding: 0 12px 0 24px;
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
      left: 0;
    }
  }
  html[dir=rtl] .Checkbox {
    &__wrapper {
      padding: 0 24px 0 12px;
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
      right: 0;
  }
  }

  html[dir=ltr],
  html[dir=rtl] {
    .Checkbox {
      &__wrapper {
        position: relative;
        cursor: pointer;
        line-height: 16px;
        display: inline-block;
        margin: 2px 0;
      }

      &__input {
        display: none;
      }

      &__label {
        cursor: pointer;
        font-size: 15px;
        color: #292929;

        &:before {
          content: '';
          position: absolute;
          top: 0;
          width: 16px;
          height: 16px;
          border: 1px solid #AEAEAE;
          border-radius: 2px;
        }

        &:after {
          content: '';
          position: absolute;
          top: 0;
          width: 16px;
          height: 16px;
          border-radius: 2px;
          transform: scale(0);
          transition: transform .2s ease;
        }
      }

      &__icon {
        font-size: 12px;
        position: absolute;
        top: 0;
        z-index: 1;
        color: #1877DA;
        line-height: 16px;
        transform: scale(0);
        transition: transform .2s cubic-bezier(.87, -.41, .19, 1.44) .16s;
      }
    }

    .Checkbox__input:checked + .Checkbox__label:after {
      transform: scale(1);
    }
    .Checkbox__input:checked + .Checkbox__label .Checkbox__icon {
      transform: scale(1);
    }
  }

  .insurance-form {
    width: 97%;
    padding: 0 12px !important;
    i, label:before, label:after {
      right: 0 !important;
      left: unset !important;
    }
    label:before {
      border: 1px solid rgba(231, 232, 233, 1) !important;
    }
  }
</style>
