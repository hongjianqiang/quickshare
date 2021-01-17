<template>
  <div class="container">
    <v-group class="m-b-16">
      <v-button-dropdown slot="item" class="m-r-8">
        <span>上传</span>
        <v-button-upload slot="dropdown-item" multiple>上传文件</v-button-upload>
        <v-button-upload slot="dropdown-item" webkitdirectory>上传文件夹</v-button-upload>
        <v-button-upload slot="dropdown-item" :multiple="false">上传并解压</v-button-upload>
      </v-button-dropdown>
      <v-button type="plain" slot="item" class="m-r-8">打包下载</v-button>
      <v-button type="plain" slot="item">共享剪切板</v-button>
    </v-group>
    <v-breadcrumb class="m-b-16"></v-breadcrumb>
    <v-file-list></v-file-list>
  </div>
</template>

<script>
  export default {
    mounted () {
      console.log(this)
    }
  }
</script>

<style lang="less">
@import 'normalize.css';
@import '@/styles/var.less';

.generate-margin(32);
.generate-margin(@n, @i: 4) when (@i =< @n) {
  .m-t-@{i} { margin-top: (@i * 0.01rem); }
  .m-l-@{i} { margin-left: (@i * 0.01rem); }
  .m-b-@{i} { margin-bottom: (@i * 0.01rem); }
  .m-r-@{i} { margin-right: (@i * 0.01rem); }
  .generate-margin(@n, (@i + 4));
}

* { box-sizing: border-box; }

body {
  font-size: 16px; /* 修正字体大小 */
  height: 100vh;
  background-color: @gray-1;
  // border: 1px dashed @red;
}

noscript {
  display: block;
  border: 1px solid @red;
  background: @red;
  color: @white;
  padding: 10px;
  text-align: center;
}

.container {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  padding: @padding-xs;
  // border: 1px dashed @green;
}
</style>
