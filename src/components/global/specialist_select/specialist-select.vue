<template>
  <div
    class="SpecialistSelect__wrapper"
    :class="{'not-selected': !selected}">
    <multiselect
      placeholder="Search"
      v-model="selected"
      label="title"
      track-by="id"
      :options="options">
      <template
        slot="singleLabel"
        slot-scope="props">
        <div
          class="SpecialistSelect__avatar"
          :style="{'background-color': `url(${props.option.umage_url})`}">
        </div>
        <div class="SpecialistSelect__info">
          <div class="SpecialistSelect__info-name">
            {{ props.option.first_name }} {{ props.option.last_name }}
          </div>
          <div class="SpecialistSelect__info-description">
            {{ props.option.title }}
          </div>
        </div>
      </template>
      <template
        slot="option"
        slot-scope="props">
        <div
          class="SpecialistSelect__avatar"
          :style="{'background-color': `url(${props.option.umage_url})`}">
        </div>
        <div class="SpecialistSelect__info">
          <div class="SpecialistSelect__info-name">
            {{ props.option.first_name }} {{ props.option.last_name }}
          </div>
          <div class="SpecialistSelect__info-description">
            {{ props.option.title }}
          </div>
        </div>
      </template>
      <template
        slot="noResult">
        {{ $t('global.specialist_not_found') }}
      </template>
      <i
        class="icon-caret multiselect-caret"
        slot="caret"
        slot-scope="{ toggle }"
        @mousedown.prevent.stop="toggle"></i>
    </multiselect>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'SpecialistSelect',

  props: {
    value: {}
  },

  data() {
    return {
      options: []
    };
  },

  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      this.options = await api.fetchSpecialists();
    }
  }
};
</script>
<style lang="scss">
  @import "specialist-select.scss";
</style>
