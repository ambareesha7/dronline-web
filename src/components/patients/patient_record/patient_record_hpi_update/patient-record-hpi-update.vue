<template>
  <fullscreen-modal-wrapper
    :title="$t('global.hpi_full')"
    @close="$emit('close')">
    <div class="PatientRecordHpiUpdate__section shaded-outline">
      <div
        v-for="(field, index) in editableHpi.fields"
        :key="index"
        class="PatientRecordHpiUpdate__block"
        :data-index="index + 1">
        <component
          :is="`form-field-${field.value}`"
          :field="field"
          :edit="true"
          :vertical="true"
          field-type="textarea"
          @set-field="field => setEditableHpiField({field, index})">
        </component>
      </div>
    </div>
    <div slot="footer">
      <div
        v-if="error"
        class="form-row form-help is-danger PatientRecordHpiUpdate__footer-content">
        {{ error }}
      </div>
      <div class="form-actions full PatientRecordHpiUpdate__footer-content">
        <btn
          @onclick="$emit('close')"
          btn-class="cancel"
          :btn-label="$t('global.cancel')">
        </btn>
        <btn
          @onclick="submit"
          btn-class="submit"
          :btn-label="$t('global.save')">
        </btn>
      </div>
    </div>
  </fullscreen-modal-wrapper>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FullscreenModalWrapper from '@/components/global/fullscreen_modal_wrapper/fullscreen-modal-wrapper';
import FormFields from '@/components/form/form_fields';

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('patient');

export default {
  name: 'PatientRecordHpiUpdate',

  components: {
    FullscreenModalWrapper,
    ...FormFields
  },

  data() {
    return {
      patientId: this.$route.params.patientId,
      recordId: this.$route.params.id,
      error: null
    };
  },

  computed: {
    ...mapGetters(['hpi', 'editableHpi'])
  },

  async beforeMount() {
    await this.fetchPatientHPI({
      patient_id: this.patientId,
      record_id: this.recordId
    });
    this.setEditableHpi();
  },

  destroyed() {
    this.clearEditableSection();
  },

  methods: {
    ...mapActions([
      'fetchPatientHPI',
      'updateHpi'
    ]),
    ...mapMutations([
      'setEditableHpi',
      'setEditableHpiField'
    ]),
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.updateHpi({
            patient_id: this.patientId,
            record_id: this.recordId,
            form: {
              hpi: this.editableHpi
            }
          }).then(({ error }) => {
            if (error) {
              this.error = error;
            } else {
              this.$emit('close');
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-record-hpi-update.scss";
</style>
