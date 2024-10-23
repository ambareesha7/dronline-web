<template>
  <div class="PatientsNewPatient__wrapper shaded-outline">
    <div class="PatientsNewPatient__col"></div>
    <div class="PatientsNewPatient__col">
      <div class="PatientsNewPatient__title">
        {{ $t('patients.new_patient_account') }}
      </div>

      <div class="PatientsNewPatient__methods">
        <div class="PatientsNewPatient__method">
          <i18n
            class="PatientsNewPatient__method-description"
            path="patients.create_new_description"
            tag="div"
            for="global.create">
            <div class="PatientsNewPatient__method-description-highlight">
              {{ $t('global.create') }}
            </div>
          </i18n>

          <btn
            @onclick="add"
            btn-class="submit"
            class="PatientsNewPatient__method-submit"
            :btn-label="$t('global.add')"
            data-cy="PatientsNewPatient__method-create-button">
          </btn>
        </div>
        <div class="PatientsNewPatient__method-disjunction">
          {{ $t('global.or') }}
        </div>
        <div class="PatientsNewPatient__method">
          <i18n
            class="PatientsNewPatient__method-description"
            path="patients.invite_new_description"
            tag="div"
            for="global.invite">
            <div class="PatientsNewPatient__method-description-highlight">
              {{ $t('global.invite') }}
            </div>
          </i18n>
          <btn
            @onclick="showModal"
            btn-class="white"
            class="PatientsNewPatient__method-submit"
            :btn-label="$t('global.invite')"
            data-cy="PatientsNewPatient__method-invite-button">
          </btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { playOnce } from '@/utils/sounds';
import PatientInviteModal from './patient_invite_modal/patient-invite-modal';

export default {
  name: 'PatientsNewPatient',

  data() {
    return {
      showParrotTooltip: false
    };
  },

  methods: {
    showModal() {
      this.$modal.show(
        PatientInviteModal,
        {},
        {
          name: 'patient-invite-modal',
          width: 515,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          clickToClose: false,
          transition: 'from-top-to-bottom'
        }
      );
    },
    add() {
      this.$router.push({ name: 'patient-add' });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patients-new-patient.scss";
</style>
