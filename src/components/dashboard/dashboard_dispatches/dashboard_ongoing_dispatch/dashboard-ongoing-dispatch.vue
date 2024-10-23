<template>
  <div class="DashboardOngoingDispatch__wrapper">
    <div class="title">
      {{ $t('dashboard.current_dispatch') }}
    </div>

    <div class="DashboardOngoingDispatch__content" v-if="!status.banner">
      <table class="table shaded-outline">
        <thead class="table-head">
        <tr>
          <th class="table-head-cell">{{ $t('global.patient') }}</th>
          <th class="table-head-cell">{{ $t('global.ordered_by') }}</th>
          <th class="table-head-cell">{{ $t('global.time') }}</th>
          <th class="table-head-cell">{{ $t('global.address') }}</th>
          <th class="table-head-cell">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        <tr class="DashboardOngoingDispatch__wrapper">
          <td class="table-body-cell">
            <div class="flex-container">
              <div
                class="DashboardOngoingDispatch__avatar"
                :style="patientAvatar"></div>
              <div class="table-body-cell-text">
                {{ dispatch.patient.firstName }} {{ dispatch.patient.lastName }}
              </div>
              <div
                class="DashboardOngoingDispatch__call"
                @click="nurseCallToPatient(dispatch)">
                <i class="icon-phone-call phone-call-action-icon"></i>
              </div>
            </div>
          </td>
          <td class="table-body-cell">
            <div class="flex-container">
              <div
                class="DashboardOngoingDispatch__avatar"
                :style="specialistAvatar"></div>
              <div class="table-body-cell-text">
                {{ dispatch.specialist.firstName }} {{ dispatch.specialist.lastName }}
              </div>
            </div>
          </td>
          <td class="table-body-cell">
            {{ dispatch.requestedAt | moment('hh:mm A') }}
          </td>
          <td
            class="table-body-cell DashboardOngoingDispatch__toggle-container"
            @click="toggleRequest(dispatch.requestId)">
            <div class="flex-container">
              <div>{{ address }}</div>
              <i
                class="icon-caret DashboardOngoingDispatch__toggle"
                :class="{ active: openedRequestId === dispatch.requestId }"></i>
            </div>
          </td>
          <td class="table-body-cell actions">
            <btn
              @onclick="provideResult"
              btn-class="green small"
              :btn-label="$t('call_room.provide_vitals')">
            </btn>
          </td>
        </tr>
        <tr>
          <transition name="fade">
            <td
              v-if="openedRequestId === dispatch.requestId"
              colspan="5"
              class="DashboardOngoingDispatch__details">
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import DispatchAddressMap from '../dispatch_address_map/dispatch-address-map';

export default {
  name: 'DashboardOngoingDispatch',

  components: {
    DispatchAddressMap
  },

  data() {
    return {
      openedRequestId: null
    };
  },

  computed: {
    ...mapGetters('profile', ['status']),
    ...mapGetters('dispatches', ['dispatch']),
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
    patientAvatar() {
      return { 'background-image': `url(${this.dispatch.patient.avatarUrl})` };
    },
    specialistAvatar() {
      return { 'background-image': `url(${this.dispatch.specialist.avatarUrl})` };
    }
  },

  beforeDestroy() {
    this.resetDispatch();
  },

  methods: {
    ...mapActions('call', [
      'nurseCallToPatient'
    ]),
    ...mapMutations('dispatches', [
      'resetDispatch'
    ]),
    ...mapMutations('call', [
      'setSize',
      'openCall',
      'setRecipientPatientId'
    ]),
    ...mapMutations('patientTimeline', [
      'setRecordId',
      'setOpenedForm'
    ]),
    toggleRequest(id) {
      this.openedRequestId = this.openedRequestId === id ? null : id;
    },
    provideResult() {
      this.setRecordId(this.dispatch.recordId);
      this.setRecipientPatientId(this.dispatch.patientId);
      this.setSize('maximized');
      this.openCall();
      setTimeout(() => this.setOpenedForm('vitals'), 600);
    }
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-ongoing-dispatch.scss";
</style>
