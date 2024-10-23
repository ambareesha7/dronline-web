<template>
  <div class="PatientOnboardingStep3__wrapper">
    <transition name="appear-from-top">
      <div
        v-if="showPrompt"
        class="PatientOnboardingStep3__header-prompt">
        {{ $t('global.provide_missing_info_marked_red') }}
      </div>
    </transition>
    <div class="PatientOnboardingStep3__container">
      <div
        class="PatientOnboardingStep3__section"
        v-for="section in historySections"
        :key="section.name"
        :ref="section.name">
        <div class="PatientOnboardingStep3__section-header">
          <div class="title-medium">
            {{ $t('health_info.' + section.title) }}
          </div>
          <div class="PatientOnboardingStep3__section-header-col">
            <div
              v-if="scopesWithErrors.includes(section.name)"
              class="badge-orange">
              {{ $t('global.missing') }}
            </div>
            <i
              class="icon-caret PatientOnboardingStep3__section-toggle"
              :class="{ active: selected === section.name }"
              @click="toggle(section.name)"></i>
          </div>
        </div>
        <form
          v-show="selected === section.name"
          class="PatientOnboardingStep3__section-content"
          :data-vv-scope="section.name">
          <component
            v-for="(field, index) in section.fields"
            :key="index"
            :is="`form-field-${field.value}`"
            :field="field"
            :edit="true"
            :wide="false"
            @set-field="field => setEditableHistoryField({ section: section.name, field, index})">
          </component>
        </form>
      </div>
    </div>

    <transition
      name="appear-from-bottom"
      appear>
      <div class="PatientOnboardingStep3__footer">
        <div class="form-actions full PatientOnboardingStep3__container">
          <btn
            btn-class="blue"
            @onclick="$emit('set-step', 2)"
            :btn-label="$t('global.back')">
          </btn>
          <btn
            btn-class="submit"
            @onclick="submit"
            :btn-label="$t('global.next')">
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
import { delayedCalls } from '@/utils';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patient');
export default {
  name: 'PatientOnboardingStep3',

  components: {
    ...FormFields
  },

  data() {
    return {
      showPrompt: false,
      selected: false,
      patientId: this.$route.params.id,
      historyTypes: [
        'social',
        'medical',
        'surgical',
        'family',
        'allergy',
        'immunization'
      ],
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
      'editableSocialHistory',
      'editableMedicalHistory',
      'editableSurgicalHistory',
      'editableFamilyHistory',
      'editableAllergyHistory',
      'editableImmunizationHistory'
    ]),
    historySections() {
      const sections = [];
      this.historyTypes.forEach(name => {
        const editableName = `editable${capitalize(name)}History`;
        sections.push({
          fields: this[editableName] ? this[editableName].fields : [],
          name,
          title: this.titles[name]
        });
      });
      return sections;
    },
    scopesWithErrors() {
      const scopes = [];
      this.errors.items.forEach(error => {
        if (!scopes.includes(error.scope)) scopes.push(error.scope);
      });
      return scopes;
    }
  },

  async beforeMount() {
    await this.fetchPatientHistory(this.patientId);
    this.setEditableHistories();
    this.$validator.validateAll();
  },

  methods: {
    ...mapActions([
      'fetchPatientHistory'
    ]),
    ...mapMutations([
      'setEditableHistories',
      'setEditableHistoryField'
    ]),
    async submit() {
      const promises = this.historyTypes.map(section => this.$validator.validateAll(section));
      await Promise.all(promises);
      if (!this.errors.items.length) {
        this.$emit('set-step', 4);
      } else {
        delayedCalls(() => {
          this.showPrompt = !this.showPrompt;
        }, [0, 3000]);
      }
    },

    toggle(section) {
      this.selected = this.selected === section ? null : section;
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-onboarding-step-3.scss";
</style>
