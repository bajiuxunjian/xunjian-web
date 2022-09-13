<template>
  <page-header-wrapper :title="false" :content="`配置/编辑 ${inspectorType}`">
    <a-row :gutter="20">
      <a-col :span="9">
        <a-card>
          <a-transfer
            :dataSource="inspectList"
            :titles="['未选择', '已选择']"
            :targetKeys="targetKeys"
            :selectedKeys="selectedKeys"
            @change="handleChange"
            @selectChange="handleSelectChange"
            @scroll="handleScroll"
            :render="item=>item.title"
          >
          </a-transfer>
        </a-card>
        <div style="padding-top: 8px">
          <a-button style="margin-right: 10px" @click="back">返回</a-button>
          <a-button v-if="targetKeys.length > 0" htmlType="submit" type="primary" style="marginRight: 10px" @click="confirmInspector">保存并使用</a-button>
        </div>

      </a-col>
      <a-col :span="15">
        <a-card v-if="targetKeys.length > 0" :title="`${inspectorType}检测报告配置`"/>
        <a-card v-for="(el) in targetDataList" :key="el.id" :body-style="{padding: '24px 32px', marginBottom: '10px'}" :bordered="false">
          <a-form :form="form">
            <a-form-item
              label="质检名称"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <!--              <div>激光灯定位准确度 质检标题{{ Number(el)+ 1 }}</div>-->
              <div>{{ el.name }}</div>
            </a-form-item>
            <a-form-item
              label="检测目的"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <!--              <div>评价激光灯对机械等中心位置的指示准确度</div>-->
              <div>
                {{ el.goal }}
              </div>
            </a-form-item>
            <a-form-item
              label="试验方法"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <!--              <div>在治疗室或机架外壳上，标记激光灯的指示位置，每日检查激光线和标记线之间的偏差。对于旋转机架，检查时应考虑机架外壳的形变。</div>-->
              <div>
                {{ el.method }}
              </div>
            </a-form-item>
            <a-form-item
              label="性能要求"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <!--              <div>等中心0.5m范围内小于:-->
              <!--                <a-input-number value="1" disabled></a-input-number>mm-->
              <!--                <a-input-number value="0.5" disabled></a-input-number>°-->
              <!--              </div>-->
              <div>
                {{ el.require }}
              </div>
            </a-form-item>
          </a-form>
        </a-card>
        <!--        <a-button v-if="targetKeys.length > 0" htmlType="submit" style="marginRight: 10px">更改为使用中</a-button>-->
        <!--        <a-button v-if="targetKeys.length > 0" htmlType="submit">更改为编辑中</a-button>-->
      </a-col>
    </a-row>

  </page-header-wrapper>
</template>

<script>
import { Button, Transfer } from 'ant-design-vue'
import { getAllInspectorList, getHospitalInfo, updateHospitalInfo } from '@/api/manage'
import store from '@/store'
import { createCheckList } from '@/api/check'
// import { createCheckList } from '@/api/check'
const ButtonGroup = Button.Group

export default {
  name: 'HospitalConfig',
  components: {
    ATransfer: Transfer,
    AButton: Button,
    AButtonGroup: ButtonGroup
  },
  async mounted () {
    const type = this.$route.query.type
    if (+type === 3) {
      this.inspectorType = '年检'
    } else if (+type === 2) {
      this.inspectorType = '月检'
    } else if (+type === 1) {
      this.inspectorType = '日检'
    } else {
      return
    }
    this.hId = store.state.user.info.hospitalId || this.$route.query.hId
    if (~~this.hId !== 0) {
      await this.getHospitalInfo()
    }
    await this.getAllInspectorList()
    this.makeExample()
  },
  data () {
    const mockData = []
    for (let i = 0; i < 20; i++) {
      mockData.push({
        key: i.toString(),
        title: `质检名称${i + 1}`
        // description: `description of content${i + 1}`
        // disabled: i % 3 < 1
      })
    }

    // const targetKeys = mockData
    //   .filter(item => +item.key % 3 > 1)
    //   .map(item => item.key)
    return {
      inspectorType: '日检',
      mockData,
      hid: 0,
      // mock 数据
      form: this.$form.createForm(this),
      inspectList: [],
      targetKeys: [],
      targetDataList: [],
      selectedKeys: [],
      hospitalInfo: null
      // selectedKeys: ['1', '4']
    }
  },
  methods: {
    // 拉取当前医院当前配置
    async getHospitalInfo () {
      let arr = []
      const { data } = await getHospitalInfo({ id: this.hId })
      const type = this.$route.query.type
      if (~~type === 1) {
        arr = data.dayConfig?.split(',') || []
      } else if (~~type === 2) {
        arr = data.monthConfig?.split(',') || []
      } else if (~~type === 3) {
        arr = data.yearConfig?.split(',') || []
      }
      // console.log('aaaaaaaaaaaaaaaaaaaa')
      // console.log(data)
      this.targetKeys = arr
      this.hospitalInfo = data
    },
    // 拉去所有检测配置列表
    async getAllInspectorList () {
      const res = await getAllInspectorList()
      const list = res.data || []
      const type = this.$route.query.type
      if (~~type === 1) {
        // 日检
        const arr = list.filter(i => i.day).map((i, index) => {
          return { ...i, title: i.name, key: i.id.toString() }
        })
        this.inspectList = arr
      } else if (~~type === 2) {
        // 月检
        const arr = list.filter(i => i.month).map((i, index) => {
          return { ...i, title: i.name, key: i.id.toString() }
        })
        this.inspectList = arr
        // 年检
      } else if (~~type === 3) {
        // 年检
        const arr = list.filter(i => i.year).map((i, index) => {
          return { ...i, title: i.name, key: i.id.toString() }
        })
        this.inspectList = arr
      } else {
        // 啥也不是
      }
    },
    // 弹出保存框
    confirmInspector () {
      this.$confirm({
        title: '确定保存并且更新(次日生效)？',
        // content: h => <div style="color:red;">Some descriptions</div>,
        onOk: async () => {
          await this.saveInspector()
        }
      })
    },
    // 保存质检列表并返回到上一页
    async saveInspector () {
      const type = this.$route.query.type
      let d
      try {
        console.log(this.targetKeys.toString())
        if (~~type === 1) {
          // 日检
          this.hospitalInfo.dayConfig = this.targetKeys.toString()
          d = {
            hospitalId: this.hospitalInfo.id,
            inspectConfig: this.hospitalInfo.dayConfig,
            type
          }
        } else if (~~type === 2) {
          // 月检
          this.hospitalInfo.monthConfig = this.targetKeys.toString()
          d = {
            hospitalId: this.hospitalInfo.id,
            inspectConfig: this.hospitalInfo.monthConfig,
            type
          }
        } else if (~~type === 3) {
          // 年检
          this.hospitalInfo.yearConfig = this.targetKeys.toString()
          d = {
            hospitalId: this.hospitalInfo.id,
            inspectConfig: this.hospitalInfo.yearConfig,
            type
          }
        } else {
          // 啥也不是
        }
      } catch (e) {
        this.$message.error('保存失败,请联系管理员')
      }
      try {
        console.log(this.hospitalInfo)
        await updateHospitalInfo({ ...this.hospitalInfo })
        await createCheckList({ ...d })
        this.$notification.success({
          message: '保存成功'
        })
        // this.back()
      } catch (e) {
        this.$message.error('保存失败,请联系管理员')
        return false
      }
    },
    back () {
      this.$router.push({ path: '/hospital/hospital-info', query: { hId: this.hId } })
    },
    makeExample () {
      this.targetDataList = this.targetKeys.map(i => {
        return this.inspectList.find(j => +i === j.id)
      })
    },
    handleChange (nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys
      this.makeExample()

      console.log('targetKeys: ', this.targetKeys)
      console.log('direction: ', direction)
      console.log('moveKeys: ', moveKeys)
    },
    handleSelectChange (sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]
      console.log('sourceSelectedKeys: ', sourceSelectedKeys)
      console.log('targetSelectedKeys: ', targetSelectedKeys)
    },
    handleScroll (direction, e) {
      console.log('direction:', direction)
      console.log('target:', e.target)
    }
  }
}
</script>

<style scoped>

</style>
