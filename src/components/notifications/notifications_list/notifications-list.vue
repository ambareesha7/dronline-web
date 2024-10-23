<template>
  <div class="NotificationsList__wrapper">
    <div class="NotificationsList__header">
      <div class="title NotificationsList__title">
        {{ $t('notifications.notifications') }}
        <div
          v-if="unreadNotificationsCounter"
          class="NotificationsList__title-badge">
          {{ unreadNotificationsCounter }}
        </div>
      </div>
    </div>
    <div class="NotificationsList__content shaded-outline">
      <notifications-list-notification
        v-for="(notification, index) in notifications"
        :key="index"
        :notification="notification">
      </notifications-list-notification>
      <div
      v-if="!notifications.length"
        class="NotificationsList__no-results">
        {{ $t('notifications.no_results') }}
      </div>
    </div>

    <div
      class="table-load-more-container"
      v-if="nextToken">
      <btn
        @onclick="loadMore"
        btn-class="submit"
        :btn-label="$t('global.load_more')"
        :class="{ invalidate: processing }">
      </btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NotificationsListNotification from '@/components/notifications/notifications_list_notification/notifications-list-notification';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('notifications');

export default {
  name: 'NotificationsList',

  data() {
    return {
      processing: false
    };
  },

  components: {
    NotificationsListNotification
  },

  computed: {
    ...mapGetters([
      'notifications',
      'nextToken',
      'unreadNotificationsCounter'
    ])
  },

  mounted() {
    this.init();
  },

  methods: {
    ...mapActions([
      'fetchNotifications'
    ]),
    async loadMore() {
      this.processing = true;
      await this.fetchNotifications();
      this.processing = false;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "notifications-list.scss";
</style>
