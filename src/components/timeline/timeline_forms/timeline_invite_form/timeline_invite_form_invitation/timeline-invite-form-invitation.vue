<template>
  <div class="TimelineInviteFormInvitation__wrapper">
    <div class="TimelineInviteFormInvitation__header">
      <div class="title-uppercase">
        {{ $t('global.invitation') }}
      </div>
      <div
        @click="$emit('reset')"
        class="TimelineInviteFormInvitation__reset">
        {{ $t('global.reset') }}
      </div>
    </div>
    <div class="form-row">
      <multiselect
        :class="{'is-danger': errors.has('category')}"
        v-model="categoryModel"
        ref="category"
        :options="medicalCategories"
        value="value"
        label="name"
        track-by="id"
        placeholder=""
        v-validate="'required'"
        data-vv-name="category"
        :data-vv-as="$t('global.category')"
        data-vv-value-path="value">
        <i
          class="icon-caret multiselect-caret"
          slot="caret"
          slot-scope="{ toggle }"
          @mousedown.prevent.stop="toggle"></i>
      </multiselect>
      <input
        :class="{'filled': categoryModel}"
        class="form-hidden-validator form-field"
        type="text"
        :value="categoryModel"/>
      <label
        class="form-label label-inner"
        @click="$refs.category.$el.focus()">
        {{ $t('global.category') }}
      </label>
      <span
        v-if="errors.has('category')"
        class="form-help is-danger">
        {{ errors.first('category') }}
      </span>
    </div>

    <div
      v-if="specialities(categoryModel).length"
      class="form-row">
      <multiselect
        :class="{'is-danger': errors.has('speciality')}"
        v-model="specialityModel"
        ref="speciality"
        :options="specialities(categoryModel)"
        value="value"
        label="name"
        track-by="id"
        placeholder=""
        v-validate="'required'"
        data-vv-name="speciality"
        :data-vv-as="$t('global.speciality')"
        data-vv-value-path="value">
        <i
          class="icon-caret multiselect-caret"
          slot="caret"
          slot-scope="{ toggle }"
          @mousedown.prevent.stop="toggle"></i>
      </multiselect>
      <input
        :class="{'filled': specialityModel}"
        class="form-hidden-validator form-field"
        type="text"
        :value="specialityModel"/>
      <label
        class="form-label label-inner"
        @click="$refs.speciality.$el.focus()">
        {{ $t('global.speciality') }}
      </label>
      <span
        v-if="errors.has('speciality')"
        class="form-help is-danger">
        {{ errors.first('speciality') }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TimelineInviteFormInvitation',

  inject: ['$validator'],

  props: {
    medicalCategories: {
      required: true
    }
  },

  data() {
    return {
      category: null,
      speciality: null
    };
  },

  computed: {
    categoryModel: {
      get() {
        return this.category;
      },
      set(val) {
        this.category = val;
        this.$emit('clear');
        this.speciality = null;
        if (!val.specialities.length) this.$emit('select', val);
      }
    },
    specialityModel: {
      get() {
        return this.speciality;
      },
      set(val) {
        this.speciality = val;
        this.$emit('select', val);
      }
    }
  },

  methods: {
    specialities(category) {
      return category ?
        this.medicalCategories.find(c => c.id === category.id).specialities :
        [];
    }
  }
};
</script>

<style scoped lang="scss">
  @import "timeline-invite-form-invitation.scss";
</style>
