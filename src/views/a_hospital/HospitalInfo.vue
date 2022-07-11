<template>
  <page-header-wrapper
    :content="`'编号为 ${hId} 医院'`"
  >
    <div class="table-operator">
      <a-row
        :gutter="20"
        class="card-list"
      >
        <a-col :span="6">
          <a-card>
            <a-card-meta>
              <a slot="title">{{ '日检配置' }}</a>
              <a-avatar class="card-avatar" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" size="large"/>
              <div class="meta-content" slot="description">{{ 'a' }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a @click="editTemplate(0)">编辑</a>
            </template>
          </a-card></a-col>

        <a-col :span="6">
          <a-card :hoverable="true">
            <a-card-meta>
              <a slot="title">{{ '月检配置' }}</a>
              <a-avatar class="card-avatar" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" size="large"/>
              <div class="meta-content" slot="description">{{ 'a' }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a @click="editTemplate(1)">编辑</a>
            </template>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :hoverable="true">
            <a-card-meta>
              <a slot="title">{{ '年检配置' }}</a>
              <a-avatar class="card-avatar" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" size="large"/>
              <div class="meta-content" slot="description">{{ 'a' }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a @click="editTemplate(2)">编辑</a>
            </template>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <s-table
      :columns="columns"
      ref="table"
      rowKey="key"
      :data="listData"
      showPagination="auto"
    >

      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">下载</a>
        </template>
      </span>
    </s-table>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { getHospitalList, getServiceList } from '@/api/manage'

const statusMap = {
  0: {
    status: 'error',
    text: '编辑中'
  },
  1: {
    status: 'processing',
    text: '日检'
  },
  2: {
    status: 'success',
    text: '月检'
  },
  3: {
    status: 'default',
    text: '编辑中'
  }
}
export default {
  name: 'HospitalInfo',
  components: {
    STable
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  mounted () {
    console.log('---------------', this.$route.query.id)
    this.getData(this.$route.query.id)
  },
  methods: {
    async getData (id) {
      try {
        const res = await getHospitalList({ id })
        console.log(res, '---------------')
        // this.listDataa = res.result
      } catch (e) {
        console.error(e)
      }
    },
    // 跳转编辑
    handleEdit (record) {
      console.log('跳转编辑,', record)
      const { id } = record
      console.log(id)
    },
    // 编辑模板按钮 0 日检 1 月检 2 年检
    editTemplate (templateType) {
      this.$router.push({ path: '/hospital/hospital-config', query: { hId: this.hId, type: templateType } })
    }
  },
  data () {
    return {
      hId: this.$route.query.id,
      listData: parameter => {
        console.log(parameter)
        return getHospitalList(Object.assign(parameter, { id: this.$route.query.id }))
          .then(res => {
            return res.result
          })
      },
      // 表头
      columns: [
        // {
        //   title: '#',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '标题',
          dataIndex: 'description'
        },
        {
          title: '状态',
          dataIndex: 'status',
          needTotal: true,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/components/index.less";

.card-list {
  /deep/ .ant-card-body:hover {
    .ant-card-meta-title>a {
      color: @primary-color;
    }
  }

  /deep/ .ant-card-meta-title {
    margin-bottom: 12px;

    &>a {
      display: inline-block;
      max-width: 100%;
      color: rgba(0,0,0,.85);
    }
  }

  /deep/ .meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    margin-bottom: 1em;
  }
}

.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}

.ant-card-actions {
  background: #f7f9fa;

  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    a {
      color: rgba(0, 0, 0, .45);
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: @primary-color;
      }
    }
  }
}

.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 188px;
}
</style>
