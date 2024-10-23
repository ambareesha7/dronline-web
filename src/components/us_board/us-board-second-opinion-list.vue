<template>
  <div>

    <div class="USBoardSecondOpinion__title" v-if="visits.length > 0">
      <div class="title">Scheduled Video Calls Consultation ({{ visits.length }})</div>
    </div>

    <div class="USBoardSecondOpinion__video-calls" v-if="visits.length > 0">
      <dashboard-scheduled-visits-visit v-for="(visit, index) in visits" v-if="visit.type && visit.type === 2" :key="index" :visit="visit" :perspective="'doctor'" :now="now"/>
    </div>

    <div class="USBoardSecondOpinion__title">
      <div class="title">Second Opinions</div>
    </div>

    <div v-if="opinions.length">
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="div"
          class="USBoardSecondOpinion__content shaded-outline">
          <div v-for="(opinion, index) in opinions" v-if="opinion && opinion.status > 1" :key="index" class="USBoardSecondOpinion__item" :class="st[opinion.status]">
            
            <div class="USBoardSecondOpinion__patient">
              <img class="USBoardSecondOpinion__image" src="/static/images/man-default.svg"/>
              <div class="USBoardSecondOpinion__name">
                <span v-if="opinion.status > 4">{{ opinion.patient.firstName }} {{  opinion.patient.lastName }}</span>
                <span class="USBoardSecondOpinion__name-blur" v-else>Patient name</span>
                <div v-if="opinion.status > 4" class="USBoardSecondOpinion__email">{{ opinion.patient.email }}</div>
                <div class="USBoardSecondOpinion__name-blur" v-else>patient@email.com</div>
              </div>
            </div>
            
            <div class="USBoardSecondOpinion__status">
              <div class="USBoardSecondOpinion__status-tag" :class="st[opinion.status]">{{ $t(`us_board.${st[opinion.status]}`) }}</div>
            </div>

            <div class="USBoardSecondOpinion__status-details">
              <div class="USBoardSecondOpinion__time"></div>
              <div class="USBoardSecondOpinion__calendar" v-if="st[opinion.status] === 'call_scheduled'">
                <img class="USBoardSecondOpinion__calendar-img" src="/static/images/calendar-check-outline.svg"/>
              </div>
            </div>
            
            <div class="USBoardSecondOpinion__date">
              <div v-if="opinion.status === 4 && opinion.rejectedAt" class="USBoardSecondOpinion__text">{{ opinion.rejectedAt.timestamp | moment('DD.MM.YYYY') }}</div>
              <div v-else-if="opinion.acceptedAt" class="USBoardSecondOpinion__text">{{ opinion.acceptedAt.timestamp | moment('DD.MM.YYYY') }}</div>
            </div>
              
            <div class="USBoardSecondOpinion__details">
              <div class="USBoardSecondOpinion__details-btn btn-white ripple" v-if="['requested', 'assigned', 'cancelled', 'opinion_submitted'].includes(st[opinion.status])" :class="st[opinion.status]" @click="selectOpinion(opinion)">View request</div>
              <div class="USBoardSecondOpinion__details-btn btn-white ripple" v-if="st[opinion.status] === 'in_progress'" :class="st[opinion.status]" @click="selectOpinion(opinion)">Write opinion</div>
              <div class="USBoardSecondOpinion__details-btn btn-white ripple" v-if="['call_scheduled', 'done'].includes(st[opinion.status])" :class="st[opinion.status]" @click="selectOpinion(opinion)">Details</div>
            </div>

          </div>
        </transition-group>
    </div>
    <div
      v-else-if="initializing"
      class="table-initializing">
      <spinner></spinner>
    </div>
    <div
      v-else
      class="table-no-result">
      <div class="table-no-result-title">
        No Results
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import UsBoardSecondOpinionModal from '@/components/us_board/us_board_second_opinion_modal/us-board-second-opinion-modal';
import DashboardScheduledVisitsVisit from '@/components/dashboard/dashboard_scheduled_visits/dashboard_scheduled_visits_visit/dashboard-scheduled-visits-visit';


export default {
  name: 'UsBoardSecondOpinionList',

  data() {
    return {
      initializing: true,
      now: parseInt(new Date().getTime() / 1000, 0),
      st: {
        0: 'landingform',
        1: 'landingbooking',
        2: 'requested',
        3: 'assigned',
        4: 'rejected',
        5: 'in_progress',
        6: 'opinion_submitted',
        7: 'call_scheduled',
        8: 'done',
        9: 'cancelled'
      }
    };
  },

  components: {
    DashboardScheduledVisitsVisit
  },

  computed: {
    ...mapGetters('usboard', [
      'opinions'
    ]),
    ...mapGetters('visits', [
      'specialistVisits'
    ]),
    visits() {
      let visits = this.specialistVisits.visits.filter(visit => visit.type === 2);
      return visits
    }
  },

  mounted() {
    this.fetchScheduledVisits({type: 'pending', isGP: this.perspective === 'gp'});
    this.init();
  },

  beforeDestroy() {
    this.clearUSBoard2ndOpinions();
  },

  methods: {
    ...mapMutations('usboard', [
      'clearUSBoard2ndOpinions',
    ]),
    ...mapActions('usboard', [
      'fetchUSBoard2ndOpinions'
    ]),
    ...mapActions('visits', [
      'fetchScheduledVisits'
    ]),
    selectOpinion(opinion) {
      this.$modal.show(
        UsBoardSecondOpinionModal,
        {
          opinion: opinion
        },
        {
          name: 'us-board-second-opinion-modal',
          width: '90%',
          height: '90%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        }
      );
    },
    async init() {
      this.initializing = true;
      await this.fetchUSBoard2ndOpinions();
      this.initializing = false;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "us-board-second-opinion-list.scss";
</style>
<style lang="scss">
.USBoardSecondOpinion__video-calls {
    .table-body-cell {
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 16px;
      width: 40%;
      overflow: hidden;
      color: #000;
      font-size: 16px;
      .DashboardScheduledVisitsVisit__avatar {
        width: 40px;
        height: 40px;
        margin-right: 22px;
      }
      .icon-phone-call {
        width: 30px !important;
        height: 30px !important;
      }
      .btn-blue {
        font-size: 15px;
        font-weight: 600;
        height: 36px;
        width: 150px;
        border: 1px solid #4496e9;
      }
    }
    .table-body-cell:last-of-type {
      justify-content: flex-end;
      .btn-blue {
        border: 1px solid #e7e8e9;
      }
    }
  }
</style>
