<template>
  <transition
    name="appear-from-bottom"
    appear>
    <div class="TimelineOrderTestsForm__wrapper">
      <div class="TimelineOrderTestsForm__header">
        <div class="TimelineOrderTestsForm__title">
          <i class="icon_order-tests TimelineOrderTestsForm__title-icon"></i>
          {{ $t('call_room.order_tests') }}
        </div>
        <div
          class="TimelineOrderTestsForm__close"
          @click="close">
          <i class="icon-close"></i>
        </div>
      </div>

      <div class="TimelineOrderTestsForm__content custom-scrollbar-container">
        <div
          class="TimelineOrderTestsForm__procedure"
          v-for="(procedure, index) in form.procedures"
          :key="index">
          <div></div>
          <div class="TimelineOrderTestsForm__procedure-header">
            <div class="TimelineOrderTestsForm__procedure-title">
              {{ $t('call_room.test_number', [index + 1]) }}
            </div>

            <div
              v-if="index"
              class="TimelineOrderTestsForm__procedure-remove"
              @click="removeProcedure(index)">
              {{ $t('global.remove') }}
            </div>
          </div>

          <div class="form-row">
            <treeselect
              :class="{'is-danger': errors.has(`procedure_${index}_tests`)}"
              name="demo"
              :placeholder="$t('global.selectTest')"
              :clearable="false"
              :searchable="true"
              search-nested
              :open-on-click="true"
              :open-on-focus="true"
              :clear-on-select="true"
              :close-on-select="true"
              :disable-branch-nodes="true"
              :disable-fuzzy-matching="true"
              :options="treeSelectOptions"
              :limit="3"
              :max-height="400"

              v-model="procedure.test"
              ref="procedure_test"

              v-validate="'required'"
              :data-vv-name="`procedure_${index}_test`"
              :data-vv-as="$t('global.tests')"
              data-vv-value-path="value"
            >
              <div slot="value-label" slot-scope="{ node }">{{ node.raw.valueLabel }}</div>
              <div slot="option-label" slot-scope="{ node }">{{ node.raw.optionLabel }}</div>
            </treeselect>
            <span
              v-show="errors.has(`procedure_${index}_test`)"
              class="form-help is-danger">
              {{ errors.first(`procedure_${index}_test`) }}
            </span>
          </div>

          <div class="form-row">
            <textarea
              :class="{
                'is-danger': errors.has(`procedure_${index}_description`),
                'filled': procedure.description
              }"
              :id="`procedure_${index}_description`"
              :name="`procedure_${index}_description`"
              class="form-textarea"
              type="text"
              v-model="procedure.description"
              ref="procedure_name">
            </textarea>
            <label
              :for="`procedure_${index}_description`"
              class="form-label label-inner">
              {{ $t('global.description') }}
            </label>
            <span
              v-if="errors.has(`procedure_${index}_description`)"
              class="form-help is-danger">
              {{ errors.first(`procedure_${index}_description`) }}
            </span>
            <div class="form-chars-indicator">
              {{ procedure.description | charsLeft(250) }}
            </div>
          </div>
        </div>

        <div
          class="TimelineOrderTestsForm__add-new-procedure"
          @click="addNewProcedure">
          <i class="icon-plus TimelineOrderTestsForm__add-new-procedure-icon"></i>
          {{ $t('call_room.add_new_test') }}
        </div>
      </div>

      <div class="TimelineOrderTestsForm__footer">
        <div
          v-if="error"
          class="form-help is-danger TimelineOrderTestsForm__footer-error">
          {{ error }}
        </div>
        <div class="form-actions TimelineOrderTestsForm__footer-actions">
          <btn
            @onclick="close"
            btn-class="cancel"
            class="TimelineOrderTestsForm__cancel"
            :btn-label="$t('global.cancel')">
          </btn>
          <btn
            @onclick="submit"
            btn-class="blue-filled"
            class="TimelineOrderTestsForm__submit"
            :btn-label="editing ? $t('global.save') : $t('call_room.order_tests')"
            :btn-processing="processing">
          </btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { charsLeft } from '@/utils/filters';
import { decode, encode } from '@/utils/proto';
import Checkbox from '@/components/global/checkbox/checkbox';
import api from '@/api';
import Treeselect from '@riophae/vue-treeselect';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patientTimeline');
export default {
  name: 'TimelineOrderTestsForm',

  props: {
    patientId: {
      required: true
    }
  },

  components: {
    Checkbox,
    Treeselect
  },

  filters: {
    charsLeft
  },

  data() {
    return {
      treeSelectOptions: [],
      form: {
        type: 'order-tests',
        procedures: [{}]
      },
      editing: false,
      processing: false,
      error: null
    };
  },

  computed: {
    ...mapGetters(['editableEntity', 'recordId'])
  },

  mounted() {
    this.loadTreeSelectOptions();
  },

  methods: {
    ...mapMutations([
      'setOpenedForm'
    ]),

    ...mapActions([
      'orderTests'
    ]),

    async loadTreeSelectOptions() {
      const data = await api.fetchMedicalTestsByCategories();
      const {categories} = decode('GetMedicalTestsByCategoriesResponse', data);
      this.treeSelectOptions = categories.map(cat => ({
        id: `_${cat.id}`, // Fixes "conflicting id" error in treeselect
        label: cat.name, // Used for search
        optionLabel: cat.name,
        children: cat.tests.map(test => ({
          id: test.id,
          label: `${cat.name}: ${test.name}`, // Used for search
          optionLabel: test.name,
          valueLabel: `${cat.name}: ${test.name}`
        }))}));
    },

    close() {
      this.setOpenedForm(null);
    },

    addNewProcedure() {
      this.form.procedures.push({});
    },

    removeProcedure(index) {
      this.form.procedures.splice(index, 1);
    },

    async submit() {
      const isValid = await this.$validator.validateAll();
      if (isValid) {
        this.error = null;
        this.processing = true;

        const requestBody = {
          patientId: this.patientId,
          recordId: this.recordId,
          items: this.form.procedures.map(procedure => ({
            medicalTestId: procedure.test,
            description: procedure.description
          }))
        };

        const { error } = await this.orderTests(requestBody);

        this.processing = false;
        if (error) {
          this.error = error;
          this.$toastr.error('Tests order error');
        } else {
          this.close();
          this.$toastr.s('Tests successfully ordered');
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "timeline-order-tests-form.scss";
</style>


<style lang="scss">
@import "timeline-order-tests-form-treeselect-overwrites.scss";
</style>
