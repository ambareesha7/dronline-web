<template>
    <div class="PatientSpecialistCard">
      <div class="flex-container PatientSpecialistCard__patient">
        <div
          class="PatientSpecialistCard__patient__avatar"
          :style="{ 'background-image': `url(${patient.avatarUrl})` }">
          <i v-if="patient.isInsured"
            class="icon_is-insured-badge
            PatientSpecialistCard__patient__avatar__is-insured-badge"
          />
        </div>
        <div class="table-body-cell-text">
          <div class="PatientSpecialistCard__patient__name">
            {{ patient.firstName }} {{ patient.lastName }}
          </div>
          <div class="PatientSpecialistCard__patient__title">
            {{ $t(TITLE[patient.title]) }}
          </div>
          <span class="PatientSpecialistCard__patient__birth-date">
            {{ patient.birthDate.timestamp | moment("YYYY-MM-DD") }}
          </span>
        </div>
      </div>

      <div class="flex-container PatientSpecialistCard__specialist">
        <div
          class="PatientSpecialistCard__patient__avatar"
          :style="{ 'background-image': `url(${specialist.avatarUrl})` }"></div>
        <div class="table-body-cell-text">
          <div class="PatientSpecialistCard__specialist__name">
            {{ specialist.firstName }} {{ specialist.lastName }}
          </div>
          <div class="PatientSpecialistCard__specialist__role">
            {{ $t(`user_roles.${USER_ROLE[specialist.type]}`) }}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { TITLE, USER_ROLE } from '@/constants';

export default {
  name: 'PatientSpecialistCard',
  props: {
    patient: {
      type: Object,
      required: true
    },
    specialist: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      TITLE,
      USER_ROLE
    };
  }
};
</script>

<style scoped lang="scss">
  @import "patient-specialist-card.scss";
</style>
