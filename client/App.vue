<template>
  <router-view></router-view>
</template>

<style lang="less">
@import 'normalize.css';
@import '@/styles/var.less';
@import '@/styles/common.less';

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
