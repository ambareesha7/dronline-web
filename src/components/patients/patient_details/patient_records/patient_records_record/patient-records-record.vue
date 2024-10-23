<template>
  <tr
    class="PatientRecordsRecord__wrapper"
    data-cy="PatientRecordsRecord"
    @dblclick="openDetails">
    <td class="PatientRecordsRecord__cell">
      {{ record.startDate.timestamp | moment('YYYY/MM/DD &bullet; hh:mm A') }}
    </td>
    <td class="PatientRecordsRecord__cell">
      <span v-if="record.endDate">
        {{ record.endDate.timestamp | moment('YYYY/MM/DD &bullet; hh:mm A') }}
      </span>
      <div
        v-else
        class="PatientRecordsRecord__badge ongoing">
        {{ $t('global.ongoing') }}
      </div>
    </td>
    <td class="PatientRecordsRecord__cell">
      <div
        class="PatientRecordsRecord__badge"
        :class="typeBadgeClass">
        {{ typeBadgeLabel }}
      </div>
    </td>
    <td class="PatientRecordsRecord__cell">
      <specialist-card
        v-if="record.type === 'manually'"
        :specialist="record.createdBy"
        :show-role="true">
      </specialist-card>
      <div
        v-else
        class="PatientRecordsRecord__created-by-patient">
        {{ $t('global.patient') }}
      </div>
    </td>
    <td class="PatientRecordsRecord__cell">
      <specialist-card
        v-if="record.with"
        :specialist="record.with"
        :show-categories="true">
      </specialist-card>
      <span v-else>&mdash;</span>
    </td>
    <td class="PatientRecordsRecord__cell">
      <router-link
        data-cy="PatientRecordsRecord__record-details"
        :to="detailsRoute">
        <i
          class="icon-angle-right PatientRecordsRecord__action">
        </i>
      </router-link>
    </td>
  </tr>
</template>

<script>
import { USER_ROLE } from '@/constants';
import { duration, pascalToSnakeCase } from '@/utils/filters';
import SpecialistCard from '@/components/global/specialist_card/specialist-card';

const badgeClasses = {
  manually: 'gray',
  scheduled: 'orange',
  usBoard: 'orange',
  urgentCare: 'red',
  call: 'gray'
};

export default {
  name: 'PatientRecordsRecord',
  components: {
    SpecialistCard
  },
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  computed: {
    specialistMedicalCategories() {
      const mc = this.record.bySpecialist.medicalCategories;
      return mc && mc.length ? mc.map(c => c.name).join(', ') : this.$t('global.no_category');
    },
    detailsRoute() {
      return {
        name: 'patient-record',
        params: { patientId: this.$route.params.id, id: this.record.recordId },
        query: this.$route.query
      };
    },
    typeBadgeClass() {
      return `badge-${badgeClasses[this.record.type]}`;
    },
    typeBadgeLabel() {
      return this.$t(`patients.${pascalToSnakeCase(this.record.type)}`);
    }
  },

  methods: {
    openDetails() {
      this.$router.push(this.detailsRoute);
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-records-record.scss";
</style>
