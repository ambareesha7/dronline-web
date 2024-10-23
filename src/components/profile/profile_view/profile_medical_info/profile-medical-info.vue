<template>
  <div class="ProfileMedicalInfo__wrapper">
    <div
      v-if="isDoctor"
      class="ProfileMedicalInfo__section">
      <div class="ProfileMedicalInfo__section-title">
        {{ $t('authorisation.credentials') }}
      </div>

      <div
        class="ProfileMedicalInfo__section-block"
        v-for="(section, index) in medicalCategories"
        :key="index">
        <div class="ProfileMedicalInfo__section-row">
          <div class="ProfileMedicalInfo__section-row-label">
            {{ $t('global.category') }}
          </div>
          <div class="ProfileMedicalInfo__section-row-value">
            {{ section.category.name }}
          </div>
        </div>
        <div class="ProfileMedicalInfo__section-row">
          <div class="ProfileMedicalInfo__section-row-label">
            {{ $t('global.speciality') }}
          </div>
          <div
            class="ProfileMedicalInfo__section-row-value"
            v-html="section.speciality ? section.speciality.name : '&mdash;'">
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="medicalCredentials"
      class="ProfileMedicalInfo__section">
      <div class="ProfileMedicalInfo__section-title">
        {{ $t('profile.board_certification') }}
      </div>

      <div class="ProfileMedicalInfo__section-row">
        <div
          class="ProfileMedicalInfo__credential-image"
          :class="{ 'inactive': !medicalCredentials.boardCertificationUrl }"
          :style="boardCertificationImage"
          @click="openPreview(medicalCredentials.boardCertificationUrl)">
        </div>
      </div>
      <div class="ProfileMedicalInfo__section-row">
        <div class="ProfileMedicalInfo__section-row-label">
          {{ $t('global.expiry_date') }}
        </div>
        <div
          class="ProfileMedicalInfo__section-row-value"
          v-html="boardCertificationExpiryDate">
        </div>
      </div>
    </div>

    <div
      v-if="medicalCredentials"
      class="ProfileMedicalInfo__section">
      <div class="ProfileMedicalInfo__section-title">
        {{ $t('profile.current_state_license_number') }}
      </div>

      <div class="ProfileMedicalInfo__section-row">
        <div
          class="ProfileMedicalInfo__credential-image"
          :class="{ 'inactive': !medicalCredentials.currentStateLicenseNumberUrl }"
          :style="currentStateLicenseNumberImage"
          @click="openPreview(medicalCredentials.currentStateLicenseNumberUrl)">
        </div>
      </div>
      <div class="ProfileMedicalInfo__section-row">
        <div class="ProfileMedicalInfo__section-row-label">
          {{ $t('global.expiry_date') }}
        </div>
        <div
          class="ProfileMedicalInfo__section-row-value"
          v-html="currentStateLicenseNumberExpiryDate">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ImageViewer from '@/components/global/image_viewer/image-viewer';

const { mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'SpecialistMedicalInfo',

  computed: {
    ...mapGetters([
      'isDoctor',
      'medicalCategories',
      'medicalCredentials'
    ]),

    currentStateLicenseNumberExpiryDate() {
      return this.medicalCredentials.currentStateLicenseNumberExpiryDate ?
        this.$moment(
          this.medicalCredentials.currentStateLicenseNumberExpiryDate.timestamp * 1000
        ).format('YYYY/MM/DD') :
        null;
    },
    boardCertificationExpiryDate() {
      return this.medicalCredentials.boardCertificationExpiryDate ?
        this.$moment(
          this.medicalCredentials.boardCertificationExpiryDate.timestamp * 1000
        ).format('YYYY/MM/DD') :
        null;
    },
    currentStateLicenseNumberImage() {
      if (!this.medicalCredentials) return {};
      const url = this.medicalCredentials.currentStateLicenseNumberUrl;
      const isPdf = url.split('.').pop().toLowerCase() === 'pdf';
      return {
        'background-image': `url(${isPdf ? '/static/images/pdf.png' : url})`,
        'background-size': isPdf ? 'contain' : 'cover'
      };
    },
    boardCertificationImage() {
      if (!this.medicalCredentials) return {};
      const url = this.medicalCredentials.boardCertificationUrl;
      const isPdf = url.split('.').pop().toLowerCase() === 'pdf';
      return {
        'background-image': `url(${isPdf ? '/static/images/pdf.png' : url})`,
        'background-size': isPdf ? 'contain' : 'cover'
      };
    }
  },

  methods: {
    openPreview(image_url) {
      if (!image_url) return;
      if (image_url.split('.').pop().toLowerCase() === 'pdf') {
        const win = window.open(image_url, '_blank');
        win.focus();
      } else {
        this.$modal.show(ImageViewer, {
          items: [image_url]
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
@import "profile-medical-info.scss";
</style>
