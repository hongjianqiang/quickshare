<template>
  <div class="container">
    <span>哈哈</span>
    <input placeholder="请输入值" />
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="less" scoped>
@color: blue;

.container {
  input::placeholder {
    color: yellow;
  }

  display: flex;
  justify-content: center;
  span {
    background: @color;
  }
}
</style>
