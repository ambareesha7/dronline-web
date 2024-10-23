<template>
    <div class="ProfileInsuranceEdit__wrapper">
      <insurance-form
        v-for="(form, index) in countries"
        :key="index"
        :form="form"
        :index="index"
        :length="countries.length">
        </insurance-form>
    </div>
  </template>
  
  <script>
  import { createNamespacedHelpers } from 'vuex';
  import InsuranceForm from '@/components/form/insurance_form/insurance-form';
  
  const { mapGetters, mapActions } = createNamespacedHelpers('profile');
  
  export default {
    name: 'ProfileInsuranceEdit',
  
    components: {
        InsuranceForm
    },
  
    computed: {
      ...mapGetters([
        'insuranceProviders'
      ])
    },
    data() {
        return {
            countries: []
        };
    },
  
    async beforeMount() {
        await this.fetchInsuranceProviders();

        if(this.insuranceProviders.length === 0) {
        
            this.countries.push('')
            
        } else {
            let vm = this
            
            for (let i = 0; i < vm.insuranceProviders.length; i++) {
                if(!vm.countries.includes(vm.insuranceProviders[i]['countryId'])) {
                    vm.countries.push(vm.insuranceProviders[i]['countryId'])
                }
            }
        }
    },
  
    methods: {
      ...mapActions([
        'fetchInsuranceProviders'
      ])
    }
  };
  </script>
  <style scoped lang="scss">
  @import "profile-insurance-edit.scss";
  </style>
  