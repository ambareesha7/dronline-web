<template>
  <div class="RegistrationStep6__wrapper">
    <div class="RegistrationStep6__content">

      <div class="RegistrationStep6__section">
        <div class="RegistrationStep6__section-content">
          <insurance-form
            v-for="(form, index) in countries"
            :key="index"
            :form="form"
            :index="index"
            :length="countries.length">
          </insurance-form>

          <div v-if="insuranceProviders.length > 0" @click="addForm()" class="RegistrationStep6__add-form form-actions">
            <i class="icon-plus RegistrationStep6__add-form-icon"/>
            {{ $t('profile.add_new_country') }}
          </div>

        </div>
      </div>

      <div
        v-if="!processing"
        class="RegistrationStep6__footer">
        <div class="RegistrationStep6__footer-content">
          <div
            v-if="error"
            class="form-row form-help is-danger">
            {{ error }}
          </div>
          <div class="form-actions full RegistrationStep6__footer-actions">
            <btn
              class="RegistrationStep6__cancel"
              @onclick="back"
              btn-class="blue"
              :btn-label="$t('global.back')"
              data-cy="RegistrationStep6__back">
            </btn>
            <btn
              @onclick="submit"
              class="RegistrationStep6__submit"
              btn-class="submit"
              :btn-label="$t('global.go_next')"
              data-cy="RegistrationStep6__submit">
            </btn>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import InsuranceForm from '@/components/form/insurance_form/insurance-form';

const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('profile');

const editableFieldModel = field => ({
  get() {
    return this.editableBio[field];
  },
  set(value) {
    this.setEditableBioField({ field, value });
  }
});

export default {
  name: 'RegistrationStep6',
  components: {
    InsuranceForm
  },
  data() {
    return {
      error: null,
      processing: false
    };
  },
  computed: {
    ...mapGetters([
      'insuranceProviders', 
      'countries'
    ]),
  },
  async beforeMount() {
    await this.fetchInsuranceProviders();

    if(this.insuranceProviders.length === 0) {
      this.addCountry('');
    } else {
      let vm = this, arr = []
    
      for (let i = 0; i < vm.insuranceProviders.length; i++) {
        if(!arr.includes(vm.insuranceProviders[i]['countryId'])) {
          arr.push(vm.insuranceProviders[i]['countryId'])
        }
      }

      this.setCountries(arr)
    }

  },
  methods: {
    ...mapActions([
      'fetchInsuranceProviders',
    ]),
    ...mapMutations([
      'setRegistrationStep',
      'addCountry',
      'setCountries'
    ]),
    back() {
      this.processing = true;
      setTimeout(() => {
        this.setRegistrationStep(5);
      }, 200);
    },
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.setRegistrationStep(7);
        }
      });
    },
    addForm() {
      this.addCountry('');
    }
  }
};
</script>

<style scoped lang="scss">
@import "registration-step-6.scss";
</style>
