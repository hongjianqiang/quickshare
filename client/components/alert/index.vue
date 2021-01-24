<template>
  <div class="rel">
    <div class="abs alert" :style="`z-index: ${$zIndex}`">
      警告
    </div>
  </div>
</template>

<style lang="less" scoped>
  .alert {
    color: red;
    font-size: 1rem;
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>