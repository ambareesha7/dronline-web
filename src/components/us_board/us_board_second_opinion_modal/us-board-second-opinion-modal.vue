<template>
  <div class="USBoardSecondOpinion__wrapper">
    <div class="USBoardSecondOpinion__header">

      <h2 class="USBoardSecondOpinion__header-title">
        {{ $t('us_board.incoming_opinion_request') }}
      </h2>
      <i
        class="icon-close USBoardSecondOpinion__header-close"
        @click="$emit('close')"></i>
    </div>

    <div class="USBoardSecondOpinion__content" v-if="!initializing">
      
      <div class="USBoardSecondOpinion__images">
        <img v-if="request_details.files.length" v-for="file in request_details.files" :src="file.downloadUrl.includes('.pdf?') ? '/static/images/pdf.svg' : file.downloadUrl" @click="openPreview(file.downloadUrl)" class="USBoardSecondOpinion__files"/>
      </div>

      <div class="USBoardSecondOpinion__desc-title">Description</div>
      <pre class="USBoardSecondOpinion__patient-details">{{ request_details.patientDescription }}</pre>

      <div class="USBoardSecondOpinion__desc-title" v-if="opinion.patient">Patient Info</div>
      
      <div class="USBoardSecondOpinion__patient" v-if="opinion.patient">
        <div class="USBoardSecondOpinion__patient-info">
          <div class="USBoardSecondOpinion__patient-info-label">Name</div>
          <div class="USBoardSecondOpinion__patient-info-value" v-if="opinion.status > 3">{{ opinion.patient.firstName }} {{ opinion.patient.lastName }}</div>
          <div class="USBoardSecondOpinion__patient-info-value__name-blur" v-else>Patient Name</div>  
        </div>
        
        <div class="USBoardSecondOpinion__patient-info" v-if="opinion.patient.gender">
          <div class="USBoardSecondOpinion__patient-info-label">Gender</div>
          <div class="USBoardSecondOpinion__patient-info-value">{{ gender[opinion.patient.gender] }}</div>
        </div>

        <div class="USBoardSecondOpinion__patient-info" v-if="opinion.patient.birthDate">
          <div class="USBoardSecondOpinion__patient-info-label">{{ $t('global.dob') }}</div>
          <div class="USBoardSecondOpinion__patient-info-value">{{ dateOfBirth }}</div>
        </div>
      </div>

      <div v-if="['done', 'in_progress', 'call_scheduled', 'opinion_submitted'].includes(st[opinion.status])" class="USBoardSecondOpinion__desc-title">Your opinion</div>

      <textarea
        v-if="st[opinion.status] === 'in_progress'"
        id="opinion"
        name="opinion"
        class="form-textarea USBoardSecondOpinion__specialist_opinion"
        v-model="specialist_opinion"
        v-validate="'required|max:1200'"
        data-vv-delay="500"
        placeholder="type here..."
        ref="opinion">
      </textarea>

      <pre v-if="['done', 'opinion_submitted', 'call_scheduled'].includes(st[opinion.status])" class="USBoardSecondOpinion__patient-details">{{ request_details.specialistOpinion }}</pre>

      <div class="USBoardSecondOpinion__action-btns">

        <button v-if="st[opinion.status] === 'assigned'" class="btn-white ripple USBoardSecondOpinion__action-btns-btn-reject" @click="reject(opinion.id);">Reject</button>
        <button v-if="st[opinion.status] === 'assigned'" class="btn-submit ripple USBoardSecondOpinion__action-btns-btn-accept" @click="accept(opinion.id);">Accept</button>
        
        <button v-if="st[opinion.status] === 'in_progress'" class="btn-white ripple USBoardSecondOpinion__action-btns-btn-save" @click="saveUSBoard2ndOpinion({ id: opinion.id, opinion: specialist_opinion }); $emit('close');">Save</button>
        <button v-if="st[opinion.status] === 'in_progress'" class="btn-submit ripple USBoardSecondOpinion__action-btns-btn-submit" @click="send({ id: opinion.id, opinion: specialist_opinion });">Send to Patient</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ImageViewer from '@/components/global/image_viewer/image-viewer';
import USBoardConfirmModal from '@/components/global/us_board_confirm_modal/us-board-confirm-modal';
import USBoardOpinionSendToPatientConfirmModal from '@/components/global/us_board_confirm_modal/us-board-opinion-send-to-patient-confirm-modal';
const { mapActions, mapMutations  } = createNamespacedHelpers('usboard');

export default {
  name: 'UsBoardSecondOpinionModal',
  props: {
    opinion: {
      type: Object,
      required: true
    }
  },

  components: {
    USBoardConfirmModal,
    USBoardOpinionSendToPatientConfirmModal
  },

  data() {
    return {
      gender: {
        0: 'Unknown',
        1: 'Male',
        2: 'Female',
        3: 'Other'
      },
      specialist_opinion: null,
      request_details: null,
      initializing: true,
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
  beforeMount() {
    this.init();
  },
  computed: {
    dateOfBirth() {
      if (!this.opinion.patient.birthDate) return null;
      const dob = this.$moment.utc(this.opinion.patient.birthDate.timestamp * 1000).format('YYYY/MM/DD');
      const age = this.$moment().diff((this.opinion.patient.birthDate.timestamp * 1000), 'years');
      return `${dob} (${age} yrs)`;
    },
  },
  methods: {
    ...mapMutations([
      'clearUSBoard2ndOpinions',
    ]),
    ...mapActions([
      'fetchUSBoard2ndOpinions',
      'acceptUSBoard2ndOpinion',
      'rejectUSBoard2ndOpinion',
      'fetchUSBoard2ndOpinionDetails',
      'updateUSBoard2ndOpinion',
      'saveUSBoard2ndOpinion'
    ]),
    async reject(id) {
      await this.rejectUSBoard2ndOpinion(id)
      this.clearUSBoard2ndOpinions();
      await this.fetchUSBoard2ndOpinions();
      this.$emit('close');
    },
    async accept(id) {
      await this.acceptUSBoard2ndOpinion(id)
      this.clearUSBoard2ndOpinions();
      await this.fetchUSBoard2ndOpinions();
      this.$emit('close');
    },
    async send(payload) {

      this.$modal.show(
        USBoardOpinionSendToPatientConfirmModal,
        {
          confirm: async () => {
            this.$modal.hide('us-board-opinion-send-to-patient-confirm-modal');
            const data = await this.updateUSBoard2ndOpinion(payload);
            this.$emit('close');
            
            if(data.response) {
              this.$modal.show(
                USBoardConfirmModal,
                {
                  name: 'us-board-confirm-modal',
                  width: 470,
                  height: 325,
                  pivotY: 0.3,
                  adaptive: true,
                  clickToClose: true,
                  transition: 'from-top-to-bottom'
                }
              );
            }
          }
        },
        {
          name: 'us-board-opinion-send-to-patient-confirm-modal',
          width: 470,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          clickToClose: false,
          transition: 'from-top-to-bottom'
        }
      );
    },
    async init() {
      this.initializing = true
      this.request_details = await this.fetchUSBoard2ndOpinionDetails(this.opinion.id);
      if(this.request_details.specialistOpinion) {
        this.specialist_opinion = this.request_details.specialistOpinion
      }
      this.initializing = false
    },
    openPreview(image_url) {
      if (!image_url) return;
      if (image_url.split('.').pop().toLowerCase() === 'pdf' || image_url.includes('.pdf')) {
          const win = window.open(image_url, '_blank');
          win.focus();
      } else {
          this.$modal.show(ImageViewer, {
          items: [image_url]
          }, {
          name: 'image-viewer',
          width: '100%',
          height: '100%',
          pivotY: 0.05,
          adaptive: true,
          clickToClose: true,
          classes: ['ImageViewer']
          });
      }
    },
  }
};
</script>
<style scoped lang="scss">
@import "us-board-second-opinion-modal.scss";
</style>
