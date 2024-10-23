<template>
    <div class="PatientAttachments__wrapper shaded-outline" :class="{ 'PatientAttachments__no-border': record_id }" v-if="!loading">
      <div class="PatientAttachments__header" v-if="!record_id">
        <div class="title-medium">
          {{ $t('global.attached_files') }}
        </div>
      </div>
      <div class="PatientAttachments__content" v-if="documents && documents.documentUrls && documents.documentUrls.length">
        <div class="PatientAttachments__images">
            <img v-for="file in documents.documentUrls" :src="file.includes('.pdf?') ? '/static/images/pdf.svg' : file" @click="openPreview(file)" class="PatientAttachments__files"/>
        </div>
      </div>
      <div v-else class="PatientAttachments__header">
        <div class="title-medium">
          {{ $t('global.no_attached_files') }}
        </div>
      </div>
    </div>
  </template>
  
<script>
import { mapGetters, mapActions } from 'vuex';
import ImageViewer from '@/components/global/image_viewer/image-viewer';
  
  export default {
    name: 'PatientAttachments',
    props: {
      record_id: {
        required: true
      }
    },
    data() {
      return {
        loading: true
      }
    },
    computed: {
      ...mapGetters('patientRecords', ['documents']),
    },
    mounted() {
      this.init();
    },
    methods: {
      ...mapActions('patientRecords', ['fetchPatientUploadedDocuments']),
      async init() {
        this.loading = true
        await this.fetchPatientUploadedDocuments(this.$route.params.id || this.record_id);
        this.loading = false
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
    @import "patient-attachments.scss";
  </style>
  