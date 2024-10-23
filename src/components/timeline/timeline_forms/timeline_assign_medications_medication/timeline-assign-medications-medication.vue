<template>
  <div class="TimelineAssignMedicationsMedication">
    <div class="TimelineAssignMedicationsMedication__header">
      <div
        class="TimelineAssignMedicationsMedication__title"
      >{{ $t('call_room.medication_number', [index + 1]) }}</div>

      <div
        v-if="index > 0"
        class="TimelineAssignMedicationsMedication__remove"
        @click="removeMedication()"
      >{{ $t('global.remove') }}</div>
    </div>

    <div class="form-row">
      <free-select
        name="medication_name"
        :options-loader="nameOptionsLoader"
        :options="medicationOptions"
        :index="index"
        :label="$t('call_room.medication')"
        @change="value => medication.name = value"
      ></free-select>
    </div>

    <div class="form-row">
      <free-select
        name="medication_direction"
        :options="directionOptions"
        :index="index"
        :label="$t('global.direction')"
        @change="value => medication.direction = value"
      ></free-select>
    </div>

    <div class="form-row">
      <free-select
        name="medication_quantity"
        :options="quantityOptions"
        :index="index"
        :label="$t('global.quantity')"
        @change="value => medication.quantity = value"
      ></free-select>
    </div>

    <div class="form-row">
      <free-select
        name="medication_refills"
        :options="refillOptions"
        :index="index"
        :label="$t('global.refills')"
        @change="value => medication.refills = value"
      ></free-select>
    </div>
  </div>
</template>


<script>
import FreeSelect from '@/components/global/free_select/free-select';
import { createNamespacedHelpers } from 'vuex';
import { decode } from '@/utils/proto';
import api from '@/api';

const { mapGetters, mapMutations } = createNamespacedHelpers('patientTimeline');
export default {
  name: 'TimelineAssignMedicationsMedication',
  inject: ['$validator'],

  components: {
    FreeSelect
  },

  props: {
    medication: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      medicationOptions: [],
      directionOptions: [
        'Q.D',
        'BID',
        'TID',
        'QID',
        'Q.O.D',
        'Every 4 hrs PRN'
      ],
      refillOptions: ['1', '2', '3', '4', '5', '6'],
      quantityOptions: [
        'One week supply',
        '10 days supply',
        'Two weeks supply',
        'One month supply'
      ]
    };
  },

  methods: {
    nameOptionsLoader(filter) {
      api.fetchMedicalMedications({ filter }).then(data => {
        const { medications } = decode('GetMedicalMedicationsResponse', data);
        const options = medications.map(({ id, name }) => name);
        this.medicationOptions = options;
      });
    },
    removeMedication(index) {
      this.$emit('remove');
    }
  }
};
</script>

<style lang="scss">
@import "timeline-assign-medications-medication.scss";
</style>
