<template>
  <div class="file-list">
    <div class="head">
      <input type="checkbox" class="m-r-8">
      <span>文件名</span>
      <span>大小</span>
      <span>修改日期</span>
    </div>
    <div class="body">
      <div class="row" v-for="i of 5" :key="i">
        <input type="checkbox" class="m-r-8">
        <div class="file-name">
          <div>这是一个文件夹</div>
          <div class="info m-t-4">
            <span>2021-01-17 01:23:45</span>
          </div>
        </div>
        <div class="size">
          <span>12.34MB</span>
        </div>
        <div class="modify-date">
          <span>2021-01-17 01:23:45</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import "@/styles/var.less";

  .file-list {
    padding: 0 @padding-xs;
    input[type="checkbox"] {
      width: @font-size-md;
      height: @font-size-md;
      display: inline-block;
    }
    .head, .body .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: @font-size-md;
    }
    .head > span, .body .row > div  {
      flex: 1;
      text-align: center;
    }
    .head {
      border-bottom: 0.01rem solid @gray-3;
      padding-bottom: @padding-md;
      color: @gray-6;
    }
    .body .row {
      color: @gray-8;
      padding: @padding-md 0;
      border-bottom: 0.01rem solid @gray-3;
      .file-name .info { 
        color: @gray-6;
      }
    }
  }

  @media (max-width: 750px) {
    // 小屏幕
    .file-list {
      // background: red;
      .head { display: none; }
      .body .row {
        .file-name {
          text-align: left;
        }
        .modify-date {
          display: none;
        }
      }
    }
  }

  @media (min-width: 751px) {
    // 大屏幕
    .file-list {
      // background: green;
      .head { display: flex; }
      .body .row {
        .file-name .info {
          display: none;
        }
      }
    }
  }
</style>