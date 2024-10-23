<template>
  <div class="RegistrationStep2__wrapper">
    <div
      class="RegistrationStep2__content"
      v-if="editableBio">

      <div class="RegistrationStep2__desc">
        Try to write about yourself in a few sentences. The more you wrote the biggest chance you will have to be chosen by patients. Remember to stay natural, reliable and self-confident.
      </div>

      <div class="RegistrationStep2__section">
        
        <div class="RegistrationStep2__section-header">
          <div class="RegistrationStep2__section-title">
            {{ $t('profile.profile_description') }}
          </div>
        </div>

        <div class="RegistrationStep2__section-content">
          <div class="form-row">
            <textarea
              :class="{
                'is-danger': errors.has('description'),
                'filled': description
              }"
              id="description"
              name="description"
              class="form-textarea RegistrationStep2__bio"
              v-model="description"
              v-validate="'required|max:1200'"
              data-vv-delay="500"
              :data-vv-as="$t('global.description')"
              ref="description">
            </textarea>
            <label
              for="description"
              class="form-label label-inner">
              {{ $t('global.description') }}
            </label>
            <span
              v-if="errors.has('description')"
              class="form-help is-danger"
              data-cy="RegistrationStep2__number-validation-error">
              {{ errors.first('description') }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="!processing"
        class="RegistrationStep2__footer">
        <div class="RegistrationStep2__footer-content">
          <div
            v-if="error"
            class="form-row form-help is-danger">
            {{ error }}
          </div>
          <div class="form-actions full RegistrationStep2__footer-actions">
            <btn
              class="RegistrationStep2__cancel"
              @onclick="back"
              btn-class="blue"
              :btn-label="$t('global.back')"
              data-cy="RegistrationStep2__back">
            </btn>
            <btn
              @onclick="submit"
              class="RegistrationStep2__submit"
              btn-class="submit"
              :btn-label="$t('global.go_next')"
              data-cy="RegistrationStep2__submit">
            </btn>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('profile');
const editableFieldModel = field => ({
  get() {
    return this.editableBio[field];
  },
  set(value) {
    this.setEditableBioField({ field, value });
  }
});

export default {
  name: 'RegistrationStep2',
  data() {
    return {
      error: null,
      processing: false
    };
  },
  computed: {
    ...mapGetters(['bio', 'editableBio']),
    description: editableFieldModel('description')
  },
  async beforeMount() {
    await this.fetchBio();
    const bio = localStorage.getItem('registration-bio');
    this.setEditableBio(bio ? JSON.parse(bio) : null);
  },
  methods: {
    ...mapActions([
      'updateBiov2',
      'fetchBio',
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
        this.setRegistrationStep(1);
      }, 200);
    },
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.updateBiov2().then(({ error }) => {
            if (error) {
              this.processing = false;
              this.error = error;
            } else {
              this.setRegistrationStep(3);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "registration-step-2.scss";
</style>
