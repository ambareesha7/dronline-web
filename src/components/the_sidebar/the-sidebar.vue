<template>
  <transition appear name="slide-left-to-right" mode="out-in" @after-enter="$emit('initialized')">
    <aside class="TheSidebar__wrapper shaded-outline">
      <nav class="TheSidebar__nav custom-scrollbar-container">
        <div class="TheSidebar__nav-item ripple" v-for="(item, index) in navItems" v-if="item.enabled" :key="index"
          :class="{
            'active':
              item.path === $route.name ||
              item.path === $route.meta.related
          }" @click="goTo(item.path)" :data-cy="`TheSidebar__nav-${item.name}`"
          v-bind="{ [`data-guide-target-${item.name}`]: '' }">
          <i :class="item.icon" class="TheSidebar__nav-item-icon"></i>
          <div class="TheSidebar__nav-item-label">
            {{ item.label }}
          </div>
        </div>
      </nav>

      <profile-menu></profile-menu>
    </aside>
  </transition>
</template>

<script>
import cookie from 'vue-cookie';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { decode } from '@/utils/proto';
import ProfileMenu from './profile_menu/profile-menu';
import api from '@/api';

export default {
  name: 'TheSidebar',

  components: {
    ProfileMenu
  },

  data() {
    return {
      items: [
        { name: 'dashboard', path: 'dashboard', icon: 'icon_dashboard', enabled: true },
        { name: 'my_calendar', path: 'availability', icon: 'icon_calendar', role: 'external', enabled: true },
        { name: 'emr', path: 'emr', icon: 'icon_emr', enabled: true },
        { name: 'tests', path: 'tests', icon: 'icon_tests', enabled: true },
        { name: 'medications', path: 'medications', icon: 'icon_medications', enabled: true },
        { name: 'procedures', path: 'procedures', icon: 'icon_medications', enabled: true },
        { name: 'membership', path: 'membership', icon: 'icon_star', role: 'external', enabled: true },
        { name: 'specialists', path: 'specialists', icon: 'icon_specialists', role: 'gp', enabled: true },
        { name: 'payouts', path: 'payouts', icon: 'icon_payouts', role: 'external', enabled: true },
        // { name: 'nurses', path: 'nurses', icon: 'icon_specialists', role: 'gp' }
      ]
    };
  },

  computed: {
    ...mapGetters('profile', [
      'role',
      'isExternalDoctor',
      'isGP'
    ]),
    ...mapGetters('membership', [
      'includesSilverFeatures',
      'includesGoldFeatures',
      'hasPlatinumFeatures'
    ]),
    ...mapGetters('team', [
      'teamId',
      'invitations'
    ]),

    navItems() {
      let items = this.items;
      items = this.filterByRole(items);
      if (this.isExternalDoctor) items = this.filterByMembership(items);

      if (this.teamId) {
        items.push({
          name: 'team',
          path: 'team',
          icon: 'icon_team',
          enabled: true
        });
      } else {
        items.push({
          name: 'create-team',
          path: 'create-team',
          icon: 'icon_team',
          enabled: true
        });
      }

      if (this.invitations.length > 1) {
        items.push({
          name: 'team-invitations',
          path: 'team-invitations',
          icon: 'icon_team',
          enabled: true
        });
      }

      if (cookie.get('usBoardUser')) {
        items.push({
          name: 'us-board-second-opinion',
          path: 'us-board-second-opinion',
          icon: 'icon_calendar',
          role: 'external',
          enabled: true
        })
      }

      return items.map(item => ({
        ...item,
        label: this.$t(`sidebar.${item.name}`)
      }));
    }
  },

  async beforeMount() {

    const checkIfPayoutsTabEnabled = await this.checkIfPayoutsTabEnabled();

    let vm = this

    for (let index = 0; index < vm.items.length; index++) {
      if (vm.items[index]['name'] === 'payouts') {
        vm.items[index]['enabled'] = checkIfPayoutsTabEnabled
      }
    }

    if (this.isExternalDoctor) this.fetchCurrentPackage();

    const response = await api.fetchMedicalCategories();

    const data = decode('specialist_profile.GetMedicalCategoriesResponse', response);

    for (let index = 0; index < data.medicalCategories.length; index++) {
      if ([8, 30].includes(data.medicalCategories[index].parentCategoryId)) {
        cookie.set('usBoardUser', true);
        this.setUSBoardUser(true)
        return
      }
    }

  },
  methods: {
    ...mapMutations('profile', [
      'setUSBoardUser'
    ]),
    ...mapActions('profile', [
      'checkIfPayoutsTabEnabled'
    ]),
    ...mapActions('membership', [
      'fetchCurrentPackage'
    ]),
    filterByRole(items) {
      return items.filter(item => (
        !item.role ||
        item.role.split('|').includes(this.role)
      ));
    },
    filterByMembership(items) {
      const suit = type => {
        switch (type) {
          case 'SILVER':
            return this.includesSilverFeatures;
          case 'GOLD':
            return this.includesGoldFeatures;
          case 'PLATINUM':
            return this.hasPlatinumFeatures;
          default:
            return true;
        }
      };
      return items.filter(item => (
        !item.membership ||
        suit(item.membership)
      ));
    },
    goTo(name) {
      this.$router.push({ name });
    }
  }
};
</script>

<style scoped lang="scss">
@import "the-sidebar.scss";
</style>
