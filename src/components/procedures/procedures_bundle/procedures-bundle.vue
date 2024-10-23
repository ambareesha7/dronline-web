<template>
  <div class="ProceduresBundle__wrapper">
    <div class="ProceduresBundle__inserted-at">
      {{ bundle.insertedAt | moment("YYYY-MM-DD HH:mm A") }}
    </div>
    <patient-specialist-card :patient="bundle.patient" :specialist="bundle.specialist" />

    <div class="ProceduresBundle__procedures">
      <div
        v-for="procedure in bundle.procedures"
        :key="procedure"
        class="ProceduresBundle__procedures__item">
        {{ procedure }}
      </div>
    </div>
  </div>
</template>

<script>
import { TITLE, USER_ROLE } from '@/constants';
import PatientSpecialistCard from '@/components/global/patient_specialist_card/patient-specialist-card';

export default {
  name: 'ProceduresBundle',
  props: {
    bundle: {
      type: Object,
      required: true
    }
  },
  components: {
    PatientSpecialistCard
  },
  data() {
    return {
      TITLE,
      USER_ROLE
    };
  }
};
</script>

<style scoped lang="scss">
  @import "procedures-bundle.scss";
</style>
