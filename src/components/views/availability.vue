<template>
  <div class="Availability__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <div class="Availability__title-container">
          <div class="title">
            <span v-if="teamMemberSelected()">
              {{ $t('calendar.availability') }} - {{ teamMemberName() }}
            </span>
            <span v-else>{{ $t('sidebar.your_availability') }}</span>
          </div>
          <encounters-stats size="small" :stats="specialistEncountersStats" />
        </div>

        <transition appear name="fade" mode="out-in">
          <div class="Availability__content">
            <availability-calendar day-start="00:00" day-end="24:00" />
            <encounters-list v-if="!status.banner" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import EncountersStats from '@/components/global/encounters_stats/encounters-stats';
import AvailabilityCalendar from '@/components/availability/availability_calendar/availability-calendar';
import EncountersList from '@/components/availability/encounters_list/encounters-list';

export default {
  name: 'Availability',

  components: {
    AvailabilityCalendar,
    EncountersList,
    EncountersStats
  },

  async beforeMount() {
    const specialistId = this.$route.query.specialist_id || null;
    this.fetchSpecialistEncountersStats(specialistId);
  },

  computed: {
    ...mapGetters('encounters', ['specialistEncountersStats']),
    ...mapGetters('team', ['isAdmin']),
    ...mapGetters('profile', ['status'])
  },

  methods: {
    teamMemberSelected() {
      return this.$route.query && this.$route.query.specialist_id;
    },
    teamMemberName() {
      return this.$route.query.specialist_name;
    },
    ...mapActions('encounters', ['fetchSpecialistEncountersStats'])
  }
};
</script>

<style lang="scss">
.Availability {
  &__wrapper {
    padding-left: 185px;
    transition: transform 0.16s ease-out, opacity 0.2s ease-out;

    .title {
      padding-bottom: 0;
    }
  }

  &__content {
    min-height: 480px;
    background-color: #ffffff;
    border-radius: 4px;
    transition: opacity 0.2s ease-out;
    transition-delay: 0.4s;
  }

  &__title-container {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  &__stats {
    float: right;
    flex-grow: 1;
    margin-left: 20px;
    background: white;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    margin-left: 20px;
    display: flex;
    justify-content: space-evenly;

    &__item {
      padding: 5px;

      &--completed {
        .Availability__stats__item__title {
          color: rgb(29, 198, 127);
        }
      }
      &--pending {
        .Availability__stats__item__title {
          color: rgb(68, 150, 233);
        }
      }
      &--scheduled {
        .Availability__stats__item__title {
          color: rgb(255, 178, 68);
        }
      }
      &--canceled {
        .Availability__stats__item__title {
          color: rgb(253, 108, 108);
        }
      }
      &__value {
        color: #4a4a4a;
        height: 18px;
        letter-spacing: 0.35px;
        width: 36px;
      }
    }
  }
}
</style>
