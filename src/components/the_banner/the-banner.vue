<template>
<transition appear name="appear-from-top" mode="out-in">
    <div class="TheBanner__wrapper">
        <div class="TheBanner__container" v-if="!status.onboardingCompleted" @click="bannerClick">
            <div class="TheBanner__step-circle-wrapper">
                <img src="/static/images/step-circle-pending.png" class="TheBanner__step-circle" />
            </div>
            <div class="TheBanner__text_wrapper">
                <div class="TheBanner__title">Set up your account</div>
                <div class="TheBanner__desc">You need to fill information forms to schedule visits.</div>
            </div>
        </div>

        <div class="TheBanner__container" v-else-if="status.approvalStatus === 1" @click="bannerClick">
            <div class="TheBanner__step-circle-wrapper">
                <img src="/static/images/step-circle.png" class="TheBanner__step-circle" />
            </div>
            <div class="TheBanner__text_wrapper">
                <div class="TheBanner__title">Verification in progress...</div>
                <div class="TheBanner__desc">You will get information when it will be done.</div>
            </div>
        </div>

    </div>
</transition>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'TheBanner',
    data() {
        return {
            banner: {
                stepsCompleted: 0
            }
        };
    },
    computed: {
        ...mapGetters('profile', ['status', 'basicInfo', 'bio', 'medicalCategories', 'medicalCredentials'])
    },
    methods: {
        ...mapActions('profile', ['fetchBasicInfo', 'fetchBio', 'fetchMedicalCategories', 'fetchMedicalCredentials']),
        bannerClick() {
            this.$router.push({name: 'registration'});
        }
    },
    async mounted() {
        //TODO This can be further improved if we can get completed steps as a integer from an endpoint. 
        // As of now we are checking if a value is present in each step to increament the completed step. 
        await Promise.all([this.fetchBasicInfo(), this.fetchBio(), this.fetchMedicalCategories(), this.fetchMedicalCredentials()]);

        if(this.basicInfo.firstName) {
           this.banner['stepsCompleted']++ 
        }

        if(this.bio.description) {
           this.banner['stepsCompleted']++ 
        }

        if(this.bio.education[0] && this.bio.education[0].endYear) {
           this.banner['stepsCompleted']++ 
        }

        if(this.bio.workExperience[0] && this.bio.workExperience[0].endYear) {
           this.banner['stepsCompleted']++ 
        }

        if(this.medicalCategories[0] && this.medicalCategories[0].speciality && this.medicalCredentials.boardCertificationUrl) {
           this.banner['stepsCompleted']++ 
        }

    }
};
</script>
<style lang="scss">
    @import "the-banner.scss";
</style>
<style>
.banner {
    padding-top: 160px;
    opacity: 0.5;
    pointer-events: none;
}
</style>
  