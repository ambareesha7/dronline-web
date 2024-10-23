<template>
  <div class="PatientRecordHeader__wrapper">
    <div class="PatientRecordHeader__col">
      <breadcrumbs
        :steps="breadcrumbs"
        icon="icon_emr">
      </breadcrumbs>
    </div>
    <div class="PatientRecordHeader__col">
      <btn
        btn-class="link"
        :btn-label="$t('patients.download_record')"
        @onclick="download">
        <i class="icon-download" slot="icon-before"></i>
      </btn>
      <btn
        v-if="record && !record.endDate"
        @onclick="endVisit"
        btn-class="red"
        :btn-label="$t('patients.end_record')"
        class="PatientRecordHeader__end-record"
        data-cy="PatientRecord__end-record">
      </btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';
import PatientRecordsConfirmEndRecord from '@/components/patients/patient_details/patient_records/patient_records_confirm_end_record/patient-records-confirm-end-record';
import api from '@/api';

export default {
  name: 'PatientRecordHeader',

  components: {
    Breadcrumbs
  },

  computed: {
    ...mapGetters('patient', ['basicInfo']),
    ...mapGetters('patientRecords', ['record']),

    stateTitle() {
      return `${this.$t('patients.patient_record')} ${this.$route.params.id}`;
    },
    name() {
      return this.basicInfo ? `${this.basicInfo.firstName} ${this.basicInfo.lastName}` : '...';
    },
    breadcrumbs() {
      const breadcrumbs = [
        {
          name: 'emr',
          label: this.$t('sidebar.emr')
        },
        {
          name: 'patient',
          params: { id: this.$route.params.patientId },
          query: this.$route.query.parentId ? { parentId: this.$route.query.parentId } : null,
          label: this.name
        },
        {
          label: `${this.$t('global.record')}: ${this.$route.params.id}`,
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
    ...mapActions('patientRecords', [
      'endPatientVisit',
      'fetchPatientRecord',
      'generateRecordPdf'
    ]),
    endVisit() {
      this.$modal.show(
        PatientRecordsConfirmEndRecord,
        {
          name: this.name,
          confirm: async () => {
            await this.endPatientVisit({
              patient_id: this.$route.params.patientId,
              record_id: this.$route.params.id
            });
            this.fetchPatientRecord({
              patient_id: this.$route.params.patientId,
              record_id: this.$route.params.id
            });
          }
        },
        {
          name: 'patient-records-confirm-end-record',
          width: 515,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          clickToClose: false,
          transition: 'from-top-to-bottom'
        }
      );
    },
    async download() {
      const { patientId: patient_id, id: record_id } = this.$route.params;
      const { data } = await api.generateRecordPdf({ patient_id, record_id });
      const link = document.createElement('a');
      link.download = `Medica_Record_${record_id}_${this.name.split(' ').join('_')}_${this.$moment().format('DD-MM-YYYY')}.pdf`;
      link.target = '_blank';
      const blob = new Blob([data], {type: 'application/pdf'});
      const pdfurl = `${window.URL.createObjectURL(blob)}`;
      link.href = pdfurl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>

<style scoped lang="scss">
.PatientRecordHeader__end-record {
  height: 40px;
}
</style>
