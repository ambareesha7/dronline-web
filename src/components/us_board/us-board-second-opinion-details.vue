<template>
    <div class="USBoardSecondOpinionDetails__wrapper">

        <div class="USBoardSecondOpinionDetails__content" v-if="!initializing">

            <div class="USBoardSecondOpinionDetails__images">
                <img v-if="request_details.files.length" v-for="file in request_details.files"
                    :src="file.downloadUrl.includes('.pdf?') ? '/static/images/pdf.svg' : file.downloadUrl"
                    @click="openPreview(file.downloadUrl)" class="USBoardSecondOpinionDetails__files" />
            </div>

            <div class="USBoardSecondOpinionDetails__desc-title">Description</div>
            <pre class="USBoardSecondOpinionDetails__patient-details">{{ request_details.patientDescription }}</pre>

            <div class="USBoardSecondOpinionDetails__desc-title">Your opinion</div>

            <pre class="USBoardSecondOpinionDetails__patient-details">{{ request_details.specialistOpinion }}</pre>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import ImageViewer from '@/components/global/image_viewer/image-viewer';
const { mapActions, mapGetters } = createNamespacedHelpers('usboard');

export default {
    props: {
        details: {
            required: false,
            type: Object
        },
        request: {
            required: false,
            type: Object
        }
    },
    data() {
        return {
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
        ...mapGetters('call', [
            'callType'
        ]),
    },
    methods: {
        ...mapActions([
            'fetchUSBoard2ndOpinionByVisitId',
            'fetchUSBoard2ndOpinionDetails'
        ]),
        async init() {
            this.initializing = true

            if(this.details) {
                this.request_details = await this.fetchUSBoard2ndOpinionByVisitId(this.details.id);
            } else if(this.request) {
                this.request_details = await this.fetchUSBoard2ndOpinionDetails(this.request.id);
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
        }
    }
};
</script>
<style scoped lang="scss">
@import "us-board-second-opinion-details.scss";
</style>