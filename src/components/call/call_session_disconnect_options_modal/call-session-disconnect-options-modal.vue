<template>
  <div class="CallSessionDisconnectOptionsModal__wrapper">
    <div class="CallSessionDisconnectOptionsModal__title">
      {{ $t('call_room.confirm_disconnect_option') }}
    </div>
    <div class="CallSessionDisconnectOptionsModal__actions">
      <btn
        @onclick="confirm(false); close();"
        btn-class="red"
        class="CallSessionDisconnectOptionsModal__action"
        :btn-label="$t('call_room.leave_only')">
      </btn>
      <btn
        @onclick="confirm(true); close();"
        btn-class="blue"
        class="CallSessionDisconnectOptionsModal__action"
        :btn-label="$t('call_room.end_call_for_everyone')">
      </btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CallSessionDisconnectOptionsModal',

  props: {
    confirm: {
      required: true,
      type: Function
    }
  },

  methods: {
    close() {
      this.$modal.hide('call-session-disconnect-options-modal');
    }
  }
};
</script>
<style scoped lang="scss">
  @import "call-session-disconnect-options-modal.scss";
</style>
