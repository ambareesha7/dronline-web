<template>
    <div class="ConfirmModal__wrapper">
  
      <div v-if="accountDeleteConfirm">

        <div class="ConfirmModal__imgsuccess">
          <img src="/static/images/cancel-success.png"/>
        </div>

        <div class="ConfirmModal__confirm-text">
            Your request is processing by DrOnline Team 
        </div>

        <div class="ConfirmModal__confirm-text-desc">
            You will get confirmation email up to <br> 3 business days
        </div>

        <div class="ConfirmModal__actions">
          <btn
            @onclick="logout"
            btn-class="blue-filled"
            class="ConfirmModal__action"
            :btn-label="$t('global.logout')">
          </btn>
        </div>
      </div>
  
      <div v-else>

        <div class="ConfirmModal__img">
          <img src="/static/images/confirm-cancel-alert.png"/>
        </div>

        <div class="ConfirmModal__content">
          {{ content }}
        </div>

        <div v-if="desc" class="ConfirmModal__desc">
          {{ desc }}
        </div>

        <div class="ConfirmModal__actions">
          <btn
            @onclick="accountDeleteConfirm = true; confirm();"
            btn-class="red"
            class="ConfirmModal__action"
            :btn-label="$t('global.delete_account')">
          </btn>
          <btn
            @onclick="close"
            btn-class="blue"
            class="ConfirmModal__action"
            :btn-label="$t('global.cancel')">
          </btn>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  export default {
    name: 'ConfirmModal',
    data() {
        return {
            accountDeleteConfirm: false
        }
    },
    props: {
      confirm: {
        required: true,
        type: Function
      },
      title: {
        required: false,
        type: String
      },
      content: {
        required: true,
        type: String
      },
      desc: {
        required: false,
        type: String
      }
    },
    methods: {
      ...mapActions('oauth', [
        'signOut'
      ]),
      close() {
        this.$modal.hide('confirm-modal');
        this.$router.push({name: 'dashboard'});
      },
      logout() {
        this.$modal.hide('confirm-modal');
        this.signOut();
      }
    }
  };
  </script>
  <style scoped lang="scss">
.ConfirmModal {

    &__wrapper {
    padding: 43px;
    text-align: center;
    }

    &__img {
    img {
        height: 134px;
        width: 134px;
    }
    }

    &__imgsuccess {
    img {
        height: 68px;
        width: 68px;
    }
    }

    &__content {
        font-size: 20px;
        color: rgba(237, 72, 85, 1);
        line-height: 26px;
        margin-bottom: 16px;
        margin-top: 30px;
        font-weight: 500;
    }

    &__confirm-text {
        font-size: 18px;
        font-weight: 500;
        line-height: 26px;
        color: rgba(74, 74, 74, 1);
        margin-bottom: 30px;
        margin-top: 30px;
    }

    &__confirm-text-desc {
        font-size: 16px;
        font-weight: 400;
        line-height: 21px;
        color: rgba(74, 74, 74, 1);
        margin-bottom: 30px;
    }

    &__desc {
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 65px;
        font-weight: 400;
        color: rgba(74, 74, 74, 1)
    }

    &__actions {
        display: flex;
    }

    &__action {
        width: 50%;
        height: 36px;
        font-size: 15px;
        &.ripple {
            margin: auto;
            height: 44px;
        }
    }
}
  </style>
  