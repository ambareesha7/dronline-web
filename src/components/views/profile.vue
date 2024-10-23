<template>
  <div class="Profile__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <h3 class="title">
          {{ $t('profile.profile_details') }}
        </h3>
        <div class="content-container shaded-outline">
          <div class="tabs">
            <div
              class="tab ripple Profile__tab"
              :class="{ 'active': tabName === 'basic-info' }"
              @click="setTab('basic-info')">
              <div class="tab-label">
                {{ $t('global.basic_info') }}
              </div>
            </div>
            <div
              v-if="!isNurse"
              class="tab ripple Profile__tab"
              :class="{ 'active': tabName === 'achievements' }"
              @click="setTab('achievements')">
              <div class="tab-label">
                {{ $t('global.achievements') }}
              </div>
            </div>
            <div
              v-if="!isNurse"
              class="tab ripple Profile__tab"
              :class="{ 'active': tabName === 'prices' }"
              @click="setTab('prices')">
              <div class="tab-label">
                {{ $t('profile.pricing_details') }}
              </div>
            </div>
            <div
              class="tab ripple Profile__tab"
              :class="{ 'active': tabName === 'medical-info' }"
              @click="setTab('medical-info')">
              <div class="tab-label">
                {{ $t('profile.medical_info') }}
              </div>
            </div>
          </div>
          <div class="Profile__content">
            <div class="Profile__content-col">
              <profile-general-info/>
              <profile-delete-request/>
            </div>
            <transition
              name="fade"
              mode="out-in">
              <component
                :is="componentName"
                :key="componentName"
                class="Profile__content-col">
              </component>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <transition
      appear
      name="appear-from-top"
      mode="out-in">
      <div
        v-if="updated"
        class="Profile__updated">
        {{ $t('global.changes_have_been_saved') }}
        <i
          class="icon-close Profile__updated-close"
          @click="updated = false"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProfileGeneralInfo from '@/components/profile/profile_view/profile_general_info/profile-general-info';
import ProfileDeleteRequest from '@/components/profile/profile_view/profile_delete_request/profile-delete-request';
import ProfileBasicInfo from '@/components/profile/profile_view/profile_basic_info/profile-basic-info';
import ProfileMedicalInfo from '@/components/profile/profile_view/profile_medical_info/profile-medical-info';
import ProfileAchievements from '@/components/profile/profile_view/profile_achievements/profile-achievements';
import ProfilePrices from '@/components/profile/profile_view/profile_prices/profile-prices';
import { pascalToSnakeCase } from '@/utils/filters';

export default {
  name: 'MyProfile',

  data() {
    return {
      tabName: 'basic-info',
      updated: false,
      tabs: {
        'basic-info': 'profile-basic-info'
      }
    };
  },

  components: {
    ProfileGeneralInfo,
    ProfileDeleteRequest,
    ProfileBasicInfo,
    ProfileMedicalInfo,
    ProfileAchievements,
    ProfilePrices
  },

  computed: {
    ...mapGetters('profile', [
      'isNurse',
      'isDoctor',
      'status'
    ]),
    currentTab() {
      return `patient-${this.tabName}`;
    },
    componentName() {
      return `profile-${pascalToSnakeCase(this.tabName)}`;
    }
  },

  beforeRouteEnter(to, from, next) {
    if (to.query && to.query.updated) {
      next(vm => {
        vm.showSnackbar();
        next({ name: 'profile' });
      });
    } else {
      next();
    }
  },

  async mounted() {
    const promises = [
      'fetchBasicInfo',
      'fetchCredentials',
      'fetchMedicalCredentials'
    ];
    if (this.isDoctor) {
      promises.push('fetchLocation');
      promises.push('fetchMedicalCategories');
      promises.push('fetchBio');
      promises.push('fetchCategoriesPrices');
    }
    promises.map(method => this[method]());
    await Promise.all(promises);
  },

  methods: {
    ...mapActions('profile', [
      'fetchBasicInfo',
      'fetchCredentials',
      'fetchLocation',
      'fetchMedicalCategories',
      'fetchMedicalCredentials',
      'fetchBio',
      'fetchCategoriesPrices'
    ]),
    setTab(tab) {
      this.tabName = tab;
    },
    showSnackbar() {
      this.updated = true;
      setTimeout(() => {
        this.updated = false;
      }, 3000);
    }
  }
};
</script>

<style lang="scss">
.Profile {
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

        &:last-of-type {
          padding-left: 16px;
        }
      }
    }

    &__tab {
      flex-basis: 50%;
    }

    &__updated {
      position: fixed;
      z-index: 1111;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      background: #23CE86;
      transition: transform .4s ease-out, opacity .44s ease-out;

      &-close {
        color: #fff;
        cursor: pointer;
        font-size: 12px;
        position: absolute;
        right: 24px;
      }
    }
  }
</style>
