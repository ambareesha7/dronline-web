<template>
  <tr class="DashboardCurrentDispatchesDispatch__wrapper">
    <td class="table-body-cell">
      {{ dispatch.dispatch.requestedAt | moment('YYYY/MM/DD hh:mm A') }}
    </td>
    <td
      class="table-body-cell"
      v-html="takenAt">
    </td>
    <td class="table-body-cell">
      <div
        v-if="dispatch.specialist"
        class="flex-container">
        <div
          class="DashboardCurrentDispatchesDispatch__avatar"
          :style="specialistAvatar"></div>
        <div class="table-body-cell-text">
          {{ dispatch.specialist.firstName }} {{ dispatch.specialist.lastName }}
        </div>
      </div>
      <div v-else>&mdash;</div>
    </td>
    <td class="table-body-cell">
      <div :class="dispatch.status === 1 ? 'badge-green' : 'badge-blue'">
        {{ status }}
      </div>
    </td>
    <td class="table-body-cell actions">
      <router-link
        :to="{
          name: 'dispatch-details',
          params: { id: dispatch.dispatch.requestId }
        }"
        class="DashboardCurrentDispatchesDispatch__details-link">
        <i class="icon-angle-right">
        </i>
      </router-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'DashboardCurrentDispatchesDispatch',

  props: {
    dispatch: {
      required: true,
      type: Object
    }
  },

  computed: {
    takenAt() {
      return this.dispatch.takenAt
        ? this.$moment(this.dispatch.takenAt.timestamp * 1000).format('YYYY/MM/DD hh:mm A')
        : '&mdash;';
    },
    status() {
      return this.$t(`global.${this.dispatch.status === 1 ? 'open' : 'ongoing'}`);
    },
    specialistAvatar() {
      if (!this.dispatch.specialist) return null;
      return { 'background-image': `url(${this.dispatch.specialist.avatarUrl})` };
    }
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-current-dispatches-dispatch.scss";
</style>
