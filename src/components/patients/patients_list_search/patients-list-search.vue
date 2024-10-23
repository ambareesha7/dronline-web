<template>
  <div class="PatientsListSearch__wrapper">
    <div class="form-row--cols">
      <div class="form-col">
        <input
          id="query"
          :class="{ filled: query }"
          name="query"
          class="form-field"
          type="text"
          v-model="query"
          @keyup="debounceSearchRequest('name')"
          data-cy="PatientsListSearch__query-field"/>
        <label
          for="query"
          class="form-label label-inner"
          data-cy="PatientsListSearch__query-field-label">
          {{ $t('patients.search_label') }}
        </label>
        <i
          class="icon-search PatientsListSearch__icon"
          :class="filter || query ? 'icon-close' : 'icon-search inactive'"
          @click="reset"
          data-cy="PatientsListSearch__reset"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patients');
export default {
  name: 'PatientsListSearch',

  data() {
    return {
      searchTimeout: null,
      query: ''
    };
  },

  computed: {
    ...mapGetters([
      'filter',
      'patients'
    ])
  },

  methods: {
    ...mapActions([
      'resetFilter',
      'setFilter'
    ]),
    reset() {
      this.query = '';
      if (this.filter) this.resetFilter();
    },
    debounceSearchRequest(filter) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.setFilter(this.query);
      }, 650);
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patients-list-search.scss";
</style>
