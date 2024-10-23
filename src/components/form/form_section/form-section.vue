<template>
  <div class="FormSection__wrapper">
    <div class="FormSection__header">
      <div
        class="FormSection__title">
        <slot name="title"></slot>
      </div>
      <transition
        appear
        name="appear-from-top"
        mode="out-in">
        <btn
          v-if="!editMode && editable"
          @onclick="toggleEditMode"
          btn-class="blue"
          class="FormSection__edit"
          :btn-label="$t('global.edit')">
        </btn>
      </transition>
    </div>
    <div class="FormSection__content">
      <component
        v-for="(field, index) in sectionFields"
        :key="index"
        :is="`form-field-${field.value}`"
        :field="field"
        :edit="editMode"
        :vertical="vertical"
        @set-field="field => setSectionField({field, index})">
      </component>
    </div>

    <div
      v-if="error"
      class="form-row form-help is-danger"
      v-html="error">
    </div>

    <div
      v-if="editMode"
      class="form-actions FormSection__footer">
      <btn
        @onclick="cancel"
        btn-class="blue"
        class="FormSection__cancel"
        :btn-label="$t('global.abort_changes')">
      </btn>
      <btn
        @onclick="submit"
        btn-class="blue-filled"
        class="FormSection__submit"
        :btn-label="$t('global.save_changes')">
      </btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FormFields from '@/components/form/form_fields';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patient');

export default {
  name: 'FormSection',

  components: {
    ...FormFields
  },

  props: {
    sectionName: {
      required: true,
      type: String
    },
    blockName: {
      required: true,
      type: String
    },
    patientId: {
      required: true
    },
    recordId: {
      required: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      error: null
    };
  },

  computed: {
    ...mapGetters([
      'histories',
      'hpi',
      'editableSection',
      'editableSectionFields'
    ]),
    section() {
      return this[this.blockName][this.sectionName];
    },
    editMode() {
      return this.editableSection === this.sectionName;
    },
    sectionFields() {
      return this.editMode ? this.editableSectionFields : this.section.fields;
    }
  },

  methods: {
    ...mapMutations([
      'setEditableSection',
      'setSectionField'
    ]),
    ...mapActions(['updateSection']),
    toggleEditMode() {
      this.setEditableSection({section: this.sectionName, block: this.blockName});
      if (this.editMode) {
        this.sectionFields.forEach(field => {
          if (
            !field.multiselect.choices.length &&
            field.multiselect.options[0].label.toLowerCase() === 'none'
          ) {
            field.multiselect.choices.push(field.multiselect.options[0]);
            this.setSectionField({
              ...Object.assign({}, field),
              value: field.value
            });
          }
        });
      }
    },
    cancel() {
      this.error = null;
      this.toggleEditMode();
    },
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.updateSection({
            patient_id: this.patientId,
            record_id: this.recordId
          }).then(({error}) => {
            if (error) this.error = error;
            else this.toggleEditMode();
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "form-section.scss";
</style>
