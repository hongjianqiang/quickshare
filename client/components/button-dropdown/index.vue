<template>
  <div class="dropdown-button">
    <v-button @click="onClick"><slot></slot></v-button>
    <div class="dropdown" v-show="visible">
      <div class="items">
        <slot name="dropdown-item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    document.body.addEventListener('click', this.clickOverlay)
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.clickOverlay)
  },
  methods: {
    onClick() {
      this.visible = !this.visible
    },
    clickOverlay () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
  @import '@/style/var.less';

  .dropdown-button {
    display: inline-block;
    
    .dropdown {
      position: relative;
      .items {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: @margin-md;
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        border: 1px solid @gray-4;
        border-radius: @border-radius-md;
        box-shadow: 0 0.02rem 0.12rem 0 rgba(0,0,0,.1);
        overflow: hidden;
      }
      .items > * {
        font-size: @font-size-md;
        padding: @padding-sm @padding-md;
        cursor: pointer;
        color: @blue;
        background-color: @white;
      }
      .items > *:hover {
        background-color: @blue;
        color: @white;
      }
    }
  }
</style>
