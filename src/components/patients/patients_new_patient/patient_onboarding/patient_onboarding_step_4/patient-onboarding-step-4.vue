<template>
  <div class="PatientOnboardingStep4__wrapper">
    <div class="PatientOnboardingStep4__container">

      <div class="PatientOnboardingStep4__section PatientOnboardingStep4__general-info">
        <div
          class="PatientOnboardingStep4__avatar"
          :style="avatarUrl">
        </div>
        <div class="title-medium PatientOnboardingStep4__name">
          {{ editableBasicInfo.firstName }} {{ editableBasicInfo.lastName }}
        </div>
        <div class="PatientOnboardingStep4__contacts">
          <span v-if="editableBasicInfo.phoneNumber">
            {{ editableBasicInfo.phoneNumber }},
          </span> {{ editableBasicInfo.email }}
        </div>
        <div class="PatientOnboardingStep4__age">
          {{ $t('global.number_of_years_old', [age]) }}
        </div>
      </div>

      <div class="PatientOnboardingStep4__section">
        <div class="PatientOnboardingStep4__section-header">
          <div class="title-medium">
            {{ $t('global.basic_info') }}
          </div>
          <btn
            @onclick="$emit('set-step', 1)"
            btn-class="blue"
            class="PatientOnboardingStep4__section-edit"
            :btn-label="$t('global.edit')">
          </btn>
        </div>
        <div class="PatientOnboardingStep4__section-content">
          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.gender') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ gender }}
            </div>
          </div>

          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.first_name') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ editableBasicInfo.firstName }}
            </div>
          </div>

          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.last_name') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ editableBasicInfo.lastName }}
            </div>
          </div>

          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.dob') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ dateOfBirth }} ({{ age }})
            </div>
          </div>

          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.email_address') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ editableBasicInfo.email }}
            </div>
          </div>
        </div>
      </div>

      <div class="PatientOnboardingStep4__section">
        <div class="PatientOnboardingStep4__section-header">
          <div class="title-medium">
            {{ $t('global.address') }}
          </div>
          <btn
            @onclick="$emit('set-step', 2)"
            btn-class="blue"
            class="PatientOnboardingStep4__section-edit"
            :btn-label="$t('global.edit')">
          </btn>
        </div>
        <div class="PatientOnboardingStep4__section-content">
          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.home_number') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ editableAddress.homeNumber }}
            </div>
          </div>
          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.street') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ editableAddress.street }}
            </div>
          </div>
          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.neighborhood') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ editableAddress.neighborhood }}
            </div>
          </div>
          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.additional_numbers') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ editableAddress.additionalNumbers }}
            </div>
          </div>
          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.city') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ editableAddress.city }}
            </div>
          </div>
          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.postal_code') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ editableAddress.zipCode }}
            </div>
          </div>
          <div class="PatientOnboardingStep4__section-row">
            <div class="PatientOnboardingStep4__section-label">
              {{ $t('global.country') }}
            </div>
            <div class="PatientOnboardingStep4__section-value">
              {{ editableAddress.country }}
            </div>
          </div>
        </div>
      </div>

      <div class="PatientOnboardingStep4__section">
        <div class="PatientOnboardingStep4__section-header">
          <div class="title-medium">
            {{ $t('profile.medical_info') }}
          </div>
          <btn
            @onclick="$emit('set-step', 3)"
            btn-class="blue"
            class="PatientOnboardingStep4__section-edit"
            :btn-label="$t('global.edit')">
          </btn>
        </div>
        <div class="PatientOnboardingStep4__section-content">
          <div
            v-for="block in historySections"
            :key="block.name"
            class="PatientOnboardingStep4__block">
            <div class="title-uppercase PatientOnboardingStep4__block-title">
              {{ $t('health_info.' + block.title) }}
            </div>
            <component
              v-for="(field, index) in block.fields"
              :key="index"
              :is="`form-field-${field.value}`"
              :field="field"
              :edit="false"
              :wide="false">
            </component>
          </div>
        </div>
      </div>
    </div>

    <transition
      name="appear-from-bottom"
      appear>
      <div class="PatientOnboardingStep4__footer">
        <div
          v-if="error"
          class="form-help is-danger PatientOnboardingStep4__error">
          {{ error }}
        </div>
        <div class="form-actions full PatientOnboardingStep4__container">
          <btn
            btn-class="submit"
            @onclick="submit"
            :btn-processing="processing"
            :btn-label="$t('global.confirm')">
          </btn>
        </div>
      </div>
    </transition>
    <span id="recaptcha-container"></span>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FormFields from '@/components/form/form_fields';
import { capitalize } from '@/utils/filters';
import { GENDER } from '@/constants';
import PatientAddedModal from '../patient_added_modal/patient-added-modal';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patient');
export default {
  name: 'PatientOnboardingStep4',

  components: {
    ...FormFields
  },

  data() {
    return {
      error: null,
      processing: false,
      selected: false,
      patientId: this.$route.params.id,
      titles: {
        social: 'social_history',
        medical: 'past_medical_history',
        surgical: 'surgical_history',
        family: 'family_history',
        allergy: 'allergy_history',
        immunization: 'immunization_history'
      }
    };
  },

  computed: {
    ...mapGetters([
      'editableBasicInfo',
      'editableAddress',
      'editableSocialHistory',
      'editableMedicalHistory',
      'editableSurgicalHistory',
      'editableFamilyHistory',
      'editableAllergyHistory',
      'editableImmunizationHistory'
    ]),
    historySections() {
      const sections = [];
      [
        'social',
        'medical',
        'surgical',
        'family',
        'allergy',
        'immunization'
      ].forEach(name => {
        const history = this[`editable${capitalize(name)}History`];
        sections.push({
          fields: (history || {}).fields || [],
          name,
          title: this.titles[name]
        });
      });
      return sections;
    },
    avatarUrl() {
      return { 'background-image': `url(${this.editableBasicInfo.avatarUrl})` };
    },
    gender() {
      return this.$t(`gender.${GENDER[this.editableBasicInfo.gender]}`);
    },
    dateOfBirth() {
      return this.$moment(this.editableBasicInfo.birthDate.timestamp * 1000).format('YYYY/MM/DD');
    },
    age() {
      return this.$moment().diff(this.$moment(this.editableBasicInfo.birthDate.timestamp * 1000), 'years');
    }
  },

  methods: {
    ...mapActions([
      'updatePatientBasicInfo',
      'updatePatientAddress',
      'updatePatientHistories'
    ]),
    async submit() {
      this.processing = true;
      const promises = [
        'updatePatientBasicInfo',
        'updatePatientAddress',
        'updatePatientHistories'
      ].map(method => this[method](this.patientId));
      const response = await Promise.all(promises);
      const errorResponses = response.filter(r => r.error);
      if (errorResponses.length) {
        this.error = errorResponses[0].error;
      } else {
        this.$router.push({ name: 'emr' });
        this.$modal.show(
          PatientAddedModal,
          {
            basicInfo: this.editableBasicInfo
          },
          {
            name: 'patient-added-modal',
            width: 470,
            height: 'auto',
            pivotY: 0.3,
            adaptive: true,
            clickToClose: false,
            transition: 'from-top-to-bottom'
          }
        );
      }
      this.processing = false;
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-onboarding-step-4.scss";
</style>
