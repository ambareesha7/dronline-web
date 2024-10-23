<template>
  <div class="TimelineItemCommentNotification__wrapper">
    <div class="TimelineItemCommentNotification__header">
      <div class="TimelineItemCommentNotification__info">
        <img
          class="TimelineItemCommentNotification__author-avatar"
          :src="specialist.avatarUrl" />
        <div class="TimelineItemCommentNotification__info-col">
          <div class="TimelineItemCommentNotification__title">
            {{
              $t('notifications.somebody_commented_on_something', [
                `${specialist.firstName} ${specialist.lastName}`,
                commentNotification.commentedOn
              ])
            }}
          </div>
          <div class="TimelineItemCommentNotification__date">
            {{ comment.insertedAt | moment('YYYY/MM/DD &bullet; hh:mm A') }}
          </div>
        </div>
      </div>
      <slot name="badge"></slot>
    </div>
    <div class="TimelineItemCommentNotification__content">
      {{ comment.body }}
    </div>
    <div class="form-actions pull-right TimelineItemCommentNotification__footer">
      <btn
        @onclick="open"
        btn-class="submit"
        :btn-label="$t('notifications.see_on_timeline')">
      </btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('notifications');

export default {
  name: 'TimelineItemCommentNotification',

  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(['specialists']),
    commentNotification() {
      return this.notification.timelineItemCommentNotification;
    },
    comment() {
      return this.commentNotification.timelineItemComment;
    },
    specialist() {
      return this.specialists.find(s => s.id === this.comment.commentedBySpecialistId);
    }
  },
  methods: {
    ...mapActions(['markAsRead']),
    open() {
      this.markAsRead(this.notification.id);
      this.$router.push({
        name: 'patient-record',
        params: {
          patientId: this.commentNotification.patientId,
          id: this.commentNotification.recordId
        },
        query: {
          timelineItemId: this.commentNotification.timelineItemId,
          commentId: this.commentNotification.timelineItemComment.id
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "timeline-item-comment-notification.scss";
</style>
