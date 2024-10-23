<template>
  <div
    class="MainView__wrapper">
    <family-member-call-room
      v-if="callOpened && this.isInvitationLoaded"
      :family-member-name="familyMemberName"
    />
  </div>
</template>

<script>
import FamilyMemberCallRoom from '@/components/call/family_member_call_room/family-member-call-room';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'FamilyMemberCall',

  components: {
    FamilyMemberCallRoom
  },

  data: () => ({
    familyMemberName: '',
    isInvitationLoaded: false
  }),

  async mounted() {
    const result = await this.familyMemberInvitationCall({
      invitationId: this.$route.params.invitation_id
    });
    if (result.error) {
      this.$toastr.e('Something went wrong during call initialization.');
    } else {
      this.isInvitationLoaded = true;
      this.familyMemberName = result.response.invitation.name;
      this.setBasicInfo(result.response.patient);
    }
  },

  computed: {
    ...mapGetters('call', [
      'callOpened'
    ])
  },

  methods: {
    ...mapActions('call', [
      'familyMemberInvitationCall'
    ]),
    ...mapMutations('patient', [
      'setBasicInfo'
    ])
  }
};
</script>