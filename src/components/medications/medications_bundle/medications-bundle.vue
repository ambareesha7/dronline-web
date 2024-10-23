<template>
  <div class="MedicationsBundle__wrapper">
    <div class="MedicationsBundle__inserted-at">
      {{ bundle.insertedAt | moment("YYYY-MM-DD HH:mm A") }}
    </div>
    <patient-specialist-card :patient="bundle.patient" :specialist="bundle.specialist" />

    <div class="MedicationsBundle__medications">
      <table class="table">
        <thead class="table-head">
          <tr>
            <th class="table-head-cell">
              {{ $t('global.name') }}
            </th>
            <th class="table-head-cell">
              {{ $t('global.quantity') }}
            </th>
            <th class="table-head-cell">
              {{ $t('global.refills') }}
            </th>
            <th class="table-head-cell">
              {{ $t('global.direction') }}
            </th>
          </tr>
          <tr v-for="medication in bundle.medications" :key="medication.name">
            <td class="table-body-cell">
              <div class="MedicationsBundle__medications__value">
                {{ medication.name }}
              </div>
            </td>
            <td class="table-body-cell">
              <div class="MedicationsBundle__medications__value">
                {{ medication.quantity }}
              </div>
            </td>
            <td class="table-body-cell">
              <div class="MedicationsBundle__medications__value">
                {{ medication.refills }}
              </div>
            </td>
            <td class="table-body-cell">
              <div class="MedicationsBundle__medications__value">
                {{ medication.direction }}
              </div>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
import { TITLE, USER_ROLE } from '@/constants';
import PatientSpecialistCard from '@/components/global/patient_specialist_card/patient-specialist-card';

export default {
  name: 'MedicationsBundle',
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
  @import "medications-bundle.scss";
</style>
