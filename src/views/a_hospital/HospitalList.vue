<template>
  <page-header-wrapper>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="showModal()">新建医院</a-button>
    </div>
    <s-table
      :columns="columns"
      ref="table"
      rowKey="key"
      :data="loadData"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="showModal(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="editInfo(record)">查看详情</a>
        </template>
      </span>
    </s-table>
    <!--    <create-form-->
    <!--      ref="createModal"-->
    <!--      :visible="visible"-->
    <!--      @cancel="handleCancel"-->
    <!--      @ok="() => {this.visible = false}"-->
    <!--    />-->
    <create-hospital
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"

    />
  </page-header-wrapper>

</template>

<script>
import { getServiceList } from '@/api/manage'
import { STable } from '@/components'
import CreateForm from '@/views/list/modules/CreateForm'
import CreateHospital from '@/views/a_hospital/modal/CreateHospital'

export default {
  name: 'HospitalList',
  components: {
    STable,
    CreateForm,
    CreateHospital
  },
  data () {
    return {
      // 编辑医院名称信息
      mdl: null,
      // 提交loading
      confirmLoading: false,
      // 编辑 / 新增弹窗
      visible: false,
      // 表头
      columns: [
        // {
        //   title: '#',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '医院名称',
          dataIndex: 'name'
        },
        // {
        //   title: '状态',
        //   dataIndex: 'status',
        //   needTotal: true
        // },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      }
    }
  },
  methods: {
    // 新建医院弹窗
    showModal (record) {
      console.log(record)
      record && (this.mdl = { ...record })
      this.visible = true
    },
    // 新增 / 编辑医院
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()
              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据
    },
    // 查询医院状态弹窗
    editInfo (e) {
      const { id } = e
      this.$router.push({ path: '/hospital/hospital-info', query: { id } })
    },
    // 查看医院状态弹窗
    noEditInfo () {},
    showInfoModal () {

    }
  }
}
</script>

<style scoped>

</style>
