<template>
  <div class="CallRoomDashboardInformation__wrapper">

    <div class="CallRoomDashboardInformation__content custom-scrollbar-container">

      <div class="CallRoomDashboardInformation__block">
        <div class="CallRoomDashboardInformation__block-header">
          <div class="CallRoomDashboardInformation__block-title">
            {{ $t('global.basic_info') }}
          </div>
        </div>

        <div class="CallRoomDashboardInformation__block-content">
          <div class="CallRoomDashboardInformation__section-title">
            {{ $t('call_room.personal_info') }}
          </div>
          <div
            v-if="basicInfo"
            class="CallRoomDashboardInformation__section-content">
            <div class="form-row--cols CallRoomDashboardInformation__section-row">
              <div class="form-col CallRoomDashboardInformation__section-row-label">
                {{ $t('global.gender') }}
              </div>
              <div
                class="form-col CallRoomDashboardInformation__section-row-value"
                v-html="gender || '&mdash;'">
              </div>
            </div>
            <div class="form-row--cols CallRoomDashboardInformation__section-row">
              <div class="form-col CallRoomDashboardInformation__section-row-label">
                {{ $t('global.first_name') }}
              </div>
              <div
                class="form-col CallRoomDashboardInformation__section-row-value"
                v-html="basicInfo.firstName || '&mdash;'">
              </div>
            </div>
            <div class="form-row--cols CallRoomDashboardInformation__section-row">
              <div class="form-col CallRoomDashboardInformation__section-row-label">
                {{ $t('global.last_name') }}
              </div>
              <div
                class="form-col CallRoomDashboardInformation__section-row-value"
                v-html="basicInfo.lastName || '&mdash;'">
              </div>
            </div>
            <div class="form-row--cols CallRoomDashboardInformation__section-row">
              <div class="form-col CallRoomDashboardInformation__section-row-label">
                {{ $t('global.dob') }}
              </div>
              <div
                class="form-col CallRoomDashboardInformation__section-row-value"
                v-html="dateOfBirth || '&mdash;'">
              </div>
            </div>
          </div>
          <div
            v-else
            class="CallRoomDashboardInformation__section-processing">
            <spinner></spinner>
          </div>
        </div>

        <div class="CallRoomDashboardInformation__block-content">
          <div class="CallRoomDashboardInformation__section-title">
            {{ $t('global.address') }}
          </div>
          <div
            v-if="address"
            class="CallRoomDashboardInformation__section-content">
            <div class="form-row--cols CallRoomDashboardInformation__section-row">
              <div class="form-col CallRoomDashboardInformation__section-row-label">
                {{ $t('global.city') }}
              </div>
              <div
                class="form-col CallRoomDashboardInformation__section-row-value"
                v-html="address.city || '&mdash;'">
              </div>
            </div>
            <div class="form-row--cols CallRoomDashboardInformation__section-row">
              <div class="form-col CallRoomDashboardInformation__section-row-label">
                {{ $t('global.street') }}
              </div>
              <div
                class="form-col CallRoomDashboardInformation__section-row-value"
                v-html="address.street || '&mdash;'">
              </div>
            </div>
            <div class="form-row--cols CallRoomDashboardInformation__section-row">
              <div class="form-col CallRoomDashboardInformation__section-row-label">
                {{ $t('global.home_number') }}
              </div>
              <div
                class="form-col CallRoomDashboardInformation__section-row-value"
                v-html="address.homeNumber || '&mdash;'">
              </div>
            </div>
            <div class="form-row--cols CallRoomDashboardInformation__section-row">
              <div class="form-col CallRoomDashboardInformation__section-row-label">
                {{ $t('global.postal_code') }}
              </div>
              <div
                class="form-col CallRoomDashboardInformation__section-row-value"
                v-html="address.postalCode || '&mdash;'">
              </div>
            </div>
            <div class="form-row--cols CallRoomDashboardInformation__section-row">
              <div class="form-col CallRoomDashboardInformation__section-row-label">
                {{ $t('global.country') }}
              </div>
              <div
                class="form-col CallRoomDashboardInformation__section-row-value"
                v-html="address.country || '&mdash;'">
              </div>
            </div>
          </div>
          <div
            v-else
            class="CallRoomDashboardInformation__section-processing">
            <spinner></spinner>
          </div>
        </div>
      </div>

      <div
        v-if="editableHpi && callType != 2"
        class="CallRoomDashboardInformation__block">
        <div class="CallRoomDashboardInformation__block-header">
          <div class="CallRoomDashboardInformation__block-title">
            {{ $t('health_info.hpi') }}
          </div>
          <transition
            appear
            name="appear-from-top"
            mode="out-in">
            <btn
              v-if="!editMode"
              @onclick="toggleEdit"
              btn-class="blue"
              class="CallRoomDashboardInformation__block-header-action"
              :btn-label="$t('global.edit')">
            </btn>
          </transition>
        </div>

        <transition
          name="slide-right-to-left"
          mode="out-in">
          <div
            class="CallRoomDashboardInformation__hpi-content"
            :key="editMode"
            :class="{ edit: editMode }">
            <div
              v-for="(field, index) in editableHpi.fields"
              :key="index"
              class="CallRoomDashboardInformation__section"
              :data-index="index + 1">
              <component
                :is="`form-field-${field.value}`"
                :field="field"
                :edit="editMode"
                :vertical="true"
                @set-field="field => setEditableHpiField({field, index})">
              </component>
            </div>
            <div
              v-if="editMode"
              class="form-actions full">
              <btn
                @onclick="toggleEdit"
                btn-class="cancel"
                :btn-label="$t('global.cancel')">
              </btn>
              <btn
                @onclick="submit"
                btn-class="submit"
                :btn-processing="processing"
                :btn-label="$t('global.save')">
              </btn>
            </div>
          </div>
        </transition>
      </div>

      <div 
        v-if="callType != 2"
        class="CallRoomDashboardInformation__block">
        <div class="CallRoomDashboardInformation__block-header">
          <div class="CallRoomDashboardInformation__block-title">
            {{ $t('health_info.review_of_systems') }}
          </div>
          <btn
            v-if="isGP || isNurse"
            @onclick="toggleAddReviewOfSystems"
            btn-class="blue"
            class="CallRoomDashboardInformation__block-header-action"
            :btn-label="$t('global.update')">
          </btn>
        </div>
        <div class="CallRoomDashboardInformation__block-content">
          <review-of-systems-form
            :form-fields="reviewOfSystem.form.fields"
            :grid="false">
          </review-of-systems-form>
        </div>
        <transition
          name="appear-from-bottom"
          appear>
          <div
            v-if="showReviewOfSystemsForm"
            class="CallRoomDashboardInformation__add-ros-form">
            <div class="CallRoomDashboardInformation__add-ros-form-header">
              <div class="CallRoomDashboardInformation__add-ros-form-title">
                <i class="icon_invite CallRoomDashboardInformation__add-ros-form-title-icon"></i>
                {{ $t('health_info.review_of_systems') }}
              </div>
              <div
                class="CallRoomDashboardInformation__add-ros-form-close"
                @click="toggleAddReviewOfSystems">
                <i class="icon-close"></i>
              </div>
            </div>

            <div class="CallRoomDashboardInformation__add-ros-form-content
              custom-scrollbar-container">
              <review-of-systems-form
                :form-fields="editableReviewOfSystem.form.fields"
                :grid="false"
                :edit="true"
                @set-field="setEditableReviewOfSystemField">
              </review-of-systems-form>
            </div>

            <div class="CallRoomDashboardInformation__add-ros-form-footer">
              <div class="form-actions CallRoomDashboardInformation__add-ros-form-footer-actions">
                <btn
                  @onclick="toggleAddReviewOfSystems"
                  btn-class="cancel"
                  class="CallRoomDashboardInformation__add-ros-form-cancel"
                  :btn-label="$t('global.cancel')">
                </btn>

                <btn
                  @onclick="addReviewOfSystems"
                  btn-class="blue-filled"
                  class="CallRoomDashboardInformation__add-ros-form-submit"
                  :btn-label="$t('global.submit')">
                </btn>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div 
        v-if="callType == 2"
        class="CallRoomDashboardInformation__block">
        <div class="CallRoomDashboardInformation__block-header">
          <div class="CallRoomDashboardInformation__block-title">
            {{ $t('health_info.us_board') }}
          </div>
        </div>

        <us-board-second-opinion-details :details="callDetails"/>
        
      </div>

      <div 
        v-if="callType != 2"
        class="CallRoomDashboardInformation__block">
        <div class="CallRoomDashboardInformation__block-header">
          <div class="CallRoomDashboardInformation__block-title">
            {{ $t('health_info.vitals') }}
          </div>
        </div>

        <!-- <bmi-form-section
          :patient-id="recipientPatientId">
        </bmi-form-section> -->
      </div>

      <div class="CallRoomDashboardInformation__block">
        <div class="CallRoomDashboardInformation__block-header">
          <div class="CallRoomDashboardInformation__block-title">
            {{ $t('health_info.medical_history') }}
          </div>
        </div>

        <form-section
          v-for="section in historySections"
          :key="section"
          :section-name="section"
          block-name="histories"
          :patient-id="recipientPatientId">
          <span
            class="CallRoomDashboardInformation__section-title"
            v-if="titles.histories[section]"
            slot="title">
            {{ $t('health_info.' + titles.histories[section]) }}
          </span>
        </form-section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import api from '@/api';
import { decode } from '@/utils/proto';
import FormSection from '@/components/form/form_section/form-section';
import FormFields from '@/components/form/form_fields';
import ReviewOfSystemsForm from '@/components/form/review_of_systems_form/review-of-systems-form';
import { GENDER } from '@/constants';
import UsBoardSecondOpinionDetails from '@/components/us_board/us-board-second-opinion-details';

export default {
  name: 'CallRoomDashboardInformation',

  components: {
    FormSection,
    ReviewOfSystemsForm,
    ...FormFields,
    UsBoardSecondOpinionDetails
  },

  data() {
    return {
      titles: {
        histories: {
          social: 'social_history',
          medical: 'past_medical_history',
          surgical: 'surgical_history',
          family: 'family_history',
          allergy: 'allergy_history'
        }
      },
      editMode: false,
      processing: false,
      address: null,
      descendents: null,
      showReviewOfSystemsForm: false
    };
  },

  computed: {
    ...mapGetters('call', [
      'recipientPatientId',
      'callType',
      'callDetails'
    ]),
    ...mapGetters('patient', [
      'basicInfo',
      'histories',
      'hpi',
      'editableHpi',
      'reviewOfSystem',
      'editableReviewOfSystem'
    ]),
    ...mapGetters('patientTimeline', [
      'recordId'
    ]),
    ...mapGetters('profile', [
      'isGP',
      'isNurse'
    ]),
    historySections() {
      return Object.keys(this.histories);
    },
    hpiSections() {
      return Object.keys(this.hpi.form);
    },
    dateOfBirth() {
      if (!this.basicInfo) return null;
      const dob = this.$moment.utc(this.basicInfo.birthDate.timestamp * 1000).format('YYYY/MM/DD');
      const age = this.$moment().diff((this.basicInfo.birthDate.timestamp * 1000), 'years');
      return `${dob} (${age})`;
    },

    gender() {
      if (!this.basicInfo) return null;
      return this.$t(`gender.${GENDER[this.basicInfo.gender]}`);
    }
  },

  created() {
    this.init();
  },

  destroyed() {
    this.clearEditableSection();
    this.clearReviewOfSystem();
  },

  methods: {
    ...mapActions('patient', [
      'fetchPatientHistory',
      'fetchPatientHPI',
      'updateHpi',
      'fetchPatientReviewOfSystem',
      'updateReviewOfSystems',
      'fetchPatientBasicInfo',
      'fetchPatientRelationships'
    ]),
    ...mapMutations('patient', [
      'clearEditableSection',
      'setEditableHpiField',
      'setEditableHpi',
      'clearReviewOfSystem',
      'setEditableReviewOfSystem',
      'clearEditableReviewOfSystem',
      'setEditableReviewOfSystemField',
      'crearPatientBasicInfo'
    ]),

    async fetchAddress() {
      const data = await api.fetchPatientAddress(this.recipientPatientId);
      const response = decode('GetAddressResponse', data);
      this.address = response.address;
    },
    async init() {
      this.fetchPatientRelationships(this.recipientPatientId); // in use by call-initialization.vue
      this.fetchPatientBasicInfo(this.recipientPatientId);
      this.fetchAddress();
      this.fetchPatientHistory(this.recipientPatientId);
      // this.fetchPatientBMI(this.recipientPatientId);
      this.fetchPatientReviewOfSystem(this.recipientPatientId);
      await this.fetchPatientHPI({
        patient_id: this.recipientPatientId,
        record_id: this.recordId
      });
      this.setEditableHpi();
    },
    toggleEdit() {
      this.editMode = !this.editMode;
      if (!this.editMode) this.setEditableHpi();
    },
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.updateHpi({
            patient_id: this.recipientPatientId,
            record_id: this.recordId,
            form: {
              hpi: this.editableHpi
            }
          }).then(({ error }) => {
            if (error) {
              this.error = error;
            } else {
              this.toggleEdit();
            }
            this.processing = false;
          });
        }
      });
    },
    toggleAddReviewOfSystems() {
      this.showReviewOfSystemsForm = !this.showReviewOfSystemsForm;
      if (this.showReviewOfSystemsForm) this.setEditableReviewOfSystem();
      else this.clearEditableReviewOfSystem();
    },
    async addReviewOfSystems() {
      await this.updateReviewOfSystems(this.recipientPatientId);
      this.toggleAddReviewOfSystems();
    }
  }
};
</script>

<style lang="scss">
@import "call-room-dashboard-information.scss";
</style>
