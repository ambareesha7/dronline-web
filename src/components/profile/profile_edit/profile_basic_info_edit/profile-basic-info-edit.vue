<template>
  <div class="ProfileBasicInfoEdit__wrapper">
    <div class="form-row--cols">
      <div class="form-col ProfileBasicInfoEdit__col-half">
        <multiselect
          :class="{'is-danger': errors.has('gender')}"
          v-model="gender"
          ref="gender"
          :options="gender_options"
          value="value"
          :custom-label="translatedGenderLabel"
          label="label"
          placeholder=""
          :searchable="false"
          v-validate="'required'"
          data-vv-name="gender"
          :data-vv-as="$t('global.gender')"
          data-vv-value-path="value">
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
      <div class="form-col ProfileBasicInfoEdit__col-half">
        <multiselect
          :class="{'is-danger': errors.has('medical_title')}"
          v-model="medical_title"
          ref="medical_title"
          :options="medicalTitle_options"
          value="value"
          :custom-label="translatedMedicalTitleLabel"
          label="label"
          placeholder=""
          :searchable="false"
          v-validate="'required'"
          data-vv-name="medical_title"
          :data-vv-as="$t('global.medical_title')"
          data-vv-value-path="value">
        </multiselect>
        <input
          :class="{'filled': medical_title}"
          class="form-hidden-validator form-field"
          type="text"
          :value="medical_title"/>
        <label
          class="form-label label-inner"
          @click="$refs.medical_title.$el.focus()">
          {{ $t('global.medical_title') }}
        </label>
        <span
          v-if="errors.has('medical_title')"
          class="form-help is-danger">
          {{ errors.first('medical_title') }}
        </span>
      </div>
    </div>
    <div class="form-row">
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
    <phone-number-field
      v-model="phone_number">
    </phone-number-field>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { GENDER, MEDICAL_TITLE } from '@/constants';
import FileUploader from '@/components/global/file_uploader/file-uploader';
import DatetimePicker from '@/components/global/datetime_picker/datetime-picker';
import PhoneNumberField from '@/components/global/phone_number_field/phone-number-field';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('profile');
const editableFieldModel = (field, selectable) => ({
  get() {
    if(this.editableBasicInfo) {
      return selectable
      ? this[`${field}_options`].find(v => v.value === this.editableBasicInfo[field])
      : this.editableBasicInfo[field];
    }
  },
  set(...args) {
    const value = selectable && args[0] ? args[0].value : args[0];
    this.setEditableBasicInfoField({ field, value });
  }
});

export default {
  name: 'ProfileBasicInfoEdit',
  inject: ['$validator'],
  components: {
    FileUploader,
    DatetimePicker,
    PhoneNumberField
  },
  data() {
    return {
      processing: false,
      error: null,
      gender_options: [],
      medicalTitle_options: []
    };
  },
  computed: {
    ...mapGetters(['editableBasicInfo']),
    gender: editableFieldModel('gender', true),
    medical_title: editableFieldModel('medicalTitle', true),
    first_name: editableFieldModel('firstName'),
    last_name: editableFieldModel('lastName'),
    email: editableFieldModel('email'),
    phone_number: editableFieldModel('phoneNumber'),
    dateOfBirth() {
      const date = ((this.editableBasicInfo || {}).birthDate || {}).timestamp;
      return date ? date * 1000 : this.maxDate;
    },
    maxDate() {
      return this.$moment().subtract(21, 'year').valueOf();
    }
  },
  async beforeMount() {
    await this.fetchBasicInfo();
    this.setEditableBasicInfo();
    this.setGenders();
    this.setMedicalTitles();
  },
  beforeDestroy() {
    this.resetEditableBasicInfo();
  },
  methods: {
    ...mapActions([
      'fetchBasicInfo'
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
    setMedicalTitles() {
      MEDICAL_TITLE.forEach((v, i) => {
        this.medicalTitle_options.push({
          label: v,
          value: i
        });
      });
    },
    translatedGenderLabel({ label }) {
      return this.$t(`gender.${label}`);
    },
    translatedMedicalTitleLabel({ label }) {
      return this.$t(`medical_title.${label}`);
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
    }
  }
};
</script>
<style scoped lang="scss">
@import "profile-basic-info-edit.scss";
</style>
