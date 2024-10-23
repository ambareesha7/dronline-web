
<template>
  <fullscreen-modal-wrapper
    :title="$t('patients.hpi_history')"
    @close="$emit('close')">
    <div
      class="PatientRecordHpiHistory__section shaded-outline"
      v-for="(section, index) in hpiHistory"
      :key="index">
      <div class="PatientRecordHpiHistory__section-header">
        <div class="PatientRecordHpiHistory__section-title">
          {{ section.insertedAt.timestamp | moment('YYYY/MM/DD hh:mm A') }}
        </div>
        <i
          class="icon-caret PatientRecordHpiHistory__section-toggle"
          :class="{ active: selected === index }"
          @click="toggle(index)"></i>
      </div>
      <div
        v-if="selected === index"
        class="PatientRecordHpiHistory__section-content">
        <div
          v-for="(field, index) in section.form.fields"
          :key="index"
          class="PatientRecordHpiHistory__block"
          :data-index="index + 1">
          <component
            :is="`form-field-${field.value}`"
            :field="field"
            :edit="false"
            :vertical="true">
          </component>
        </div>
      </div>
    </div>
    <div
      v-if="!hpiHistory.length"
      class="PatientRecordHpiHistory__section PatientRecordHpiHistory__no-results">
      {{ $t('patients.hpi_isnt_provided') }}
    </div>
  </fullscreen-modal-wrapper>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FormFields from '@/components/form/form_fields';
import FullscreenModalWrapper from '@/components/global/fullscreen_modal_wrapper/fullscreen-modal-wrapper';

const { mapActions, mapGetters } = createNamespacedHelpers('patient');
export default {
  name: 'PatientRecordHpiHistory',

  components: {
    ...FormFields,
    FullscreenModalWrapper
  },

  data() {
    return {
      patientId: this.$route.params.patientId,
      recordId: this.$route.params.id,
      selected: null
    };
  },

  computed: {
    ...mapGetters(['hpiHistory'])
  },

  mounted() {
    this.fetchHpiHistory({
      patient_id: this.patientId,
      record_id: this.recordId
    });
  },

  methods: {
    ...mapActions(['fetchHpiHistory']),
    toggle(index) {
      this.selected = this.selected === index ? null : index;
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-record-hpi-history.scss";
</style>
