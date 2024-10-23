<template>
  <div class="ProfileBasicInfo__wrapper">
    <div class="ProfileBasicInfo__section">
      <div class="ProfileBasicInfo__section-title">
        {{ $t('profile.personal_info') }}
      </div>
      <div
        v-if="basicInfo"
        class="ProfileBasicInfo__section-content">
        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.gender') }}
          </div>
          <div
            class="ProfileBasicInfo__section-row-value"
            v-html="translatedGender">
          </div>
        </div>
        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.medical_title') }}
          </div>
          <div
            class="ProfileBasicInfo__section-row-value"
            v-html="translatedMedicalTitle">
          </div>
        </div>

        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.first_name') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ basicInfo.firstName }}
          </div>
        </div>

        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.last_name') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ basicInfo.lastName }}
          </div>
        </div>

        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.dob') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ dateOfBirth }}
          </div>
        </div>

        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.phone_number') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ basicInfo.phoneNumber }}
          </div>
        </div>

        <div
          v-if="credentials"
          class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.email_address') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ credentials.email }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="ProfileBasicInfo__section-initializing">
        <spinner></spinner>
      </div>
    </div>

    <div
      v-if="isDoctor"
      class="ProfileBasicInfo__section">
      <div class="ProfileBasicInfo__section-title">
        {{ $t('global.location') }}
      </div>
      <div
        v-if="location"
        class="ProfileBasicInfo__section-content">
        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.home_number') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ location.number }}
          </div>
        </div>

        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.street') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ location.street }}
          </div>
        </div>

        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.neighborhood') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ location.neighborhood }}
          </div>
        </div>

        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.additional_no') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ location.additionalNumbers }}
          </div>
        </div>

        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.city') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ location.city }}
          </div>
        </div>

        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.postal_code') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ location.postalCode }}
          </div>
        </div>

        <div class="ProfileBasicInfo__section-row">
          <div class="ProfileBasicInfo__section-row-label">
            {{ $t('global.country') }}
          </div>
          <div class="ProfileBasicInfo__section-row-value">
            {{ location.country }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="ProfileBasicInfo__section-initializing">
        <spinner></spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { GENDER, MEDICAL_TITLE } from '@/constants';

const { mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'ProfileBasicInfo',

  computed: {
    ...mapGetters([
      'isDoctor',
      'basicInfo',
      'credentials',
      'info',
      'location'
    ]),
    translatedGender() {
      return this.basicInfo.gender ?
        this.$t(`gender.${GENDER[this.basicInfo.gender]}`) :
        this.$('global.unknown');
    },
    translatedMedicalTitle() {
      return this.basicInfo.medicalTitle ?
        this.$t(`medical_title.${MEDICAL_TITLE[this.basicInfo.medicalTitle]}`) :
        '&mdash;';
    },
    dateOfBirth() {
      if (!this.basicInfo.birthDate) return null;
      const dob = this.$moment(this.basicInfo.birthDate.timestamp * 1000);
      const age = this.$moment().diff(this.$moment(dob), 'years');
      return `${dob.format('YYYY/MM/DD')} (${age})`;
    }
  }
};
</script>
<style scoped lang="scss">
@import "profile-basic-info.scss";
</style>
