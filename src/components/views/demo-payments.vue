<template>
  <div class="DemoPayment__wrapper">
    <div class="DemoPayment__header shaded-outline">
      <div class="DemoPayment__header-logo-container">
        <img
          src="/static/images/logo.png"
          class="DemoPayment__header-logo" />
      </div>

      <h2 class="DemoPayment__header-title">
        {{ $t('membership.card_details') }}
      </h2>
      <i
        class="icon-close DemoPayment__header-close"
        @click="$router.push({ name: 'dashboard' })"></i>
    </div>

    <div class="DemoPayment__content">
      <div class="DemoPayment__demo-badge-container">
        <div class="badge-red">
          {{ $t('membership.demo') }}
        </div>
      </div>
      <div class="DemoPayment__description">
        When the app is released, here you will see options to pay for the chosen membership level.
      </div>
      <div class="DemoPayment__icon-container">
        <img
          class="DemoPayment__icon"
          src="/static/images/card.svg" />
      </div>

      <div class="form-row">
        <input
          name="card_holder"
          class="form-field filled"
          type="text"
          value="Jane Doe"
          readonly />
        <label
          for="card_holder"
          class="form-label label-inner">
          Card Holder Name
        </label>
      </div>

      <div class="form-row">
        <input
          name="card_number"
          class="form-field filled"
          type="text"
          value="4111 1111 1111 1111"
          readonly />
        <label
          for="card_number"
          class="form-label label-inner">
          Card Number
        </label>
      </div>

      <div class="form-row--cols">
        <div class="form-col">
          <input
            name="expiry_date"
            class="form-field filled"
            type="text"
            value="05/20"
            readonly />
          <label
            for="expiry_date"
            class="form-label label-inner">
            Expiry Date
          </label>
        </div>
        <div class="form-col">
          <input
            name="cvv"
            class="form-field filled"
            type="text"
            value="123"
            readonly />
          <label
            for="cvv"
            class="form-label label-inner">
            CVV
          </label>
        </div>
      </div>
    </div>

    <div class="DemoPayment__footer shaded-outline">
      <div class="DemoPayment__footer-content form-actions full">
        <btn
          @onclick="submit"
          btn-class="blue-filled"
          :btn-label="$t('global.confirm')">
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoPayment',
  methods: {
    submit() {
      window.location.href = this.$route.query.redirect_url;
    }
  }
};
</script>

<style lang="scss">
.DemoPayment {
  &__wrapper {
    height: 100vh;
    overflow-y: auto;
    background-color: #fff;
    transition: transform .16s ease-out, opacity .2s ease-out;

    & .form-field {
      color: #6d859e;
    }
  }

  &__header {
    height: 90px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 101;
    @media (max-width: 768px) {
      display: none;
    }

    &-logo {
      height: 26px;
      &-container {
        position: absolute;
        left: 24px;
      }
    }

    &-title {
      color: #4A4A4A;
      font-size: 20px;
      font-weight: 500;
      line-height: 26px;
    }

    &-close {
      color: #4a4a4a;
      cursor: pointer;
      font-size: 14px;
      position: absolute;
      right: 24px;
    }
  }

  &__content {
    margin: 130px auto 130px auto;
    max-width: calc(100% - 18px);
    width: 346px;
  }

  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: 101;
    padding: 0 16px;

    &-content {
      width: 470px;
      margin: 0;
    }
  }

  &__icon {
    width: 188px;
    height: 188px;

    &-container {
      display: flex;
      justify-content: center;
      margin-bottom: 32px;
    }
  }

  &__demo-badge-container {
    display: flex;
    justify-content: center;
  }

  &__description {
    font-size: 13px;
    text-align: center;
    color: #ed4856;
    padding: 15px 0 32px 0;
  }
}
</style>
