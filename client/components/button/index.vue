<template>
  <button :class="`button ${type}`" @click="onClick"><slot></slot></button>
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
      onClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '@/styles/var.less';
  
  .button {
    // display: inline-block;
    border-radius: @border-radius-md;
    font-size: @font-size-md;
    padding: @padding-xs @padding-md;
    border-style: none;
    cursor: pointer;
    box-sizing: border-box;
  }

  .button:hover, .button:focus {
    outline: none;
    opacity: @active-opacity;
  }

  .primary {
    color: @white;
    background-color: @blue;
    border: 0.01rem solid @blue;
  }
  .plain {
    color: @blue;
    background-color: @white;
    border: 0.01rem solid @blue;
  }
</style>
