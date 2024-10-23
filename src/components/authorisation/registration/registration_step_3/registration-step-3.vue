<template>
  <div class="RegistrationStep3__wrapper">
    <div
      class="RegistrationStep3__content"
      v-if="editableBio">

      <div class="RegistrationStep3__section">
        <div class="RegistrationStep3__section-header">
          <div class="RegistrationStep3__section-title">
            {{ $t('profile.education') }}
          </div>
        </div>
        <div class="RegistrationStep3__section-content">
          <education-form
            v-for="(form, index) in education"
            :key="index"
            :form="form"
            :index="index"
            :length="education.length"
            @set-form="f => setForm({ form: f, index, field: 'education' })"
            @remove="removeForm({ index, field: 'education'})">
          </education-form>

          <div
            v-if="education.length < 7"
            @click="addForm('education')"
            class="RegistrationStep3__add-form form-actions">
            <i class="icon-plus RegistrationStep3__add-form-icon"/>
            {{ $t('profile.add_new_university') }}
          </div>
        </div>
      </div>

      <div
        v-if="!processing"
        class="RegistrationStep3__footer">
        <div class="RegistrationStep3__footer-content">
          <div
            v-if="error"
            class="form-row form-help is-danger">
            {{ error }}
          </div>
          <div class="form-actions full RegistrationStep3__footer-actions">
            <btn
              class="RegistrationStep3__cancel"
              @onclick="back"
              btn-class="blue"
              :btn-label="$t('global.back')"
              data-cy="RegistrationStep3__back">
            </btn>
            <btn
              @onclick="submit"
              class="RegistrationStep3__submit"
              btn-class="submit"
              :btn-label="$t('global.go_next')"
              data-cy="RegistrationStep3__submit">
            </btn>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import EducationForm from '@/components/form/education_form/education-form';

const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('profile');

export default {
  name: 'RegistrationStep3',
  components: {
    EducationForm
  },
  data() {
    return {
      error: null,
      processing: false
    };
  },
  computed: {
    ...mapGetters(['bio', 'editableBio']),
    education() {
      return (this.editableBio || {}).education;
    }
  },
  async beforeMount() {
    await this.fetchBio();
    const bio = localStorage.getItem('registration-bio');
    this.setEditableBio(bio ? JSON.parse(bio) : null);
    if (!this.editableBio.education.length) this.addForm('education');
  },
  methods: {
    ...mapActions([
      'updateEducation',
      'fetchBio'
    ]),
    ...mapMutations([
      'setEditableBio',
      'setEditableBioField',
      'setRegistrationStep'
    ]),
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
        this.setRegistrationStep(2);
      }, 200);
    },
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.updateEducation().then(({ error }) => {
            if (error) {
              this.processing = false;
              this.error = error;
            } else {
              this.setRegistrationStep(4);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "registration-step-3.scss";
</style>
