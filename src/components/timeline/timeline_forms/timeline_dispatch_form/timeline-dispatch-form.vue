<template>
  <transition
    name="appear-from-bottom"
    appear>
    <div class="TimelineDispatchForm__wrapper">
      <div class="TimelineDispatchForm__header">
        <div class="TimelineDispatchForm__title">
          <i class="icon_dispatch TimelineDispatchForm__title-icon"></i>
          {{ $t('call_room.dispatch_triage_unit_request') }}
        </div>
        <div
          class="TimelineDispatchForm__close"
          @click="close">
          <i class="icon-close"></i>
        </div>
      </div>

      <div class="TimelineDispatchForm__content custom-scrollbar-container">
        <div class="TimelineDispatchForm__address">
          <div class="title-uppercase">
            {{ $t('global.provide_patients_address') }}
          </div>

          <div class="TimelineDispatchForm__address-type">
            <radio
              v-model="addressType"
              label="default"
              name="type">
              {{ $t('timeline.default_address') }}
            </radio>
            <radio
              v-model="addressType"
              label="custom"
              name="type">
              {{ $t('timeline.custom_address') }}
            </radio>
            <radio
              v-model="addressType"
              label="gps"
              name="type">
              {{ $t('timeline.gps_tracker') }}
            </radio>
          </div>

          <transition
            name="fade"
            mode="out-in">
            <div
              v-if="addressType === 'gps'"
              key="map"
              class="TimelineDispatchForm__address-type-content">
              <address-map
                :location="patientLocation"
                @ongeocode="setAddressByLocation">
              </address-map>
            </div>

            <address-form
              v-else
              :key="addressType"
              class="TimelineDispatchForm__address-type-content"
              :readonly="addressType === 'default'"
              :address="form.address"
              @update="setAddress">
            </address-form>
          </transition>
        </div>
      </div>

      <div class="TimelineDispatchForm__footer">
        <div
          v-if="error"
          class="form-help is-danger TimelineDispatchForm__footer-error">
          {{ error }}
        </div>
        <div class="form-actions TimelineDispatchForm__footer-actions">
          <btn
            @onclick="close"
            btn-class="cancel"
            class="TimelineDispatchForm__cancel"
            :btn-label="$t('global.cancel')">
          </btn>

          <btn
            @onclick="submit"
            btn-class="blue-filled"
            class="TimelineDispatchForm__submit"
            :btn-label="editing ? $t('global.save') : $t('call_room.dispatch_triage_unit')"
            :btn-processing="processing">
          </btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { charsLeft } from '@/utils/filters';
import AddressForm from '@/components/form/address_form/address-form';
import AddressMap from '@/components/global/address_map/address-map';
import Radio from '@/components/global/radio/radio';

export default {
  name: 'TimelineDispatchForm',

  components: {
    AddressForm,
    AddressMap,
    Radio
  },

  props: {
    patientId: {
      required: true
    }
  },

  filters: {
    charsLeft
  },

  data() {
    return {
      form: {
        address: {}
      },
      locationAddress: {},
      editing: false,
      processing: false,
      addressType: 'default',
      error: null
    };
  },

  computed: {
    ...mapGetters('patientTimeline', [
      'editableEntity',
      'recordId'
    ]),
    ...mapGetters('patient', [
      'address'
    ]),
    ...mapGetters('call', [
      'patientLocation'
    ]),
    addressString() {
      const address = [
        'buildingNumber',
        'district',
        'additionalNumbers',
        'streetName',
        'city',
        'country',
        'postalCode'
      ]
        .map(part => (
          this.form.address[part]
        ))
        .filter(Boolean)
        .join(', ');
      return address;
    }
  },

  async mounted() {
    if (this.editableEntity) {
      this.editing = true;
      this.form.address = this.editableEntity;
    }
    await this.fetchPatientAddress(this.patientId);
    await this.fetchPatientLocation();
    this.form.address = {
      ...this.address,
      district: this.address.neighborhood,
      streetName: this.address.street,
      buildingNumber: this.address.homeNumber,
      postalCode: this.address.zipCode,
      country: 'United Arab Emirates',
      city: 'Dubai'
    };
  },

  beforeDestroy() {
    if (this.editableEntity) {
      this.setEditableEntity(null);
    }
  },

  methods: {
    ...mapMutations('patientTimeline', [
      'setOpenedForm',
      'setEditableEntity',
      'updateTimelineEntity'
    ]),
    ...mapActions('dispatches', [
      'requestDispatchToPatient'
    ]),
    ...mapActions('patient', [
      'fetchPatientAddress'
    ]),
    ...mapActions('call', [
      'fetchPatientLocation'
    ]),
    close() {
      this.setOpenedForm(null);
    },

    setAddress({ field, value }) {
      this.$set(this.form.address, field, value);
    },

    setAddressByLocation({ address_components }) {
      const components = {};
      address_components.forEach(v1 =>
        v1.types.forEach(v2 => {
          components[v2] = v1.long_name;
        })
      );
      this.locationAddress = {
        district: components.sublocality_level_1,
        streetName: components.route,
        buildingNumber: components.street_number,
        postalCode: components.postal_code,
        country: components.country, // 'United Arab Emirates',
        city: components.locality // 'Dubai'
      };
    },

    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.requestDispatchToPatient({
            patientId: this.patientId,
            recordId: this.recordId,
            patientLocation: {
              address: this.addressType === 'gps' ? this.locationAddress : this.form.address
            }
          }).then(({ error }) => {
            this.processing = false;
            if (error) {
              this.error = error;
              if (error === 'dispatch_already_requested') {
                this.$toastr.e(this.$t('global.dispatch_already_requested'));
                this.close();
              }
            } else {
              this.close();
              this.$toastr.s('Triage unit successfully dispatched.');
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "timeline-dispatch-form.scss";
</style>
