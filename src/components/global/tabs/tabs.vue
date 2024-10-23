<template>
  <div class="Tabs__container">
    <div class="Tabs__tabs">
        <div v-for="tab in tabs"
            :key="tab.key"
            :class="{
              'Tabs__tab': true,
              'tab': true,
              'ripple': true,
              'active': activeTab === tab.key
            }"
            @click="setTab(tab.key)"
            :data-cy="`Tabs__${tab.key}`">
            <div class="Tabs__tab-label tab-label">
                {{ $t(`${tab.label}`) }}
            </div>
        </div>
    </div>
</div>
</template>


<script>
export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    }
  },
  methods: {
    setTab(activeTabKey) {
      this.$emit('change', activeTabKey);
    }
  }
};
</script>

<style lang="scss">
  @import 'tabs.scss';
</style>
