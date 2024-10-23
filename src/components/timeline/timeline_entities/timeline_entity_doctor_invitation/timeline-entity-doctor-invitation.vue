<template>
  <div class="TimelineEntityDoctorInvitation__wrapper">

    <div class="TimelineEntityDoctorInvitation__header">
      <div class="TimelineEntityDoctorInvitation__header-col">
        <div class="TimelineEntityDoctorInvitation__specialist-card">
          <div
            class="TimelineEntityDoctorInvitation__specialist-card-avatar"
            :style="specialistAvatar"></div>
          <div class="TimelineEntityDoctorInvitation__specialist-card-info">
            <div class="TimelineEntityDoctorInvitation__specialist-card-name">
              {{ entity.specialist.firstName }} {{ entity.specialist.lastName }}
            </div>
            <div class="TimelineEntityDoctorInvitation__specialist-card-role">
              {{ specialistRole }}
            </div>
          </div>
        </div>
      </div>
      <div class="TimelineEntityDoctorInvitation__header-col">
        <div class="TimelineEntityDoctorInvitation__title">
          {{ $t('call_room.invitation_sent') }}
        </div>
        <div class="TimelineEntityDoctorInvitation__time">
          {{ entity.timestamp | moment('YYYY/MM/DD hh:mm A') }}
        </div>
      </div>
    </div>

    <div class="TimelineEntityDoctorInvitation__invitations">
      <div class="TimelineEntityDoctorInvitation__section-title">
        {{ $t('global.details') }}
      </div>
      <div
        class="TimelineEntityDoctorInvitation__invitation">
        <div class="form-row--cols">
          <div class="form-col TimelineEntityDoctorInvitation__invitation-details-label">
            {{ $t('global.category') }}
          </div>
          <div
            class="form-col TimelineEntityDoctorInvitation__invitation-details-value"
            v-html="medicalCategory ? medicalCategory.name : '&mdash;'">
          </div>
        </div>
        <div class="form-row--cols">
          <div class="form-col TimelineEntityDoctorInvitation__invitation-details-label">
            {{ $t('global.speciality') }}
          </div>
          <div
            class="form-col TimelineEntityDoctorInvitation__invitation-details-value"
            v-html="medicalSpeciality ? medicalSpeciality.name : '&mdash;'">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { USER_ROLE } from '@/constants';
import api from '@/api';
import { decode } from '@/utils/proto';
import categoryHelper from '@/utils/categoryHelper';

export default {
  name: 'TimelineEntityDoctorInvitation',

  props: {
    entity: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      medicalCategory: null,
      medicalSpeciality: null
    };
  },

  computed: {
    ...mapGetters('medicalCategories', ['medicalCategories']),
    specialistRole() {
      return this.$t(`user_roles.${USER_ROLE[this.entity.specialist.type]}`);
    },
    specialistAvatar() {
      return {'background-image': `url(${this.entity.specialist.avatarUrl})`};
    }
  },

  beforeMount() {
    this.assignCategories();
  },

  methods: {
    ...mapMutations('patientTimeline', ['setOpenedForm', 'setEditableEntity']),
    edit() {
      this.setEditableEntity(this.entity);
      this.setOpenedForm('invite-specialist');
    },
    async assignCategories() {
      this.medicalSpeciality = categoryHelper.findSpeciality(
        this.medicalCategories,
        this.entity.doctorInvitation.medicalCategoryId
      );
      this.medicalCategory = this.medicalCategories.find(
        c => c.id === this.medicalSpeciality.parentCategoryId
      );
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-doctor-invitation.scss";
</style>
