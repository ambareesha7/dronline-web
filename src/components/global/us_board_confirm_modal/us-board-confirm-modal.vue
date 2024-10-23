<template>
  <div class="ConfirmModal__wrapper">
    <div>
      <div class="ConfirmModal__img">
        <img src="/static/images/cancel-success.png"/>
      </div>
      <div class="ConfirmModal__text">
        Your opinion have been sent to Patient. 
        </br>
        Set your availability to let Patient book a video call 
      </div>
      <div class="ConfirmModal__actions">
        <button class="btn btn-white ripple" @click="setAvailability(); $emit('close');">Set availability</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'USBoardConfirmModal',
  methods: {
    setAvailability() {
      this.$router.push({ name: 'availability' })
    }
  }
};
</script>
<style scoped lang="scss">
  @import "us-board-confirm-modal.scss";
</style>
