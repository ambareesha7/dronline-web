<template>
  <div
    class="CallSession__wrapper"
    :class="size">
    <div
      class="CallSession__content"
      v-mousemove-with-idle="setMainScreenHovered">
      <call-initialization
        class="CallSession__loading"
        v-if="loading">
      </call-initialization>
      <div class="CallSession__selected-video">
        <call-session-subscriber
          v-if="activeStream && session"
          :key="activeStreamId"
          :stream="activeStream"
          :session="session"
          :is-main-view="true"
          :mirrored="activeStreamId === publisherStreamId"
          :height="height"
          @subscriber-created="setActiveSubscriber">
        </call-session-subscriber>
      </div>
      <call-room-header
        v-if="!isFamilyMemberCall && size === 'maximized'"
        :started-at="startedAt">
      </call-room-header>

      <call-room-footer
        @end-call="leaveTheCall"
        :is-family-member-call="isFamilyMemberCall">
      </call-room-footer>
    </div>

    <div
      class="CallSession__participants"
      :class="{ hidden: size !== 'maximized' }">
      <call-session-subscriber
        v-for="stream in streams"
        :key="stream.streamId"
        :stream="stream"
        :session="session"
        :is-selected="selectedStreamId === stream.id"
        @select-subscriber-stream="selectStream(stream)"
        @set-active-stream="setActiveStream(stream, true)">
      </call-session-subscriber>

      <call-session-publisher
        :stream-name="streamName"
        :session="session"
        :isSelected="publisherStreamId && selectedStreamId === publisherStreamId"
        @select-publisher-stream="selectStream(publisher.stream)">
      </call-session-publisher>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import mousemoveWithIdle from '@/directives/mousemove-with-idle.directive';
import CallRoomHeader from '@/components/call/call_room_header/call-room-header';
import CallRoomFooter from '@/components/call/call_room_footer/call-room-footer';
import CallSessionPublisher from '@/components/call/call_session/call_session_publisher/call-session-publisher';
import CallSessionSubscriber from '@/components/call/call_session/call_session_subscriber/call-session-subscriber';
import CallSessionDisconnectOptionsModal from '@/components/call/call_session_disconnect_options_modal/call-session-disconnect-options-modal';
import CallInitialization from '@/components/call/call_initialization/call-initialization';
import { playLoop, stopPlaying } from '@/utils/sounds';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('call');

const call_log_style = 'color: #ed2939; background: #222; padding: 3px;';

export default {
  name: 'CallSession',

  components: {
    CallRoomHeader,
    CallRoomFooter,
    CallSessionPublisher,
    CallSessionSubscriber,
    CallInitialization
  },

  directives: {
    mousemoveWithIdle
  },

  watch: {
    size() {
      this.height = this.size === 'minimized' ? 196 : window.innerHeight;
    }
  },

  props: {
    isFamilyMemberCall: {
      type: Boolean,
      default: false
    },
    streamName: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      loading: true,
      session: null,
      startedAt: null,
      height: window.innerHeight,
      resizeTimeout: null
    };
  },

  beforeMount() {
    // playLoop('call-initializing');
  },

  computed: {
    ...mapGetters([
      'token',
      'apiKey',
      'sessionId',
      'size',
      'streams',
      'publisher',
      'selectedStream',
      'activeStream',
      'medicalSummary'
    ]),
    selectedStreamId() {
      return this.selectedStream ? this.selectedStream.id : null;
    },
    activeStreamId() {
      return this.activeStream ? this.activeStream.id : null;
    },
    publisherStreamId() {
      return this.publisher ? this.publisher.stream.id : null;
    }
  },

  mounted() {
    this.init();
    window.addEventListener('resize', this.resizeThrottler, false);
  },

  beforeDestroy() {
    stopPlaying('call-initializing');
    window.removeEventListener('resize', this.resizeThrottler);
    if (this.session) this.session.disconnect();
    this.$modal.hide('call-session-disconnect-options-modal');
  },

  methods: {
    ...mapMutations([
      'setMainScreenHovered',
      'setSize',
      'addStream',
      'removeStream',
      'selectStream',
      'setActiveStream',
      'setActiveSubscriber',
      'closeCall'
    ]),
    ...mapActions([
      'endCall',
      'endCallForAll'
    ]),

    init() {
      this.setSize('maximized');
      this.session = OT.initSession(this.apiKey, this.sessionId);
      this.session.connect(this.token, err => {
        if (!err) this.startedAt = new Date().getTime();
      });
      this.session.on('streamCreated', this.streamCreated);
      this.session.on('streamDestroyed', this.streamDestroyed);
      this.session.on('sessionDisconnected', this.endCall);
    },

    streamCreated({ stream }) {
      console.log('STREAM CREATED');
      this.loading = false;
      this.addStream(stream);
      this.setActiveStream(stream);
      stopPlaying('call-initializing');
    },

    streamDestroyed({ stream }) {
      this.removeStream(stream);
      if (!this.streams.length) this.disconnect();
    },

    resizeThrottler() {
      if (this.size === 'minimized') return;
      if (!this.resizeTimeout) {
        this.resizeTimeout = setTimeout(() => {
          this.resizeTimeout = null;
          this.height = window.innerHeight;
        }, 66); // 15 fps
      }
    },

    publisherCompleted() {
      this.loading = false;
    },

    disconnect() {
      this.session.disconnect();
    },

    leaveTheCall() {
      if (!this.isFamilyMemberCall && this.streams.length > 1) {
        this.$modal.show(
          CallSessionDisconnectOptionsModal,
          {
            confirm: forEveryone => {
              if (forEveryone) {
                this.endCallForAll();
              } else {
                this.disconnect();
              }
            }
          },
          {
            name: 'call-session-disconnect-options-modal',
            width: 520,
            height: 'auto',
            pivotY: 0.3,
            adaptive: true,
            clickToClose: false,
            transition: 'from-top-to-bottom'
          }
        );
      } else {
        this.disconnect();
      }
    }
  }
};
</script>

<style lang="scss">
@import "call-session.scss";
</style>
