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
  import { Breadcrumb } from '@/data-types'

  export default {
    data () {
      return {
        breadcrumb: new Breadcrumb()
      }
    },

    created () {
      this.setBreadcrumb()
    },

    methods: {
      setBreadcrumb () {
        const { path } = this.$route
        console.log(path)
      }
    }
  }
</script>
