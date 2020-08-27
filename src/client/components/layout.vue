<template>
  <div class="layout">
    <el-breadcrumb separator="/" class="pl-24 pr-24 pt-24 breadcrumb">
      <el-breadcrumb-item v-for="p of pathname" :key="p.path">
        <el-link :href="p.path || '/'" class="cp f-w-normal f-size-16" :class="{ 'is-history': p.isHistory }">
          <i v-if="!p.path" class="el-icon-s-home"></i>{{p.label}}
        </el-link>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="pl-24 pr-24 pt-8 pb-16 toolbar">
      <el-button type="primary" size="medium">上传</el-button>
      <el-button size="medium">上传后解压</el-button>
      <el-button size="medium">打包并下载</el-button>
    </div>

    <el-table
      class="pl-24 pr-24"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }

  getPathObj (pathname: string) {
    if (pathname === '/') {
      return [{ label: '', path: '' }]
    } else {
      return pathname
        .split('/')
        .map((value, index, array) => ({
          label: decodeURI(value),
          path: array.slice(0, index + 1).join('/')
        }))
    }
  }

  get pathname () {
    const { pathname } = location
    const historyPathname = localStorage.getItem('pathname') || '/'

    const pathObj = this.getPathObj(pathname)
    const historyPathObj = this.getPathObj(historyPathname)

    console.log(pathObj, historyPathObj)

    let sticky = false
    const result = []

    for (let i = 0; i < Math.max(pathObj.length, historyPathObj.length); i++) {
      const p1 = pathObj[i]
      const p2 = historyPathObj[i]

      if (p1 && p2) {
        if (p1.path === p2.path) {
          sticky = true
          result.push({
            ...p1,
            isHistory: false
          })
        } else {
          sticky = false
          result.push({
            ...p1,
            isHistory: false
          })
        }
      } else if (p1 && !p2) {
        result.push({
          ...p1,
          isHistory: false
        })
      } else if (!p1 && p2) {
        if (!sticky) break

        result.push({
          ...p2,
          isHistory: true
        })
      }
    }

    console.log(result)
    localStorage.setItem('pathname', pathname)

    return result
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../element-variables.scss";

  .breadcrumb {
    /deep/ .el-breadcrumb__item { margin-bottom: 8px; }
    .is-history { color: $--color-text-placeholder; }
  }
  .toolbar {
  }
</style>
