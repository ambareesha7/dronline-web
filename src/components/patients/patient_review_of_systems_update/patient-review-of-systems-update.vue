
<template>
  <fullscreen-modal-wrapper
    :title="$t('health_info.review_of_systems')"
    @close="$emit('close')">
    <div class="PatientReviewOfSystemsUpdate__section shaded-outline">
      <div class="PatientReviewOfSystemsUpdate__section-content">
        <review-of-systems-form
          :form-fields="editableReviewOfSystem.form.fields"
          :grid="false"
          :edit="true"
          @set-field="setEditableReviewOfSystemField">
        </review-of-systems-form>
      </div>
    </div>

    <div slot="footer">
      <div class="form-actions full PatientReviewOfSystemsUpdate__footer-content">
        <btn
          @onclick="$emit('close')"
          btn-class="cancel"
          :btn-label="$t('global.cancel')">
        </btn>

        <btn
          @onclick="submit"
          btn-class="blue-filled"
          :btn-label="$t('global.submit')">
        </btn>
      </div>
    </div>
  </fullscreen-modal-wrapper>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FullscreenModalWrapper from '@/components/global/fullscreen_modal_wrapper/fullscreen-modal-wrapper';
import ReviewOfSystemsForm from '@/components/form/review_of_systems_form/review-of-systems-form';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('patient');
export default {
  name: 'PatientReviewOfSystemsUpdate',
  components: {
    FullscreenModalWrapper,
    ReviewOfSystemsForm
  },
  props: {
    patientId: {
      required: true
    }
  },
  data() {
    return {
      processing: false
    };
  },
  computed: {
    ...mapGetters([
      'editableReviewOfSystem'
    ])
  },
  created() {
    this.setEditableReviewOfSystem();
  },
  destroyed() {
    this.clearEditableReviewOfSystem();
  },
  methods: {
    ...mapActions([
      'updateReviewOfSystems'
    ]),
    ...mapMutations([
      'setEditableReviewOfSystem',
      'clearEditableReviewOfSystem',
      'setEditableReviewOfSystemField'
    ]),
    async submit() {
      await this.updateReviewOfSystems(this.patientId);
      this.$emit('close');
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-review-of-systems-update.scss";
</style>
