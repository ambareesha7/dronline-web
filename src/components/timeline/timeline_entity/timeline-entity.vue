<template>
  <div class="TimelineEntity__wrapper">
    <div class="TimelineEntity__content">
      <component
        :is="entityComponent"
        :entity="entity"
        :in-call="inCall"
        :latest-hpi="latestHpi">
      </component>
      <div
        class="TimelineEntity__comments"
        @click="openComments">
        <div class="TimelineEntity__comments-count">
          {{ $t('timeline.comments_count', [entity.commentsCounter || 0]) }}
        </div>
        <div class="TimelineEntity__comments-add">
          {{ $t('global.add') }}
        </div>
      </div>
    </div>

    <div
      class="TimelineEntity__icon"
      :class="entity.item">
      <i :class="entityIconClass"></i>
    </div>
    <div class="TimelineEntity__line"></div>
  </div>
</template>

<script>
import { kebabToPascalCase, kebabToSnakeCase, pascalToSnakeCase, snakeToKebabCase } from '@/utils/filters';
import TimelineEntities from '@/components/timeline/timeline_entities';
import TimelineEnityCommentsModal from '@/components/timeline/timeline_entity_comments_modal/timeline-entity-comments-modal';

export default {
  name: 'TimelineEntity',

  components: {
    ...TimelineEntities
  },

  props: {
    entity: {
      required: true,
      type: Object
    },
    inCall: {
      type: Boolean,
      default: true
    },
    latestHpi: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    entityComponent() {
      const type = snakeToKebabCase(pascalToSnakeCase(this.entity.item));
      const name = `timeline-entity-${type}`;
      const exist = kebabToPascalCase(name) in TimelineEntities;
      return exist ? name : null;
    },
    entityIconClass() {
      const icons = {
        call: 'icon_connected',
        disconnected: 'icon_disconnected',
        doctor_invitation: 'icon_invite',
        medications: 'icon_medications',
        ordered_tests: 'icon_order-tests',
        schedule_follow_up: 'icon_schedule',
        dispatch_request: 'icon_dispatch',
        vitals: 'icon_vitals',
        provided_hpi: 'icon_vitals',
        call_recording: 'icon_video'
      };
      return icons[pascalToSnakeCase(kebabToSnakeCase(this.entity.item))];
    }
  },

  mounted() {
    if (
      this.$route.query.timelineItemId &&
      this.$route.query.timelineItemId === this.entity.id
    ) {
      this.$nextTick(() => this.openComments());
    }
  },

  methods: {
    openComments() {
      if (!this.$route.query.timelineItemId) {
        this.$router.replace({query: {timelineItemId: this.entity.id}});
      }
      this.$modal.show(
        TimelineEnityCommentsModal,
        {
          entityId: this.entity.id
        },
        {
          name: 'timeline-entity-comments-modal',
          width: '100%',
          height: '100%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        },
        {
          'before-close': () => {
            this.$router.replace({query: null});
          }
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity.scss";
</style>
