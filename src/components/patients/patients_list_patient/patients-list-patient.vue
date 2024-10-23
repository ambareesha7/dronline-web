<template>
  <tr
    class="PatientsListPatient__wrapper"
    data-cy="PatientsListPatient"
    @dblclick="openDetails">
    <td class="table-body-cell">
      <div class="PatientsListPatient__container">
        <div
          class="PatientsListPatient__patient-photo"
          :style="photo">
          <i v-if="patient.isInsured"
            class="icon_is-insured-badge
            PatientsListPatient__patient-photo__is-insured-badge"
          />
        </div>
        <div>{{ patient.firstName }}</div>
      </div>
    </td>
    <td class="table-body-cell">
      {{ patient.lastName }}
    </td>
    <td class="table-body-cell">
      {{ patient.birthDate.timestamp | moment("YYYY/MM/DD") }}
    </td>
    <td
      class="table-body-cell"
      data-cy="PatientsListPatient__id">
      {{ patient.id }}
    </td>
    <td class="table-body-cell actions">
      <div class="PatientsListPatient__action-container"
        v-tooltip.left="tooltip">
        <div
          class="PatientsListPatient__action"
          :class="{ 'unavailable': callOpened || calling }"
          @click="call(patient.id)">
          <i class="icon-phone-call phone-call-action-icon" ></i>
        </div>
        <router-link
          :to="detailsRoute">
          <i
            class="icon-angle-right PatientsListPatient__action"
            data-cy="PatientsListPatient__patient-details">
          </i>
        </router-link>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'PatientsListPatient',
  props: {
    patient: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      calling: false
    };
  },
  computed: {
    photo() {
      return { 'background-image': `url(${this.patient.avatarUrl})` };
    },
    detailsRoute() {
      const query = this.patient.relatedAdult ? { parentId: this.patient.relatedAdult.id } : null;
      return {
        name: 'patient',
        params: { id: this.patient.id },
        query
      };
    },
    tooltip() {
      if (this.callOpened) return null;
      return {
        content: this.$t('dashboard.call_to_patient'),
        class: 'custom-tooltip--white'
      };
    },
    ...mapGetters('call', ['callOpened'])
  },
  methods: {
    openDetails() {
      this.$router.push(this.detailsRoute);
    },
    async call() {
      this.calling = true;
      const { error } = await this.specialistCallToPatient({ patientId: this.patient.id });
      if (error) {
        this.$toastr.e(error);
      }
      setTimeout(() => {
        this.calling = false;
      }, 1000);
    },
    ...mapActions('call', [
      'specialistCallToPatient'
    ])
  }
};
</script>

<style scoped lang="scss">
  @import "patients-list-patient.scss";
</style>
