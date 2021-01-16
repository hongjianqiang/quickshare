<template>
  <div class="container">
    <v-dropdown-button>
      <span>上传</span>
      <div slot="dropdown">
        <span>上传文件</span>
        <span>上传文件夹</span>
        <span>上传并解压文件</span>
      </div>
    </v-dropdown-button>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="less">
@import 'normalize.css';
@import '@/style/var.less';

* { box-sizing: border-box; }

body {
  font-size: 16px; /* 修正字体大小 */
  height: 100vh;
  border: 1px dashed @red;
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
  border: 1px dashed @green;
}
</style>
