<template>
  <div class="dropdown-button">
    <v-button><slot></slot></v-button>
    <slot name="dropdown"></slot>
  </div>
</template>

<style lang="less" scoped>
  .dropdown-button {
    display: inline-block;
  }
</style>
