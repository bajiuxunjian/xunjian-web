<template>
  <page-header-wrapper>
    <a-button style="text-align: center" @click="$router.go(-1)">返回</a-button>
    <a-card
      v-for="(item, index) in list"
      style="width: 80%;margin:4px auto"
      :key="index"
      :title="item.name">
      <!--      <a slot="extra" href="#">未完成</a>-->
      <a slot="extra" href="#" style="color: red">{{ item.status == 0?"待检测": item.status == 1?"待批准":"已完成" }}</a>
      <div style="display: flex;margin-bottom: 10px">
        <span style="width: 120px;display: inline-block">检测目的:</span>
        <div style="width: calc(100% - 120px)">{{ item.goal }}</div>
      </div>
      <div style="display: flex;margin-bottom: 10px">
        <span style="width: 120px;display: inline-block;">检测方法:</span>
        <div style="width: calc(100% - 120px)">{{ item.method }}</div>
      </div>
      <div style="display: flex;margin-bottom: 10px">
        <span style="width: 120px;display: inline-block;">性能要求:</span>
        <div style="width: calc(100% - 120px)">{{ item.require }}</div>
      </div>
      <div style="display: flex;margin-bottom: 10px;height: 40px;line-height: 40px">
        <span style="width: 120px;display: inline-block;">实际性能:</span>
        <div style="width: calc(100% - 120px)">
          <a-input v-model="item.msg" placeholder="请输入实际性能数值" :disabled="role != 2 || item.status == 2" style="width: 200px"/>
        </div>
      </div>
      <div v-if="role == 1 && !!item.msg">
        <a-button type="primary" style="float: right" @click="update(item,index, true)">
          {{ item.status == 1 ? "批准通过":"取消批准" }}
        </a-button>
      </div>
      <div v-if="role == 2">
        <a-button type="primary" style="float: right" @click="update(item,index)">
          {{ item.status ? "修改数值":"满足实际性能" }}
        </a-button>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>

import { getCheckInfoById, updateCheckListById } from '@/api/check'
import { getAllInspectorList } from '@/api/manage'
import store from '@/store'

export default {
  name: 'CheckInfo',
  created () {
  },
  mounted () {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    if (this.id && this.type) {
      this.getInspectList(this.type)
    }
    // console.log('=============================')
    // console.log(store.state.user.info.roleInt)
    this.role = store.state.user.info.roleInt || 0
  },
  data () {
    return {
      role: 0,
      list: [],
      allList: [],
      checkData: null,
      confirmListData: []
    }
  },
  methods: {
    // 更新表数据
    async update (el, index, isApprove) {
      const item = el
      console.log(el, index)
      if (isApprove) {
        +item.status === 2 ? item.status = 1 : item.status = 2
      } else {
        item.status = !!item?.msg
      }

      // console.log(this.confirmListData)
      console.log(this.checkData.inspect)
      try {
        const inspect = this.checkData.inspect || '[]'
        const strArr = JSON.parse(inspect)
        strArr[index] = item
        this.checkData.status = +!strArr?.find(i => !i.status)
        this.checkData.inspect = JSON.stringify(strArr) || ''
        // console.log({ ...this.checkData })
        await updateCheckListById({ ...this.checkData })
        this.$message.success('保存成功')
        return
      } catch (e) {
        this.$message.error('保存失败,请联系管理员')
        console.error(e)
      }
      // eslint-disable-next-line no-unreachable
      // this.confirmListData[index] = item
    },
    async getCheckData (id) {
      const { data } = await getCheckInfoById({ id })
      // console.log('--------------------------------')
      this.checkData = data
      // 获取配置详情
      const { inspectConfig, inspect } = data
      // console.log('--------------', data)
      const configArr = inspectConfig?.split(',')
      if (inspect) {
        try {
          this.list = JSON.parse(inspect)
        } catch (e) {
          this.list = []
        }
      } else {
        // configArr
        // console.log(this.allList)
        this.list = this.allList.filter(i => !!configArr.find(j => +j === +i.id))
      }
      this.confirmListData = []
      this.confirmListData = this.list.map(i => i)

      // console.log('---------------', this.confirmListData)
    },
    // 根据检测类型查找对应原子
    async getInspectList (type) {
      const param = {
        day: 0,
        year: 0,
        month: 0
      }
      switch (+type) {
        case 1:
          param.day = 1
          break
        case 2:
          param.month = 1
          break
        case 3:
          param.year = 1
          break
      }
      const { data } = await getAllInspectorList({ ...param })
      this.allList = data || []
      const res = await this.getCheckData(this.id)
      console.log(res)
    }
  }
}
</script>

<style scoped>

</style>
