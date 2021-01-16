<template>
  <div class="container">
    <v-button-dropdown>
      <span>上传</span>
      <v-button-upload slot="dropdown-item" multiple>上传文件</v-button-upload>
      <v-button-upload slot="dropdown-item" webkitdirectory>上传文件夹</v-button-upload>
      <v-button-upload slot="dropdown-item" :multiple="false">上传并解压</v-button-upload>
    </v-button-dropdown>
    <v-button type="plain">打包下载</v-button>
    <v-breadcrumb></v-breadcrumb>
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

* { box-sizing: border-box; }

body {
  font-size: 16px; /* 修正字体大小 */
  height: 100vh;
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
  padding: @padding-md;
  // border: 1px dashed @green;
}
</style>
