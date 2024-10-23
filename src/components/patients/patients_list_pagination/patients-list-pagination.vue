<template>
  <div
    v-if="totalNumber"
    class="PatientsListPagination__wrapper">
    <i
      class="icon-arrow PatientsListPagination__prev"
      :class="{ 'invalidate': prevInactive }"
      @click="prev"></i>
    <div class="PatientsListPagination__container">
      <div
        v-if="showFirstPage"
        class="PatientsListPagination__page"
        @click="setPage(1)">
        1
      </div>
      <div
        v-if="showFirstDots"
        class="PatientsListPagination__page">
        ...
      </div>
      <div
        class="PatientsListPagination__page"
        v-for="p in pages"
        :key="p"
        :class="{ 'active': p === page }"
        @click="setPage(p)">
        {{ p }}
      </div>
      <div
        v-if="showLastDots"
        class="PatientsListPagination__page">
        ...
      </div>
      <div
        v-if="showLastPage"
        class="PatientsListPagination__page"
        @click="setPage(pagesNumber)">
        {{ pagesNumber }}
      </div>
    </div>
    <i
      class="icon-arrow PatientsListPagination__next"
      :class="{ 'invalidate': nextInactive }"
      @click="next"></i>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patients');
export default {
  name: 'PatientsListPagination',

  computed: {
    ...mapGetters([
      'page',
      'totalNumber'
    ]),
    pagesNumber() {
      return Math.ceil(this.totalNumber / 10);
    },
    pages() {
      const pages = [];
      if (this.pagesNumber < 4) {
        for (let i = 1; i <= this.pagesNumber; i++) {
          pages.push(i);
        }
      } else if (this.page <= 4) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
      } else {
        let last = Math.ceil(this.page / 4) * 4;
        if (last > this.pagesNumber) last = this.pagesNumber;
        for (let i = 0; i < 4; i++) {
          pages.unshift(last - i);
        }
      }
      return pages;
    },
    showFirstPage() {
      return this.pages.length === 4 && Math.ceil(this.pages[3] / 4) !== 1;
    },
    showFirstDots() {
      return this.pages.length === 4 && this.pages[0] > 2;
    },
    showLastPage() {
      return this.pages.length === 4 &&
        Math.ceil(this.pages[3] / 4) !== Math.ceil(this.pagesNumber / 4);
    },
    showLastDots() {
      return this.showLastPage && this.pages[3] + 1 !== this.pagesNumber;
    },
    prevInactive() {
      return this.page === 1;
    },
    nextInactive() {
      return this.page === this.pagesNumber;
    }
  },

  methods: {
    ...mapMutations([
      'setPage'
    ]),
    prev() {
      this.setPage(this.page - 1);
    },
    next() {
      this.setPage(this.page + 1);
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patients-list-pagination.scss";
</style>
