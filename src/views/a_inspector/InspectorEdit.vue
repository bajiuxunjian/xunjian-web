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
        <!--        <a-form-item-->
        <!--          label="起止日期"-->
        <!--          :labelCol="{lg: {span: 7}, sm: {span: 7}}"-->
        <!--          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">-->
        <!--          <a-range-picker-->
        <!--            name="buildTime"-->
        <!--            style="width: 100%"-->
        <!--            v-decorator="[-->
        <!--              'buildTime',-->
        <!--              {rules: [{ required: true, message: $t('form.basic-form.date.required') }]}-->
        <!--            ]" />-->
        <!--        </a-form-item>-->
        <a-form-item
          label="检测方法"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入检测方法"
            v-decorator="[
              'inspectFunction',
              {rules: [{ required: true, message: '检测方法不能为空' }]}
            ]" />
        </a-form-item>
        <a-form-item
          label="检测标准"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入检测标准"
            v-decorator="[
              'standard',
              {rules: [{ required: true, message: '检测标准不能为空' }]}
            ]" />
        </a-form-item>
        <a-form-item
          label="性能要求"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
          help="请根据不同的检测类型配置性能要求"
        >
          <a-radio-group v-decorator="['target', { initialValue: 1 }]">
            <a-radio :value="1">{{ '基准配置' }}</a-radio>
            <a-radio :value="2">{{ '上传图片验证' }}</a-radio>
          </a-radio-group>
          <div v-show="form.getFieldValue('target') === 1">
            <!--            <a-form-item label="基准配置介绍">-->
            <a-input
              placeholder="请输入基准配置介绍"
              v-decorator="[
                'info',
              ]" ></a-input>
            <!--            </a-form-item>-->
            <a-radio-group v-decorator="['inspectInput', { initialValue: 1 }]">
              <a-radio :value="1">{{ '角度' }}</a-radio>
              <a-radio :value="2">{{ '基准值' }}</a-radio>
              <a-radio :value="3">{{ '百分比' }}</a-radio>
              <a-radio :value="4">{{ '开关' }}</a-radio>
            </a-radio-group>
            <!--            <a-input-number :min="0" :max="100" />-->
            <div v-show="form.getFieldValue('inspectInput') === 1">
              <div >
                大于 ： <a-input-number
                  step="0.1"
                  v-decorator="[
                    'min',
                    {rules: [{ required: true, message: '请输入最小值' }]}
                  ]" /> °
              </div>
              <div>
                小于 ： <a-input-number
                  step="0.1"
                  v-decorator="[
                    'max',
                    {rules: [{ required: true, message: '请输入最大值' }]}
                  ]" /> °
              </div>
            </div>
            <div v-show="form.getFieldValue('inspectInput') === 2">
              <div >
                大于 ： <a-input-number
                  step="0.1"
                  v-decorator="[
                    'min',
                    {rules: [{ required: true, message: '请输入最小值' }]}
                  ]" /> mm
              </div>
              <div>
                小于 ： <a-input-number
                  step="0.1"
                  v-decorator="[
                    'max',
                    {rules: [{ required: true, message: '请输入最大值' }]}
                  ]" /> mm
              </div>
            </div>
            <div v-show="form.getFieldValue('inspectInput') === 3">
              <div >
                大于 ： <a-input-number
                  step="0.1"
                  v-decorator="[
                    'min',
                    {rules: [{ required: true, message: '请输入最小值' }]}
                  ]" /> %
              </div>
              <div>
                小于 ： <a-input-number
                  step="0.1"
                  v-decorator="[
                    'max',
                    {rules: [{ required: true, message: '请输入最大值' }]}
                  ]" /> %
              </div>
            </div>
            <div v-show="form.getFieldValue('inspectInput') === 4">
              <!--              <a-input-->
              <!--                v-decorator="[-->
              <!--              'aaa',-->
              <!--              {rules: [{ required: true, message: '必填' }]}-->
              <!--            ]"-->
              <!--                name="name"-->
              <!--                placeholder="是否正常" />-->
              <a-radio-group v-decorator="['inspectToggle', { initialValue: 1 }]">
                <a-radio :value="1">{{ '是' }}</a-radio>
                <a-radio :value="2">{{ '否' }}</a-radio>
              </a-radio-group>
            </div>
          </div>
        </a-form-item>
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

export default {
  name: 'InspectorEdit',
  mounted () {
    this.inspectId = this.$route.query.id
  },
  data () {
    return {
      inspectId: 0,
      type: '新增',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
