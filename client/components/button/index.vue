<template>
  <button :class="`button ${type}`" @click.stop="onClick"><slot></slot></button>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'primary'
      }
    },

    methods: {
      onClick () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '@/style/var.less';
  
  .button {
    border-radius: @border-radius-md;
    font-size: @font-size-md;
    padding: @padding-xs @padding-md;
    border-style: none;
    cursor: pointer;
  }

  .button:hover, .button:focus {
    outline: none;
    opacity: @active-opacity;
  }

  .primary {
    color: @white;
    background-color: @blue;
    border-color: @blue;
  }
</style>
