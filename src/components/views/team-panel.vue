<template>
  <div class="Team__wrapper">
    <div class="content" :class="{ banner: status && status.banner }" v-if="allowed">
      <div class="content-inner">
        <div class="Team__header">
          <div class="title">{{ $t('teams.manage_your_team') }}</div>
        </div>
        <div class="Team__content shaded-outline" v-if="!status.banner">
          <div class="Team__section">
            <div v-if="isAdmin" class="team-stats">
              <h2>{{ $t('teams.your_team_statistics') }}</h2>
              <encounters-stats class="Team__encounters-stats" :stats="teamStats" />
            </div>

            <div v-if="isAdmin" class="team-details">
              <form class="add-member">
                <h2>{{ $t('teams.add_new_team_members') }}</h2>

                <div class="form-row">
                  <input
                    id="email"
                    name="email"
                    v-model="specialistToAdd.email"
                    class="form-field"
                    :class="{
                      'filled': specialistToAdd.email,
                      'is-danger': errors.has('email')
                    }"
                    v-validate="'required'"
                    data-vv-delay="500"
                    :data-vv-as="$t('global.password')"
                  />
                  <label
                    for="email"
                    class="form-label label-inner">
                    {{ $t('global.email_address') }}
                  </label>
                </div>

                <div class="form-row">
                  <input
                    name="specialist_type"
                    v-model="specialistToAdd.type"
                    class="form-hidden-validator form-field"
                    v-validate="'required'"
                    data-vv-delay="500"
                    :data-vv-as="$t('teams.account_type')"/>
                  <multiselect
                    v-model="specialistToAdd.type"
                    :class="{
                      'not-selected': !specialistToAdd.type,
                      'is-danger': errors.has('specialist_type')
                    }"
                    :options="specialistTypeOptions"
                    :placeholder="$t('teams.account_type')"
                    :searchable="false"
                  >
                    <i
                      class="icon-caret multiselect-caret"
                      slot="caret"
                      slot-scope="{ toggle }"
                      @mousedown.prevent.stop="toggle"
                    />
                  </multiselect>
                </div>
                <button
                  type="button"
                  :disabled="errors.has('email') || errors.has('specialist_type')"
                  class="btn-white add-member__button"
                  @click="addMember()"
                >{{ $t('teams.add_to_team') }}</button>
              </form>

              <form class="set-location">
                <h2>{{ $t('teams.set_clinic_location') }}</h2>

                <div class="form-row">
                  <location-autocomplete
                    :saved-autocomplete-text="this.formattedAddress"
                    v-on:place-changed="changeLocation"
                    :show-undo-button="true"
                  />
                </div>

                <button
                  type="button"
                  :disabled="!this.selectedAddress"
                  class="btn-white set-location__button"
                  @click="saveLocation()"
                >{{ $t('teams.save_location') }}</button>
              </form>

              <form class="set-branding">
                <h2>{{ $t('teams.name_and_logo') }}</h2>

                <div class="form-row">
                  <input
                    id="name"
                    name="name"
                    v-model="branding.name"
                    class="form-field"
                    :class="{
                      'filled': branding.name
                    }"
                    data-vv-delay="500"
                    :data-vv-as="$t('teams.name')"
                  />
                  <label for="name" class="form-label label-inner">{{ $t('teams.name') }}</label>
                </div>

                <div></div>

                <div class="form-row">

                  <div class="logo__section-content logo__office-photo-container">
                    <div 
                      class="logo__office-photo empty"
                      :class="{
                        empty: !avatarStyle
                      }"
                      :style="avatarStyle"
                    >
                    </div>
                    <div
                      class="logo__office-photo-tip"
                      v-html="$t('profile.office_logo')">
                    </div>
                    <div class="logo__office-photo-upload-container">
                      <file-uploader
                      :required="false"
                        class="logo__office-photo-upload"
                        @onupload="setAvatarFile"
                        :multiple="false">
                        <div
                          slot="toggle"
                          class="logo__office-photo-upload-toggle ripple">
                          {{ $t('global.upload') }}
                        </div>
                      </file-uploader>
                      <input
                        name="your_photo"
                        v-model="branding.logo"
                        class="form-hidden-validator form-field"
                        data-vv-delay="500"
                        :data-vv-as="$t('profile.your_photo')"
                        type="text"/>
                    </div>
                  </div>

                </div>

                <button
                  type="button"
                  class="btn-white set-location__button"
                  @click="setBranding()"
                >{{ $t('teams.save') }}</button>
              </form>
            </div>

            <div class="Team__members-list">
              <h2>{{ $t('teams.current_team_members') }}</h2>
              <table>
                <thead class="table-header">
                  <tr>
                    <th
                      class="table-head-cell table-head-cell--member"
                    >{{ $t('teams.team_member') }}</th>
                    <th
                      class="table-head-cell table-head-cell--stat"
                    >{{ $t('encounters_stats.scheduled') }}</th>
                    <th
                      class="table-head-cell table-head-cell--stat"
                    >{{ $t('encounters_stats.completed') }}</th>
                    <th
                      class="table-head-cell table-head-cell--stat"
                    >{{ $t('encounters_stats.canceled') }}</th>
                    <th
                      class="table-head-cell table-head-cell--stat"
                    >{{ $t('encounters_stats.pending') }}</th>
                    <th class="table-head-cell table-head-cell--actions">
                      {{ $t('teams.actions') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(member, index) in teamMembers" v-bind:key="index">
                    <td class="specialist-card-cell specialist-card-cell--member">
                      <specialist-card
                        :specialist="member.profile"
                        :show-admin="member.memberRole == 2"
                        :show-role="true"
                        :online="false"
                      ></specialist-card>
                    </td>
                    <td
                      class="specialist-card-cell specialist-card-cell--stat"
                    >{{ member.encountersStats.scheduled }}</td>
                    <td
                      class="specialist-card-cell specialist-card-cell--stat"
                    >{{ member.encountersStats.completed }}</td>
                    <td
                      class="specialist-card-cell specialist-card-cell--stat"
                    >{{ member.encountersStats.canceled }}</td>
                    <td
                      class="specialist-card-cell specialist-card-cell--stat"
                    >{{ member.encountersStats.pending }}</td>
                    <td v-if="isAdmin" class="specialist-card-cell specialist-card-cell--actions">
                      <button
                        class="action-button role-button btn-green-bordered"
                        @click="promoteToAdmin(member.profile.id)"
                        v-if="member.memberRole == 1 && isOwner"
                      >{{ $t('teams.make_admin') }}</button>
                      <button
                        class="action-button role-button btn-red-bordered"
                        @click="revokeAdmin(member.profile.id)"
                        v-if="member.memberRole == 2 && isOwner"
                      >{{ $t('teams.revoke_admin') }}</button>
                      <button
                        class="action-button icon-button btn-blue-bordered"
                        @click="viewCalendar(member.profile.id)"
                        :title="$t('teams.view_calendar')"
                      >
                        <i class="icon_view-calendar action-button-icon" />
                      </button>
                      <button
                        class="action-button icon-button btn-red-bordered"
                        @click="removeMember(
                          member.profile.id,
                          `${member.profile.firstName} ${member.profile.lastName}`
                        )"
                        :title="$t('global.remove')"
                      >
                        <i class="icon_delete-user action-button-icon" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>{{ $t('teams.permission_denied') }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EncountersStats from '@/components/global/encounters_stats/encounters-stats';
import { decode, encode } from '@/utils/proto';
import SpecialistCard from '@/components/global/specialist_card/specialist-card';
import LocationAutocomplete from '@/components/global/location_autocomplete/location-autocomplete';
import ConfirmModal from '@/components/global/confirm_modal/confirm-modal';
import FileUploader from '@/components/global/file_uploader/file-uploader';
import api from '@/api';

export default {
  name: 'Team',

  components: {
    SpecialistCard,
    LocationAutocomplete,
    EncountersStats,
    ConfirmModal,
    FileUploader
  },

  data() {
    return {
      teamMembers: [],
      teamStats: {},
      selectedCoordinates: null,
      selectedAddress: null,
      specialistTypeOptions: [
        'GP',
        'Nurse',
        'Specialist',
        'Office manager',
        'Front desk receptionist',
        'Surgical scheduler',
        'Billing services',
        'Medical assistant',
        'Nurse practitioner',
        'Physician assistant',
        'Dietician'
      ],
      specialistTypeValues: {
        GP: 1,
        Nurse: 2,
        Specialist: 3,
        'Office manager': 1,
        'Front desk receptionist': 1,
        'Surgical scheduler': 1,
        'Billing services': 1,
        'Medical assistant': 2,
        'Nurse practitioner': 2,
        'Physician assistant': 2,
        Dietician: 2
      },
      specialistToAdd: {
        email: '',
        type: null
      },
      branding: {
        name: '',
        logoUrl: '',
        logo: ''
      }
    };
  },

  methods: {
    ...mapActions('profile', ['uploadProfileImage']),
    ...mapActions('team', ['getTeamDetails']),
    async setAvatarFile(file) {
      const value = await this.uploadProfileImage(file);
      this.branding.logoUrl = value
    },
    removeMember(memberId, fullName) {
      this.$modal.show(
        ConfirmModal,
        {
          content: this.$t('teams.confirm_member_removal', {fullName}),
          confirm: () => this.doRemoveMember(memberId)
        },
        {
          name: 'confirm-modal',
          width: 387,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          clickToClose: true,
          transition: 'from-top-to-bottom'
        }
      );
    },
    doRemoveMember(memberId) {
      api.removeTeamMember(memberId)
        .then(_resp => {
          this.refreshMembers();
          this.$toastr.s(this.$t('teams.member_removed_notification'));
        })
        .catch(this.showServerError);
    },
    refreshMembers() {
      api.getTeamMembers()
        .then(data => {
          const response = decode('TeamMembersResponse', data);
          this.teamMembers = response.teamMembers;
        })
        .catch(this.showServerError);
    },
    fetchTeamStats() {
      api.getTeamStats()
        .then(data => {
          const response = decode('TeamEncountersStatsResponse', data);
          this.teamStats = response;
        })
        .catch(this.showServerError);
    },
    addMember() {
      this.$validator.validateAll().then(
        result => {
          if (result) {
            const accountTypeValue = this.specialistTypeValues[this.specialistToAdd.type];
            const payload = encode('AddMember', {
              specialistEmail: this.specialistToAdd.email,
              accountType: accountTypeValue
            });
            api.addTeamMember(payload)
              .then(_resp => {
                this.refreshMembers();
                this.$toastr.s(this.$t('teams.invitation_sent_notification'));
              })
              .catch(this.showServerError);
          }
        }
      );
    },
    changeLocation(params) {
      this.selectedCoordinates = params.coordinates;
      this.selectedAddress = params.formattedAddress;
    },
    saveLocation() {
      const coordinates = this.selectedCoordinates;
      const payload = encode('SetTeamLocation', {
        location: { lat: coordinates.lat, lon: coordinates.lon },
        formattedAddress: this.selectedAddress
      });

      api.setTeamLocation(payload)
        .then(_resp => {
          this.$toastr.s(this.$t('teams.location_set_notification'));
        })
        .catch(this.showServerError);
    },
    setBranding() {
      const payload = encode('SetBranding', {
        name: this.branding.name,
        logoUrl: this.branding.logoUrl
      });

      api.setTeamBranding(payload)
        .then(_resp => {
          this.$toastr.s(this.$t('teams.branding_set_notification'));
        })
        .catch(this.showServerError);
    },
    promoteToAdmin(specialistId) {
      const payload = encode('SetRole', {
        newRole: 2
      });

      api.setTeamMemberRole(specialistId, payload)
        .then(_resp => {
          this.refreshMembers();
        })
        .catch(this.showServerError);
    },
    revokeAdmin(specialistId) {
      const payload = encode('SetRole', {
        newRole: 1
      });

      api.setTeamMemberRole(specialistId, payload)
        .then(_resp => {
          this.refreshMembers();
        })
        .catch(this.showServerError);
    },
    roleText(roleId) {
      if (roleId === 2) {
        return this.$t('teams.admin');
      }
      return this.$t('teams.regular');
    },
    viewCalendar(specialistId) {
      const specialist = this.teamMembers
        .map(member => member.profile)
        .find(profile => profile.id === specialistId);
      const name = `${specialist.firstName} ${specialist.lastName}`;

      this.$router.push({
        name: 'availability',
        query: {
          specialist_id: specialistId,
          specialist_name: name
        }
      });
    },
    showServerError() {
      this.$toastr.e(this.$t('global.something_went_wrong'));
    }
  },

  computed: {
    avatarStyle() {
      if (!this.branding.logoUrl) return  {'background-image': `url(https://storage.googleapis.com/dronline-prod/images/placeholders/default_boy_avatar.png)`};
      return {'background-image': `url(${this.branding.logoUrl})`};
    },
    ...mapGetters('team', ['teamId', 'formattedAddress', 'isAdmin', 'isOwner', 'name', 'logoUrl']),
    ...mapGetters('profile', ['status']),
    allowed() {
      return this.teamId;
    }
  },

  async mounted() {

    this.refreshMembers();
    this.fetchTeamStats();
    await this.getTeamDetails();
    if (this.name) {
      this.branding.name = this.name;
    }
    if (this.logoUrl) {
      this.branding.logoUrl = this.logoUrl;
    }
  }
};
</script>

<style lang="scss">
.Team {
  &__wrapper {
    width: 100%;
    padding-left: 185px;
    transition: transform 0.16s ease-out, opacity 0.2s ease-out;
  }

  &__content {
    h2 {
      color: rgb(74, 74, 74);
      font-size: 20px;
      font-weight: 500;
      height: 26px;
      line-height: 26px;
      margin-bottom: 16px;
    }

    .team-details {
      display: flex;

      border-bottom: 2px solid rgb(245, 245, 245);
      margin-bottom: 16px;
      padding-bottom: 25px;
    }

    .add-member, .set-branding {
      width: 300px;

      .multiselect {
        &.not-selected .multiselect__single {
          color: #6d859e;
        }

        .multiselect__tags {
          padding: 17px 30px 10px 12px;
        }
      }
    }

    .add-member,
    .set-location,
    .set-branding {
      .form-row + .form-row {
        padding-top: 0;
      }
      .form-row {
        padding-bottom: 16px;
      }
      &__button {
        height: 48px;
      }
    }

    .set-location, .set-branding {
      width: 400px;
      margin-left: 48px;
    }

    .metric {
      div {
        margin-bottom: 10px;
        font-size: 1.15em;
      }
    }
  }

  &__title {
    color: #4a4a4a;
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 16px;
  }

  &__content {
    background: #fff;
    border-radius: 4px;
    padding: 24px;
  }

  &__encounters-stats {
    border-bottom: 2px solid rgb(245, 245, 245);
    margin: 16px 0;
    padding-bottom: 32px;
  }

  &__members-list {
    table {
      border: 1px;
      border-spacing: 0 6px;
      border-collapse: separate;
      width: 100%;

      tbody tr + tr {
        margin-top: 8px;
      }
      tbody tr {
        background: rgb(249, 249, 249);
        border-radius: 8px;
        height: 64px;
      }

      tr td:first-child {
        border-top-left-radius: 10px;
      }
      tr td:last-child {
        border-top-right-radius: 10px;
      }
      tr td:first-child {
        border-bottom-left-radius: 10px;
      }
      tr td:last-child {
        border-bottom-right-radius: 10px;
      }

      .table-head-cell {
        text-transform: none;
        height: 45px;
      }

      .specialist-card-cell {
        color: rgb(41, 41, 41);
      }

      .table-head-cell,
      .specialist-card-cell {
        padding: 0 10px;
      }

      .table-head-cell--member,
      .specialist-card-cell--member {
        padding-left: 20px;
      }

      .table-head-cell--specialist,
      .specialist-card-cell--specialist {
        width: 35%;
      }

      .table-head-cell--stat,
      .specialist-card-cell--stat {
        width: 10%;
        text-align: center;
      }

      .table-head-cell--actions,
      .specialist-card-cell--actions {
        width: 35%;
      }
    }

    .action-button {
      background: white;
    }
    .action-button + .action-button {
      margin-left: 12px;
    }

    .role-button {
      width: 130px;
      padding: 0 10px;
      height: 36px;
    }

    .icon-button {
      width: 36px;
      height: 36px;
      min-width: 0;
      padding: 0;
    }

    .action-button-icon {
      font-size: 18px;
    }

    td {
      padding: 10px 0;
      max-width: 400px;
      vertical-align: middle;
    }

    .SpecialistCard__categories {
      font-size: 13px !important;
      font-weight: 500;
    }
  }
}


.logo__office-photo-container {
  display: flex;
  align-items: center;
}
.logo__section-content {
    padding: 0;
    transition: opacity .2s ease-out;
}

.logo__office-photo {
    border: 1px solid transparent;
    border-radius: 50%;
    height: 72px;
    width: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #dbdbdb;
    position: relative;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
    margin-right: 12px;
}

.logo__office-photo-tip {
    color: #6d859e;
    font-size: 14px;
    letter-spacing: 0.23px;
    line-height: 18px;
}

.logo__office-photo-upload-toggle {
    width: 128px;
    height: 32px;
    border: 1px solid #E7E8E9;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4496E9;
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    cursor: pointer;
    margin-left: 12px;
}
.logo__office-photo.empty {
    border: 1px dashed #DADADA;
}
</style>
