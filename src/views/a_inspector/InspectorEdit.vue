<template>
  <page-header-wrapper :title="false" content="配置/编辑质检功能">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="质检名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '质检名称不能为空' }]}
            ]"
            name="name"
            placeholder="请输入质检名称" />
        </a-form-item>
        <a-form-item
          label="检测目的"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'goal',
              {rules: [{ required: true, message: '检测目的不能为空' }]}
            ]"
            name="goal"
            placeholder="请输入质检名称" />
        </a-form-item>
        <a-form-item
          label="检测方法"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入检测方法"
            v-decorator="[
              'method',
              {rules: [{ required: true, message: '检测方法不能为空' }]}
            ]" />
        </a-form-item>
        <a-form-item
          label="性能要求"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入性能要求"
            v-decorator="[
              'require',
              {rules: [{ required: true, message: '性能要求不能为空' }]}
            ]" />
        </a-form-item>
        <a-form-item
          label="检测频度"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-radio-group v-decorator="['rate', { initialValue: 1 }]">
            <a-radio :value="1">{{ '日检' }}</a-radio>
            <a-radio :value="2">{{ '月检' }}</a-radio>
            <a-radio :value="3">{{ '年检' }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <!--        <a-form-item-->
        <!--          label="性能要求"-->
        <!--          :labelCol="{lg: {span: 7}, sm: {span: 7}}"-->
        <!--          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"-->
        <!--          :required="false"-->
        <!--          help="请根据不同的检测类型配置性能要求"-->
        <!--        >-->
        <!--          <a-radio-group v-decorator="['target', { initialValue: 1 }]">-->
        <!--            <a-radio :value="1">{{ '基准配置' }}</a-radio>-->
        <!--            <a-radio :value="2">{{ '上传图片验证' }}</a-radio>-->
        <!--          </a-radio-group>-->
        <!--          <div v-show="form.getFieldValue('target') === 1">-->
        <!--            &lt;!&ndash;            <a-form-item label="基准配置介绍">&ndash;&gt;-->
        <!--            <a-input-->
        <!--              placeholder="请输入基准配置介绍"-->
        <!--              v-decorator="[-->
        <!--                'info',-->
        <!--              ]" ></a-input>-->
        <!--            &lt;!&ndash;            </a-form-item>&ndash;&gt;-->
        <!--            <a-radio-group v-decorator="['inspectInput', { initialValue: 1 }]">-->
        <!--              <a-radio :value="1">{{ '角度' }}</a-radio>-->
        <!--              <a-radio :value="2">{{ '基准值' }}</a-radio>-->
        <!--              <a-radio :value="3">{{ '百分比' }}</a-radio>-->
        <!--              <a-radio :value="4">{{ '开关' }}</a-radio>-->
        <!--            </a-radio-group>-->
        <!--            &lt;!&ndash;            <a-input-number :min="0" :max="100" />&ndash;&gt;-->
        <!--            &lt;!&ndash;            <div v-show="form.getFieldValue('inspectInput') === 1">&ndash;&gt;-->
        <!--            &lt;!&ndash;              <div >&ndash;&gt;-->
        <!--            &lt;!&ndash;                大于 : <a-input-number&ndash;&gt;-->
        <!--            &lt;!&ndash;                  step="0.1"&ndash;&gt;-->
        <!--            &lt;!&ndash;                  v-decorator="[&ndash;&gt;-->
        <!--            &lt;!&ndash;                    'min',&ndash;&gt;-->
        <!--            &lt;!&ndash;                    {rules: [{ required: true, message: '请输入最小值' }]}&ndash;&gt;-->
        <!--            &lt;!&ndash;                  ]" /> °&ndash;&gt;-->
        <!--            &lt;!&ndash;              </div>&ndash;&gt;-->
        <!--            &lt;!&ndash;              <div>&ndash;&gt;-->
        <!--            &lt;!&ndash;                小于 ： <a-input-number&ndash;&gt;-->
        <!--            &lt;!&ndash;                  step="0.1"&ndash;&gt;-->
        <!--            &lt;!&ndash;                  v-decorator="[&ndash;&gt;-->
        <!--            &lt;!&ndash;                    'max',&ndash;&gt;-->
        <!--            &lt;!&ndash;                    {rules: [{ required: true, message: '请输入最大值' }]}&ndash;&gt;-->
        <!--            &lt;!&ndash;                  ]" /> °&ndash;&gt;-->
        <!--            &lt;!&ndash;              </div>&ndash;&gt;-->
        <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <div v-show="form.getFieldValue('inspectInput') === 2">&ndash;&gt;-->
        <!--            &lt;!&ndash;              <div >&ndash;&gt;-->
        <!--            &lt;!&ndash;                大于 ： <a-input-number&ndash;&gt;-->
        <!--            &lt;!&ndash;                  step="0.1"&ndash;&gt;-->
        <!--            &lt;!&ndash;                  v-decorator="[&ndash;&gt;-->
        <!--            &lt;!&ndash;                    'min',&ndash;&gt;-->
        <!--            &lt;!&ndash;                    {rules: [{ required: true, message: '请输入最小值' }]}&ndash;&gt;-->
        <!--            &lt;!&ndash;                  ]" /> mm&ndash;&gt;-->
        <!--            &lt;!&ndash;              </div>&ndash;&gt;-->
        <!--            &lt;!&ndash;              <div>&ndash;&gt;-->
        <!--            &lt;!&ndash;                小于 ： <a-input-number&ndash;&gt;-->
        <!--            &lt;!&ndash;                  step="0.1"&ndash;&gt;-->
        <!--            &lt;!&ndash;                  v-decorator="[&ndash;&gt;-->
        <!--            &lt;!&ndash;                    'max',&ndash;&gt;-->
        <!--            &lt;!&ndash;                    {rules: [{ required: true, message: '请输入最大值' }]}&ndash;&gt;-->
        <!--            &lt;!&ndash;                  ]" /> mm&ndash;&gt;-->
        <!--            &lt;!&ndash;              </div>&ndash;&gt;-->
        <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <div v-show="form.getFieldValue('inspectInput') === 3">&ndash;&gt;-->
        <!--            &lt;!&ndash;              <div >&ndash;&gt;-->
        <!--            &lt;!&ndash;                大于 ： <a-input-number&ndash;&gt;-->
        <!--            &lt;!&ndash;                  step="0.1"&ndash;&gt;-->
        <!--            &lt;!&ndash;                  v-decorator="[&ndash;&gt;-->
        <!--            &lt;!&ndash;                    'min',&ndash;&gt;-->
        <!--            &lt;!&ndash;                    {rules: [{ required: true, message: '请输入最小值' }]}&ndash;&gt;-->
        <!--            &lt;!&ndash;                  ]" /> %&ndash;&gt;-->
        <!--            &lt;!&ndash;              </div>&ndash;&gt;-->
        <!--            &lt;!&ndash;              <div>&ndash;&gt;-->
        <!--            &lt;!&ndash;                小于 ： <a-input-number&ndash;&gt;-->
        <!--            &lt;!&ndash;                  step="0.1"&ndash;&gt;-->
        <!--            &lt;!&ndash;                  v-decorator="[&ndash;&gt;-->
        <!--            &lt;!&ndash;                    'max',&ndash;&gt;-->
        <!--            &lt;!&ndash;                    {rules: [{ required: true, message: '请输入最大值' }]}&ndash;&gt;-->
        <!--            &lt;!&ndash;                  ]" /> %&ndash;&gt;-->
        <!--            &lt;!&ndash;              </div>&ndash;&gt;-->
        <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <div v-show="form.getFieldValue('inspectInput') === 4">&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;              <a-input&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                v-decorator="[&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;              'aaa',&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;              {rules: [{ required: true, message: '必填' }]}&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;            ]"&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                name="name"&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              &lt;!&ndash;                placeholder="是否正常" />&ndash;&gt;&ndash;&gt;-->
        <!--            &lt;!&ndash;              <a-radio-group v-decorator="['inspectToggle', { initialValue: 1 }]">&ndash;&gt;-->
        <!--            &lt;!&ndash;                <a-radio :value="1">{{ '是' }}</a-radio>&ndash;&gt;-->
        <!--            &lt;!&ndash;                <a-radio :value="2">{{ '否' }}</a-radio>&ndash;&gt;-->
        <!--            &lt;!&ndash;              </a-radio-group>&ndash;&gt;-->
        <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
        <!--          </div>-->
        <!--        </a-form-item>-->
        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button htmlType="submit" type="primary">保存提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>

import { createInspector, getInspectorById, updateInspector } from '@/api/manage'

export default {
  name: 'InspectorEdit',
  mounted () {
    this.inspectId = this.$route.query.id || 0
    this.inspectId && this.getInspectorInfo(this.inspectId)
  },
  data () {
    return {
      inspectId: 0,
      type: '新增',
      form: this.$form.createForm(this),
      inspectData: null
    }
  },
  methods: {
    // 根据 id 获取检测详情
    async getInspectorInfo (id) {
      try {
        const { data } = await getInspectorById({ id })
        console.log('====================', data, this.form)
        console.log(this.form.getFieldsValue())
        this.form.setFieldsValue({ name: data.name })
        this.form.setFieldsValue({ goal: data.goal })
        this.form.setFieldsValue({ method: data.method })
        this.form.setFieldsValue({ require: data.require })

        let rate = 0;
        +data.day === 1 && (rate = 1);
        +data.month === 1 && (rate = 2);
        +data.year === 1 && (rate = 3)
        this.form.setFieldsValue({ rate: rate })

        this.inspectData = data
      } catch (e) {
        console.error(e)
      }
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          this.$confirm({
            title: '确定保存？',
            onOk: async () => {
              console.log(values)
              const result = await this.saveData(values)
              console.log(result)
              if (result) {
                this.$notification['success']({
                  message: '保存成功',
                  duration: 3
                })
                this.$router.push({ path: '/main/inspectorList' })
              } else {
                this.$notification['error']({
                  message: '保存异常',
                  duration: 3
                })
                return false
              }
            }
          })
        }
      })
    },
    // 保存数据
    async saveData (values) {
      let res = false
      if (this.inspectData?.id) {
        res = await this.updateData(values)
      } else {
        res = await this.createData(values)
      }
      return res
    },
    // 新增数据
    async createData (values) {
      const data = { ...values }
      data.day = +values.rate === 1 ? 1 : 0
      data.month = +values.rate === 2 ? 1 : 0
      data.year = +values.rate === 3 ? 1 : 0
      try {
        await createInspector(data)
        return true
      } catch (e) {
        return false
      }
    },
    // 保存数据
    async updateData (values) {
      const data = { ...this.inspectData, ...values }
      data.day = +values.rate === 1 ? 1 : 0
      data.month = +values.rate === 2 ? 1 : 0
      data.year = +values.rate === 3 ? 1 : 0
      try {
        await updateInspector(data)
        return true
      } catch (e) {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
