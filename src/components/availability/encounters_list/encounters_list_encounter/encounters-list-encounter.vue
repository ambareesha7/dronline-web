<template>
  <tr class="EncountersListEncounter__wrapper">
    <td class="table-body-cell">
      <div class="flex-container">
        <div
          class="EncountersListEncounter__patient__avatar"
          :style="{ 'background-image': `url(${encounter.patient.avatarUrl})` }"
        >
          <i v-if="encounter.patient.isInsured"
            class="icon_is-insured-badge
            EncountersListEncounter__patient__avatar__is-insured-badge"
          />
        </div>
        <div class="table-body-cell-text">
          <div class="EncountersListEncounter__patient__name">
            {{ encounter.patient.firstName }} {{ encounter.patient.lastName }}
          </div>
          <div class="EncountersListEncounter__patient__title">
            {{ $t(`global.${TITLE[encounter.patient.title]}`) }}
          </div>
          <span class="EncountersListEncounter__patient__birth-date">
            {{ encounter.patient.birthDate.timestamp | moment("YYYY-MM-DD") }}
          </span>
        </div>
      </div>
    </td>
    <td class="table-body-cell">
      <div>{{ formatTime(encounter.startTime) }}</div>
    </td>
    <td class="table-body-cell">
      <div>{{ formatTime(encounter.endTime) }}</div>
    </td>
    <td class="table-body-cell">
      {{ $t(ENCOUNTER_TYPE[encounter.type]) }}
    </td>
    <td class="table-body-cell">
      <div class="EncountersListEncounter__state" :class="getStateClass(encounter.state)">
        {{ $t(ENCOUNTER_STATE[encounter.state]) }}
      </div>
    </td>
  </tr>
</template>

<script>
import { TITLE, ENCOUNTER_STATE, ENCOUNTER_TYPE } from '@/constants';

export default {
  name: 'EncountersListEncounter',

  props: {
    encounter: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ENCOUNTER_STATE,
      ENCOUNTER_TYPE,
      TITLE
    };
  },
  methods: {
    formatTime(unixTimestamp) {
      if (!unixTimestamp) {
        return '-';
      }
      const time = this.$moment.unix(unixTimestamp);
      const isCurrentDate = time.isSame(new Date(), 'day');

      return isCurrentDate ?
        time.format('hh:mm A') :
        time.format('YYYY-MM-DD hh:mm A');
    },
    getStateClass(stateEnumIndex) {
      return [
        null,
        'badge-blue',
        'badge-red',
        'badge-green'
      ][stateEnumIndex];
    }
  }
};
</script>

<style scoped lang="scss">
  @import "encounters-list-encounter.scss";
</style>
