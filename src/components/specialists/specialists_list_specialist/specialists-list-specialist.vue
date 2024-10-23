<template>
  <tr
    class="SpecialistsListSpecialist__wrapper"
    :class="{ online: specialistsPresences.includes(specialist.specialist.id) }"
    data-cy="SpecialistsList__specialist">
    <td class="table-body-cell">
      <specialist-card
        :specialist="specialist.specialist"
        :showCategories="true"
        :online="specialistsPresences.includes(specialist.specialist.id)">
      </specialist-card>
    </td>
    <td
      class="table-body-cell"
      data-cy="SpecialistsList__specialist-package">
      {{ membershipPackage }}
    </td>
    <td
      class="table-body-cell"
      data-cy="SpecialistsList__specialist-country">
      {{ specialist.country }}
    </td>
  </tr>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { MEMBERSHIP_PLANS_NAMES } from '@/constants';
import SpecialistCard from '@/components/global/specialist_card/specialist-card';

const { mapGetters } = createNamespacedHelpers('specialists');
export default {
  name: 'SpecialistsListSpecialist',
  components: {
    SpecialistCard
  },
  props: {
    specialist: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['specialistsPresences']),
    avatar() {
      return { 'background-image': `url(${this.specialist.specialist.avatarUrl})` };
    },
    membershipPackage() {
      return this.$t(MEMBERSHIP_PLANS_NAMES[this.specialist.specialist.package]);
    },
    medicalCategories() {
      return this.specialist.specialist.medicalCategories.map(m => m.name).join(' &bull; ');
    }
  }
};
</script>

<style scoped lang="scss">
  @import "specialists-list-specialist.scss";
</style>
