<template>
  <div class="Spinner">
    <div class="Spinner__container">
      <div class="Spinner__petal"
           v-for="petal in 12"
           :key="petal">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "spinner.scss";
</style>
