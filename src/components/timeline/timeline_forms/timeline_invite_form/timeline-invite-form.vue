<template>
  <transition
    name="appear-from-bottom"
    appear>
    <div class="TimelineInviteForm__wrapper">
      <div class="TimelineInviteForm__header">
        <div class="TimelineInviteForm__title">
          <i class="icon_invite TimelineInviteForm__title-icon"></i>
          {{ $t('call_room.invite_specialist') }}
        </div>
        <div
          class="TimelineInviteForm__close"
          @click="close">
          <i class="icon-close"></i>
        </div>
      </div>

      <div class="TimelineInviteForm__content custom-scrollbar-container">

        <timeline-invite-form-invitation
          class="TimelineInviteForm__section"
          :medical-categories="medicalCategories"
          @reset="reset()"
          @select="selectCategory"
          @clear="clearSpecialists">
        </timeline-invite-form-invitation>

        <div
          v-if="category"
          class="TimelineInviteForm__specialists-section">
          <div class="title-uppercase">
            {{ $t('call_room.available_specialists_online') }}
          </div>
          <spinner v-if="fetchingSpecialists"></spinner>
          <transition-group
            appear
            name="appear-from-bottom"
            mode="out-in"
            tag="div"
            v-else-if="specialists.length"
            class="TimelineInviteForm__specialists-section-list">
            <specialist-card
              v-for="(specialist, index) in specialists"
              :key="index"
              :specialist="specialist"
              :online="specialistsPresences.includes(specialist.id)">
            </specialist-card>
          </transition-group>
          <div
            v-else
            class="TimelineInviteForm__specialists-section-no-result">
            {{ $t('call_room.no_available_specialists') }}
          </div>
        </div>
      </div>

      <div class="TimelineInviteForm__footer">
        <div
          v-if="error"
          class="form-help is-danger TimelineInviteForm__footer-error">
          {{ error }}
        </div>
        <div class="form-actions TimelineInviteForm__footer-actions">
          <btn
            @onclick="close"
            btn-class="cancel"
            class="TimelineInviteForm__cancel"
            :btn-label="$t('global.cancel')">
          </btn>

          <btn
            @onclick="submit"
            btn-class="blue-filled"
            class="TimelineInviteForm__submit"
            :btn-label="$t('call_room.invite_specialist')"
            :btn-processing="processing">
          </btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import SpecialistCard from '@/components/global/specialist_card/specialist-card';
import { charsLeft } from '@/utils/filters';
import api from '@/api';
import { decode } from '@/utils/proto';
import categoryHelper from '@/utils/categoryHelper';
import TimelineInviteFormInvitation from './timeline_invite_form_invitation/timeline-invite-form-invitation';

export default {
  name: 'TimelineInviteForm',

  components: {
    SpecialistCard,
    TimelineInviteFormInvitation
  },

  props: {
    patientId: {
      required: true
    }
  },

  data() {
    return {
      category: null,
      processing: false,
      error: null,
      fetchingSpecialists: false
    };
  },

  computed: {
    ...mapGetters('call', [
      'sessionId',
      'callId'
    ]),
    ...mapGetters('medicalCategories', [
      'medicalCategories'
    ]),
    ...mapGetters('specialists', [
      'specialists',
      'specialistsPresences'
    ])
  },

  methods: {
    ...mapMutations('patientTimeline', [
      'setOpenedForm'
    ]),
    ...mapMutations('specialists', [
      'clearSpecialists'
    ]),
    ...mapActions('patientTimeline', [
      'inviteSpecialist'
    ]),
    ...mapActions('specialists', [
      'fetchSpecialistsInCategory'
    ]),

    close() {
      this.setOpenedForm(null);
    },

    reset() {
      this.category = null;
    },

    async selectCategory(category) {
      this.category = category;
      this.clearSpecialists();
      this.fetchingSpecialists = true;
      await this.fetchSpecialistsInCategory(category.id);
      this.fetchingSpecialists = false;
    },

    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.inviteSpecialist({
            categoryId: this.category.id,
            patientId: this.patientId,
            currentSessionId: this.sessionId,
            callId: this.callId
          });
          this.setOpenedForm(null);
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "timeline-invite-form.scss";
</style>
