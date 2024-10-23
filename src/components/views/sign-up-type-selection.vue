<template>
  <div class="SignUpTypeSelection__wrapper">
    <div class="SignUpTypeSelection__header">
      <router-link
        :to="{ name: 'dashboard' }"
        class="SignUpTypeSelection__header-logo-container"
        data-cy="SignUpForm__header-home-link">
        <img
          src="/static/images/logo.png"
          class="SignUpTypeSelection__header-logo" />
      </router-link>
    </div>

    <div v-if="!selected.status" class="sign-up-type-content">
        <h1 class="title">What kind of account would you like to create?</h1>
  
        <div class="sign-up-types">
          <div class="sign-up-types__type">
            <img src="/static/images/sign_up/specialist.png" />

            <div class="sign-up-types__title">Specialist or Health <br> care member</div>

            <div class="sign-up-types__desc">Account dedicated only for Specialists <br> and Health Staff members</div>

            <button class="btn-blue-bordered" @click="selectAccountType('specialist')">
              Continue
            </button>
          </div>
          
          <div class="sign-up-types__dummy-space-holder" />
          
          <div class="sign-up-types__type">
            <img src="/static/images/sign_up/specialist_group.png" />
            
            <div class="sign-up-types__title">Specialist or Primary <br> health group</div>

            <div class="sign-up-types__desc">Account dedicated only for Specialists <br> and primary health groups</div>

            <button class="btn-blue-bordered" @click="selectAccountType('specialist_group')">
              Continue
            </button>
          </div>

          <div class="sign-up-types__dummy-space-holder" />
          
          <div class="sign-up-types__type">
            <img src="/static/images/sign_up/hospital.png" />
            
            <div class="sign-up-types__title">Hospital or Clinic</div>
            <div class="sign-up-types__desc">Account dedicated only for <br> hospitals and clinics</div>

            <button class="btn-blue-bordered" @click="selectAccountType('hospital')">
              Continue
            </button>
          </div>
        </div>
      </div>

    <div v-else class="sign-up-type-content">
      <h1 class="title">You selected {{ selected[selected.name]['name'] }} </h1>
      <div class="sign-up-types__confirm">confirm your selection or choose another <span @click="chooseOtherOption()">option</span></div>

      <div class="sign-up-types">
        <div class="sign-up-types__type selected">
          <img :src="'/static/images/sign_up/'+selected.name+'.png'"/>

          <div class="sign-up-types__title selected">{{ selected[selected.name]['name'] }}</div>
          
          <div class="sign-up-types__desc selected">{{ selected[selected.name]['desc'] }}</div>

          <button class="btn-blue-filled" @click="selectAccountTypeConfirm()">
            {{ $t('authorisation.create_account') }}
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: 'SignUpTypeSelection',

  components: {
  },

  data() {
    return {
      step: 1,
      banner_images_amount: 5,
      banner_image_template: 'banner-',
      selected: {
          status: false,
          name: null,
          specialist: {
            name: 'Specialist or Health Care member',
            desc: 'Account dedicated only for Specialists and Health Staff members',
            query: 'specialist'
          },
          specialist_group: {
            name: 'Specialist or Primary health group',
            desc: 'Account dedicated only for Specialists and primary health groups',
            query: 'specialist-group'
          },
          hospital: {
            name: 'Hospital or Clinic',
            desc: 'Account dedicated only for hospitals and clinics',
            query: 'hospital-or-clinic'
          }
        }
    };
  },

  methods: {
    chooseOtherOption() {
      this.selected.status = false
      this.selected.name = null
    },
    selectAccountType(name) {
      this.selected.name = name
      this.selected.status = true
    },
    selectAccountTypeConfirm() {
      this.$router.push({name: 'sign-up', query: { type: this.selected[this.selected.name]['query'] }});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./src/stylesheets/breakpoints";

.SignUpTypeSelection {
    &__wrapper {
      padding: 60px;
      min-height: 100vh;
      background: white;
  
      .title {
        color: #4496E9;
        font-size: 48px;
        font-weight: 500;
        padding: 0;
      }
  
      .sign-up-type-content {
        text-align: left;
        padding-top: 5%;
  
        .sign-up-types {
          margin-top: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 60px;
  
          &__dummy-space-holder {
            width: 3%;
          }
  
          &__type {
            padding: 36px 16px;
            border: 1px solid #4496E9;
            border-radius: 4px;
            text-align: center;
            width: 370px;
            height: 450px;
            font-size: 13px;
            color: rgb(109, 133, 158);
  
            img {
              width: 100%;
              height: 130px;
              object-fit: contain;
            }
  
            button {
              padding: 8px 10px;
              width: 338px;
              height: 48px;
              font-size: 17px;
            }
          }
          &__type.selected {
            border: none;
            width: 525px;
            height: 379px;

            button {
              padding: 8px 10px;
              font-size: 17px;
              width: 493px;
              height: 48px;
              background: #4496E9;
            }

          }
          &__title.selected {
            min-height: auto;
          }
          &__desc.selected {
            margin: 16px 0 32px 0;
          }
          

          &__title {
            margin-top: 38px;
            font-weight: 700;
            font-size: 24px;
            color: #6B6B6B;
            line-height: 31px;
            letter-spacing: -0.5px;
            min-height: 62px;
          }

          &__desc, &__confirm {
            font-weight: 400;
            font-size: 13px;
            line-height: 17px;
            color: #6D859E;
            letter-spacing: 0.216667px;
            margin: 24px 0 32px 0;
          }

          &__confirm {
            font-size: 24px;
            span {
              color: #4496E9;
              text-decoration: underline;
              cursor: pointer;
            }
          }
          
        }
  
        @media (max-width: $bp-xs-max) {
          .sign-up-types {
            flex-direction: column;
  
            &__type {
              width: 100%;
              margin-bottom: 60px;
  
              button {
                min-width: 100%;
              }
            }
          }
        }
      }
    }
  
    &__header-logo-container {
      padding: 5px;
    }
    &__header-logo {
      height: 28px;
    }
  }
  
</style>
