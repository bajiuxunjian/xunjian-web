<template>
  <page-header-wrapper :title="false" :content="`配置/编辑 ${inspectorType}`">
    <a-row :gutter="20">
      <a-col :span="9">
        <a-card>
          <a-transfer
            :dataSource="mockData"
            :titles="['Source', 'Target']"
            :targetKeys="targetKeys"
            :selectedKeys="selectedKeys"
            @change="handleChange"
            @selectChange="handleSelectChange"
            @scroll="handleScroll"
            :render="item=>item.title"
          >
          </a-transfer></a-card>

      </a-col>
      <a-col :span="15">
        <a-card v-if="targetKeys.length > 0" :title="`${inspectorType}检测报告`"/>
        <a-card v-for="el in targetKeys" :key="el" :body-style="{padding: '24px 32px', marginBottom: '10px'}" :bordered="false">
          <a-form :form="form">
            <a-form-item
              label="质检名称"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <div>激光灯定位准确度 质检标题{{ Number(el)+ 1 }}</div>
            </a-form-item>
            <a-form-item
              label="检测目的"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <div>评价激光灯对机械等中心位置的指示准确度</div>
            </a-form-item>
            <a-form-item
              label="试验方法"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <div>在治疗室或机架外壳上，标记激光灯的指示位置，每日检查激光线和标记线之间的偏差。对于旋转机架，检查时应考虑机架外壳的形变。</div>
            </a-form-item>
            <a-form-item
              label="性能要求"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <div>等中心0.5m范围内小于:
                <a-input-number value="1" disabled></a-input-number>mm
                <a-input-number value="0.5" disabled></a-input-number>°
              </div>
            </a-form-item>
          </a-form>
        </a-card>
        <a-button v-if="targetKeys.length > 0" htmlType="submit" type="primary" style="marginRight: 10px">保存</a-button>
        <a-button v-if="targetKeys.length > 0" htmlType="submit" style="marginRight: 10px">更改为使用中</a-button>
        <a-button v-if="targetKeys.length > 0" htmlType="submit">更改为编辑中</a-button>
      </a-col>
    </a-row>

  </page-header-wrapper>
</template>

<script>
import { Button, Transfer } from 'ant-design-vue'
const ButtonGroup = Button.Group

export default {
  name: 'HospitalConfig',
  components: {
    ATransfer: Transfer,
    AButton: Button,
    AButtonGroup: ButtonGroup
  },
  mounted () {
    const type = this.$route.query.type
    if (+type === 2) {
      this.inspectorType = '年检'
    } else if (+type === 1) {
      this.inspectorType = '月检'
    } else {
      this.inspectorType = '日检'
    }
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
      // mock 数据
      form: this.$form.createForm(this),
      inspectList: [],
      targetKeys: [],
      selectedKeys: []
      // selectedKeys: ['1', '4']
    }
  },
  methods: {
    handleChange (nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys

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
