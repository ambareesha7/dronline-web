<template>
  <div
    class="Guide__wrapper"
    v-if="guide">
    <div
      class="Guide__banner"
      v-if="guide.banner"
      :style="bannerStyle">
    </div>
    <h1
      class="Guide__title"
      v-if="guide.title">
      {{ guide.title }}
    </h1>
    <div v-html="guide.content"></div>
  </div>
</template>

<script>
export default {
  name: 'Guide',

  data() {
    return {
      guide: null
    };
  },

  computed: {
    bannerStyle() {
      if (!this.guide || !this.guide.banner) return null;
      return { 'background-image': `url(/static/guide-banners/${this.guide.banner})` };
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      const name = this.$route.params.guide_name;
      const category = this.$route.query.category;
      const fileName = category ? `${name}_${category}` : name;
      this.guide = await import(`@/guides/${fileName}`);
    }
  }
};
</script>

<style lang="scss">
  .Guide {
    &__wrapper {
      padding: 16px;
      h3 {
        font-size: 17px;
        font-weight: 500;
        margin-bottom: 12px;
      }
      p {
        margin-bottom: 12px;
      }
      ol {
        list-style: decimal;
      }
      ul {
        list-style: disc;
      }
      ul li, ol li {
        margin: 4px 0 4px 35px;
      }
      b {
        font-weight: 600;
      }
    }
    &__banner {
      width: 100%;
      height: 150px;
      background-size: cover;
      background-position: center;
      border-radius: 4px;
      box-shadow: 0 1px 6px 0 rgba(0,0,0,0.20);
      margin-bottom: 14px;
    }
    &__title {
      font-size: 22px;
      margin-bottom: 24px;
    }
  }
</style>
