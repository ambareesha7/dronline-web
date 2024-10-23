<template>
  <div class="ProfileEdit__wrapper">
    <!-- <div class="content" :class="{ banner: status && status.banner }"> -->
    <div class="content">
      <div class="content-inner">
        <h3 class="title">
          {{ $t('profile.profile_details') }}
        </h3>

        <div class="content-container shaded-outline">
          <div class="ProfileEdit__content">
            <div class="ProfileEdit__content-col">
              <profile-general-info-edit/>
            </div>
            <div
              sticky-container
              class="ProfileEdit__content-col">
              <div class="ProfileEdit__content-col-container">
                <div class="ProfileEdit__section">
                  <div class="ProfileEdit__section-title">
                    {{ $t('profile.personal_info') }}
                  </div>
                  <profile-basic-info-edit/>
                </div>

                <profile-achievement-edit v-if="!isNurse"/>

                <div class="ProfileEdit__section" v-if="isDoctor">
                  <div class="ProfileEdit__section-title">
                    {{ $t('global.location') }}
                  </div>
                  <profile-location-edit/>
                </div>

                <div class="ProfileEdit__section" v-if="isDoctor">
                  <div class="ProfileEdit__section-title">
                    {{ $t('profile.medical_categories') }}
                  </div>
                  <profile-categories-edit/>
                </div>
                
                <div class="ProfileEdit__section">
                  <div class="ProfileEdit__section-header">
                    <div class="ProfileEdit__section-title">
                      {{ $t('global.documents') }}
                    </div>
                    <div class="ProfileEdit__accepted-types-prompt">
                      {{ $t('profile.accepted_file_types') }}
                    </div>
                  </div>
                  <profile-credentials-edit/>
                </div>

                <div class="ProfileEdit__section" v-if="isDoctor">
                  <div class="ProfileEdit__section-title">
                    {{ $t('profile.insurance') }}
                  </div>
                  <profile-insurance-edit />
                </div>

                <div class="ProfileEdit__section" id="profile-edit-pricing" v-if="isDoctor">
                  <div class="ProfileEdit__section-title">
                    {{ $t('profile.pricing_details') }}
                  </div>
                  <profile-prices-edit />
                </div>

              </div>

              <div
                v-sticky
                sticky-side="bottom"
                class="form-actions full ProfileEdit__footer">
                <btn
                  @onclick="back"
                  btn-class="blue"
                  :btn-label="$t('global.cancel')">
                </btn>
                <btn
                  @onclick="submit"
                  btn-class="green"
                  :btn-label="$t('global.save_changes')">
                </btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProfileGeneralInfoEdit from '@/components/profile/profile_edit/profile_general_info_edit/profile-general-info-edit';
import ProfileBasicInfoEdit from '@/components/profile/profile_edit/profile_basic_info_edit/profile-basic-info-edit';
import ProfileLocationEdit from '@/components/profile/profile_edit/profile_location_edit/profile-location-edit';
import ProfileCredentialsEdit from '@/components/profile/profile_edit/profile_credentials_edit/profile-credentials-edit';
import ProfileCategoriesEdit from '@/components/profile/profile_edit/profile_categories_edit/profile-categories-edit';
import ProfileAchievementEdit from '@/components/profile/profile_edit/profile_achievement_edit/profile-achievement-edit';
import ProfilePricesEdit from '@/components/profile/profile_edit/profile_prices_edit/profile-prices-edit';
import ProfileInsuranceEdit from '@/components/profile/profile_edit/profile_insurance_edit/profile-insurance-edit';

export default {
  name: 'ProfileEdit',

  components: {
    ProfileGeneralInfoEdit,
    ProfileBasicInfoEdit,
    ProfileLocationEdit,
    ProfileCredentialsEdit,
    ProfileCategoriesEdit,
    ProfileAchievementEdit,
    ProfilePricesEdit,
    ProfileInsuranceEdit
  },

  data() {
    return {
      error: null,
      processing: false
    };
  },

  computed: {
    ...mapGetters('profile', [
      'isDoctor',
      'isNurse',
      'status'
    ])
  },

  async mounted() {
    const promises = ['fetchCredentials'].map(method => this[method]());
    await Promise.all(promises);
  },

  methods: {
    ...mapActions('profile', [
      'fetchCredentials',
      'fetchMedicalCategories',
      'fetchBio',
      'updateBio',
      'updateBasicInfo',
      'updateLocation',
      'updateMedicalCredentials',
      'updateMedicalCategories',
      'checkProfileStatus'
    ]),

    async back(updated = false) {
      await this.checkProfileStatus();
      this.$router.push({ name: 'profile', query: updated ? { updated } : null });
    },

    async submit() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          this.error = null;
          this.processing = true;
          const promises = [
            'updateBasicInfo',
            'updateMedicalCredentials'
          ];
          if (!this.isNurse) {
            promises.push('updateBio');
          }
          if (this.isDoctor) {
            promises.push('updateLocation');
            promises.push('updateMedicalCategories');
          }
          promises.map(method => this[method]());

          const response = await Promise.all(promises);
          const errorResponses = response.filter(r => r.error);

          if (errorResponses.length) {
            this.error = errorResponses[0].error;
          } else {
            this.back(true);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.ProfileEdit {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    display: flex;

    &-col {
      flex-basis: 50%;
      padding-top: 16px;
      transition: transform .16s ease-out, opacity .2s ease-out;

      &:first-of-type {
        background-color: #fbfdff;
      }

      &-container {
        padding: 16px 40px 0 40px;
      }
    }
  }

  &__section {
    padding: 16px 0 24px 0;

    &-header {
      display: flex;
      justify-content: space-between;
    }

    &-title {
      color: #4A4A4A;
      font-size: 16px;
      font-weight: 500;
    }
  }

  &__footer {
    border-top: 1px solid #e1e1e1;
    margin: 0;
    padding: 24px 40px;

    &.bottom-sticky {
      background-color: #fff;
    }
  }

  &__accepted-types-prompt {
    color: #23CE86;
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
