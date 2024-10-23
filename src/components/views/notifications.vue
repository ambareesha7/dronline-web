<template>
  <div class="Notifications__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <notifications-list></notifications-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NotificationsList from '@/components/notifications/notifications_list/notifications-list';

export default {
  name: 'Notifications',

  components: {
    NotificationsList
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.Notifications {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    padding-top: 16px;
  }
}
</style>
