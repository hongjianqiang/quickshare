<template>
  <a class="button-upload"><slot></slot><input title="点击选择文件" multiple type="file"></a>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .button-upload {
    display: inline-block;
    position: relative;
    cursor: pointer;

    input[type="file"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
</style>