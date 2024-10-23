<template>
  <div class="RegistrationStep1__wrapper">
    <div class="RegistrationStep1__content">
      <div class="RegistrationStep1__section">
        <div class="RegistrationStep1__section-header">
          <div class="RegistrationStep1__section-title">
            {{ $t('profile.profile_photo') }}
          </div>
        </div>
        <transition
          appear
          name="fade"
          mode="out-in">
          <div
            v-if="editableBasicInfo"
            class="RegistrationStep1__section-content RegistrationStep1__profile-photo-container"
            data-cy="RegistrationStep1__profile-photo-section">
            <div
              class="RegistrationStep1__profile-photo"
              :class="{
                'is-danger': errors.has('your_photo'),
                empty: !avatarStyle
              }"
              :style="avatarStyle"
              data-cy="RegistrationStep1__profile-photo">
              <i
                v-if="!editableBasicInfo.profileImageUrl"
                class="icon-person RegistrationStep1__profile-photo-icon"></i>
            </div>
            <div
              class="RegistrationStep1__profile-photo-tip"
              v-html="$t('profile.avatar_tips')">
            </div>
            <div class="RegistrationStep1__profile-photo-upload-container">
              <file-uploader
                :required="false"
                class="RegistrationStep1__profile-photo-upload"
                @onupload="setAvatarFile"
                :multiple="false">
                <div
                  slot="toggle"
                  class="RegistrationStep1__profile-photo-upload-toggle ripple">
                  {{ $t('global.upload') }}
                </div>
              </file-uploader>
              <input
                name="your_photo"
                v-model="editableBasicInfo.profileImageUrl"
                class="form-hidden-validator form-field"
                v-validate="'required'"
                data-vv-delay="500"
                :data-vv-as="$t('profile.your_photo')"
                type="text"/>
              <span
                v-if="errors.has('your_photo')"
                class="RegistrationStep1__profile-photo-upload-error form-help is-danger">
                {{ $t('profile.upload_your_photo') }}
              </span>
            </div>
          </div>
        </transition>
      </div>

      <div class="RegistrationStep1__section">
        <div class="RegistrationStep1__section-header">
          <div class="RegistrationStep1__section-title">
            {{ $t('profile.personal_info') }}
          </div>
        </div>
        <transition
          appear
          name="appear-from-bottom"
          mode="out-in">
          <div
            v-if="editableBasicInfo"
            class="RegistrationStep1__section-content"
            data-cy="RegistrationStep1__personal-info-section">
            <div class="form-row--cols">
              <div class="form-col RegistrationStep1__col-half">
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
                  @keyup.enter="$refs.last_name.focus()"
                  data-cy="RegistrationStep1__first-name-field"/>
                <label
                  class="form-label label-inner"
                  for="first_name">
                  {{ $t('global.first_name') }}
                </label>
                <span
                  v-if="errors.has('first_name')"
                  class="form-help is-danger"
                  data-cy="RegistrationStep1__first-name-validation-error">
                  {{ errors.first('first_name') }}
                </span>
              </div>
              <div class="form-col RegistrationStep1__col-half">
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
                  :data-vv-as="$t('global.last_name')"
                  data-cy="RegistrationStep1__last-name-field"/>
                <label
                  class="form-label label-inner"
                  for="last_name">
                  {{ $t('global.last_name') }}
                </label>
                <span
                  v-if="errors.has('last_name')"
                  class="form-help is-danger"
                  data-cy="RegistrationStep1__last-name-validation-error">
                  {{ errors.first('last_name') }}
                </span>
              </div>
            </div>

            <div class="form-row--cols">
              <div class="form-col RegistrationStep1__col-half">
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
              <div class="form-col RegistrationStep1__col-half">
                <datetime-picker
                  :class="{
                    'is-danger': errors.has('dob')
                  }"
                  name="dob"
                  input-class="form-field"
                  format="YYYY/MM/DD"
                  :value="dateOfBirth"
                  position="right"
                  @onchange="date => setDateOfBirth(date)"
                  ref="date"
                  :allow-clearing="false"
                  data-cy="RegistrationStep1__dob-field">
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
                  class="form-help is-danger"
                  data-cy="RegistrationStep1__dob-validation-error">
                  {{ errors.first('dob') }}
                </span>
              </div>
            </div>

            <div class="form-row">
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
                <i
                  class="icon-caret multiselect-caret"
                  slot="caret"
                  slot-scope="{ toggle }"
                  @mousedown.prevent.stop="toggle"></i>
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

            <phone-number-field
              v-model="phone_number">
            </phone-number-field>

            <div class="RegistrationStep1__section-location" v-if="editableLocation">
              <location-autocomplete
                :saved-autocomplete-text="editableLocation.formattedAddress || null"
                v-on:place-changed="handlePlaceChange">
              </location-autocomplete>
            </div>

          </div>
        </transition>
      </div>

      <div
        v-if="!processing"
        class="RegistrationStep1__footer">
        <div class="RegistrationStep1__footer-content">
          <div
            v-if="error"
            class="form-row form-help is-danger"
            data-cy="RegistrationStep1__form-error">
            {{ error }}
          </div>
          <div class="form-actions full RegistrationStep1__footer-actions">
            <btn
              @onclick="doItLater"
              class="RegistrationStep1__footer-do-it-later"
              btn-class="submit"
              :btn-label="$t('global.do_it_later')"
              data-cy="RegistrationStep1__footer-do-it-later">
            </btn>
            <btn
              @onclick="submit"
              class="RegistrationStep1__submit"
              btn-class="submit"
              :btn-label="$t('global.go_next')"
              data-cy="RegistrationStep1__submit">
            </btn>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { GENDER, MEDICAL_TITLE, FULL_MONTHS } from '@/constants';
import FileUploader from '@/components/global/file_uploader/file-uploader';
import DatetimePicker from '@/components/global/datetime_picker/datetime-picker';
import PhoneNumberField from '@/components/global/phone_number_field/phone-number-field';
import LocationAutocomplete from '@/components/global/location_autocomplete/location-autocomplete';

const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('profile');
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
  name: 'RegistrationStep1',

  components: {
    FileUploader,
    DatetimePicker,
    PhoneNumberField,
    LocationAutocomplete
  },

  data() {
    return {
      processing: false,
      error: null,
      gender_options: [],
      month_options: [],
      year_options: [],
      medicalTitle_options: []
    };
  },

  computed: {
    ...mapGetters(['editableBasicInfo', 'editableLocation']),
    gender: editableFieldModel('gender', true),
    medical_title: editableFieldModel('medicalTitle', true),
    first_name: editableFieldModel('firstName'),
    last_name: editableFieldModel('lastName'),
    email: editableFieldModel('email'),
    phone_number: editableFieldModel('phoneNumber'),
    avatarStyle() {
      if (!this.editableBasicInfo || !this.editableBasicInfo.profileImageUrl) return null;
      return {'background-image': `url(${this.editableBasicInfo.profileImageUrl})`};
    },
    dateOfBirth() {
      const dob = this.editableBasicInfo ? this.editableBasicInfo.birthDate : null;
      return dob ? dob.timestamp * 1000 : null;
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
    if (!this.dateOfBirth) this.setDateOfBirth(this.maxDate);

    await this.fetchLocation();
    const location = localStorage.getItem('registration-location');
    this.setEditableLocation(location ? JSON.parse(location) : null);
  },

  beforeDestroy() {
    this.resetEditableBasicInfo();
  },

  methods: {
    ...mapActions([
      'fetchBasicInfo',
      'updateBasicInfo',
      'uploadProfileImage',
      'fetchLocation'
    ]),
    ...mapMutations([
      'setEditableBasicInfo',
      'setEditableBasicInfoField',
      'resetEditableBasicInfo',
      'setRegistrationStep',
      'setEditableLocation',
      'replaceEditableLocation',
    ]),
    handlePlaceChange(result) {
      this.error = null;
      this.replaceEditableLocation(result);
    },
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
    async setAvatarFile(file) {
      const value = await this.uploadProfileImage(file);
      this.setEditableBasicInfoField({
        field: 'profileImageUrl',
        value
      });
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
    doItLater() {
      this.$router.push({name: 'dashboard'});
    },
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.updateBasicInfo().then(({ error }) => {
            if (error) {
              this.processing = false;
              this.error = error;
            } else {
              this.setRegistrationStep(2);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "registration-step-1.scss";
</style>
