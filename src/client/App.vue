<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Layout from './components/layout.vue'

@Component({
  components: { Layout }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  .cp { cursor: pointer; }

  .pl-8 { padding-left: 8px; }
  .pr-8 { padding-right: 8px; }
  .pt-8 { padding-top: 8px; }
  .pb-8 { padding-bottom: 8px; }

  .pl-16 { padding-left: 16px; }
  .pr-16 { padding-right: 16px; }
  .pt-16 { padding-top: 16px; }
  .pb-16 { padding-bottom: 16px; }

  .pl-24 { padding-left: 24px; }
  .pr-24 { padding-right: 24px; }
  .pt-24 { padding-top: 24px; }
  .pb-24 { padding-bottom: 24px; }

  .f-size-14 { font-size: 14px; }
  .f-size-16 { font-size: 16px; }
}
</style>
