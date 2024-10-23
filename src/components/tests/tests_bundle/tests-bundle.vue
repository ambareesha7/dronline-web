<template>
  <div class="TestsBundle__wrapper">
    <div class="TestsBundle__inserted-at">
      {{ bundle.insertedAt | moment("YYYY-MM-DD HH:mm A") }}
    </div>
    <patient-specialist-card :patient="bundle.patient" :specialist="bundle.specialist" />

    <div class="TestsBundle__tests">
      <table class="table">
        <thead class="table-head">
          <tr>
            <th class="table-head-cell TestsBundle__item__header">{{ $t('global.name') }}</th>
            <th class="table-head-cell">{{ $t('global.category') }}</th>
            <th class="table-head-cell">{{ $t('global.description') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="TestsBundle__item" v-for="test in bundle.tests" :key="test.name">
            <td class="table-body-cell">
              <div class="TestsBundle__item__value">{{ test.name }}</div>
            </td>
            <td class="table-body-cell">
              <div class="TestsBundle__item__value">{{ test.categoryName }}</div>
            </td>
            <td class="table-body-cell">
              <div class="TestsBundle__item__value">{{ test.description }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PatientSpecialistCard from '@/components/global/patient_specialist_card/patient-specialist-card';
import { TITLE, USER_ROLE } from '@/constants';

export default {
  name: 'TestsBundle',
  components: {
    PatientSpecialistCard
  },
  props: {
    bundle: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      TITLE,
      USER_ROLE
    };
  },
  methods: {
    formatTime(unixTimestamp) {
      if (!unixTimestamp) {
        return '-';
      }
      const time = this.$moment.unix(unixTimestamp);
      const isCurrentDate = time.isSame(new Date(), 'day');

      return isCurrentDate
        ? time.format('hh:mm A')
        : time.format('YYYY-MM-DD hh:mm A');
    }
  }
};
</script>

<style scoped lang="scss">
@import "tests-bundle.scss";
</style>
