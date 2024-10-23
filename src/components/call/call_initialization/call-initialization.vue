<template>
  <div class="CallInitialization__wrapper">
    <div class="CallInitialization__title">
      {{ $t('call_room.connecting') }}
    </div>
    <div class="CallInitialization__duration">
      {{ duration }}...
    </div>
    <img
      class="CallInitialization__recipient-avatar"
      :src="basicInfo.avatarUrl" />
    <div class="CallInitialization__recipient-type">
      {{ $t('global.patient') }}
    </div>
    <div class="CallInitialization__recipient-name">
      {{ basicInfo.firstName }} {{ basicInfo.lastName }}
    </div>
    <div
      v-if="adult"
      class="badge-green CallInitialization__child-badge">
      {{ $t('global.child') }}
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('patient');
export default {
  name: 'CallInitialization',
  data() {
    return {
      startedAt: new Date().getTime(),
      duration: null
    };
  },
  computed: {
    ...mapGetters(['basicInfo', 'adult'])
  },
  mounted() {
    this.interval = setInterval(() => this.setDuration(), 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    setDuration() {
      this.duration = '00:00';
      const start = Math.trunc(this.startedAt / 1000);
      const now = Math.trunc(new Date().getTime() / 1000);
      const stringify = n => {
        if (n.toString().length <= 1) {
          n = `0${n.toString()}`;
        }
        return n;
      };
      if (start && start < now) {
        const minutes = stringify(Math.trunc((now - start) / 60) % 60);
        const seconds = stringify((now - start) % 60);
        this.duration = `${minutes}:${seconds}`;
      }
      return this.duration;
    }
  }
};
</script>

<style lang="scss">
@import "call-initialization.scss";
</style>
