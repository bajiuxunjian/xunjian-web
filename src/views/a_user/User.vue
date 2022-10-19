<template>
  <page-header-wrapper>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="showModal()">新建用户</a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="userList"
      :pagination="false"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="showEdit(record)">编辑</a>
      </span>
    </a-table>
    <a-modal
      title="修改用户医院"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div>
        <div>
          <span>用户:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ actUser.username }}</span>
        </div>
        <div>请选择医院:</div>
        <a-select
          style="width: 100%"
          :value="value"
          :options="options"
          @change="handleChange">
        </a-select>
      </div>
    </a-modal>
    <a-modal
      title="创建用户"
      :visible="createVisible"
      @ok="createOk"
      @cancel="createCancel"
    >
      <div>
        <span>用户名:</span>
        <a-input v-model="username" placeholder="请输入用户名" />
        <span>密码:</span>
        <a-input v-model="password" placeholder="请输入密码" />
      </div>
    </a-modal>
  </page-header-wrapper>

</template>

<script>
import { createUser, getUser, updateUser } from '@/api/user'
import { getHospitalList } from '@/api/manage'

export default {
  name: 'User',
  data () {
    return {
      actUser: {},
      columns: [
        {
          dataIndex: 'name',
          key: 'name',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username'
        },
        {
          title: '所属医院',
          dataIndex: 'fromHospitalId'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      userList: [],
      visible: false,
      confirmLoading: false,
      value: 1,
      hospitalList: [],
      options: [],
      createVisible: false,
      username: '',
      password: ''
    }
  },
  async mounted () {
    const { data } = await getUser({ pageNum: 1, pageSize: 10000 })
    // console.log(data)
    const { data: hospitalList } = await getHospitalList({ pageNum: 1, pageSize: 10000 })
    this.options = hospitalList.map(i => {
      return {
        value: i.id,
        label: i.name
      }
    })
    const list = data.filter(i => ~~i.role !== 1)
    this.userList = list.map(i => {
      const info = hospitalList.find(j => j.id === i?.fromHospitalId)
      return {
        ...i,
        fromHospitalId: info?.name || '暂无'
      }
    })
  },
  methods: {
    showEdit (d) {
      this.actUser = d
      this.value = d.fromHospitalId
      this.visible = true
    },
    async handleOk () {
      console.log('切换')
      try {
        this.actUser.fromHospitalId = this.value
        await updateUser({ ...this.actUser })
        this.visible = false
      } catch (e) {
        console.error('错了')
      }
    },
    handleCancel () {
      this.visible = false
      this.actUser = {}
      this.value = ''
    },
    handleChange (e) {
      this.value = e
    },
    showModal () {
      this.username = ''
      this.password = ''
      this.createVisible = true
    },
    async createOk () {
      console.log('切换')
      try {
        if (this.username && this.password) {
          await createUser({
            username: this.username,
            password: this.password,
            role: 2
          })
        }
        this.username = ''
        this.password = ''

        this.createVisible = false
      } catch (e) {
        console.error('错了')
      }
    },
    createCancel () {
      this.createVisible = false
    }
  }
}
</script>

<style scoped>

</style>
