<template>
  <div
    class="NotificationsListNotification__wrapper"
    :class="{ unread: !notification.read }">
    <component
      :is="notificationTypeComponent"
      :notification="notification">
      <div
        v-if="!notification.read"
        slot="badge"
        class="badge-blue NotificationsListNotification__unread-badge">
        {{ $t('notifications.unread') }}
      </div>
    </component>
    <div
      v-if="!notificationTypeComponent"
      class="NotificationsListNotification__fallback">
      Not supported
    </div>
  </div>
</template>

<script>
import { kebabToPascalCase, pascalToSnakeCase, snakeToKebabCase } from '@/utils/filters';
import NotificationTypes from './notification_types';

export default {
  name: 'NotificationsListNotification',
  components: {
    ...NotificationTypes
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  computed: {
    notificationTypeComponent() {
      const name = snakeToKebabCase(pascalToSnakeCase(this.notification.type));
      const exist = kebabToPascalCase(name) in NotificationTypes;
      return exist ? name : null;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "notifications-list-notification.scss";
</style>
