<template>
  <div class="rel" v-show="visible">
    <div class="fixed modal" :style="`z-index: ${$zIndex}`">
      <div class="loading iconfont iconloading"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '@/styles/var.less';

  .modal {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: fade(@white, @active-opacity * 100);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading {
    font-size: @font-size-lg * 2.5;
    animation: loading 1s linear infinite;
  }

  @keyframes loading {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
