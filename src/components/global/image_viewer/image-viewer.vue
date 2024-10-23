<template>
  <div class="ImageViewer__wrapper">
    <div
      class="ImageViewer__backdrop"
      @click="close">
    </div>

    <i
      class="ImageViewer__close icon-close"
      @click="close">
    </i>

    <transition
      appear
      tag="div"
      mode="out-in"
      name="ImageViewer__image-container">
      <div
        class="ImageViewer__image-container"
        v-for="(image, index) in items"
        v-if="index === current"
        :key="index">

        <div
          v-if="hasPrevious"
          class="ImageViewer__prev"
          @click.stop="previous">
        </div>

        <div
          v-if="hasNext"
          class="ImageViewer__next"
          @click.stop="next">
        </div>

        <img
          ref="image"
          class="ImageViewer__image"
          :src="image"/>

        <div
          v-if="hasPrevious || hasNext"
          class="ImageViewer__footer">
          <div class="ImageViewer__footer-action">
            <i
              v-show="hasPrevious"
              class="icon-arrow ImageViewer__nav-icon prev"
              @click="previous">
            </i>
          </div>
          <div class="ImageViewer__footer-action">
            <i
              v-show="hasNext"
              class="icon-arrow ImageViewer__nav-icon next"
              @click="next">
            </i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'ImageViewer',
  props: {
    items: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      current: 0
    };
  },
  computed: {
    availableIndexes() {
      return this.items.length - 1;
    },
    hasPrevious() {
      return this.availableIndexes && this.current >= 1;
    },
    hasNext() {
      return this.availableIndexes && this.current < this.availableIndexes;
    }
  },
  beforeMount() {
    this.current = this.index;
  },
  methods: {
    close() {
      this.$modal.hide('image-viewer');
    },
    next() {
      this.current++;
    },
    previous() {
      this.current--;
    },
    escHandler(e) {
      if (e.keyCode === 27) {
        this.close();
      }
    },
    beforeOpen({params = {}}) {
      this.items = params.items;
      this.current = params.index || 0;
      document.body.addEventListener('keyup', this.escHandler);
    },
    beforeClose() {
      document.body.removeEventListener('keyup', this.escHandler);
    }
  }
};
</script>

<style scoped lang="scss">
@import "image-viewer.scss";
</style>
