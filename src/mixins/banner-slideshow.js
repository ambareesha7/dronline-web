export default {
  data() {
    return {
      banner: {},
      banner_index: 2
    };
  },

  mounted() {
    this.bannerUpdate();
    setInterval(this.bannerUpdate, 5000);
  },

  beforeDestroy() {
    clearInterval(this.bannerUpdate);
  },

  methods: {
    bannerUpdate() {
      if (this.banner_index === this.banner_images_amount) {
        this.banner_index = 3;
      } else {
        this.banner_index++;
      }
      this.banner = {
        style: {
          'background-image': `url(/static/images/${this.banner_image_template}${this.banner_index}.png)`
        },
        key: this.banner_index
      };
    }
  }
};
