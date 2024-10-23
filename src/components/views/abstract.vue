<template>
  <transition
    appear
    :name="$route.meta.appearance"
    mode="out-in">
    <router-view :key="$route.name"/>
  </transition>
</template>
