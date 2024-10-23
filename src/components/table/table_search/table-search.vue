<template>
  <transition
    appear
    name="from-right-to-left">
    <div class="TableSearch__wrapper">
      <div class="TableSearch__content">
        <div class="form-row">
          <input
            id="query"
            :class="{ filled: query }"
            name="query"
            class="form-field"
            type="text"
            v-model="query"
            @keyup="debounceSearchRequest('name')"
            data-cy="TableSearch__query-field"/>
          <label
            for="query"
            class="form-label label-inner"
            data-cy="TableSearch__query-field-label">
            {{ label || $t('global.search') }}
          </label>
          <i
            class="icon-search TableSearch__icon"
            :class="query ? 'icon-close' : 'icon-search inactive'"
            @click="reset"
            data-cy="TableSearch__reset"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'TableSearch',

  props: {
    label: {
      type: String
    }
  },

  data() {
    return {
      searchTimeout: null,
      query: ''
    };
  },

  methods: {
    reset() {
      this.query = '';
      this.$emit('changed', this.query);
    },
    debounceSearchRequest() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.$emit('changed', this.query);
      }, 650);
    }
  }
};
</script>

<style scoped lang="scss">
@import "table-search.scss";
</style>
