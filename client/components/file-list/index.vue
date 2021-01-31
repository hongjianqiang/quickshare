<template>
  <div class="file-list">
    <div class="head">
      <input type="checkbox" class="m-r-8">
      <span>文件名</span>
      <span>大小</span>
      <span>修改日期</span>
    </div>
    <div class="body">
      <div class="row" v-for="(item, index) of value" :key="index">
        <input type="checkbox" class="m-r-8">
        <div class="file-name">
          <div>{{item.filename}}</div>
          <div class="info m-t-4">
            <span>{{item.lastModifiedDate}}</span>
          </div>
        </div>
        <div class="size">
          <span v-if="item.isFile">{{item.size | fmtBytes}}</span>
          <span v-else>--</span>
        </div>
        <div class="modify-date">
          <span>{{item.lastModifiedDate}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: () => []
      }
    },

    filters: {
      fmtBytes (bytes, decimals = 2) {
        if (0 === +bytes) return '0 Bytes'

        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes)/Math.log(k))

        return `${parseFloat((bytes/Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
      }
    }
  }
</script>

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