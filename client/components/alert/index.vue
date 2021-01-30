<template>
  <div class="rel">
    <div class="fixed modal" :style="`z-index: ${$zIndex}`">
      <div class="fixed box">
        <div class="header">
          <div class="title">标题名称</div>
          <div class="close"></div>
        </div>
        <div class="content">
          这是一段内容
        </div>
        <div class="bottom">
          <v-button>确定</v-button>
        </div>
      </div>
    </div>
  </div>
</template>

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