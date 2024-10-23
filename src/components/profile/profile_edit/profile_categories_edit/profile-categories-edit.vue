<template>
  <div class="ProfileCategoriesEdit__wrapper">
    <medical-category-form
      v-for="(section, index) in editableMedicalCategories"
      :key="index"
      :section="section"
      :index="index"
      class="ProfileCategoriesEdit__section">
    </medical-category-form>

    <div>
      <div class="ProfileCategoriesEdit__block">
        <div
        v-if="categoriesLength < 4"
        @click="addMedicalCategory"
        class="ProfileCategoriesEdit__add-new">
          <i class="icon-plus ProfileCategoriesEdit__add-new-icon"/>
          {{ $t('profile.add_new_category') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import MedicalCategoryForm from '@/components/form/medical_category_form/medical-category-form';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('profile');

export default {
  name: 'ProfileCategoriesEdit',

  inject: ['$validator'],

  components: {
    MedicalCategoryForm
  },

  data() {
    return {
      processing: false,
      error: null
    };
  },

  computed: {
    ...mapGetters([
      'allMedicalCategories',
      'editableMedicalCategories'
    ]),
    categoriesLength() {
      if (!this.editableMedicalCategories) return 0;
      return this.editableMedicalCategories.length;
    }
  },

  async beforeMount() {
    await this.fetchMedicalCategories();
    this.setEditableMedicalCategories();
    if (!this.editableMedicalCategories.length) this.addMedicalCategory();
  },

  beforeDestroy() {
    this.resetEditableMedicalCategories();
  },

  methods: {
    ...mapActions([
      'fetchMedicalCategories'
    ]),
    ...mapMutations([
      'setEditableMedicalCategories',
      'resetEditableMedicalCategories',
      'addMedicalCategory'
    ])
  }
};
</script>
<style scoped lang="scss">
@import "profile-categories-edit.scss";
</style>
