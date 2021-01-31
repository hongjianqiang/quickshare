<template>
  <div class="breadcrumb">
    <div class="scroll-wrap">
      <div class="breadcrumb__item">
        <span class="breadcrumb__inner active"><i class="iconfont iconhome"></i> 全部文件</span>
        <span class="breadcrumb__separator">/</span>
      </div>
      <div class="breadcrumb__item" v-for="i of 3" :key="i">
        <span class="breadcrumb__inner">Excel图表课程案例作业包</span>
        <span class="breadcrumb__separator">/</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import "@/styles/var.less";

  .breadcrumb::-webkit-scrollbar {
    width: @padding-xs;
    height: @padding-xs;
    background-color: transparent;
  }
  .breadcrumb:hover::-webkit-scrollbar-thumb {
    background-color: rgba(69, 90, 100, 0.2);
  }
  .breadcrumb::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: @padding-xs;
  }
  .breadcrumb {
    padding: @padding-xs;
    overflow-x: overlay;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    background: @gray-3;
    border-radius: @border-radius-md;
    .scroll-wrap {
      display: inline-flex;
    }
    .breadcrumb__item {
      display: inline-flex;
      align-items: center;
      font-size: @font-size-md;
      height: @font-size-lg;
      line-height: @font-size-lg;

      .breadcrumb__inner { 
        white-space: nowrap;
        color: @text-color;
      }
      .breadcrumb__inner.active {
        font-weight: bold;
      }

      .breadcrumb__separator {
        padding-left: @padding-xs;
        padding-right: @padding-xs;
        color: @gray-6;
      }
    }
  }
</style>