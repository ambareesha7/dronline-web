<template>
  <div class="RegistrationStep5__wrapper">
    <div class="RegistrationStep5__content">
      <div class="RegistrationStep5__section">
        <div class="RegistrationStep5__section-header">
          <div class="RegistrationStep5__section-title">
            {{ $t('authorisation.credentials') }}
          </div>
        </div>
        <transition
          appear
          name="fade"
          mode="out-in">
          <div
            v-if="editableMedicalCategories"
            class="RegistrationStep5__section-content">
            <medical-category-form
              v-for="(section, index) in editableMedicalCategories"
              :key="index"
              :section="section"
              :index="index"/>

            <div
              v-if="categoriesLength < 4"
              @click="addMedicalCategory"
              class="RegistrationStep5__add-category form-actions"
              data-cy="RegistrationStep5__add-category">
              <i class="icon-plus RegistrationStep5__add-category-icon"/>
              {{ $t('profile.add_new_category') }}
            </div>
          </div>
        </transition>
      </div>
      <div class="RegistrationStep5__section">
        <div class="RegistrationStep5__section-header">
          <div class="RegistrationStep5__section-title">
            {{ $t('global.documents') }}
          </div>
          <div class="RegistrationStep5__accepted-types-prompt">
            {{ $t('profile.accepted_file_types') }}
          </div>
        </div>
        <transition
          appear
          name="fade"
          mode="out-in">
          <div
            v-if="editableMedicalCredentials"
            class="RegistrationStep5__section-content">
            <div
              class="RegistrationStep5__document"
              v-for="(document, index) in medicalCredentials"
              :key="index">
              <div class="RegistrationStep5__document-title">
                {{ $t(`profile.${document.label}`) }}
              </div>
              <div class="form-row">
                <div
                  class="RegistrationStep5__document-attachment-container"
                  :class="{
                    'not-uploaded': !document.imageUrl
                  }">
                  <div
                    v-if="document.imageUrl"
                    class="RegistrationStep5__document-attachment">
                    <div
                      class="RegistrationStep5__document-attachment-thumbnail"
                      :style="document.imageStyle"></div>
                    <div
                      class="RegistrationStep5__document-attachment-preview-button"
                      @click="openPreview(document)">
                      {{ $t('global.preview') }}
                    </div>
                    <i
                      class="icon-close RegistrationStep5__document-attachment-remove"
                      @click="removeAttachment(document.label)"></i>
                  </div>
                  <file-uploader
                    v-else
                    :required="true"
                    :index="index"
                    :name="`${document.label}`"
                    class="RegistrationStep5__document-attachment-upload"
                    @onupload="file => setImageFile(document.type, file)"
                    :multiple="false">
                    <div
                      slot="toggle"
                      class="RegistrationStep5__document-attachment-upload-toggle">
                      <div class="RegistrationStep5__document-attachment-upload-description">
                        {{ $t('global.drag_your_file_here') }}
                      </div>
                      <div class="RegistrationStep5__document-attachment-upload-divider">
                        {{ $t('global.or') }}
                      </div>
                      <div class="RegistrationStep5__document-attachment-upload-button">
                        {{ $t('global.upload') }}
                      </div>
                    </div>
                  </file-uploader>
                </div>
              </div>
              <div class="form-row">
                <datetime-picker
                  :name="`${document.label}_expiry`"
                  input-class="form-field"
                  format="YYYY/MM/DD"
                  :value="document.expiryDate"
                  @onchange="date => setExpiryDate(document.type, date)"
                  ref="date"
                  position="top"
                  :allow-clearing="false"
                  :customYear="2050"
                  data-cy="RegistrationStep5__expiry-date-field"
                  :indicate-current-day="false">
                </datetime-picker>
                <input
                  class="form-hidden-validator filled form-field"
                  type="text"
                  :value="document.expiryDate"/>
                <label class="form-label label-inner">
                  {{ $t('global.expiry_date') }}
                </label>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <transition
      appear
      name="appear-from-bottom"
      mode="out-in">
      <div
        v-if="!processing"
        class="RegistrationStep5__footer">
        <div class="RegistrationStep5__footer-content">
          <div
            v-if="error"
            class="form-row form-help is-danger">
            {{ error }}
          </div>
          <div class="form-actions full RegistrationStep5__footer-actions">
            <btn
              class="RegistrationStep5__cancel"
              @onclick="back"
              btn-class="blue"
              :btn-label="$t('global.back')"
              data-cy="RegistrationStep5__back">
            </btn>
            <btn
              @onclick="submit"
              class="RegistrationStep5__submit"
              btn-class="submit"
              :btn-label="$t('global.go_next')"
              data-cy="RegistrationStep5__submit">
            </btn>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import MedicalCategoryForm from '@/components/form/medical_category_form/medical-category-form';
import FileUploader from '@/components/global/file_uploader/file-uploader';
import DatetimePicker from '@/components/global/datetime_picker/datetime-picker';
import ImageViewer from '@/components/global/image_viewer/image-viewer';
import { pascalToSnakeCase, snakeToCamelCase } from '@/utils/filters';

const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('profile');

export default {
  name: 'RegistrationStep5',

  components: {
    MedicalCategoryForm,
    FileUploader,
    DatetimePicker
  },

  data() {
    return {
      error: null,
      processing: false,
      credentialTypes: [
        'boardCertification',
        'currentStateLicenseNumber'
      ]
    };
  },

  computed: {
    ...mapGetters([
      'editableMedicalCategories',
      'editableMedicalCredentials'
    ]),
    categoriesLength() {
      if (!this.editableMedicalCategories) return 0;
      return this.editableMedicalCategories.length;
    },
    medicalCredentials() {
      const medicalCredentials = [];
      this.credentialTypes.forEach(type => {
        const isPdf = this.extractFileType(type) === 'pdf';
        medicalCredentials.push({
          type,
          expiryDate: this.extractExpiryDate(type),
          imageUrl: this.extractUrl(type),
          imageStyle: {
            'background-image': `url(${isPdf ? '/static/images/pdf.png' : this.extractUrl(type)})`
          },
          isPdf,
          label: pascalToSnakeCase(type)
        });
      });
      return medicalCredentials;
    }
  },

  async beforeMount() {
    const medicalCategories = localStorage.getItem('registration-medical-categories');
    const medicalCredentials = localStorage.getItem('registration-medical-credentials');
    await this.fetchMedicalCategories();
    this.setEditableMedicalCategories(medicalCategories ? JSON.parse(medicalCategories) : null);
    if (!this.editableMedicalCategories.length) this.addMedicalCategory();

    await this.fetchMedicalCredentials();
    this.setEditableMedicalCredentials(medicalCredentials ? JSON.parse(medicalCredentials) : null);
  },

  beforeDestroy() {
    this.resetEditableMedicalCategories();
  },
  methods: {
    ...mapActions([
      'fetchMedicalCategories',
      'updateMedicalCategories',
      'updateMedicalCredentials',
      'updateMedicalInfo',
      'uploadProfileImage',
      'fetchMedicalCredentials',
      'fetchMedicalCredentialsV2'
    ]),
    ...mapMutations([
      'setEditableMedicalCategories',
      'resetEditableMedicalCategories',
      'addMedicalCategory',
      'setEditableMedicalCredentials',
      'setEditableMedicalCredentialsField',
      'resetEditableMedicalCredentials',
      'setRegistrationStep'
    ]),
    extractExpiryDate(type) {
      return this.editableMedicalCredentials[`${type}ExpiryDate`] ?
        this.editableMedicalCredentials[`${type}ExpiryDate`].timestamp * 1000 :
        null;
    },
    extractUrl(type) {
      return this.editableMedicalCredentials[`${type}Url`];
    },
    extractFileType(type) {
      if (!this.editableMedicalCredentials[`${type}Url`]) return null;
      return this.editableMedicalCredentials[`${type}Url`].split('.').pop().toLowerCase();
    },
    setExpiryDate(section, value) {
      this.setEditableMedicalCredentialsField({
        field: `${section}ExpiryDate`,
        value: {
          timestamp: this.$moment.utc(value).unix()
        }
      });
    },
    async setImageFile(field, file) {
      const value = await this.uploadProfileImage(file);
      this.setEditableMedicalCredentialsField({
        field: `${field}Url`,
        value
      });
    },
    removeAttachment(section) {
      this.setEditableMedicalCredentialsField({
        field: `${snakeToCamelCase(section)}Url`,
        value: null
      });
    },
    openPreview({ isPdf, imageUrl }) {
      if (!imageUrl) return;
      if (isPdf) {
        const win = window.open(imageUrl, '_blank');
        win.focus();
      } else {
        this.$modal.show(ImageViewer, {
          items: [imageUrl]
        }, {
          name: 'image-viewer',
          width: '100%',
          height: '100%',
          pivotY: 0.05,
          adaptive: true,
          clickToClose: true,
          classes: ['ImageViewer']
        });
      }
    },
    back() {
      this.processing = true;
      localStorage.setItem('registration-medical-categories', JSON.stringify(this.editableMedicalCategories));
      localStorage.setItem('registration-medical-credentials', JSON.stringify(this.editableMedicalCredentials));
      setTimeout(() => {
        this.setRegistrationStep(4);
      }, 200);
    },
    submit() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.updateMedicalInfo().then(({ error }) => {
            if (error) {
              this.processing = false;
              this.error = error;
            } else {
              this.setRegistrationStep(6);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "registration-step-5.scss";
</style>
