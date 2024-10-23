<template>
  <div class="CallScreenshotModal__wrapper">
    <div
      class="CallScreenshotModal__content"
      :style="style">
    </div>
    <div class="form-actions full CallScreenshotModal__footer">
      <btn
        @onclick="close"
        btn-class="cancel"
        class="CallScreenshotModal__cancel"
        :btn-label="$t('global.cancel')">
      </btn>

      <btn
        @onclick="save"
        btn-class="blue-filled"
        class="CallScreenshotModal__save"
        :btn-label="$t('global.save')">
      </btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CallScreenshotModal',

  props: {
    imageData: {
      required: true
    },
    name: {
      type: String
    }
  },

  computed: {
    image() {
      return `data:image/png;base64,${this.imageData}`;
    },
    style() {
      return { 'background-image': `url(${this.image})` };
    }
  },

  methods: {
    save() {
      const link = document.createElement('a');
      const fileName = `dronline_${this.name}_${this.$moment().format('DD-MM-YYYY_HH-mm')}`;
      link.setAttribute('href', this.image);
      link.setAttribute('download', fileName);
      link.click();
      this.close();
    },

    close() {
      this.$modal.hide('call-screenshot-modal');
    }
  }
};
</script>

<style lang="scss">
@import "call-screenshot-modal.scss";
</style>
