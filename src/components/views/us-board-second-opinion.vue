<template>
  <div class="USBoardSecondOpinion__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <us-board-second-opinion-list/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UsBoardSecondOpinionList from '@/components/us_board/us-board-second-opinion-list';

export default {
  name: 'USBoardSecondOpinion',

  components: {
    UsBoardSecondOpinionList
  },

  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.USBoardSecondOpinion {
  &__wrapper {
    width: 100%;
    padding-left: 185px;
    transition: transform 0.16s ease-out, opacity 0.2s ease-out;
  }
}
</style>
