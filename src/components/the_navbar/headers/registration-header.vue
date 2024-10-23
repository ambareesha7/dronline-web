<template>
  <div class="RegistrationHeader__wrapper">
    <div class="process RegistrationHeader__process">
      <div :data-cy="`RegistrationHeader__step-${registrationStep}`">
        <div class="RegistrationHeader__banner-wrapper">

          <div class="RegistrationHeader__progress_wrapper">
              <div class="RegistrationHeader__circular-progress" data-inner-circle-color="#fff" data-progress-color="#56a9ff" data-bg-color="#eef8ff">
                  <div class="RegistrationHeader__inner-circle"></div>
                  <p class="RegistrationHeader__percentage"></p>
              </div>
          </div>

          <div>
            <div class="RegistrationHeader__label" v-if="registrationStep">
              {{ steps[registrationStep-1].label }}
            </div>
            <div class="RegistrationHeader__desc" v-if="registrationStep">
              {{ steps[registrationStep-1].desc }}
            </div>    
          </div>    
        </div>
      </div>
    </div>
    <div class="RegistrationHeader__prompt">
      <i class="icon-lock RegistrationHeader__prompt-icon"></i>
      {{ $t('authorisation.secure_connection') }}
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'RegistrationHeader',
  data() {
    return {
      startValue: 0,
      steps: [
        { number: 1, label: 'Basic Info', desc: 'Introduce yourself more' },
        { number: 2, label: 'Profile description', desc: 'Write few sentences about your experience' },
        { number: 3, label: 'Education', desc: 'Add your education info'  },
        { number: 4, label: 'Work experience', desc: 'Add your past and current work info'  },
        { number: 5, label: 'Medical info', desc: 'Enter medical information'  },
        { number: 6, label: 'Insurance', desc: 'Set insurance provider'  },
        { number: 7, label: 'Payment', desc: 'Define your pricing'  }
      ]
    };
  },
  watch: {
    registrationStep() {
      this.initCircle();
    }
  },
  computed: mapGetters(['registrationStep']),
  methods: {
    initCircle() {
        
        if(!this.registrationStep) {
          return
        }

        let vm = this
        const circularProgress = document.querySelectorAll(".RegistrationHeader__circular-progress");

        Array.from(circularProgress).forEach((progressBar) => {
        const progressValue = progressBar.querySelector(".RegistrationHeader__percentage");
        const innerCircle = progressBar.querySelector(".RegistrationHeader__inner-circle");
        
        let endValue = Number(this.registrationStep * 15),
            speed = 7,
            progressColor = progressBar.getAttribute("data-progress-color");

        const progress = setInterval(() => {
            vm.startValue++;
            progressValue.textContent = `${this.registrationStep}/7`;
            // progressValue.style.color = `${progressColor}`;

            innerCircle.style.backgroundColor = `${progressBar.getAttribute("data-inner-circle-color")}`;

            progressBar.style.background = `conic-gradient(${progressColor} ${
            vm.startValue * 3.6
            }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
            
            if (vm.startValue === endValue) {
                clearInterval(progress);
            }
            
        }, speed);
        });
    }
  },
  mounted() {
    this.initCircle()
  }
};
</script>
<style lang="scss">
.RegistrationHeader {
  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  &__process {
    top: 100px;
    width: 570px;
    background-color: #fff;
    padding: 16px 24px 16px 24px;
    border: 1px solid #56a9ff;
    border-radius: 4px;
  }

  &__banner-wrapper {
    display: flex;
  }

  &__progress_wrapper {
    margin-right: 16px;
  }

  &__circular-progress {
    --progress-bar-width: 48px;
    --progress-bar-height: 48px;
    --font-size: 16px;
    width: var(--progress-bar-width);
    height: var(--progress-bar-height);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__inner-circle {
    position: absolute;
    width: calc(var(--progress-bar-width) - 7px);
    height: calc(var(--progress-bar-height) - 7px);
    border-radius: 50%;
    background-color: white;
  }

  &__percentage {
    position: relative;
    font-size: var(--font-size);
    color: #56a9ff;
    font-size: 16px;
    font-weight: 600;
  }

  &__label {
    color: rgba(86, 169, 255, 1);
    font-weight: 600;
    font-size: 18px;
  }

  &__desc {
    margin-top: 5px;
    color: rgba(109, 133, 158, 1);
    font-weight: 400;
    font-size: 14px;
  }

  &__prompt {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .18px;
    line-height: 14px;
    color: #3B4A58;
    display: flex;
    align-items: center;
    background: #F5F5F5;
    border-radius: 16px;
    padding: 0 16px;
    height: 32px;

    &-icon {
      font-size: 12px;
      color: #1877da;
    }
  }
}
</style>
