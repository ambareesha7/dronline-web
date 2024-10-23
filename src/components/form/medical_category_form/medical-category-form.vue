<template>
  <div class="MedicalCategoryForm__wrapper">
    <div
      v-if="categoriesLength > 1"
      class="MedicalCategoryForm__header">
      <div class="MedicalCategoryForm__title">
        {{ $t('global.category') }} #{{ index + 1 }}
      </div>
      <div
        @click="removeMedicalCategory(index)"
        class="MedicalCategoryForm__remove"
        data-cy="MedicalCategoryForm__remove">
        {{ $t('global.remove') }}
      </div>
    </div>

    <div class="form-row">
      <multiselect
        :class="{'is-danger': errors.has(`category_${index}`)}"
        v-model="category"
        ref="category"
        :options="medicalCategories"
        value="value"
        label="name"
        track-by="id"
        placeholder=""
        v-validate="'required'"
        :data-vv-name="`category_${index}`"
        :data-vv-as="$t('global.category')"
        data-vv-value-path="value"
        data-cy="MedicalCategoryForm__category-field">
        <i
          class="icon-caret multiselect-caret"
          slot="caret"
          slot-scope="{ toggle }"
          @mousedown.prevent.stop="toggle"></i>
      </multiselect>
      <input
        :class="{'filled': section.category}"
        class="form-hidden-validator form-field"
        type="text"
        :value="section.category"/>
      <label
        class="form-label label-inner"
        @click="$refs.category.$el.focus()">
        {{ $t('global.category') }}
      </label>
      <span
        v-if="errors.has(`category_${index}`)"
        class="form-help is-danger"
        data-cy="MedicalCategoryForm__category-validation-error">
        {{ errors.first(`category_${index}`) }}
      </span>
    </div>

    <div
      v-if="specialities(section.category).length"
      class="form-row">
      <multiselect
        :class="{'is-danger': errors.has(`speciality_${index}`)}"
        v-model="speciality"
        ref="speciality"
        :options="specialities(section.category)"
        value="value"
        label="name"
        track-by="id"
        placeholder=""
        v-validate="'required'"
        :data-vv-name="`speciality_${index}`"
        :data-vv-as="$t('global.speciality')"
        data-vv-value-path="value"
        data-cy="MedicalCategoryForm__speciality-field">
        <i
          class="icon-caret multiselect-caret"
          slot="caret"
          slot-scope="{ toggle }"
          @mousedown.prevent.stop="toggle"></i>
      </multiselect>
      <input
        :class="{'filled': section.speciality}"
        class="form-hidden-validator form-field"
        type="text"
        :value="section.speciality"/>
      <label
        class="form-label label-inner"
        @click="$refs.speciality.$el.focus()">
        {{ $t('global.speciality') }}
      </label>
      <span
        v-if="errors.has(`speciality_${index}`)"
        class="form-help is-danger"
        data-cy="MedicalCategoryForm__speciality-validation-error">
        {{ errors.first(`speciality_${index}`) }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  name: 'MedicalCategoryForm',

  inject: ['$validator'],

  props: {
    section: {
      required: true,
      type: Object
    },
    index: {
      required: true
    }
  },

  computed: {
    ...mapGetters('medicalCategories', [
      'medicalCategories'
    ]),
    ...mapGetters('profile', [
      'editableMedicalCategories'
    ]),
    category: {
      get() {
        return this.editableMedicalCategories ?
          this.editableMedicalCategories[this.index].category :
          null;
      },
      set(val) {
        this.setEditableMedicalCategoriesField({
          field: this.index,
          value: {
            category: val,
            speciality: null
          }
        });
      }
    },
    speciality: {
      get() {
        return this.editableMedicalCategories ?
          this.editableMedicalCategories[this.index].speciality :
          null;
      },
      set(val) {
        this.setEditableMedicalCategoriesField({
          field: this.index,
          value: {
            category: this.category,
            speciality: val
          }
        });
      }
    },
    categoriesLength() {
      if (!this.editableMedicalCategories) return 0;
      return this.editableMedicalCategories.length;
    }
  },

  methods: {
    ...mapActions('profile', [
      'fetchMedicalCategories'
    ]),
    ...mapMutations('profile', [
      'setEditableMedicalCategoriesField',
      'removeMedicalCategory'
    ]),
    specialities(category) {
      return category ?
        this.medicalCategories.find(c => c.id === category.id).specialities :
        [];
    }
  }
};
</script>

<style scoped lang="scss">
  @import "medical-category-form.scss";
</style>
