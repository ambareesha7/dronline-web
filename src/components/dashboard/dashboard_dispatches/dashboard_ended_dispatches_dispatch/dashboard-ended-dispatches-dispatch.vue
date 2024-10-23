<template>
  <tr class="DashboardEndedDispatchesDispatch__wrapper">
    <td class="table-body-cell">
      {{ dispatch.dispatch.requestedAt | moment('YYYY/MM/DD hh:mm A') }}
    </td>
    <td
      class="table-body-cell"
      v-html="takenAt">
    </td>
    <td
      class="table-body-cell"
      v-html="endedAt">
    </td>
    <td class="table-body-cell">
      <div
        v-if="dispatch.specialist"
        class="flex-container">
        <div
          class="DashboardEndedDispatchesDispatch__avatar"
          :style="specialistAvatar"></div>
        <div class="table-body-cell-text">
          {{ dispatch.specialist.firstName }} {{ dispatch.specialist.lastName }}
        </div>
      </div>
      <div v-else>&mdash;</div>
    </td>
    <td class="table-body-cell">
      <div class="badge-gray">
        {{ $t('global.ended') }}
      </div>
    </td>
    <td class="table-body-cell actions">
      <router-link
        :to="{
          name: 'dispatch-details',
          params: { id: dispatch.dispatch.requestId }
        }"
        class="DashboardEndedDispatchesDispatch__details-link">
        <i class="icon-angle-right">
        </i>
      </router-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'DashboardEndedDispatchesDispatch',

  props: {
    dispatch: {
      required: true,
      type: Object
    }
  },

  computed: {
    takenAt() {
      return this.dispatch.takenAt
        ? this.$moment(this.dispatch.takenAt).format('YYYY/MM/DD hh:mm A')
        : '&mdash;';
    },
    endedAt() {
      return this.dispatch.endedAt
        ? this.$moment(this.dispatch.endedAt).format('YYYY/MM/DD hh:mm A')
        : '&mdash;';
    },
    specialistAvatar() {
      if (!this.dispatch.specialist) return null;
      return { 'background-image': `url(${this.dispatch.specialist.avatarUrl})` };
    }
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-ended-dispatches-dispatch.scss";
</style>
