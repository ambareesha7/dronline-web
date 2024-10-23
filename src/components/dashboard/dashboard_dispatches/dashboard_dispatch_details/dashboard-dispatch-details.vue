<template>
  <div class="DashboardDispatchDetails__wrapper">
    <div class="title">
      {{ $t('dashboard.dispatch_details') }}
    </div>

    <div class="DashboardDispatchDetails__content">
      <div
        v-if="initializing"
        class="table-initializing">
        <spinner></spinner>
      </div>
      <table
        v-else
        class="table shaded-outline">
        <thead class="table-head">
        <tr>
          <th class="table-head-cell">{{ $t('global.patient') }}</th>
          <th class="table-head-cell">{{ $t('global.ordered_by') }}</th>
          <th class="table-head-cell">{{ $t('global.time') }}</th>
          <th class="table-head-cell">{{ $t('global.address') }}</th>
          <th class="table-head-cell DashboardDispatchDetails__status">
            <div :class="status.class">
              {{ status.label }}
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="DashboardDispatchDetails__wrapper">
          <td class="table-body-cell">
            <div class="flex-container">
              <div
                class="DashboardDispatchDetails__avatar"
                :style="patientAvatar"></div>
              <div class="table-body-cell-text">
                {{ dispatchDetails.patient.firstName }} {{ dispatchDetails.patient.lastName }}
              </div>
            </div>
          </td>
          <td class="table-body-cell">
            <div class="flex-container">
              <div
                class="DashboardDispatchDetails__avatar"
                :style="specialistAvatar"></div>
              <div class="table-body-cell-text">
                {{ dispatchDetails.specialist.firstName }} {{ dispatchDetails.specialist.lastName }}
              </div>
            </div>
          </td>
          <td class="table-body-cell">
            {{ dispatchDetails.dispatch.requestedAt | moment('hh:mm A') }}
          </td>
          <td
            class="table-body-cell DashboardDispatchDetails__toggle-container"
            colspan="2"
            @click="toggleMap">
            <div class="flex-container">
              <div>{{ address }}</div>
              <i
                class="icon-caret DashboardDispatchDetails__toggle"
                :class="{ active: isOpen }"></i>
            </div>
          </td>
        </tr>
        <tr>
          <transition name="fade">
            <td
              v-if="isOpen"
              colspan="5"
              class="DashboardDispatchDetails__details">
              <dispatch-address-map
                :address="address">
              </dispatch-address-map>
            </td>
          </transition>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import DispatchAddressMap from '../dispatch_address_map/dispatch-address-map';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('dispatches');

export default {
  name: 'DashboardDispatchDetails',

  components: {
    DispatchAddressMap
  },

  data() {
    return {
      initializing: true,
      isOpen: false
    };
  },

  computed: {
    ...mapGetters([
      'dispatchDetails'
    ]),
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
          this.dispatchDetails.dispatch.patientLocation.address[part]
        ))
        .filter(Boolean)
        .join(', ');
      return address;
    },
    patientAvatar() {
      return { 'background-image': `url(${this.dispatchDetails.patient.avatarUrl})` };
    },
    specialistAvatar() {
      return { 'background-image': `url(${this.dispatchDetails.specialist.avatarUrl})` };
    },
    status() {
      const status = this.dispatchDetails.status;
      const classes = [null, 'green', 'blue', 'gray'];
      const labels = [null, 'open', 'ongoing', 'ended'];
      return {
        class: `badge-${classes[status]}`,
        label: this.$t(`global.${labels[status]}`)
      };
    }
  },

  async mounted() {
    await this.fetchDispatchDetails(this.$route.params.id);
    this.initializing = false;
  },

  beforeDestroy() {
    this.resetDispatch();
  },

  methods: {
    ...mapActions(['fetchDispatchDetails']),
    ...mapMutations(['resetDispatchDetails']),
    toggleMap() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-dispatch-details.scss";
</style>
