<template>
  <transition
    appear
    name="appear-from-bottom"
    mode="out-in">
    <footer class="TheFooter__wrapper">
      <span>{{ $t('footer.rights_reserved') }}</span>
      <i18n
        path="footer.by_using_app_you_agree_with"
        tag="span">
        <router-link
          class="TheFooter__link"
          :to="{name: 'terms-and-conditions'}"
          v-html="$t('global.terms_and_conditions')">
        </router-link>
        <router-link
          class="TheFooter__link"
          :to="{ name: 'privacy-policy' }"
          v-html="$t('global.privacy_policy')">
        </router-link>
      </i18n>
      <a
        class="TheFooter__link"
        href="https://dronline.me">
        www.dronline.me
      </a>
      <br/>
      <span>
        <a
          class="TheFooter__contact"
          href="tel:+97144532722">
          +971 4 453 2722
        </a>
        <span>{{ $t('global.or') }}</span>
        <a
          class="TheFooter__contact"
          href="mailto:info@dronline.me">
          info@dronline.me
        </a>
      </span>
      <span>{{ $t('footer.our_office') }}</span>
    </footer>
  </transition>
</template>

<script>

export default {
  name: 'TheFooter'
};
</script>

<style scoped lang="scss">
@import "the-footer.scss";
</style>
