<template>
  <fullscreen-modal-wrapper
    :title="$t('timeline.comments')"
    @close="$emit('close')"
    ref="container">
    <div class="TimelineEntityCommentsModal__content">
      <div class="TimelineEntityCommentsModal__section">
        <div class="TimelineEntityCommentsModal__section-header">
          <div class="TimelineEntityCommentsModal__section-title">
            {{ $t('timeline.add_your_comment') }}
          </div>
        </div>
        <div class="TimelineEntityCommentsModal__section-content">
          <div class="form-row">
            <textarea
              :class="{
                'is-danger': errors.has('comment'),
                'filled': comment
              }"
              id="comment"
              name="comment"
              class="form-textarea"
              type="text"
              v-model="comment"
              v-validate="'max:250'"
              data-vv-delay="500"
              :data-vv-as="$t('global.description')"
              ref="comment"
              @keydown.enter.exact.prevent="submit">
            </textarea>
            <label
              for="comment"
              class="form-label label-inner">
              {{ $t('global.description') }}
            </label>
            <span
              v-if="errors.has('comment')"
              class="form-help is-danger">
              {{ errors.first('comment') }}
            </span>
            <div class="form-chars-indicator">
              {{ comment | charsLeft(250) }}
            </div>
          </div>

          <div
            v-if="error"
            class="form-row form-help is-danger">
            {{ error }}
          </div>

          <div class="form-actions full">
            <btn
              @onclick="submit"
              btn-class="blue-filled"
              class="TimelineEntityCommentsModal__submit"
              :class="{ invalidate: !commentIsValid || processing }"
              :btn-label="$t('global.add')">
            </btn>
          </div>
        </div>
      </div>
      <div class="TimelineEntityCommentsModal__section">
        <div
          class="TimelineEntityCommentsModal__section-header"
          v-if="entityComments.length">
          <div class="TimelineEntityCommentsModal__section-title">
            {{ $t('timeline.specialists_comments') }}
          </div>
        </div>
        <transition-group
          class="TimelineEntityCommentsModal__section-content"
          name="list-move"
          appear>
          <div
            v-for="(comment, index) in entityComments"
            :key="index"
            class="TimelineEntityCommentsModal__comment"
            :class="{ highlight: highlightedId === comment.id }"
            :ref="comment.id">
            <div class="TimelineEntityCommentsModal__comment-header">
              <div class="specialist-card">
                <div
                  class="specialist-card-avatar"
                  :style="{'background-image': `url(${comment.specialist.avatarUrl})`}">
                </div>
                <div class="specialist-card-info">
                  <div class="specialist-card-name">
                    {{ comment.specialist.firstName }} {{ comment.specialist.lastName }}
                  </div>
                  <div class="specialist-card-role">
                    {{ $t(`user_roles.${userRole[comment.specialist.type]}`) }}
                  </div>
                </div>
              </div>
              <div class="TimelineEntityCommentsModal__comment-date">
                {{ comment.insertedAt | moment('YYYY/MM/DD hh:mm A') }}
              </div>
            </div>
            <div class="form-row">
              <textarea
                class="form-textarea filled"
                type="text"
                :value="comment.body"
                readonly>
              </textarea>
              <label
                for="comment"
                class="form-label label-inner">
                {{ $t('global.description') }}
              </label>
            </div>
          </div>

          <div
            key="load_more"
            v-if="commentsNextToken"
            class="TimelineEntityCommentsModal__load-more">
            <btn
              :class="{ invalidate: processing }"
              @onclick="loadMore"
              btn-class="submit"
              :btn-label="$t('global.load_more')">
            </btn>
          </div>
        </transition-group>
      </div>
    </div>
  </fullscreen-modal-wrapper>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FullscreenModalWrapper from '@/components/global/fullscreen_modal_wrapper/fullscreen-modal-wrapper';
import { charsLeft } from '@/utils/filters';
import { USER_ROLE } from '@/constants';
import { setTimeout } from 'timers';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patientTimeline');

export default {
  name: 'TimelineEntityCommentsModal',
  components: {
    FullscreenModalWrapper
  },
  props: {
    entityId: {
      required: true
    }
  },
  filters: {
    charsLeft
  },
  data() {
    return {
      patientId: this.$route.params.patientId,
      recordId: this.$route.params.id,
      comment: null,
      error: null,
      processing: false,
      highlightedId: null
    };
  },
  computed: {
    ...mapGetters([
      'entityComments',
      'commentsNextToken'
    ]),
    userRole() {
      return USER_ROLE;
    },
    commentIsValid() {
      return (this.comment || '').replace(/[ ]|\n/g, '').length > 3;
    }
  },
  mounted() {
    setTimeout(async () => {
      await this.fetchTimelineEntityComments({
        patientId: this.patientId,
        recordId: this.recordId,
        entityId: this.entityId
      });
      this.checkQuery();
    }, 650);
  },
  beforeDestroy() {
    this.clearComments();
  },
  methods: {
    ...mapActions([
      'fetchTimelineEntityComments',
      'addComment'
    ]),
    ...mapMutations([
      'clearComments'
    ]),
    submit(e) {
      if (e) e.preventDefault();
      if (!this.commentIsValid || this.processing) return;
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.addComment({
            body: this.comment,
            params: {
              patientId: this.patientId,
              recordId: this.recordId,
              entityId: this.entityId
            }
          }).then(({ error }) => {
            if (error) {
              this.error = error.message;
            } else {
              this.comment = null;
            }
            this.processing = false;
          });
        }
      });
    },
    async loadMore() {
      this.processing = true;
      const response = await this.fetchTimelineEntityComments({
        patientId: this.patientId,
        recordId: this.recordId,
        entityId: this.entityId
      });
      this.processing = false;
      return response;
    },
    async checkQuery() {
      const commentId = this.$route.query.commentId;
      if (commentId) {
        if (this.entityComments.find(({ id }) => id === commentId)) {
          this.highlightComment(commentId);
        } else if (this.commentsNextToken) {
          await this.loadMore();
          this.checkQuery();
        }
      }
    },
    highlightComment(id) {
      this.highlightedId = id;
      const position = this.$refs[id][0].getBoundingClientRect().top;
      const offsetTop = 106;
      this.$refs.container.scrollTop = position + offsetTop;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "timeline-entity-comments-modal.scss";
</style>
