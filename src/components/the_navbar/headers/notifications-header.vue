<template>
  <div class="Notifications__wrapper">
    <div class="Notifications__col">
      <breadcrumbs
        :steps="breadcrumbs"
        icon="icon_notification">
      </breadcrumbs>
    </div>
    <div class="Notifications__col">
      <btn
        @onclick="markAllAsRead"
        btn-class="submit"
        class="Notifications__action"
        :class="{ invalidate: !unreadNotificationsCounter }"
        :btn-label="$t('notifications.mark_all_as_read')">
      </btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

const { mapGetters, mapActions } = createNamespacedHelpers('notifications');

export default {
  name: 'NotificationsHeader',
  components: {
    Breadcrumbs
  },
  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('notifications.notifications'),
          disabled: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['unreadNotificationsCounter'])
  },
  methods: {
    ...mapActions(['markAllAsRead'])
  }
};
</script>

<style scoped lang="scss">
.Notifications__action {
  height: 40px;
}
</style>
