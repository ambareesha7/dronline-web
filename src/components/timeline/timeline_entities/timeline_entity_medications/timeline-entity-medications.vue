<template>
  <div class="TimelineEntityMedications__wrapper">

    <div class="TimelineEntityMedications__header">
      <div class="TimelineEntityMedications__header-col">
        <timeline-entity-specialist-card :specialist="entity.specialist" />
      </div>
      <div class="TimelineEntityMedications__header-col">
        <div class="TimelineEntityMedications__title">
          {{ $t('call_room.assigned_medications') }}
        </div>
        <div class="TimelineEntityMedications__time">
          {{ entity.timestamp | moment('YYYY/MM/DD hh:mm A') }}
        </div>
      </div>
    </div>

    <div class="TimelineEntityMedications__items">
      <div
        class="TimelineEntityMedications__item"
        v-for="(item, index) in entity.medications.items"
        :key="index">
        <div class="form-row--cols">
          <div class="form-col TimelineEntityMedications__item__label">
            {{ $t('global.name') }}
          </div>
          <div class="form-col TimelineEntityMedications__item__value">
            {{ item.name }}
          </div>
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityMedications__item__label">
            {{ $t('global.direction') }}
          </div>
          <div class="form-col TimelineEntityMedications__item__value">
            {{ item.direction }}
          </div>
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityMedications__item__label">
            {{ $t('global.quantity') }}
          </div>
          <div class="form-col TimelineEntityMedications__item__value">
            {{ item.quantity }}
          </div>
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityMedications__item__label">
            {{ $t('global.refills') }}
          </div>
          <div class="form-col TimelineEntityMedications__item__value">
            {{ item.refills }}
          </div>
        </div>
      </div>
    </div>

    <!-- Address feature will be added in the future -->
    <!-- <div class="TimelineEntityAssignMedications__address">
      <div class="TimelineEntityAssignMedications__section-title">
        {{ $t('global.address') }}
      </div>
      <div class="form-row--cols">
        <div class="form-col TimelineEntityAssignMedications__address-details-label">
          {{ $t('global.city') }}
        </div>
        <div class="form-col TimelineEntityAssignMedications__address-details-value">
          {{ entity.address.city }}
        </div>
      </div>
      <div class="form-row--cols">
        <div class="form-col TimelineEntityAssignMedications__address-details-label">
          {{ $t('global.street') }}
        </div>
        <div class="form-col TimelineEntityAssignMedications__address-details-value">
          {{ entity.address.street }}
        </div>
      </div>
      <div class="form-row--cols">
        <div class="form-col TimelineEntityAssignMedications__address-details-label">
          {{ $t('global.home_number') }}
        </div>
        <div class="form-col TimelineEntityAssignMedications__address-details-value">
          {{ entity.address.home_number }}
        </div>
      </div>
      <div class="form-row--cols">
        <div class="form-col TimelineEntityAssignMedications__address-details-label">
          {{ $t('global.postal_code') }}
        </div>
        <div class="form-col TimelineEntityAssignMedications__address-details-value">
          {{ entity.address.postal_code }}
        </div>
      </div>
      <div class="form-row--cols">
        <div class="form-col TimelineEntityAssignMedications__address-details-label">
          {{ $t('global.country') }}
        </div>
        <div class="form-col TimelineEntityAssignMedications__address-details-value">
          {{ entity.address.country.label }}
        </div>
      </div>
    </div>

    Ability to edit will be added in the future, see MR for some hints
    <div class="TimelineEntityAssignMedications__footer">
      <btn
        @onclick="edit"
        btn-class="edit"
        class="TimelineEntityAssignMedications__edit"
        :btn-label="$t('global.edit')">
      </btn>
    </div> -->

  </div>
</template>

<script>
import TimelineEntitySpecialistCard from '@/components/timeline/timeline_entity_specialist_card/timeline-entity-specialist-card';
import { USER_ROLE } from '@/constants';

export default {
  name: 'TimelineEntityMedications',

  components: {
    TimelineEntitySpecialistCard
  },

  props: {
    entity: {
      required: true,
      type: Object
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-medications.scss";
</style>
