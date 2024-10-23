<template>
  <div
    class="ProfileLocationEdit__wrapper"
    v-if="editableLocation">
    <location-autocomplete
      :saved-autocomplete-text="editableLocation.formattedAddress || null"
      v-on:place-changed="handlePlaceChange"
      :show-undo-button="true">
    </location-autocomplete>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FileUploader from '@/components/global/file_uploader/file-uploader';
import DatetimePicker from '@/components/global/datetime_picker/datetime-picker';
import PhoneNumberField from '@/components/global/phone_number_field/phone-number-field';
import LocationAutocomplete from '@/components/global/location_autocomplete/location-autocomplete';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('profile');

export default {
  name: 'ProfileLocationEdit',

  components: {
    LocationAutocomplete
  },

  inject: ['$validator'],

  data() {
    return {};
  },

  computed: {
    ...mapGetters(['location', 'editableLocation'])
  },

  async beforeMount() {
    await this.fetchLocation();
    this.setEditableLocation();
  },

  beforeDestroy() {
    this.resetEditableBasicInfo();
  },

  methods: {
    ...mapActions([
      'fetchLocation'
    ]),
    ...mapMutations([
      'setEditableLocation',
      'replaceEditableLocation',
      'setEditableLocationField'
    ]),
    handlePlaceChange(result) {
      this.replaceEditableLocation(result);
    }
  }
};
</script>
<style scoped lang="scss">
@import "profile-location-edit.scss";
</style>
