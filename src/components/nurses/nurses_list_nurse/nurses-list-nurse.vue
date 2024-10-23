
<template>
  <tr
    class="NursesListNurse__wrapper"
    data-cy="SpecialistsList__specialist">
    <td class="table-body-cell">
      <div class="flex-container">
        <div
          class="NursesListNurse__avatar"
          :style="avatar"></div>
        <div class="NursesListNurse__info">
          <div
            class="table-body-cell-text"
            data-cy="SpecialistsList__specialist-name">
            {{ nurse.firstName }} {{ nurse.lastName }}
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('nurse');
export default {
  name: 'NursesListNurse',

  props: {
    nurse: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(['specialistsPresences']),
    avatar() {
      return { 'background-image': `url(${this.nurse.avatarUrl})` };
    }
  }
};
</script>

<style scoped lang="scss">
  @import "nurses-list-nurse.scss";
</style>
