<template>
  <div class="RegistrationStep4__wrapper">
    <div
      class="RegistrationStep4__content"
      v-if="editableBio">

      <div class="RegistrationStep4__applicable">
        <div class="RegistrationStep4__applicable-content">
          <div class="RegistrationStep4__applicable-switch">
            <switcher @onchange="workExpApplicableOnChange" :value="workExpApplicable"/>
          </div>
          <div class="RegistrationStep4__applicable-text">
            Applicable
          </div>
        </div>
      </div>

      <div class="RegistrationStep4__section" v-if="workExpApplicable">
        <!-- <div class="RegistrationStep4__section-header">
          <div class="RegistrationStep4__section-title">
            {{ $t('profile.work_experience') }}
          </div>
        </div> -->

        <div class="RegistrationStep4__section-content">

          <experience-form
            v-for="(form, index) in experience"
            :key="index"
            :form="form"
            :index="index"
            :length="experience.length"
            @set-form="f => setForm({ form: f, index, field: 'workExperience' })"
            @remove="removeForm({ index, field: 'workExperience'})">
          </experience-form>

          <div
            v-if="experience.length < 7"
            @click="addForm('workExperience')"
            class="RegistrationStep4__add-form form-actions">
            <i class="icon-plus RegistrationStep4__add-form-icon"/>
            {{ $t('profile.add_new_work') }}
          </div>
        </div>
      </div>

      <div
        v-if="!processing"
        class="RegistrationStep4__footer">
        <div class="RegistrationStep4__footer-content">
          <div
            v-if="error"
            class="form-row form-help is-danger">
            {{ error }}
          </div>
          <div class="form-actions full RegistrationStep4__footer-actions">
            <btn
              class="RegistrationStep4__cancel"
              @onclick="back"
              btn-class="blue"
              :btn-label="$t('global.back')"
              data-cy="RegistrationStep4__back">
            </btn>
            <btn
              @onclick="submit"
              class="RegistrationStep4__submit"
              btn-class="submit"
              :btn-label="$t('global.go_next')"
              data-cy="RegistrationStep4__submit">
            </btn>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ExperienceForm from '@/components/form/experience_form/experience-form';
import Switcher from '@/components/global/switcher/switcher';

const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('profile');

export default {
  name: 'RegistrationStep4',
  components: {
    ExperienceForm,
    Switcher
  },
  data() {
    return {
      error: null,
      processing: false,
      workExpApplicable: true
    };
  },
  computed: {
    ...mapGetters(['bio', 'editableBio']),
    experience() {
      return (this.editableBio || {}).workExperience;
    }
  },
  async beforeMount() {
    await this.fetchBio();
    const bio = localStorage.getItem('registration-bio');
    this.setEditableBio(bio ? JSON.parse(bio) : null);
    if (!this.editableBio.workExperience.length) this.addForm('workExperience');
  },
  methods: {
    ...mapActions([
      'updateWorkExperience',
      'fetchBio'
    ]),
    ...mapMutations([
      'setEditableBio',
      'setEditableBioField',
      'setRegistrationStep'
    ]),
    workExpApplicableOnChange(value) {
      this.workExpApplicable = value
    },
    setForm({ form, index, field }) {
      this.setEditableBioField({
        field,
        value: this.editableBio[field].map((v, i) => (
          i === index ? form : v
        ))
      });
    },
    removeForm({ index, field }) {
      this.$delete(this.editableBio[field], index);
      this.setEditableBioField({
        field,
        value: this.editableBio[field]
      });
    },
    addForm(field) {
      this.setEditableBioField({
        field,
        value: [
          ...this.editableBio[field],
          {}
        ]
      });
    },
    back() {
      this.processing = true;
      localStorage.setItem('registration-bio', JSON.stringify(this.editableBio));
      setTimeout(() => {
        this.setRegistrationStep(3);
      }, 200);
    },
    submit() {

      if(!this.workExpApplicable) {
        this.setRegistrationStep(5);
        return
      }

      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.updateWorkExperience().then(({ error }) => {
            if (error) {
              this.processing = false;
              this.error = error;
            } else {
              this.setRegistrationStep(5);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "registration-step-4.scss";
</style>
