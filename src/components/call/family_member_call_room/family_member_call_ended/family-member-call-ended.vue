<template>
  <div class="FamilyMemberCallEnded__wrapper custom-scrollbar-container">
    <div class="FamilyMemberCallEnded__header">
      <img
        src="/static/images/logo.png"
        class="FamilyMemberCallEnded__logo" />
      <div class="FamilyMemberCallEnded__icon-container">
        <div class="FamilyMemberCallEnded__icon">
          <i class="icon-end-phone-call"></i>
        </div>
      </div>
      <div class="FamilyMemberCallEnded__title">
        {{ $t('call_room.video_call_has_ended') }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FamilyMemberCallEnded'
};
</script>

<style lang="scss">
@import "family-member-call-ended.scss";
</style>
