<template>
  <div class="rel" v-show="visible">
    <div class="fixed modal" :style="`z-index: ${$zIndex}`">
      <div class="fixed box">
        <div class="header">
          <div class="title">{{title}}</div>
          <i class="iconfont iconclose cp" @click="onClose"></i>
        </div>
        <div class="content">{{content}}</div>
        <div class="bottom">
          <v-button>确定</v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
    },
    data () {
      return {
        visible: true
      }
    },
    methods: {
      onClose () {
        this.visible = false
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
    background-color: fade(@black, @disabled-opacity * 100);
  }
  .box {
    background: @white;
    border-radius: @border-radius-md;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    min-width: 3rem;
    max-width: 4rem;

    .header {
      padding: @padding-sm @padding-md;
      font-size: @font-size-lg;
      color: @text-color;
      display: flex;
      justify-content: space-between;
    }
    .content {
      padding: @padding-sm @padding-md;
      font-size: @font-size-md;
      color: @text-color;
    }
    .bottom {
      padding: @padding-sm @padding-md;
      text-align: right;
    }
  }
</style>