<template>
  <div class="TimelineEntityProvidedHpi__wrapper">

    <div class="TimelineEntityProvidedHpi__header">
      <div class="TimelineEntityProvidedHpi__header-col">
        <div
          v-if="entity.specialist"
          class="TimelineEntityProvidedHpi__header-row">
          <div class="TimelineEntityProvidedHpi__specialist-card">
            <div
              class="TimelineEntityProvidedHpi__specialist-card-avatar"
              :style="specialistAvatar">
            </div>
            <div class="TimelineEntityProvidedHpi__specialist-card-info">
              <div class="TimelineEntityProvidedHpi__specialist-card-name">
                {{ entity.specialist.firstName }} {{ entity.specialist.lastName }}
              </div>
              <div class="TimelineEntityProvidedHpi__specialist-card-role">
                {{ specialistRole }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="TimelineEntityProvidedHpi__header-col">
        <div class="TimelineEntityProvidedHpi__title">
          {{ $t('call_room.provided_hpi') }}
        </div>
        <div class="TimelineEntityProvidedHpi__time">
          {{ entity.timestamp | moment('YYYY/MM/DD hh:mm A') }}
        </div>
      </div>
    </div>

    <div class="TimelineEntityProvidedHpi__content">
      <div
        v-for="(field, index) in entity.providedHpi.hpi.form.fields"
        :key="index"
        class="TimelineEntityProvidedHpi__section"
        :data-index="index + 1">
        <component
          :is="`form-field-${field.value}`"
          :field="field"
          :edit="false"
          :vertical="true">
        </component>
      </div>
    </div>
    <div
      v-if="!inCall"
      class="TimelineEntityProvidedHpi__footer">
      <btn
        @onclick="showHistory"
        btn-class="blue"
        class="TimelineEntityProvidedHpi__footer-action"
        :btn-label="$t('global.see_history')">
      </btn>
      <btn
        v-if="latestHpi"
        @onclick="editHpi"
        btn-class="blue"
        class="TimelineEntityProvidedHpi__footer-action"
        :btn-label="$t('global.edit')">
      </btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { USER_ROLE } from '@/constants';
import FormFields from '@/components/form/form_fields';
import PatientRecordHpiHistory from '@/components/patients/patient_record/patient_record_hpi_history/patient-record-hpi-history';
import PatientRecordHpiUpdate from '@/components/patients/patient_record/patient_record_hpi_update/patient-record-hpi-update';

const { mapGetters, mapMutations } = createNamespacedHelpers('patientTimeline');
export default {
  name: 'TimelineEntityProvidedHpi',

  components: {
    ...FormFields
  },

  props: {
    entity: {
      required: true,
      type: Object
    },
    inCall: {
      type: Boolean,
      default: true
    },
    latestHpi: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    specialistRole() {
      if (!this.entity.specialist) return null;
      return this.$t(`user_roles.${USER_ROLE[this.entity.specialist.type]}`);
    },
    specialistAvatar() {
      if (!this.entity.specialist) return null;
      return {'background-image': `url(${this.entity.specialist.avatarUrl})`};
    }
  },

  methods: {
    ...mapMutations(['setOpenedForm']),
    showHistory() {
      this.$modal.show(
        PatientRecordHpiHistory,
        {},
        {
          name: 'patient-record-hpi-history',
          width: '100%',
          height: '100%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        }
      );
    },
    editHpi() {
      this.$modal.show(
        PatientRecordHpiUpdate,
        {},
        {
          name: 'patient-record-hpi-update',
          width: '100%',
          height: '100%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-provided-hpi.scss";
</style>
