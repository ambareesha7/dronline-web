<template>
  <div class="PayoutsCredentials__wrapper">
    <form v-if="isEditMode">
      <div class="PayoutsCredentials__section-title">
        {{ $t('payouts.edit_payouts_credentials')}}
      </div>
      <div class="form-row">
        <input
            type="text"
            name="payouts_input_iban"
            id="payouts_input_iban"
            :class="{
              'form-field': true,
              'is-danger': errors.has('payouts_input_iban'),
              'filled': iban
            }"
            v-model="iban"
            v-validate="'required'"
            data-vv-delay="500"
            :data-vv-as="$t('payouts.iban')"
        />
        <label class="form-label label-inner" for="payouts_input_iban">
          {{ $t('payouts.iban') }}*
        </label>
        <span v-if="errors.has('payouts_input_iban')"
          class="form-help is-danger">
            {{ errors.first('payouts_input_iban') }}
        </span>
      </div>

      <div class="form-row">
        <input
            type="text"
            name="payouts_input_name"
            id="payouts_input_name"
            :class="{
              'form-field': true,
              'is-danger': errors.has('payouts_input_name'),
              'filled': name
            }"
            v-model="name"
            v-validate="'required'"
            data-vv-delay="500"
            :data-vv-as="$t('payouts.name')"
        />
        <label class="form-label label-inner" for="payouts_input_name">
          {{ $t('payouts.name') }}*
        </label>
        <span v-if="errors.has('payouts_input_name')"
          class="form-help is-danger">
            {{ errors.first('payouts_input_name') }}
        </span>
      </div>

      <div class="form-row">
        <input
            type="text"
            name="payouts_input_address"
            id="payouts_input_address"
            :class="{
              'form-field': true,
              'is-danger': errors.has('payouts_input_address'),
              'filled': address
            }"
            v-model="address"
            data-vv-delay="500"
            :data-vv-as="$t('payouts.address')"
        />
        <label class="form-label label-inner" for="payouts_input_address">
          {{ $t('payouts.address') }}
        </label>
        <span v-if="errors.has('payouts_input_address')"
          class="form-help is-danger">
            {{ errors.first('payouts_input_address') }}
        </span>
      </div>

      <div class="form-row">
        <input
            type="text"
            name="payouts_input_bank_name"
            id="payouts_input_bank_name"
            :class="{
              'form-field': true,
              'is-danger': errors.has('payouts_input_bank_name'),
              'filled': bankName
            }"
            v-model="bankName"
            v-validate="'required'"
            data-vv-delay="500"
            :data-vv-as="$t('payouts.bank_name')"
        />
        <label class="form-label label-inner" for="payouts_input_bank_name">
          {{ $t('payouts.bank_name') }}*
        </label>
        <span v-if="errors.has('payouts_input_bank_name')"
          class="form-help is-danger">
            {{ errors.first('payouts_input_bank_name') }}
        </span>
      </div>

      <div class="form-row">
        <input
            type="text"
            name="payouts_input_bank_address"
            id="payouts_input_bank_address"
            :class="{
              'form-field': true,
              'is-danger': errors.has('payouts_input_bank_address'),
              'filled': bankAddress
            }"
            v-model="bankAddress"
            data-vv-delay="500"
            :data-vv-as="$t('payouts.bank_address')"
        />
        <label class="form-label label-inner" for="payouts_input_bank_address">
          {{ $t('payouts.bank_address') }}
        </label>
        <span v-if="errors.has('payouts_input_bank_address')"
          class="form-help is-danger">
            {{ errors.first('payouts_input_bank_address') }}
        </span>
      </div>

      <div class="form-row">
        <input
            type="text"
            name="payouts_input_bank_swift_code"
            id="payouts_input_bank_swift_code"
            :class="{
              'form-field': true,
              'is-danger': errors.has('payouts_input_bank_swift_code'),
              'filled': bankSwiftCode
            }"
            v-model="bankSwiftCode"
            v-validate="'required'"
            data-vv-delay="500"
            :data-vv-as="$t('payouts.bank_swift_code')"
        />
        <label class="form-label label-inner" for="payouts_input_bank_swift_code">
          {{ $t('payouts.bank_swift_code') }}*
        </label>
        <span v-if="errors.has('payouts_input_bank_swift_code')"
          class="form-help is-danger">
            {{ errors.first('payouts_input_bank_swift_code') }}
        </span>
      </div>

      <div class="form-row">
        <input
            type="text"
            name="payouts_input_bank_routing_number"
            id="payouts_input_bank_routing_number"
            :class="{
              'form-field': true,
              'is-danger': errors.has('payouts_input_bank_routing_number'),
              'filled': bankRoutingNumber
            }"
            v-model="bankRoutingNumber"
            data-vv-delay="500"
            :data-vv-as="$t('payouts.bank_routing_number')"
        />
        <label class="form-label label-inner" for="payouts_input_bank_routing_number">
          {{ $t('payouts.bank_routing_number') }}
        </label>
        <span v-if="errors.has('payouts_input_bank_routing_number')"
          class="form-help is-danger">
            {{ errors.first('payouts_input_bank_routing_number') }}
        </span>
      </div>

      <div class="PayoutsCredentials__buttons">
        <btn
          btn-class="submit"
          :btn-processing="processing"
          :btn-label="$t('global.submit')"
          class="PayoutsCredentials__buttons__submit-btn"
          @onclick="submit">
        </btn>
        <btn
          @onclick="cancel"
          btn-class="cancel"
          class="PayoutsCredentials__buttons__cancel-btn"
          :btn-label="$t('global.cancel')">
        </btn>
      </div>

      <div class="PayoutsCredentials__form-error">
        <div
          v-if="error"
          class="form-row form-help is-danger"
          data-cy="PayoutsCredentials__form-error">
          {{ error }}
        </div>
      </div>
    </form>
    <div v-if="!isEditMode">
      <div class="PayoutsCredentials__section-title">
        {{ $t('payouts.payouts_credentials')}}
      </div>
      <div class="PayoutsCredentials__section-row">
        <div class="PayoutsCredentials__section-row__label">
          {{ $t('payouts.iban') }}
        </div>
        <div class="PayoutsCredentials__section-row__value">
          {{ iban }}
        </div>
      </div>
      <div class="PayoutsCredentials__section-row">
        <div class="PayoutsCredentials__section-row__label">
          {{ $t('payouts.name') }}
        </div>
        <div class="PayoutsCredentials__section-row__value">
          {{ name }}
        </div>
      </div>
      <div class="PayoutsCredentials__section-row">
        <div class="PayoutsCredentials__section-row__label">
          {{ $t('payouts.address') }}
        </div>
        <div class="PayoutsCredentials__section-row__value">
          {{ address }}
        </div>
      </div>
      <div class="PayoutsCredentials__section-row">
        <div class="PayoutsCredentials__section-row__label">
          {{ $t('payouts.bank_name') }}
        </div>
        <div class="PayoutsCredentials__section-row__value">
          {{ bankName }}
        </div>
      </div>
      <div class="PayoutsCredentials__section-row">
        <div class="PayoutsCredentials__section-row__label">
          {{ $t('payouts.bank_address') }}
        </div>
        <div class="PayoutsCredentials__section-row__value">
          {{ bankAddress }}
        </div>
      </div>
      <div class="PayoutsCredentials__section-row">
        <div class="PayoutsCredentials__section-row__label">
          {{ $t('payouts.bank_swift_code') }}
        </div>
        <div class="PayoutsCredentials__section-row__value">
          {{ bankSwiftCode }}
        </div>
      </div>
      <div class="PayoutsCredentials__section-row">
        <div class="PayoutsCredentials__section-row__label">
          {{ $t('payouts.bank_routing_number') }}
        </div>
        <div class="PayoutsCredentials__section-row__value">
          {{ bankRoutingNumber }}
        </div>
      </div>

      <div class="PayoutsCredentials__buttons">
        <btn
          btn-class="submit"
          :btn-label="$t('global.edit')"
          class="PayoutsCredentials__buttons__edit-btn"
          @onclick="edit">
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('payouts');
const editableFieldModel = (field, name) => ({
  get() {
    return this.editablePayoutsCredentials[field];
  },
  set(value) {
    this.setEditablePayoutsCredentialsField({ field, value });
  }
});

export default {
  name: 'PayoutsCredentials',

  inject: ['$validator'],

  components: {},

  data() {
    return {
      isEditMode: false,
      error: null,
      processing: false
    };
  },

  async beforeMount() {
    await this.fetchPayoutsCredentials();
    this.setEditablePayoutsCredentials();
  },

  computed: {
    ...mapGetters(['editablePayoutsCredentials']),
    iban: editableFieldModel('iban'),
    name: editableFieldModel('name'),
    address: editableFieldModel('address'),
    bankName: editableFieldModel('bankName'),
    bankAddress: editableFieldModel('bankAddress'),
    bankSwiftCode: editableFieldModel('bankSwiftCode'),
    bankRoutingNumber: editableFieldModel('bankRoutingNumber')
  },

  methods: {
    ...mapActions([
      'fetchPayoutsCredentials',
      'updatePayoutsCredentials'
    ]),
    ...mapMutations([
      'setEditablePayoutsCredentials',
      'setEditablePayoutsCredentialsField',
      'resetEditablePayoutsCredentials'
    ]),
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.updatePayoutsCredentials()
            .then(({ error }) => {
              if (error) {
                this.error = error;
              } else {
                this.isEditMode = false;
              }
            })
            .finally(() => {
              this.processing = false;
            });
        }
      });
    },
    edit() {
      this.isEditMode = true;
    },
    cancel() {
      this.resetEditablePayoutsCredentials();
      this.isEditMode = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "payouts-credentials.scss";
</style>
