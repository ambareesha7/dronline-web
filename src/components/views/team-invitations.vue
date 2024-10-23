<template>
  <div class="TeamInvitations__wrapper">
    <div class="content" :class="{ banner: status && status.banner }" v-if="allowed">
      <div class="content-inner">
        <div class="Team__header">
          <div class="title">{{ $t('teams.invitations') }}</div>
        </div>
        <div class="TeamInvitations__content shaded-outline">
          <div v-for="invitation in invitations" :key="invitation.team_id" class="TeamInvitations__item">
            <span>{{ invitation.ownerProfile.firstName }} {{ invitation.ownerProfile.lastName }}'s team</span>
            <button @click="accept(invitation.teamId)" class="btn-white">
              Accept
            </button>
            <button @click="decline(invitation.teamId)" class="btn-white">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>{{ $t('teams.permission_denied') }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { decode, encode } from '@/utils/proto';
import api from '@/api';

export default {
  name: 'TeamInvitations',

  methods: {
    ...mapActions('team', ['fetchTeamDetails']),
    accept(teamId) {
      api.acceptTeamInvitation(teamId).then(_resp => {
        this.fetchTeamDetails().then(() =>
          this.$router.push({ name: 'team' })
        );
      });
    },
    decline(teamId) {
      api.declineTeamInvitation(teamId).then(_resp => {
        this.fetchTeamDetails().then(() =>
          this.$router.push({ path: '/' })
        );
      });
    },
    showServerError() {
      this.$toastr.e(this.$t('global.something_went_wrong'));
    }
  },

  computed: {
    ...mapGetters('team', ['invitations']),
    ...mapGetters('profile', ['status']),
    allowed() {
      return true;
    }
  },

  mounted() {
    this.refreshMembers();
    this.fetchTeamStats();
  }
};
</script>

<style lang="scss">
.TeamInvitations {
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
  }

  &__item {
    margin-top: 10px;
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
</style>
