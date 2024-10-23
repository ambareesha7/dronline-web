<template>
  <div class="Team__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <div class="Team__header">
          <div class="title">
            Create a new team
          </div>
        </div>
        <div class="Team__content shaded-outline">
          <p class="intro">
            If you represent a hospital, a clinic, or a team of specialists,
            you can gather them all in a team.
          </p>

          <button class="btn-white" @click="createTeam()">Create a new team</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/api';

export default {
  name: 'Team',

  components: {
  },

  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
  methods: {
    ...mapActions('team', [
      'fetchTeamDetails'
    ]),
    createTeam(memberId) {
      api.createTeam().then(_resp => {
        this.fetchTeamDetails().then(() => {
          this.$router.push({ name: 'team' });
        });
      });
    }
  }
};
</script>

<style lang="scss">
.Team {
  &__wrapper {
    width: 100%;
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    .intro {
      margin-bottom: 30px;
    }
  }

  &__title {
    color: #4A4A4A;
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 16px;
  }

  &__content {
    background: #fff;
    border-radius: 4px;
    padding: 30px;
  }

  &__members-list {
    table {
      border: 1px;
    }

    .remove-button {
      width: 100px;
      min-width: 100px;
    }

    td {
      padding: 10px 0;
      max-width: 300px;
      vertical-align: middle;
    }
  }
}
</style>
