<template>
  <page-header-wrapper>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">新建医院</a-button>
    </div>
    <s-table
      :columns="columns"
      ref="table"
      rowKey="key"
      :data="loadData"
    >
      <span slot="action" slot-scope="text, record">
        <template>
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
import { getServiceList } from '@/api/manage'
export default {
  name: 'HospitalInspector',
  components: {
    STable
  },
  data () {
    return {
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
          needTotal: true
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
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
