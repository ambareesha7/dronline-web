<template>
  <div class="TimelineEntityDispatchRequest__wrapper">

    <div class="TimelineEntityDispatchRequest__header">
      <div class="TimelineEntityDispatchRequest__header-col">
        <div class="TimelineEntityDispatchRequest__specialist-card">
          <div
            class="TimelineEntityDispatchRequest__specialist-card-avatar"
            :style="specialistAvatar">
          </div>
          <div class="TimelineEntityDispatchRequest__specialist-card-info">
            <div class="TimelineEntityDispatchRequest__specialist-card-name">
              {{ entity.specialist.firstName }} {{ entity.specialist.lastName }}
            </div>
            <div class="TimelineEntityDispatchRequest__specialist-card-role">
              {{ specialistRole }}
            </div>
          </div>
        </div>
      </div>
      <div class="TimelineEntityDispatchRequest__header-col">
        <div class="TimelineEntityDispatchRequest__title">
          {{ $t('call_room.dispatched_triage_unit_short') }}
        </div>
        <div class="TimelineEntityDispatchRequest__time">
          {{ entity.timestamp | moment('YYYY/MM/DD hh:mm A') }}
        </div>
      </div>
    </div>

    <div class="TimelineEntityDispatchRequest__address">
      <div class="TimelineEntityDispatchRequest__section-title">
        {{ $t('global.delivery_address') }}
      </div>
      <div class="form-row--cols">
        <div class="form-col TimelineEntityDispatchRequest__address-details-label">
          {{ $t('global.city') }}
        </div>
        <div class="form-col TimelineEntityDispatchRequest__address-details-value">
          {{ entity.dispatchRequest.patientLocation.address.city }}
        </div>
      </div>
      <div class="form-row--cols">
        <div class="form-col TimelineEntityDispatchRequest__address-details-label">
          {{ $t('global.street') }}
        </div>
        <div class="form-col TimelineEntityDispatchRequest__address-details-value">
          {{ entity.dispatchRequest.patientLocation.address.streetName }}
        </div>
      </div>
      <div class="form-row--cols">
        <div class="form-col TimelineEntityDispatchRequest__address-details-label">
          {{ $t('global.home_number') }}
        </div>
        <div class="form-col TimelineEntityDispatchRequest__address-details-value">
          {{ entity.dispatchRequest.patientLocation.address.buildingNumber }}
        </div>
      </div>
      <div class="form-row--cols">
        <div class="form-col TimelineEntityDispatchRequest__address-details-label">
          {{ $t('global.postal_code') }}
        </div>
        <div class="form-col TimelineEntityDispatchRequest__address-details-value">
          {{ entity.dispatchRequest.patientLocation.address.postalCode }}
        </div>
      </div>
      <div class="form-row--cols">
        <div class="form-col TimelineEntityDispatchRequest__address-details-label">
          {{ $t('global.country') }}
        </div>
        <div class="form-col TimelineEntityDispatchRequest__address-details-value">
          {{ entity.dispatchRequest.patientLocation.address.country }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { USER_ROLE } from '@/constants';

const { mapGetters, mapMutations } = createNamespacedHelpers('patientTimeline');
export default {
  name: 'TimelineEntityDispatchRequest',

  props: {
    entity: {
      required: true,
      type: Object
    }
  },

  computed: {
    specialistRole() {
      return this.$t(`user_roles.${USER_ROLE[this.entity.specialist.type]}`);
    },
    specialistAvatar() {
      return {'background-image': `url(${this.entity.specialist.avatarUrl})`};
    }
  },

  methods: {
    ...mapMutations(['setOpenedForm', 'setEditableEntity']),
    edit() {
      this.setEditableEntity(this.entity);
      this.setOpenedForm('dispatch-triage-unit');
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-dispatch-request.scss";
</style>
