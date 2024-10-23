<template>
  <div
    class="PatientRecordOverview__wrapper shaded-outline"
    data-cy="PatientRecord__overview">
    <div class="PatientRecordOverview__header">
      <div class="title-medium">
        {{ $t('global.overview') }}
      </div>
    </div>
    <div
      class="PatientRecordOverview__content"
      v-if="record">
      <div class="PatientRecordOverview__section">
        <div class="PatientRecordOverview__section-row">
          <div class="PatientRecordOverview__section-col">
            <div class="title-uppercase">
              {{ $t('global.start_date') }}
            </div>
            <div class="PatientRecordOverview__value">
              {{ record.startDate.timestamp | moment('YYYY/MM/DD') }}
            </div>
          </div>
          <div class="PatientRecordOverview__section-col">
            <div class="title-uppercase">
              {{ $t('global.end_date') }}
            </div>
            <div
              v-if="record.endDate"
              class="PatientRecordOverview__value">
              {{ record.endDate.timestamp | moment('YYYY/MM/DD') }}
            </div>
            <div
              v-else
              class="badge-orange"
              data-cy="PatientRecord__ongoing-badge">
              {{ $t('global.ongoing') }}
            </div>
          </div>
        </div>
        <div class="PatientRecordOverview__section-row">
          <div class="PatientRecordOverview__section-col">
            <div class="title-uppercase">
              {{ $t('global.type') }}
            </div>
            <div class="PatientRecordOverview__value">
              <div :class="typeBadgeClass">
                {{ typeBadgeLabel }}
              </div>
            </div>
          </div>
          <div class="PatientRecordOverview__section-col">
            <div class="title-uppercase">
              {{ $t('global.created_by') }}
            </div>
            <div class="PatientRecordOverview__value">
              <specialist-card
                v-if="record.type === 'manually'"
                :specialist="record.createdBy"
                :show-role="true">
              </specialist-card>
              <div v-else>
                {{ $t('global.patient') }}
              </div>
            </div>
          </div>
        </div>
        <div class="PatientRecordOverview__section-row">
          <div class="PatientRecordOverview__section-col">
            <div class="title-uppercase">
              {{ $t('global.with_whom') }}
              <i
                class="PatientRecordOverview__tooltip-icon"
                @mouseenter="showTooltip = true"
                @mouseleave="showTooltip = false">
                ?
                <transition name="fade">
                  <div
                    class="PatientRecordOverview__tooltip"
                    v-if="showTooltip">
                    <div class="badge-red">
                      {{ $t('patients.urgent_care') }}
                    </div>
                    <div
                      class="PatientRecordOverview__tooltip-text"
                      v-html="$t('patients.urgent_care_tip')">
                    </div>
                  </div>
                </transition>
              </i>
            </div>
            <div class="PatientRecordOverview__value">
              <specialist-card
                v-if="record.with"
                :specialist="record.with"
                :show-categories="true">
              </specialist-card>
              <span v-else>&mdash;</span>
            </div>
          </div>
          <div class="PatientRecordOverview__section-col"></div>
        </div>
        <div class="PatientRecordOverview__section-row">
          <div class="PatientRecordOverview__section-col">
            <div class="title-uppercase">
              {{ $t('global.patient') }}
            </div>
            <div class="PatientRecordOverview__value">
              {{ patientName }}
            </div>
          </div>
          <div class="PatientRecordOverview__section-col">
            <div class="title-uppercase">
              {{ $t('global.category') }}
            </div>
            <div
              v-for="(category, index) in medicalCategories"
              :key="index"
              class="PatientRecordOverview__value">
              {{ category }}
            </div>
          </div>
        </div>
      </div>

      <div class="PatientRecordOverview__section">
        <div class="title-uppercase">
          {{ $t('global.specialists') }}
        </div>
        <div class="PatientRecordOverview__specialists">
          <specialist-card
            v-for="(specialist, index) in timelineSpecialists"
            :key="index"
            :specialist="specialist"
            :show-role="true">
          </specialist-card>
          <div
            v-if="!timelineSpecialists.length"
            class="PatientRecordOverview__value">
            &ndash;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { duration, pascalToSnakeCase } from '@/utils/filters';
import { USER_ROLE } from '@/constants';
import SpecialistCard from '@/components/global/specialist_card/specialist-card';

const badgeClasses = {
  manually: 'gray',
  scheduled: 'orange',
  urgentCare: 'red'
};

export default {
  name: 'PatientRecordOverview',
  components: {
    SpecialistCard
  },
  data() {
    return {
      showTooltip: false
    };
  },
  computed: {
    ...mapGetters('patientRecords', ['record']),
    ...mapGetters('patientTimeline', ['timelineSpecialists']),
    ...mapGetters('patient', ['basicInfo']),
    patientName() {
      if (!this.basicInfo) return null;
      return `${this.basicInfo.firstName} ${this.basicInfo.lastName}`;
    },
    medicalCategories() {
      let medicalCategories = [];
      (this.timelineSpecialists || []).forEach(s => {
        medicalCategories = medicalCategories.concat(s.medicalCategories.map(c => c.name));
      });
      if (!medicalCategories.length) medicalCategories.push(this.$t('global.general_medicine'));
      return medicalCategories;
    },
    typeBadgeClass() {
      if (!this.record) return null;
      return `badge-${badgeClasses[this.record.type]}`;
    },
    typeBadgeLabel() {
      if (!this.record) return null;
      return this.$t(`patients.${pascalToSnakeCase(this.record.type)}`);
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.setRecord(null);
  },
  methods: {
    ...mapActions('patientRecords', ['fetchPatientRecord']),
    ...mapMutations('patientRecords', ['setRecord']),
    ...mapActions('patient', ['fetchPatientBasicInfo']),
    init() {
      this.fetchPatientRecord({
        patient_id: this.$route.params.patientId,
        record_id: this.$route.params.id
      });
      this.fetchPatientBasicInfo(this.$route.params.patientId);
    },
    getSpecialistRole(type) {
      return this.$t(`user_roles.${USER_ROLE[type]}`);
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-record-overview.scss";
</style>
