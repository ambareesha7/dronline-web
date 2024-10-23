<template>
    <div class="ProfileDeleteRequest__wrapper">
      <div class="ProfileDeleteRequest__content">
        <div class="ProfileDeleteRequest__delete-request-text" @click="requestAccountDeleteConfirm">
          {{ $t('global.delete_account') }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { createNamespacedHelpers } from 'vuex';
  import requestAccountDeleteConfirmModal from '@/components/profile/profile_view/profile_delete_request/request-account-delete-confirm-modal';

  const { mapActions } = createNamespacedHelpers('profile');
  
  export default {
    methods: {
        ...mapActions(['requestAccountDelete']),
        requestAccountDeleteConfirm() {
          this.$modal.show(
            requestAccountDeleteConfirmModal,
            {
              content: 'Are you sure you want to delete your account?',
              desc: 'This action is irreversible and will result in the permanent loss of all your data and settings associated with your account.',
              confirm: async () => {
                this.requestAccountDelete();
              }
            },
            {
              name: 'confirm-modal',
              width: 470,
              height: 'auto',
              pivotY: 0.3,
              adaptive: true,
              clickToClose: false,
              transition: 'from-top-to-bottom'
            }
          );
        }
    }
  };
  </script>
  <style scoped lang="scss">
  .ProfileDeleteRequest {
  &__wrapper {
    padding: 20px 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__delete-request-text {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    line-height: 24px;
    color: #FF3B30;
    cursor: pointer;
    text-transform: capitalize;
  }
}
  </style>
  