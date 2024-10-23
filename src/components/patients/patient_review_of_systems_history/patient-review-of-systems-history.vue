
<template>
  <fullscreen-modal-wrapper
    :title="$t('health_info.review_of_systems_history')"
    @close="$emit('close')">
    <div
      class="PatientReviewOfSystemsHistory__section shaded-outline"
      v-for="(section, index) in reviewOfSystemHistory"
      :key="index">
      <div class="PatientReviewOfSystemsHistory__section-header">
        <div class="PatientReviewOfSystemsHistory__section-title">
          {{ section.insertedAt | moment('YYYY/MM/DD hh:mm A') }}
        </div>
        <i
          class="icon-caret PatientReviewOfSystemsHistory__section-toggle"
          :class="{ active: selected === index }"
          @click="toggle(index)"></i>
      </div>
      <div
        v-if="selected === index"
        class="PatientReviewOfSystemsHistory__section-content">
        <div class="PatientReviewOfSystemsHistory__section-info">
          <div class="title-uppercase">
            {{ $t('health_info.recently_updated_by') }}
          </div>
          <specialist-card
            :specialist="section.specialist"
            :show-role="true">
          </specialist-card>
        </div>
        <review-of-systems-form
          :form-fields="section.form.fields">
        </review-of-systems-form>
      </div>
    </div>
    <spinner v-if="initializing"></spinner>
    <div
      class="form-actions center"
      v-if="reviewOfSystemHistoryNextToken">
      <btn
        @onclick="loadMore"
        btn-class="submit"
        :btn-label="$t('global.load_more')"
        :btn-processing="processing">
      </btn>
    </div>
  </fullscreen-modal-wrapper>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FullscreenModalWrapper from '@/components/global/fullscreen_modal_wrapper/fullscreen-modal-wrapper';
import ReviewOfSystemsForm from '@/components/form/review_of_systems_form/review-of-systems-form';
import SpecialistCard from '@/components/global/specialist_card/specialist-card';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('patient');
export default {
  name: 'PatientReviewOfSystemsHistory',

  components: {
    FullscreenModalWrapper,
    ReviewOfSystemsForm,
    SpecialistCard
  },

  props: {
    patientId: {
      required: true
    }
  },
  data() {
    return {
      selected: null,
      initializing: false,
      processing: false
    };
  },

  computed: {
    ...mapGetters([
      'reviewOfSystemHistory',
      'reviewOfSystemHistoryNextToken'
    ])
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.clearReviewOfSystemHistory();
  },

  methods: {
    ...mapActions(['fetchReviewOfSystemHistory']),
    ...mapMutations(['clearReviewOfSystemHistory']),
    toggle(index) {
      this.selected = this.selected === index ? null : index;
    },
    async init() {
      this.initializing = true;
      await this.fetchReviewOfSystemHistory(this.patientId);
      this.initializing = false;
    },
    async loadMore() {
      this.processing = true;
      await this.fetchReviewOfSystemHistory(this.patientId);
      this.processing = false;
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-review-of-systems-history.scss";
</style>
