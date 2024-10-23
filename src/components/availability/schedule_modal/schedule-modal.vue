<template>
  <div class="ScheduleModal__wrapper">
    <div class="ScheduleModal__header">
      <div
        :class="{
          ScheduleModal__header__title: true,
        }"
      >
        Schedule a Visit on behalf of {{ specialist.firstName }} {{ specialist.lastName }}
      </div>
    </div>
    <form class="ScheduleModal__content">
      <div class="ScheduleModal__sub-header">
        Time of visit:
        {{ startTimeFormatted.date }},
        {{ startTimeFormatted.startTime }} - {{ startTimeFormatted.endTime }}
      </div>

      <div class="ScheduleModal__row form-row">
        <multiselect
          :class="{ 'is-danger': errors.has('category') }"
          :multiple="false"
          v-model="category"
          ref="category"
          :options="medicalCategoriesOptions"
          value="id"
          label="name"
          track-by="id"
          placeholder=""
          v-validate="'required'"
          data-vv-name="category"
          :data-vv-as="$t('global.category')"
          data-vv-value-path="value"
          data-cy="ScheduleModal__form__category-field"
        >
          <i
            class="icon-caret multiselect-caret"
            slot="caret"
            slot-scope="{ toggle }"
            @mousedown.prevent.stop="toggle"
          ></i>
        </multiselect>
        <input
          :class="{ filled: category }"
          class="form-hidden-validator form-field"
          type="text"
          :value="category"
        />
        <label
          class="form-label label-inner"
          @click="$refs.category.$el.focus()"
        >
          {{ $t("global.category") }}
        </label>
        <span
          v-if="errors.has('category')"
          class="form-help is-danger"
          data-cy="MedicalCategoryForm__input-validation-error"
        >
          {{ errors.first("category") }}
        </span>
      </div>
      <div class="ScheduleModal__row form-row">
        <multiselect
          :class="{ 'is-danger': errors.has('patient') }"
          :multiple="false"
          v-model="patient"
          ref="patient"
          :options="patientsOptions"
          value="id"
          label="name"
          track-by="id"
          placeholder=""
          v-validate="'required'"
          data-vv-name="patient"
          :data-vv-as="$t('global.patient')"
          data-vv-value-path="value"
          data-cy="ScheduleModal__form__patient-field"
        >
          <i
            class="icon-caret multiselect-caret"
            slot="caret"
            slot-scope="{ toggle }"
            @mousedown.prevent.stop="toggle"
          ></i>
        </multiselect>
        <input
          :class="{ filled: patient }"
          class="form-hidden-validator form-field"
          type="text"
          :value="patient"
        />
        <label
          class="form-label label-inner"
          @click="$refs.patient.$el.focus()"
        >
          {{ $t("global.patient") }}
        </label>
        <span
          v-if="errors.has('patient')"
          class="form-help is-danger"
          data-cy="ScheduleModal__input-validation-error"
        >
          {{ errors.first("patient") }}
        </span>
      </div>
      <div class="ScheduleModal__actions">
        <btn
          @onclick="close"
          btn-class="blue"
          class="ScheduleModal__action"
          :btn-label="$t('global.cancel')"
        >
        </btn>
        <btn
          type="submit"
          @onclick="save"
          btn-class="blue-filled"
          class="ScheduleModal__action"
          :btn-label="$t('global.save')"
        >
        </btn>

        <div
          v-if="error"
          class="form-row form-help is-danger">
          {{ error }}
        </div>
      </div>
    </form>

    <transition appear name="fade-in">
      <div class="ScheduleModal__backdrop" @click="$emit('cancel')"></div>
    </transition>
  </div>
</template>

<script>
import {
  TIMESLOT_DURATION_MINUTES,
  TIMESLOT_DURATION_SECONDS
} from '@/constants';
import { mapGetters } from 'vuex';
import { cloneDeep } from 'lodash';
import api from '@/api';
import { encode, decode } from '@/utils/proto';
import categoryHelper from '@/utils/categoryHelper';

import MedicalCategoryForm from '@/components/form/medical_category_form/medical-category-form';

export default {
  name: 'ScheduleModal',

  components: {
    MedicalCategoryForm
  },

  props: {
    startTime: {
      type: Object,
      required: true
    },
    onSubmit: {
      type: Function,
      required: false
    }
  },

  data() {
    return {
      medicalCategoriesOptions: [],
      patientsOptions: [],
      category: null,
      patient: null,
      specialist: {},
      error: null,
      processing: false
    };
  },

  async mounted() {
    const specialistId = this.$route.query.specialist_id;
    await Promise.all([
      this.fetchPatients(specialistId),
      this.fetchSpecialistMedicalCategories(specialistId),
      this.fetchBasicInfo(specialistId)
    ]);

    this.medicalCategoriesOptions = this.specialistMedicalCategories.map(c => {
      if (c.parentCategoryId) {
        const parentCategoryName = this.medicalCategories
          .find(parentCategory => parentCategory.id === c.parentCategoryId)
          .name;
        c.name = `${parentCategoryName} > ${c.name}`;
      }
      return c;
    });
    this.patientsOptions = this.patients.map(
      p => ({
        id: p.id,
        name: `${p.firstName} ${p.lastName}`
      })
    );
  },

  computed: {
    startTimeFormatted() {
      const startTime = this.startTime.clone();
      const endTime = this.startTime.clone().add(TIMESLOT_DURATION_SECONDS, 'seconds');
      return {
        date: startTime.format('YYYY-MM-DD'),
        startTime: startTime.format('hh:mm A'),
        endTime: endTime.format('hh:mm A')
      };
    },
    ...mapGetters('medicalCategories', [
      'medicalCategories'
    ])
  },

  methods: {
    close() {
      this.$modal.hide('schedule-modal');
    },

    async save() {
      this.processing = true;
      this.$validator.validateAll().then(async result => {
        if (result) {
          this.error = null;
          this.processing = true;
          const response = await this.scheduleVisit();

          this.processing = false;
          if (response.error) {
            this.error = response.error;
          } else {
            this.close();
            this.onSubmit();
          }
        }
      });
    },

    async fetchSpecialistMedicalCategories(specialist_id) {
      const data = await api.fetchMedicalCategories({ specialist_id });
      const response = decode('specialist_profile.GetMedicalCategoriesResponse', data);
      this.specialistMedicalCategories = response.medicalCategories;
    },

    async fetchPatients(specialistId) {
      const data = await api.fetchTeamMemberConnectedPatients(specialistId);
      const response = decode('GetPatientsResponse', data);
      this.patients = response.patients;
    },

    async fetchBasicInfo(specialistId) {
      const data = await api.fetchBasicInfo(specialistId);
      // const response = decode('specialist_profile.GetBasicInfoResponse', data);
      const response = decode('specialist_profileV2.GetBasicInfoResponseV2', data);
      this.specialist = response.basicInfo;
    },

    async scheduleVisit() {
      const params = {
        patientId: this.patient.id,
        chosenMedicalCategoryId: this.category.id,
        timeslotParams: {
          startTime: this.startTime.clone().unix()
        }
      };
      const payload = encode('CreateTeamMemberVisitRequest', params);
      return api.scheduleTeamMemberVisit(this.$route.query.specialist_id, payload);
    },

    prepareSlots() {}
  }
};
</script>
<style lang="scss">
@import "schedule-modal.scss";
</style>
