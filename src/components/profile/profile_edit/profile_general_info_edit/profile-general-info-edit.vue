<template>
  <div class="ProfileGeneralInfoEdit__wrapper">
    <div
      v-if="editableBasicInfo"
      class="ProfileGeneralInfoEdit__content">

      <file-uploader
        :required="false"
        class="ProfileGeneralInfoEdit__file-uploader"
        :class="{ unset: !avatarUrl }"
        @onupload="setAvatarFile"
        :multiple="false">
        <div slot="toggle">
          <div
            :style="avatarUrl"
            class="ProfileGeneralInfoEdit__avatar"
            :class="{'is-danger': errors.has('your_photo')}">
          </div>
          <div class="ProfileGeneralInfoEdit__avatar-upload-toggle">
            <i class="icon-camera ProfileGeneralInfoEdit__avatar-upload-toggle-icon"></i>
            <span
              class="ProfileGeneralInfoEdit__avatar-upload-toggle-label"
              v-html="$t('profile.change_your_profile_photo')"></span>
          </div>
        </div>
      </file-uploader>
      <input
        name="your_photo"
        v-model="editableBasicInfo.profileImageUrl"
        class="form-hidden-validator form-field"
        v-validate="'required'"
        data-vv-delay="500"
        :data-vv-as="$t('profile.your_photo')"
        type="text"/>
      <span
        v-if="errors.has('your_photo')"
        class="ProfileGeneralInfoEdit__profile-photo-upload-error form-help is-danger">
        {{ $t('profile.upload_your_photo') }}
      </span>

      <div class="ProfileGeneralInfoEdit__name">
        {{ name }}
      </div>
      <div class="ProfileGeneralInfoEdit__contacts">
        <span v-if="editableBasicInfo.phoneNumber">
          {{ editableBasicInfo.phoneNumber }},
        </span> {{ credentials.email }}
      </div>
      <div
        v-if="isDoctor && medicalCategories"
        class="ProfileGeneralInfoEdit__categories"
        v-html="categories">
      </div>
    </div>
    <div
      v-else
      class="ProfileGeneralInfoEdit__initializing">
      <spinner></spinner>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FileUploader from '@/components/global/file_uploader/file-uploader';

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('profile');

export default {
  name: 'SpecialistGeneralInfo',

  inject: ['$validator'],

  components: {
    FileUploader
  },

  computed: {
    ...mapGetters([
      'isDoctor',
      'editableBasicInfo',
      'medicalCategories',
      'credentials'
    ]),
    name() {
      return [
        this.editableBasicInfo.firstName,
        this.editableBasicInfo.lastName
      ]
        .filter(v => !!v)
        .join(' ');
    },
    categories() {
      return this.medicalCategories.map(
        ({ category, speciality }) => (speciality ? speciality.name : category.name)
      ).join(', ') || '&mdash;';
    },
    avatarUrl() {
      if (!this.editableBasicInfo || !this.editableBasicInfo.profileImageUrl) return null;
      return { 'background-image': `url(${this.editableBasicInfo.profileImageUrl})` };
    }
  },

  methods: {
    ...mapActions([
      'uploadProfileImage'
    ]),
    ...mapMutations([
      'setEditableBasicInfo',
      'setEditableBasicInfoField'
    ]),
    async setAvatarFile(file) {
      const value = await this.uploadProfileImage(file);
      this.setEditableBasicInfoField({
        field: 'profileImageUrl',
        value
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "profile-general-info-edit.scss";
</style>
