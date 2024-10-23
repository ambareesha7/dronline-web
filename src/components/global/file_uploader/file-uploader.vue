<template>
  <div class="FileUploader__wrapper"
    @dragenter="dragging=true"
    @dragend="dragging=false"
    @dragleave="dragging=false"
    @drop="dragging=false"
    :class="[error ? 'error' : '', dragging ? 'active' : '']">
    <div class="FileUploader__dropzone">
      <slot name="toggle"></slot>

      <input class="FileUploader__input"
        type="file"
        :id="`${name}_${index}`" 
        :ref="`${name}_${index}`"
        :name="`${name}_${index}`"
        accept="image/*,application/pdf"
        @change="fileChange"
        :required="required"
        v-validate="{ required: required }"
        data-cy="FileUploader__field"/>
      <span 
        v-for="error in errors.items"
        v-if="error.field === `${name}_${index}`"
        class="form-help is-danger"
      >
        {{ $t(`profile.${name}`) }} is required
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUploader',

  inject: ['$validator'],

  props: {
    required: {
      type: Boolean,
      default: false,
      required: false
    },
    index: {
      type: Number,
      default: null,
      required: false
    },
    name: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      file: null,
      dragging: false,
      rendered: null,
      error: null
    };
  },
  methods: {
    fileChange(ev) {
      this.file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.rendered = e.target.result;
        this.$emit('onrendered', this.rendered);
      };
      if (this.file) {
        reader.readAsDataURL(this.file);
        this.upload();
      }
    },
    upload() {
      this.$emit('onupload', this.file);
    }
  }
};
</script>
<style scoped lang="scss">
@import "file-uploader.scss";
</style>
