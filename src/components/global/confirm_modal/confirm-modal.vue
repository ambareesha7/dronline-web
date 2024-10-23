<template>
  <div class="ConfirmModal__wrapper">

    <div v-if="visitCancelled">
      <div class="ConfirmModal__imgsuccess">
        <img src="/static/images/cancel-success.png"/>
      </div>
      <div v-if="desc" class="ConfirmModal__confirmtext">
        {{ $t('visits.appointment_canceled') }}
      </div>
      <div class="ConfirmModal__actions">
        <btn
          @onclick="close"
          btn-class="blue"
          class="ConfirmModal__action"
          :btn-label="$t('global.back')">
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
          @onclick="close"
          btn-class="blue"
          class="ConfirmModal__action"
          :btn-label="$t('global.back')">
        </btn>
        <btn
          @onclick="confirm();"
          btn-class="red"
          class="ConfirmModal__action"
          :btn-label="$t('global.cancel')">
        </btn>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ConfirmModal',

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
  computed: {
    ...mapGetters('visits', [
      'visitCancelled'
    ])
  },
  methods: {
    ...mapMutations('visits', [
      'setVisitCancelled'
    ]),
    close() {
      this.setVisitCancelled();
      this.$modal.hide('confirm-modal');
    }
  }
};
</script>
<style scoped lang="scss">
  @import "confirm-modal.scss";
</style>
