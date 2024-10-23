<template>
  <div class="PatientHeader__wrapper">
    <div class="PatientHeader__col">
      <breadcrumbs
        :steps="breadcrumbs"
        icon="icon_emr">
      </breadcrumbs>
    </div>
    <div class="PatientHeader__col">
      <btn
        @onclick="newVisit"
        btn-class="submit"
        class="PatientHeader__new-record-button"
        :class="{ invalidate: processing }"
        :btn-label="$t('patients.new_record')"
        data-cy="PatientHeader__new-record-button">
      </btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

const { mapGetters, mapActions } = createNamespacedHelpers('patient');
export default {
  name: 'PatientHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      processing: false
    };
  },

  computed: {
    ...mapGetters(['basicInfo']),

    patientName() {
      return this.basicInfo ? `${this.basicInfo.firstName} ${this.basicInfo.lastName}` : '...';
    },

    breadcrumbs() {
      const breadcrumbs = [
        {
          name: 'emr',
          label: this.$t('sidebar.emr')
        },
        {
          label: this.patientName,
          disabled: true
        }
      ];
      if (this.$route.query.parentId) {
        breadcrumbs.splice(1, 0, {
          name: 'patient',
          params: { id: this.$route.query.parentId },
          label: this.$t('profile.parent')
        });
      }
      return breadcrumbs;
    }
  },

  methods: {
    ...mapActions([
      'addNewVisit'
    ]),
    newVisit() {
      this.processing = true;
      this.addNewVisit(this.$route.params.id).then(({ response, error }) => {
        if (response) {
          this.$router.push({
            name: 'patient-record',
            params: {
              patientId: this.$route.params.id,
              id: response.patientRecord.recordId
            }
          });
        } else {
          this.$toastr.e(error);
        }
        this.processing = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.PatientHeader__new-record-button {
  height: 40px;
}
</style>
