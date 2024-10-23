<template>
  <transition
    @enter="onEnter"
    @leave="onLeave"
    appear>
    <div class="TheGuide__wrapper">
      <svg>
        <defs>
          <clipPath id="guide-target-clipping">
            <path
              stroke="#000000"
              fill="#fff"
              :d="path" />
          </clipPath>
        </defs>
      </svg>
      <div
        class="TheGuide__backdrop"
        ref="backdrop"></div>
      <div
        class="TheGuide__content"
        @contextmenu.prevent="() => false">
        <div class="TheGuide__content-container">
          <transition
            name="slide-top-to-bottom"
            mode="out-in">
            <img
              v-if="currentStepImage"
              :key="step"
              class="TheGuide__content-step-image"
              :src="currentStepImage" />
          </transition>
        </div>
      </div>
      <div
        class="TheGuide__toolbar"
        ref="toolbar">
        <i
          class="icon-close TheGuide__close"
          @click="close"
          v-tooltip.left="{
            content: $t('guide.close_tooltip'),
            class: 'custom-tooltip--white'
          }"></i>
        <i
          class="icon-arrow-circled TheGuide__prev"
          :class="{ invalidate: step === 0 }"
          @click="setStep(step - 1)"></i>
        <div class="TheGuide__toolbar-content">
          <div class="TheGuide__toolbar-steps">
            {{ $t('global.step_something_of_something', [step + 1, steps.length]) }}
          </div>
          <transition
            name="slide-right-to-left"
            mode="out-in">
            <div
              :key="step"
              class="TheGuide__toolbar-info">
              <div
                class="TheGuide__toolbar-title"
                v-html="currentStepTitle"></div>
              <div
                class="TheGuide__toolbar-description"
                v-html="currentStepDescription"></div>
            </div>
          </transition>
        </div>
        <i
          class="icon-arrow-circled TheGuide__next"
          :class="{ invalidate: step === steps.length }"
          @click="setStep(step + 1)"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import cookie from 'vue-cookie';
import { mapMutations, mapGetters } from 'vuex';
import { TweenLite, TimelineLite } from 'gsap';
import GuideFinishedModal from './guide_finished_modal/guide-finished-modal';

const generateHighlightedPath = ({ x, y, width, height }) => {
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const points = [];
  points.push('M0,0');
  points.push(`h${vw}`);
  points.push(`v${vh}`);
  points.push(`h-${vw}`);
  points.push(`v-${(vh - y) - (height / 2)}`);
  points.push(`h${x}`);
  points.push(`v${height / 2}`);
  points.push('q0,5 5,5');
  points.push(`h${width}`);
  points.push('q5,0 5,-5');
  points.push(`v-${height}`);
  points.push('q0,-5 -5,-5');
  points.push(`h-${width}`);
  points.push('q-5,0 -5,5');
  points.push(`v${height / 2}`);
  points.push(`h-${x}`);
  points.push('z');
  return points.join(' ');
};

export default {
  name: 'TheGuide',
  data() {
    return {
      step: null,
      steps: [
        {
          highlight: 'dashboard',
          action: () => this.$router.push({ name: 'dashboard' })
        },
        { highlight: 'dashboard' },
        {},
        {},
        {
          highlight: 'my_calendar',
          action: () => this.$router.push({ name: 'availability' })
        },
        { highlight: 'my_calendar' },
        {
          highlight: 'emr',
          action: () => this.$router.push({ name: 'emr' })
        },
        { highlight: 'emr' },
        { highlight: 'emr' },
        { highlight: 'emr' },
        {
          highlight: 'membership',
          action: () => this.$router.push({ name: 'membership' })
        },
        { highlight: 'membership' }
      ],
      clipped: false,
      path: generateHighlightedPath({ x: 0, y: -100, width: 0, height: 0 }),
      highlightedRect: {}
    };
  },
  watch: {
    highlightedRect(newRect) {
      TweenLite.to(
        this.$data,
        0.2,
        { path: generateHighlightedPath(newRect) }
      );
    }
  },
  computed: {
    ...mapGetters('profile', [
      'usBoardUser'
    ]),
    currentStep() {
      return this.step !== null ? this.steps[this.step] : null;
    },
    currentStepTitle() {
      return this.currentStep && this.currentStep.title !== false ?
        this.$t(`guide.step_${this.step + 1}_title`) : null;
    },
    currentStepDescription() {
      return this.currentStep && this.currentStep.description !== false ?
        this.$t(`guide.step_${this.step + 1}_description`) : null;
    },
    currentStepImage() {
      return this.currentStep && this.currentStep.image !== false ?
        `/static/guide-images/guide-step-${this.step + 1}.jpg` :
        null;
    }
  },
  mounted() {
    window.addEventListener('resize', this.setStep);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setStep);
  },
  methods: {
    ...mapMutations('layouts', [
      'toggleGuide'
    ]),
    setStep(step) {
      if (step === this.steps.length) {
        this.finish();
        return;
      }
      if (step >= 0) this.step = step;
      const { highlight, action } = this.steps[this.step || 0];
      if (highlight) {
        const el = (document.querySelectorAll(`[data-guide-target-${highlight}]`) || [])[0];
        if (el) this.highlightedRect = el.getBoundingClientRect();
      } else {
        this.highlightedRect = { x: 0, y: -100, width: 0, height: 0 };
      }
      if (action) action.call();
    },
    onEnter(el, done) {
      const t1 = new TimelineLite({
        onComplete: done
      });
      t1.eventCallback('onComplete', () => {
        done();
        this.setStep(0);
      });
      t1
        .from(this.$refs.backdrop, 0.2, { opacity: 0 })
        .from(this.$refs.toolbar, 0.2, { y: '100%' });
    },
    onLeave(el, done) {
      const t1 = new TimelineLite({
        onComplete: done
      });
      t1
        .to(this.$refs.toolbar, 0.2, { y: '100%' })
        .to(this.$refs.backdrop, 0.2, { opacity: 0 });
    },
    close() {
      if(this.usBoardUser || cookie.get('usBoardUser')) { 
        this.$router.push({ name: 'us-board-second-opinion' });
      }
      cookie.set('guidePassed', true);
      this.toggleGuide(false);
    },
    finish() {
      this.highlightedRect = { x: 0, y: -100, width: 0, height: 0 };
      this.close();

      if(this.usBoardUser || cookie.get('usBoardUser')) { 
        this.$router.push({ name: 'us-board-second-opinion' });
      } else {
        this.$router.push({ name: 'dashboard' });
      }
      
      this.$modal.show(
        GuideFinishedModal,
        {},
        {
          name: 'guide-finished-modal',
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
@import "the-guide.scss";
</style>
