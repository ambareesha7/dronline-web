<template>
  <div
    class="PatientBasicInfo__wrapper shaded-outline"
    data-cy="PatientBasicInfo__view">
    <transition
      appear
      name="appear-from-bottom"
      mode="out-in">
      <div class="PatientBasicInfo__col">
        <div
          class="PatientBasicInfo__avatar"
          :style="avatarStyle">
        <i v-if="basicInfo.isInsured"
          class="icon_is-insured-badge-big
          PatientBasicInfo__avatar__is-insured-badge"
        />
        </div>
        <div class="PatientBasicInfo__full-name">
          {{ fullName }}
        </div>
        <div class="PatientBasicInfo__joined">
          {{ $t('profile.joined_on', [joinedDate]) }}
        </div>
      </div>
    </transition>
    <transition
      appear
      name="appear-from-right"
      mode="out-in">
      <div class="PatientBasicInfo__col">
        <div class="PatientBasicInfo__block">
          <div class="PatientBasicInfo__block-title">
            {{ $t('profile.personal_info') }}
          </div>
          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.gender') }}
            </div>
            <div class="PatientBasicInfo__block-value">
              {{ translatedGender }}
            </div>
          </div>

          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.first_name') }}
            </div>
            <div class="PatientBasicInfo__block-value">
              {{ basicInfo.firstName }}
            </div>
          </div>

          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.last_name') }}
            </div>
            <div class="PatientBasicInfo__block-value">
              {{ basicInfo.lastName }}
            </div>
          </div>

          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.dob') }}
            </div>
            <div class="PatientBasicInfo__block-value">
              {{ dateOfBirth }} ({{ age }})
            </div>
          </div>
        </div>

        <div
          class="PatientBasicInfo__block"
          v-if="insurance">
          <div class="PatientBasicInfo__block-title">
            {{ $t('global.health_insurance') }}
          </div>
          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.insurance_provider') }}
            </div>
            <div
              class="PatientBasicInfo__block-value"
              v-html="insurance.provider.name">
            </div>
          </div>
          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.insurance_policy_number') }}
            </div>
            <div
              class="PatientBasicInfo__block-value"
              v-html="insurance.memberId">
            </div>
          </div>
        </div>

        <div
          class="PatientBasicInfo__block"
          v-if="address">
          <div class="PatientBasicInfo__block-title">
            {{ $t('global.address') }}
          </div>
          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.city') }}
            </div>
            <div
              class="PatientBasicInfo__block-value"
              v-html="address.city || '&mdash;'">
            </div>
          </div>
          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.street') }}
            </div>
            <div
              class="PatientBasicInfo__block-value"
              v-html="address.street || '&mdash;'">
            </div>
          </div>
          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.home_number') }}
            </div>
            <div
              class="PatientBasicInfo__block-value"
              v-html="address.homeNumber || '&mdash;'">
            </div>
          </div>
          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.postal_code') }}
            </div>
            <div
              class="PatientBasicInfo__block-value"
              v-html="address.zipCode || '&mdash;'">
            </div>
          </div>
          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ $t('global.country') }}
            </div>
            <div
              class="PatientBasicInfo__block-value"
              v-html="address.country || '&mdash;'">
            </div>
          </div>
        </div>

        <div
          class="PatientBasicInfo__block"
          v-if="children">
          <div class="PatientBasicInfo__block-title">
            {{ $t('profile.children') }}
          </div>
          <div
            class="PatientBasicInfo__block-row"
            v-for="(child, index) in children"
            :key="index">
            <div class="PatientBasicInfo__block-label">
              {{ child.gender }}
            </div>
            <div class="PatientBasicInfo__block-value">
              <router-link
                class="PatientBasicInfo__related-profile-link"
                :to="{
                name: 'patient',
                params: {
                  id: child.id
                },
                query: {
                  parentId: $route.params.id
                }
              }">
                {{ child.firstName }} {{ child.lastName }}
                <i class="icon-angle-right PatientBasicInfo__related-profile-link-icon"></i>
              </router-link>
            </div>
          </div>
        </div>

        <div
          class="PatientBasicInfo__block"
          v-if="adult">
          <div class="PatientBasicInfo__block-title">
            {{ $t('profile.parent') }}
          </div>
          <div class="PatientBasicInfo__block-row">
            <div class="PatientBasicInfo__block-label">
              {{ adult.gender }}
            </div>
            <div class="PatientBasicInfo__block-value">
              <router-link
                class="PatientBasicInfo__related-profile-link"
                :to="{
                name: 'patient',
                params: {
                  id: adult.id
                }
              }">
                {{ adult.firstName }} {{ adult.lastName }}
                <i class="icon-angle-right PatientBasicInfo__related-profile-link-icon"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GENDER } from '@/constants';

export default {
  name: 'PatientBasicInfo',
  props: {
    isAdult: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters('patient', [
      'address',
      'insurance',
      'basicInfo',
      'adult',
      'children'
    ]),
    gender() {
      return GENDER[this.basicInfo.gender];
    },
    translatedGender() {
      return this.$t(`gender.${this.gender}`);
    },
    dateOfBirth() {
      return this.basicInfo.birthDate ?
        this.$moment(
          this.basicInfo.birthDate.timestamp * 1000
        ).format('YYYY/MM/DD') :
        null;
    },
    age() {
      return this.basicInfo.birthDate ?
        this.$moment().diff(this.$moment(this.basicInfo.birthDate.timestamp * 1000), 'years') :
        0;
    },
    avatarStyle() {
      if (!this.basicInfo) return null;
      return { 'background-image': `url(${this.basicInfo.avatarUrl})` };
    },
    joinedDate() {
      if (!this.basicInfo) return null;
      return this.$moment(this.basicInfo.joinDate * 1000).format('YYYY/MM/DD hh:mm A');
    },
    fullName() {
      return this.basicInfo ? `${this.basicInfo.firstName} ${this.basicInfo.lastName}` : null;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-basic-info.scss";
</style>
