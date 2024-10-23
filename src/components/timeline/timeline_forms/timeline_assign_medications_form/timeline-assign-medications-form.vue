<template>
  <transition name="appear-from-bottom" appear>
    <div class="TimelineAssignMedicationsForm__wrapper">
      <div class="TimelineAssignMedicationsForm__header">
        <div class="TimelineAssignMedicationsForm__title">
          <i class="icon_medications TimelineAssignMedicationsForm__title-icon"></i>
          {{ $t('call_room.assign_medications') }}
        </div>
        <div class="TimelineAssignMedicationsForm__close" @click="close">
          <i class="icon-close"></i>
        </div>
      </div>

      <div class="TimelineAssignMedicationsForm__content custom-scrollbar-container">
        <timeline-assign-medications-medication
          v-for="(medication, index) in form.medications"
          v-bind:key="medication.key"
          :index="index"
          :medication="medication"
          @remove="removeMedication(index)"
        ></timeline-assign-medications-medication>

        <div class="TimelineAssignMedicationsForm__add-new-medication" @click="addNewMedication">
          <i class="icon-plus TimelineAssignMedicationsForm__add-new-medication-icon"></i>
          {{ $t('call_room.add_new_medication') }}
        </div>

        <!-- <div class="TimelineAssignMedicationsForm__address">
          <div class="TimelineAssignMedicationsForm__address-header">
            <div class="TimelineAssignMedicationsForm__address-title">
              {{ $t('global.address') }}
            </div>

            <checkbox v-model="useCurrentLocation">
              {{ $t('call_room.use_current_location') }}
            </checkbox>

            <checkbox v-model="useDefaultLocation">
              {{ $t('call_room.use_default_location') }}
            </checkbox>
          </div>

          <div v-if="showAddressForm" class="TimelineAssignMedicationsForm__address-form">
            <div class="form-row">
              <input
                :class="{
                  'is-danger': errors.has('city'),
                  'filled': form.address.city
                }"
                id="city"
                name="city"
                class="form-field"
                type="text"
                v-model="form.address.city"
                v-validate="'required'"
                data-vv-delay="500"
                :data-vv-as="$t('global.city')"
                ref="city"
                @keyup.enter="$refs.street.focus()"
              />
              <label for="city" class="form-label label-inner">{{ $t('global.city') }}</label>
              <span
                v-show="errors.has('city')"
                class="form-help is-danger"
              >{{ errors.first('city') }}</span>
            </div>

            <div class="form-row">
              <input
                :class="{
                  'is-danger': errors.has('street'),
                  'filled': form.address.street
                }"
                id="street"
                name="street"
                class="form-field"
                type="text"
                v-model="form.address.street"
                v-validate="'required'"
                data-vv-delay="500"
                :data-vv-as="$t('global.street')"
                ref="street"
                @keyup.enter="$refs.home_number.focus()"
              />
              <label for="street" class="form-label label-inner">{{ $t('global.street') }}</label>
              <span
                v-show="errors.has('street')"
                class="form-help is-danger"
              >{{ errors.first('street') }}</span>
            </div>

            <div class="form-row">
              <input
                :class="{
                  'is-danger': errors.has('home_number'),
                  'filled': form.address.home_number
                }"
                id="home_number"
                name="home_number"
                class="form-field"
                type="text"
                v-model="form.address.home_number"
                v-validate="'required'"
                data-vv-delay="500"
                :data-vv-as="$t('global.home_number')"
                ref="home_number"
                @keyup.enter="$refs.postal_code.focus()"
              />
              <label for="home_number" class="form-label label-inner">
                {{ $t('global.home_number') }}
              </label>
              <span
                v-show="errors.has('home_number')"
                class="form-help is-danger"
              >{{ errors.first('home_number') }}</span>
            </div>

            <div class="form-row">
              <input
                :class="{
                  'is-danger': errors.has('postal_code'),
                  'filled': form.address.postal_code
                }"
                id="postal_code"
                name="postal_code"
                class="form-field"
                type="text"
                v-model="form.address.postal_code"
                v-validate="'required'"
                data-vv-delay="500"
                :data-vv-as="$t('global.postal_code')"
                ref="postal_code"
                @keyup.enter="$refs.country.$el.focus()"
              />
              <label for="postal_code" class="form-label label-inner">
                {{ $t('global.postal_code') }}
              </label>
              <span
                v-show="errors.has('postal_code')"
                class="form-help is-danger"
              >{{ errors.first('postal_code') }}</span>
            </div>

            <div class="form-row">
              <multiselect
                :class="{'is-danger': errors.has('country')}"
                v-model="form.address.country"
                :options="country_options"
                placeholder
                value="value"
                label="label"
                ref="country"
                v-validate="'required'"
                data-vv-name="country"
                :data-vv-as="$t('global.country')"
                data-vv-value-path="value"
              >
                <i
                  class="icon-caret multiselect-caret"
                  slot="caret"
                  slot-scope="{ toggle }"
                  @mousedown.prevent.stop="toggle"
                ></i>
              </multiselect>
              <input
                :class="{'filled': form.address.country}"
                class="form-hidden-validator form-field"
                type="text"
                :value="form.address.country"
              />
              <label
                class="form-label label-inner"
                @click="$refs.country.$el.focus()"
              >{{ $t('global.country') }}</label>
              <span
                v-show="errors.has('country')"
                class="form-help is-danger"
              >{{ errors.first('country') }}</span>
            </div>
          </div>
        </div> -->
      </div>

      <div class="TimelineAssignMedicationsForm__footer">
        <div
          v-if="error"
          class="form-help is-danger TimelineAssignMedicationsForm__footer-error"
        >{{ error }}</div>
        <div class="form-actions TimelineAssignMedicationsForm__footer-actions">
          <btn
            @onclick="close"
            btn-class="cancel"
            class="TimelineAssignMedicationsForm__cancel"
            :btn-label="$t('global.cancel')"
          ></btn>

          <btn
            @onclick="submit"
            btn-class="blue-filled"
            class="TimelineAssignMedicationsForm__submit"
            :btn-label="$t('global.save')"
            :btn-processing="processing"
          ></btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { encode } from '@/utils/proto';
import { createNamespacedHelpers } from 'vuex';
import Checkbox from '@/components/global/checkbox/checkbox';
import TimelineAssignMedicationsMedication from '@/components/timeline/timeline_forms/timeline_assign_medications_medication/timeline-assign-medications-medication';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
  'patientTimeline'
);
export default {
  name: 'TimelineAssignMedicationsForm',

  props: {
    patientId: {
      required: true
    }
  },

  components: {
    Checkbox,
    TimelineAssignMedicationsMedication
  },

  data() {
    return {
      country_options: ['Default country'],
      form: {
        type: 'assign-medications',
        use_current_location: false,
        use_default_location: false,
        address: {},
        medications: [{ key: 0 }]
      },
      processing: false,
      error: null,
      medicationsKey: 1
    };
  },

  computed: {
    useCurrentLocation: {
      get() {
        return this.form.use_current_location;
      },
      set(val) {
        this.form.use_current_location = val;
        if (val) this.form.use_default_location = false;
      }
    },

    useDefaultLocation: {
      get() {
        return this.form.use_default_location;
      },
      set(val) {
        this.form.use_default_location = val;
        if (val) this.form.use_current_location = false;
      }
    },

    showAddressForm() {
      return !this.useCurrentLocation && !this.useDefaultLocation;
    },
    ...mapGetters(['recordId'])
  },

  methods: {
    ...mapMutations(['setOpenedForm']),

    ...mapActions(['assignMedications']),

    close() {
      this.setOpenedForm(null);
    },

    addNewMedication() {
      this.medicationsKey = this.medicationsKey + 1;
      this.form.medications.push({ key: this.medicationsKey });
    },

    removeMedication(indexToRemove) {
      this.form.medications.splice(indexToRemove, 1);
    },

    async submit() {
      const isValid = await this.$validator.validateAll();

      if (isValid) {
        this.error = null;
        this.processing = true;

        if (this.form.use_current_location || this.form.use_default_location) {
          this.form.address = {
            city: 'Dubai',
            street: '1st Street',
            home_number: '12A',
            postal_code: '123',
            country: this.country_options[0]
          };
        }

        const requestBody = {
          patientId: this.patientId,
          recordId: this.recordId,
          items: this.form.medications.map(medication => ({
            name: medication.name,
            direction: medication.direction,
            quantity: medication.quantity,
            refills: medication.refills
          }))
        };

        const response = await this.assignMedications(requestBody);

        this.processing = false;

        if (response.error) {
          this.error = response.error;
          this.$toastr.e('Medications assignment error');
        } else {
          this.$toastr.s('Medications successfully assigned');
          this.close();
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "timeline-assign-medications-form.scss";
</style>
