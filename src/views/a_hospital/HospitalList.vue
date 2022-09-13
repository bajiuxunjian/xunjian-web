<template>
  <page-header-wrapper>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="showModal()">新建医院</a-button>
    </div>
    <!--    <a-table :dataSource="loadHospitalList" :columns="columns" />-->
    <s-table
      :columns="columns"
      ref="table"
      rowKey="key"
      :data="hospitalList"
      :show-pagination="false"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="showModal(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="editInfo(record)">查看详情</a>
        </template>
      </span>
    </s-table>
    <create-form
      ref="createModal"
      :visible="visible"
      @cancel="handleCancel"
      @ok="() => {this.visible = false}"
    />
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
import { createHospital, getHospitalList, getServiceList, updateHospitalInfo } from '@/api/manage'
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
  mounted () {
    // this.loadHospitalList()
  },
  data () {
    return {
      // 编辑医院名称信息
      mdl: null,
      // 提交loading
      confirmLoading: false,
      record: null,
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
        //   title: '备注',
        //   dataIndex: 'description'
        // },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      selectData: null,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            console.log('----', res)
            return res.result
          })
      },
     hospitalList: parameter => {
       return getHospitalList({ pageNum: 1, pageSize: 100 })
         .then(res => {
           console.log('-------------------', res.data)
           return res
         })
     }
    }
  },
  methods: {
    loadHospitalList () {
      getHospitalList()
        .then(res => {
          console.log('医院列表数据', res)
          // this.hospitalList = res.result
        })
    },
    // 新建医院弹窗
    showModal (record) {
      console.log(record)
      this.record = record
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
              updateHospitalInfo(values).then(res => {
                resolve()
              })
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
              delete values.id
              createHospital(values).then(res => {
                resolve()
              })
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
    // 查询医院详情
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
