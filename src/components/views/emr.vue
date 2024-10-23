<template>
  <div class="Emr__wrapper">
    <div
      v-if="allowed"
      class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <div class="Emr__content">
          <div class="Emr__section">
            <patients-new-patient/>
          </div>
          <transition
            v-if="!status.banner"
            appear
            name="fade"
            mode="out-in">
            <div class="Emr__section">
              <patients-list/>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div
      v-else
      class="Emr__permission-denied">
      <img
        src="/static/images/locked.svg"
        class="Emr__permission-denied-icon" />
      <div class="Emr__permission-denied-title">
        {{ $t('patients.access_locked') }}
      </div>
      <div
        class="Emr__permission-denied-description"
        v-html="$t('patients.you_dont_have_access_to_emr')"></div>
      <btn
        class="Emr__permission-denied-action"
        @onclick="$router.push({ name: 'membership' })"
        btn-class="submit"
        :btn-label="$t('global.upgrade')">
      </btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PatientsNewPatient from '@/components/patients/patients_new_patient/patients-new-patient';
import PatientsList from '@/components/patients/patients_list/patients-list';

export default {
  name: 'Emr',

  components: {
    PatientsList,
    PatientsNewPatient
  },

  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (!vm.isExternalDoctor) return next();
  //     if (vm.currentPackage && vm.includesGoldFeatures) return next();
  //     const unwatch = vm.$watch('currentPackage', (val, prev) => {
  //       unwatch();
  //       if (vm.includesGoldFeatures) {
  //         next();
  //       } else {
  //         next({name: 'dashboard'});
  //       }
  //     });
  //     return unwatch;
  //   });
  // },

  computed: {
    ...mapGetters('profile', [
      'isExternalDoctor',
      'role',
      'status'
    ]),
    ...mapGetters('membership', [
      'currentPackage',
      'includesGoldFeatures'
    ]),
    allowed() {
      return !this.isExternalDoctor || this.includesGoldFeatures;
    }
  }
};
</script>

<style lang="scss">
.Emr {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    padding-top: 16px;
  }

  &__section {
    & + & {
      margin-top: 48px;
      transition: opacity .2s ease-out;
      transition-delay: .4s;
    }
  }

  &__permission-denied {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    min-height: 100vh;
    &-icon {
      width: 184px;
      height: 184px;
      padding-bottom: 16px;
    }
    &-title {
      color: #4a4a4a;
      font-size: 20px;
      font-weight: 500;
    }
    &-description {
      padding: 8px 0 16px 0;
      font-size: 15px;
      color: #292929;
      line-height: 22px;
      text-align: center;
    }
  }
}
</style>
