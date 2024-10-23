<template>
  <div
    class="ProfileCredentialsEdit__wrapper"
    v-if="editableMedicalCredentials">
    <div
      class="ProfileCredentialsEdit__document"
      v-for="(document, index) in medicalCredentials"
      :key="index">
      <div class="ProfileCredentialsEdit__document-title">
        {{ $t(`profile.${document.label}`) }}
      </div>
      <div class="form-row">
        <div
          class="ProfileCredentialsEdit__document-attachment-container"
          :class="{
            'not-uploaded': !document.imageUrl,
            'is-danger': errors.has(`${document.label}_image_url`)
          }">
          <div
            v-if="document.imageUrl"
            class="ProfileCredentialsEdit__document-attachment">
            <div
              class="ProfileCredentialsEdit__document-attachment-thumbnail"
              :style="document.imageStyle"></div>
            <div
              class="ProfileCredentialsEdit__document-attachment-preview-button"
              @click="openPreview(document)">
              {{ $t('global.preview') }}
            </div>
            <i
              class="icon-close ProfileCredentialsEdit__document-attachment-remove"
              @click="removeAttachment(document.label)"></i>
          </div>
          <file-uploader
            v-else
            :required="true"
            :index="index"
            :name="`${document.label}`"
            class="ProfileCredentialsEdit__document-attachment-upload"
            @onupload="file => setImageFile(document.type, file)"
            :multiple="false">
            <div
              slot="toggle"
              class="ProfileCredentialsEdit__document-attachment-upload-toggle">
              <div class="ProfileCredentialsEdit__document-attachment-upload-description">
                {{ $t('global.drag_your_file_here') }}
              </div>
              <div class="ProfileCredentialsEdit__document-attachment-upload-divider">
                {{ $t('global.or') }}
              </div>
              <div class="ProfileCredentialsEdit__document-attachment-upload-button">
                {{ $t('global.upload') }}
              </div>
            </div>
          </file-uploader>
        </div>
        <!-- <input
          :name="`${document.label}_image_url`"
          class="form-hidden-validator filled form-field"
          :value="document.profileImageUrl"
          v-validate="'required'"
          data-vv-delay="500"
          :data-vv-as="$t(`profile.${document.label}`)"
          type="text"/>
          <span
            v-if="errors.has(`${document.label}_image_url`)"
            class="RegistrationStep1__profile-photo-upload-error form-help is-danger">
            {{ errors.first(`${document.label}_image_url`) }}
          </span> -->
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
          :allow-clearing="false">
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
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FileUploader from '@/components/global/file_uploader/file-uploader';
import DatetimePicker from '@/components/global/datetime_picker/datetime-picker';
import ImageViewer from '@/components/global/image_viewer/image-viewer';
import { pascalToSnakeCase, snakeToCamelCase } from '@/utils/filters';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('profile');

export default {
  name: 'ProfileCredentialsEdit',

  inject: ['$validator'],

  components: {
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
      'editableMedicalCredentials'
    ]),
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
    await this.fetchMedicalCredentials();
    this.setEditableMedicalCredentials();
  },

  beforeDestroy() {
    this.resetEditableMedicalCredentials();
  },

  methods: {
    ...mapActions([
      'fetchMedicalCredentials',
      'uploadProfileImage'
    ]),
    ...mapMutations([
      'setEditableMedicalCredentials',
      'setEditableMedicalCredentialsField',
      'resetEditableMedicalCredentials'
    ]),
    extractFileType(type) {
      if (!this.editableMedicalCredentials[`${type}Url`]) return null;
      return this.editableMedicalCredentials[`${type}Url`].split('.').pop().toLowerCase();
    },
    extractExpiryDate(type) {
      return this.editableMedicalCredentials[`${type}ExpiryDate`] ?
        this.editableMedicalCredentials[`${type}ExpiryDate`].timestamp * 1000 :
        null;
    },
    extractUrl(type) {
      return this.editableMedicalCredentials[`${type}Url`];
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
    openPreview({ imageUrl, isPdf }) {
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
    }
  }
};
</script>
<style scoped lang="scss">
@import "profile-credentials-edit.scss";
</style>
