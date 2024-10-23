<template>
  <div class="PatientOnboardingStep1__wrapper">
    <transition name="appear-from-top">
      <div
        v-if="showPrompt"
        class="PatientOnboardingStep1__header-prompt">
        {{ $t('global.provide_missing_info_marked_red') }}
      </div>
    </transition>
    <div class="PatientOnboardingStep1__content PatientOnboardingStep1__container">
      <div class="title-medium">
        {{ $t('patients.add_new_patient') }}
      </div>
      <div class="PatientOnboardingStep1__description">
        {{ $t('patients.basic_info_description') }}
      </div>

      <div
        class="PatientOnboardingStep1__form"
        v-if="editableBasicInfo">
        <div class="form-row--cols">
          <div class="form-col col-1">
            <multiselect
              :class="{'is-danger': errors.has('gender')}"
              v-model="gender"
              ref="gender"
              :options="gender_options"
              value="value"
              :custom-label="translatedLabel"
              label="label"
              placeholder=""
              :searchable="false"
              v-validate="'required'"
              data-vv-name="gender"
              :data-vv-as="$t('global.gender')"
              data-vv-value-path="value">
              <i
                class="icon-caret multiselect-caret"
                slot="caret"
                slot-scope="{ toggle }"
                @mousedown.prevent.stop="toggle"></i>
            </multiselect>
            <input
              :class="{'filled': gender}"
              class="form-hidden-validator form-field"
              type="text"
              :value="gender"/>
            <label
              class="form-label label-inner"
              @click="$refs.gender.$el.focus()">
              {{ $t('global.gender') }}
            </label>
            <span
              v-if="errors.has('gender')"
              class="form-help is-danger">
              {{ errors.first('gender') }}
            </span>
          </div>
          <div class="form-col col-2">
            <input
              name="first_name"
              id="first_name"
              type="text"
              class="form-field"
              :class="{
                'is-danger': errors.has('first_name'),
                'filled': first_name
              }"
              v-model="first_name"
              v-validate="'required|alpha_spaces|min:2'"
              data-vv-delay="500"
              :data-vv-as="$t('global.first_name')"
              @keyup.enter="$refs.last_name.focus()" />
            <label
              class="form-label label-inner"
              for="first_name">
              {{ $t('global.first_name') }}
            </label>
            <span
              v-if="errors.has('first_name')"
              class="form-help is-danger">
              {{ errors.first('first_name') }}
            </span>
          </div>
        </div>
        <div class="form-row">
          <input
            name="last_name"
            id="last_name"
            type="text"
            class="form-field"
            :class="{
              'is-danger': errors.has('last_name'),
              'filled': last_name
            }"
            v-model="last_name"
            v-validate="'required|alpha_spaces|min:2'"
            data-vv-delay="500"
            :data-vv-as="$t('global.last_name')" />
          <label
            class="form-label label-inner"
            for="last_name">
            {{ $t('global.last_name') }}
          </label>
          <span
            v-if="errors.has('last_name')"
            class="form-help is-danger">
            {{ errors.first('last_name') }}
          </span>
        </div>
        <div class="form-row">
          <datetime-picker
            :class="{
              'is-danger': errors.has('dob')
            }"
            name="dob"
            input-class="form-field"
            format="YYYY/MM/DD"
            :value="dateOfBirth"
            @onchange="date => setDateOfBirth(date)"
            ref="date"
            :allow-clearing="false">
          </datetime-picker>
          <input
            name="dob"
            class="form-hidden-validator filled form-field"
            v-validate="'minAge:21'"
            data-vv-delay="500"
            :data-vv-as="$t('global.dob')"
            type="text"
            :value="dateOfBirth"/>
          <label class="form-label label-inner">
            {{ $t('global.dob') }}
          </label>
          <span
            v-if="errors.has('dob')"
            class="form-help is-danger">
            {{ errors.first('dob') }}
          </span>
        </div>
        <div class="form-row">
          <input
            name="email"
            id="email"
            type="text"
            class="form-field"
            :class="{
              'is-danger': errors.has('email'),
              'filled': email
            }"
            v-model="email"
            v-validate="'required|email'"
            data-vv-delay="500"
            :data-vv-as="$t('global.email_address')" />
          <label
            class="form-label label-inner"
            for="email">
            {{ $t('global.email_address') }}
          </label>
          <span
            v-if="errors.has('email')"
            class="form-help is-danger">
            {{ errors.first('email') }}
          </span>
        </div>
      </div>
    </div>

    <transition
      name="appear-from-bottom"
      appear>
      <div class="PatientOnboardingStep1__footer">
        <div class="form-actions full PatientOnboardingStep1__container">
          <btn
            btn-class="submit"
            @onclick="submit"
            :btn-label="$t('global.next')">
          </btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { GENDER } from '@/constants';
import DatetimePicker from '@/components/global/datetime_picker/datetime-picker';
import { delayedCalls } from '@/utils';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('patient');
const editableFieldModel = (field, selectable) => ({
  get() {
    return selectable
      ? this[`${field}_options`].find(v => v.value === this.editableBasicInfo[field])
      : this.editableBasicInfo[field];
  },
  set(...args) {
    const value = selectable && args[0] ? args[0].value : args[0];
    this.setEditableBasicInfoField({ field, value });
  }
});
export default {
  name: 'PatientOnboardingStep1',

  components: {
    DatetimePicker
  },

  data() {
    return {
      gender_options: [],
      showPrompt: false
    };
  },

  computed: {
    ...mapGetters(['editableBasicInfo']),
    gender: editableFieldModel('gender', true),
    first_name: editableFieldModel('firstName'),
    last_name: editableFieldModel('lastName'),
    email: editableFieldModel('email'),
    dateOfBirth() {
      const info = this.editableBasicInfo ? this.editableBasicInfo.birthDate : null;
      return info ? info.timestamp * 1000 : null;
    },
    maxDate() {
      return this.$moment().subtract(21, 'year').valueOf();
    }
  },

  async beforeMount() {
    await this.fetchPatientBasicInfo(this.$route.params.id);
    if (!this.editableBasicInfo) this.setEditableBasicInfo();
    this.setGenders();
  },

  methods: {
    ...mapActions([
      'fetchPatientBasicInfo'
    ]),
    ...mapMutations([
      'setEditableBasicInfo',
      'setEditableBasicInfoField'
    ]),
    setGenders() {
      GENDER.forEach((v, i) => {
        if (v === 'unknown') return;
        this.gender_options.push({
          label: v,
          value: i
        });
      });
    },
    translatedLabel({ label }) {
      return this.$t(`gender.${label}`);
    },
    setDateOfBirth(value) {
      this.setEditableBasicInfoField({
        field: 'birthDate',
        value: {
          timestamp: this.$moment.utc(value).unix()
        }
      });
      this.resetValidator('dob');
    },
    resetValidator(name) {
      this.$validator.pause();
      this.$nextTick(() => {
        this.$validator.errors.clear();
        this.$validator.fields.items.forEach(field => field.reset());
        this.$validator.fields.items.forEach(field => this.errors.remove(field));
        this.$validator.resume();
        this.$validator.validate(name || '*');
      });
    },
    submit() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          this.$emit('set-step', 2);
        } else {
          delayedCalls(() => {
            this.showPrompt = !this.showPrompt;
          }, [0, 3000]);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-onboarding-step-1.scss";
</style>
