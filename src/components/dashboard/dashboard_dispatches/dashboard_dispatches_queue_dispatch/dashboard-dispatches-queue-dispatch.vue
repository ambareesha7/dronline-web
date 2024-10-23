<template>
  <fragment>
    <tr class="DashboardDispatchesQueueDispatch__wrapper">
      <td class="table-body-cell">
        <div class="flex-container">
          <div
            class="DashboardDispatchesQueueDispatch__avatar"
            :style="avatarStyle"></div>
          <div class="table-body-cell-text">
            {{ dispatch.patient.firstName }} {{ dispatch.patient.lastName }}
          </div>
        </div>
      </td>
      <td class="table-body-cell">
        <div class="flex-container">
          <div
            class="DashboardDispatchesQueueDispatch__avatar"
            :style="{ 'background-image': `url(${dispatch.specialist.avatarUrl})` }"></div>
          <div class="table-body-cell-text">
            {{ dispatch.specialist.firstName }} {{ dispatch.specialist.lastName }}
          </div>
        </div>
      </td>
      <td class="table-body-cell">
        {{ dispatch.requestedAt | moment('hh:mm A') }}
      </td>
      <td
        class="table-body-cell DashboardDispatchesQueueDispatch__toggle-container"
        @click="$emit('toggle-request', dispatch.requestId)">
        <div class="flex-container">
          <div>{{ address }}</div>
          <i
            class="icon-caret DashboardDispatchesQueueDispatch__toggle"
            :class="{ active: openedRequestId === dispatch.requestId }"></i>
        </div>
      </td>
      <td class="table-body-cell actions">
        <btn
          @onclick="acceptDispatch(dispatch.requestId)"
          btn-class="green-bordered small"
          :btn-label="$t('global.accept')">
        </btn>
      </td>
    </tr>
    <tr>
      <transition name="fade">
        <td
          v-if="openedRequestId === dispatch.requestId"
          colspan="5"
          class="DashboardDispatchesQueueDispatch__details">
          <dispatch-address-map
            :address="address">
          </dispatch-address-map>
        </td>
      </transition>
    </tr>
  </fragment>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { truncate } from '@/utils/filters';
import { Fragment } from 'vue-fragment';
import DispatchAddressMap from '../dispatch_address_map/dispatch-address-map';

const { mapActions } = createNamespacedHelpers('dispatches');
export default {
  name: 'DashboardDispatchesQueueDispatch',

  components: {
    Fragment,
    DispatchAddressMap
  },

  props: {
    dispatch: {
      required: true,
      type: Object
    },
    openedRequestId: {
      type: String
    }
  },

  computed: {
    address() {
      const address = [
        'buildingNumber',
        'district',
        'additionalNumbers',
        'streetName',
        'city',
        'country',
        'postalCode'
      ]
        .map(part => (
          this.dispatch.patientLocation.address[part]
        ))
        .filter(Boolean)
        .join(', ');
      return address;
    },
    avatarStyle() {
      return { 'background-image': `url(${this.dispatch.patient.avatarUrl})` };
    }
  },

  methods: {
    ...mapActions(['acceptDispatch'])
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-dispatches-queue-dispatch.scss";
</style>
