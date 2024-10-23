<template>
  <div class="MedicalSummaryForm__wrapper">
    <transition
      name="slide-right-to-left"
      mode="out-in">
      <div
        v-if="edit"
        key="edit"
        class="MedicalSummaryForm__content">
        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.interview_summary') }}
          </div>
          <div class="form-row">
            <textarea
              :class="{
                'is-danger': errors.has('summary'),
                'filled': interviewSummary
              }"
              v-focus
              key="summary"
              id="summary"
              name="summary"
              class="form-textarea"
              type="text"
              v-model="interviewSummary"
              v-validate="'required|max:1000'"
              data-vv-delay="500"
              :data-vv-as="$t('global.description')"
              ref="summary"
              @keyup.enter="$refs.diagnosis_category.focus()">
            </textarea>
            <label
              for="summary"
              class="form-label label-inner">
              {{ $t('global.description') }}
            </label>
            <span
              v-if="errors.has('summary')"
              class="form-help is-danger">
              {{ errors.first('summary') }}
            </span>
            <div class="form-chars-indicator">
              {{ interviewSummary | charsLeft(500) }}
            </div>
          </div>
        </div>


        <!-- Diagnoses (ICD10) input -->
        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.diagnosis') }}
          </div>
          <div class="form-row">
            <input
              type="number"
              name="conditions"
              class="form-hidden-validator form-field"
              :value="(conditions && conditions.length) || 0"
              v-validate="'required|min_value:1'"
              data-vv-delay="500"
              :data-vv-as="$t('patients.diagnosis')"
            />
            <div :class="{
              'MedicalSummaryForm__LibrarySelect': true
            }">
              <multiselect
                :class="{'is-danger': errors.has('conditions')}"
                v-model="conditions"
                track-by="id"
                :placeholder="$t('patients.diagnosisPlaceholder')"
                open-direction="bottom"
                :options="conditionsOptions"
                :multiple="true"
                :searchable="true"
                :loading="isConditionsOptionsLoading"
                :internal-search="false"
                :clear-on-select="false"
                :close-on-select="false"
                :max-height="600"
                :show-no-results="false"
                :hide-selected="true"
                @search-change="asyncFindConditions"
                @open="asyncFindConditions('')"
                >
                <template slot="tag"
                  slot-scope="{ option, remove }">
                  <div class="MedicalSummaryForm__LibrarySelect__tag">
                    <span class="MedicalSummaryForm__LibrarySelect__tag__title">
                      {{ `${option.id} ${option.name}` }}
                    </span>
                    <span
                      class="MedicalSummaryForm__LibrarySelect__tag__remove"
                      @click="removeConditionsOption(option)">
                      <i class="icon-close-small
                        MedicalSummaryForm__LibrarySelect__tag__remove__icon"></i>
                    </span>
                  </div>
                </template>
                <template slot="option" slot-scope="props">
                  <div class="MedicalSummaryForm__LibrarySelect__option">
                    {{ `${props.option.id} ${props.option.name}` }}
                  </div>
                </template>
                <i
                  class="icon-caret multiselect-caret"
                  slot="caret"
                  slot-scope="{ toggle }"
                  @mousedown.prevent.stop="toggle"></i>
              </multiselect>
            </div>
            <span
              v-show="errors.has('conditions')"
              class="form-help is-danger">
              {{ errors.first('conditions') }}
            </span>
          </div>
        </div>

        <!-- Procedures (CPT) input -->
        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.procedures') }}
          </div>
          <div class="form-row">
            <input
              type="number"
              name="procedures"
              class="form-hidden-validator form-field"
              :value="(procedures && procedures.length) || 0"
              v-validate="'required|min_value:1'"
              data-vv-delay="500"
              :data-vv-as="$t('patients.procedures')"
            />
            <div :class="{
              'MedicalSummaryForm__LibrarySelect': true
            }">
              <multiselect
                :class="{'is-danger': errors.has('procedures')}"
                v-model="procedures"
                track-by="id"
                :placeholder="$t('patients.proceduresPlaceholder')"
                open-direction="bottom"
                :options="proceduresOptions"
                :multiple="true"
                :searchable="true"
                :loading="isProceduresOptionsLoading"
                :internal-search="false"
                :clear-on-select="false"
                :close-on-select="false"
                :max-height="600"
                :show-no-results="false"
                :hide-selected="true"
                @search-change="asyncFindProcedures"
                @open="asyncFindProcedures('')"
                >
                <template slot="tag"
                  slot-scope="{ option, remove }">
                  <div class="MedicalSummaryForm__LibrarySelect__tag">
                    <span class="MedicalSummaryForm__LibrarySelect__tag__title">
                      {{ `${option.id} ${option.name}` }}
                    </span>
                    <span
                      class="MedicalSummaryForm__LibrarySelect__tag__remove"
                      @click="removeProceduresOption(option)">
                      <i class="icon-close-small
                        MedicalSummaryForm__LibrarySelect__tag__remove__icon"></i>
                    </span>
                  </div>
                </template>
                <template slot="option" slot-scope="props">
                  <div class="MedicalSummaryForm__LibrarySelect__option">
                    {{ `${props.option.id} ${props.option.name}` }}
                  </div>
                </template>
                <i
                  class="icon-caret multiselect-caret"
                  slot="caret"
                  slot-scope="{ toggle }"
                  @mousedown.prevent.stop="toggle"></i>
              </multiselect>
            </div>
            <span
              v-show="errors.has('procedures')"
              class="form-help is-danger">
              {{ errors.first('procedures') }}
            </span>
          </div>
        </div>


        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.plan') }}
          </div>
          <div class="form-row">
            <textarea
              :class="{
                'is-danger': errors.has('plan'),
                'filled': plan
              }"
              key="plan"
              id="plan"
              name="plan"
              class="form-textarea"
              type="text"
              v-model="plan"
              v-validate="'required|max:500'"
              data-vv-delay="500"
              :data-vv-as="$t('global.description')"
              ref="plan"
              @keyup.enter="$refs.impression.focus()">
            </textarea>
            <label
              for="plan"
              class="form-label label-inner">
              {{ $t('global.description') }}
            </label>
            <span
              v-if="errors.has('plan')"
              class="form-help is-danger">
              {{ errors.first('plan') }}
            </span>
            <div class="form-chars-indicator">
              {{ plan | charsLeft(500) }}
            </div>
          </div>
        </div>

        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.impression') }}
          </div>
          <div class="form-row">
            <textarea
              :class="{
                'is-danger': errors.has('impression'),
                'filled': impression
              }"
              key="impression"
              id="impression"
              name="impression"
              class="form-textarea"
              type="text"
              v-model="impression"
              v-validate="'required|max:500'"
              data-vv-delay="500"
              :data-vv-as="$t('global.description')"
              ref="impression"
              @keyup.enter="$refs.diagnostic_testing.focus()">
            </textarea>
            <label
              for="impression"
              class="form-label label-inner">
              {{ $t('global.description') }}
            </label>
            <span
              v-if="errors.has('impression')"
              class="form-help is-danger">
              {{ errors.first('impression') }}
            </span>
            <div class="form-chars-indicator">
              {{ impression | charsLeft(500) }}
            </div>
          </div>
        </div>

        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.diagnostic_testing') }}
          </div>
          <div class="form-row">
            <textarea
              :class="{
                'is-danger': errors.has('diagnostic_testing'),
                'filled': diagnosticTesting
              }"
              key="diagnostic_testing"
              id="diagnostic_testing"
              name="diagnostic_testing"
              class="form-textarea"
              type="text"
              v-model="diagnosticTesting"
              v-validate="'required|max:500'"
              data-vv-delay="500"
              :data-vv-as="$t('global.description')"
              ref="diagnostic_testing"
              @keyup.enter="submit">
            </textarea>
            <label
              for="diagnostic_testing"
              class="form-label label-inner">
              {{ $t('global.description') }}
            </label>
            <span
              v-if="errors.has('diagnostic_testing')"
              class="form-help is-danger">
              {{ errors.first('diagnostic_testing') }}
            </span>
            <div class="form-chars-indicator">
              {{ diagnosticTesting | charsLeft(500) }}
            </div>
          </div>

          <div
            v-if="error"
            class="form-row form-help is-danger">
            {{ error }}
          </div>

          <div class="form-actions full">
            <btn
              v-if="skippable === true"
              @onclick="skip"
              btn-class="cancel"
              class="MedicalSummaryForm__submit"
              :btn-label="$t('global.skip')">
            </btn>
            <btn
              @onclick="submit"
              btn-class="blue-filled"
              class="MedicalSummaryForm__submit"
              :btn-label="$t('call_room.provide_medical_summary')">
            </btn>
          </div>
        </div>
      </div>

      <div
        v-else
        key="view"
        class="MedicalSummaryForm__content">
        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.interview_summary') }}
          </div>
          <div class="form-row--cols MedicalSummaryForm__row">
            <div class="form-col form-label MedicalSummaryForm__label">
              {{ $t('global.description') }}
            </div>
            <div
              class="form-col form-value MedicalSummaryForm__value"
              v-html="interviewSummary || '&mdash;'">
            </div>
          </div>
        </div>

        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.diagnosis') }}
          </div>
          <div class="form-row--cols MedicalSummaryForm__row">
            <div class="form-col form-label MedicalSummaryForm__label">
              {{ $t('global.description') }}
            </div>
            <div class="form-col form-value MedicalSummaryForm__value">
              <div
                class="MedicalSummaryForm__value__list-item"
                v-if="conditions && conditions.length"
                v-for="item in conditions" :key="item.id">
                  {{item.id}} {{item.name}}
              </div>
              <div v-else v-html="'&mdash;'"></div>
            </div>
          </div>

        </div>

        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.procedures') }}
          </div>
          <div class="form-row--cols MedicalSummaryForm__row">
            <div class="form-col form-label MedicalSummaryForm__label">
              {{ $t('global.description') }}
            </div>
            <div class="form-col form-value MedicalSummaryForm__value">
              <div
                class="MedicalSummaryForm__value__list-item"
                v-if="procedures && procedures.length"
                v-for="item in procedures" :key="item.id">
                  {{item.id}} {{item.name}}
              </div>
              <div v-else v-html="'&mdash;'"></div>
            </div>
          </div>
        </div>

        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.plan') }}
          </div>
          <div class="form-row--cols MedicalSummaryForm__row">
            <div class="form-col form-label MedicalSummaryForm__label">
              {{ $t('global.description') }}
            </div>
            <div
              class="form-col form-value MedicalSummaryForm__value"
              v-html="plan || '&mdash;'">
            </div>
          </div>
        </div>

        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.impression') }}
          </div>
          <div class="form-row--cols MedicalSummaryForm__row">
            <div class="form-col form-label MedicalSummaryForm__label">
              {{ $t('global.description') }}
            </div>
            <div
              class="form-col form-value MedicalSummaryForm__value"
              v-html="impression || '&mdash;'">
            </div>
          </div>
        </div>

        <div class="MedicalSummaryForm__section">
          <div class="MedicalSummaryForm__section-title">
            {{ $t('patients.diagnostic_testing') }}
          </div>
          <div class="form-row--cols MedicalSummaryForm__row">
            <div class="form-col form-label MedicalSummaryForm__label">
              {{ $t('global.description') }}
            </div>
            <div
              class="form-col form-value MedicalSummaryForm__value"
              v-html="diagnosticTesting || '&mdash;'">
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '@/api';
import { decode, encode } from '@/utils/proto';
import { createNamespacedHelpers } from 'vuex';
import { charsLeft } from '@/utils/filters';

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('patientRecords');
const medicalSummaryModel = field => ({
  get() {
    return this.medicalSummary ? this.medicalSummary[field] : null;
  },
  set(value) {
    this.setMedicalSummaryField({ field, value });
  }
});

export default {
  name: 'MedicalSummaryForm',

  props: {
    patientId: {
      required: true
    },
    recordId: {
      required: true
    },
    edit: {
      type: Boolean,
      default: true
    },
    skipPatientNotification: {
      type: Boolean,
      default: false
    },
    skippable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      proceduresOptions: [],
      conditionsOptions: [],
      isProceduresOptionsLoading: false,
      isConditionsOptionsLoading: false,
      error: null
    };
  },


  mounted() {
    this.prefillFields();
  },

  watch: {
    conditions() {
      setTimeout(() => this.$validator.validate('conditions'), 0);
    },
    procedures() {
      setTimeout(() => this.$validator.validate('procedures'), 0);
    }
  },

  computed: {
    ...mapGetters(['medicalSummary', 'latestMedicalSummary']),
    interviewSummary: medicalSummaryModel('interviewSummary'),
    procedures: medicalSummaryModel('procedures'),
    conditions: medicalSummaryModel('conditions'),
    plan: medicalSummaryModel('plan'),
    impression: medicalSummaryModel('impression'),
    diagnosticTesting: medicalSummaryModel('diagnosticTesting')
  },

  filters: {
    charsLeft
  },

  methods: {
    ...mapMutations(['setMedicalSummaryField']),
    ...mapActions([
      'saveMedicalSummary',
      'fetchLatestMedicalSummary'
    ]),
    async prefillFields() {
      await this.fetchLatestMedicalSummary({patient_id: this.patientId, record_id: this.recordId});

      if (this.isEmpty()) {
        const {
          medicalSummaryData: {
            plan,
            impression,
            diagnosticTesting,
            interviewSummary
          },
          conditions,
          procedures
        } = this.latestMedicalSummary;

        this.setMedicalSummaryField({
          field: 'interviewSummary',
          value: interviewSummary
        });
        this.setMedicalSummaryField({
          field: 'procedures',
          value: procedures
        });
        this.setMedicalSummaryField({
          field: 'conditions',
          value: conditions
        });
        this.setMedicalSummaryField({
          field: 'plan',
          value: plan
        });
        this.setMedicalSummaryField({
          field: 'impression',
          value: impression
        });
        this.setMedicalSummaryField({
          field: 'diagnosticTesting',
          value: diagnosticTesting
        });
        this.setMedicalSummaryField({
          field: 'interviewSummary',
          value: interviewSummary
        });
      }
    },
    asyncFindConditions(filter) {
      this.isConditionsOptionsLoading = true;
      api.fetchMedicalConditions({filter})
        .then(data => {
          const {conditions} = decode('GetMedicalConditionsResponse', data);
          this.conditionsOptions = conditions;
          this.isConditionsOptionsLoading = false;
        });
    },
    asyncFindProcedures(filter) {
      this.isProceduresOptionsLoading = true;
      api.fetchMedicalProcedures({filter})
        .then(data => {
          const {procedures} = decode('GetMedicalProceduresResponse', data);
          this.proceduresOptions = procedures;
          this.isProceduresOptionsLoading = false;
        });
    },
    removeConditionsOption({id}) {
      const newConditions = this.conditions
        .filter(option => option.id !== id);

      this.setMedicalSummaryField({
        field: 'conditions',
        value: newConditions
      });
    },
    removeProceduresOption({id}) {
      const newProcedures = this.procedures
        .filter(option => option.id !== id);

      this.setMedicalSummaryField({
        field: 'procedures',
        value: newProcedures
      });
    },
    isEmpty() {
      return !this.interviewSummary &&
        !this.procedures &&
        !this.conditions &&
        !this.plan &&
        !this.impression &&
        !this.diagnosticTesting;
    },

    skip() {
      this.error = null;
      this.processing = true;

      api.skipMedicalSummary({
        patient_id: this.patientId,
        record_id: this.recordId
      })
        .then(({ error }) => {
          if (error) {
            this.error = error.message;
          } else {
            this.$emit('skip');
          }
          this.processing = false;
        });
    },

    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.saveMedicalSummary({
            patient_id: this.patientId,
            record_id: this.recordId
          }).then(({ error }) => {
            if (error) {
              this.error = error.message;
            } else {
              this.$emit('close', this.medicalSummary);
            }
            this.processing = false;
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "medical-summary-form.scss";
</style>
<style lang="scss">
  .MedicalSummaryForm__wrapper {
    .multiselect__tags {
      border-radius: 5px !important;
      border: 1px solid #e8e8e8;
    }
  }
</style>
