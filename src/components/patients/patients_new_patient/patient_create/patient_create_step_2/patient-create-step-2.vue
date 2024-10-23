<template>
  <div class="PatientCreateStep2__wrapper">
    <transition name="appear-from-top">
      <div
        v-if="showPrompt"
        class="PatientCreateStep2__header-prompt">
        {{ error }}
      </div>
    </transition>
    <div class="PatientCreateStep2__content PatientCreateStep2__container">
      <div class="title-medium">
        {{ $t('patients.add_new_patient') }}
      </div>
      <div class="PatientCreateStep2__description">
        {{ $t('patients.add_new_patient_description') }}
      </div>

      <div class="form-row PatientCreateStep2__form">
        <input
          name="code"
          id="code"
          type="text"
          class="form-field"
          :class="{
            'is-danger': errors.has('code'),
            'filled': code
          }"
          v-model="code"
          v-validate="'required|numeric|min:6|max:6'"
          data-vv-delay="500"
          :data-vv-as="$t('global.verification_code')"
          data-cy="PatientCreate__code-field"/>
        <label
          class="form-label label-inner"
          for="code">
          {{ $t('global.verification_code') }}
        </label>
        <span
          v-if="errors.has('code')"
          class="form-help is-danger"
          data-cy="PatientCreate__code-field-validation-error">
          {{ errors.first('code') }}
        </span>
      </div>
      <div class="form-row--cols">
        <div class="form-col">
          <transition
            name="from-top-to-bottom"
            appear>
            <div
              v-if="sent"
              class="PatientCreateStep2__sent">
              {{ $t('authorisation.code_has_been_resent') }}
            </div>
          </transition>
        </div>
        <div class="form-col">
          <div
            class="PatientCreateStep2__resend"
            :class="{ invalidate: resending }"
            @click="resend">
            {{ $t('authorisation.resend_code') }}
          </div>
        </div>
      </div>
    </div>

    <transition
      name="appear-from-bottom"
      appear>
      <div class="PatientCreateStep2__footer">
        <div class="form-actions full PatientCreateStep2__container">
          <btn
            btn-class="blue"
            @onclick="$emit('set-step', 1)"
            :btn-label="$t('global.back')">
          </btn>
          <btn
            btn-class="submit"
            @onclick="submit"
            :btn-processing="processing"
            :btn-label="$t('authorisation.create_account')"
            data-cy="PatientCreate__submit-button">
          </btn>
        </div>
      </div>
    </transition>
    <span id="recaptcha-container"></span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { delayedCalls } from '@/utils';
import PatientCreatedModal from '../patient_created_modal/patient-created-modal';

export default {
  name: 'PatientCreateStep2',

  data() {
    return {
      code: null,
      processing: false,
      resending: false,
      sent: false,
      error: null,
      showPrompt: false
    };
  },

  computed: {
    ...mapGetters('firebase', ['phoneNumber'])
  },

  methods: {
    ...mapActions('firebase', ['verify', 'authorize']),
    ...mapActions('patients', ['createPatient']),
    async resend() {
      this.resending = true;
      await this.authorize(this.phoneNumber);
      this.resending = false;
      this.sent = true;
      setTimeout(() => {
        this.sent = false;
      }, 3000);
    },
    complete(id) {
      this.$modal.show(
        PatientCreatedModal,
        {
          phoneNumber: this.phoneNumber,
          proceed: () => this.$router.push({ name: 'patient-onboarding', params: { id } })
        },
        {
          name: 'patient-created-modal',
          width: 470,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          clickToClose: false,
          transition: 'from-top-to-bottom'
        }
      );
    },
    submit() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          this.processing = true;
          const { firebase_token, error } = await this.verify(this.code);
          if (error) {
            this.error = error.message;
            delayedCalls(() => {
              this.showPrompt = !this.showPrompt;
            }, [0, 7000]);
            this.code = null;
            this.processing = false;
          } else {
            const { response } = await this.createPatient(firebase_token);
            this.complete(response.patientId);
          }
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-create-step-2.scss";
</style>
