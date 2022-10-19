<template>
  <page-header-wrapper
    :content="info?.name"
  >
    <div class="table-operator">
      <a-row
        :gutter="20"
        class="card-list"
      >
        <div style="position: absolute;top:0;right: 0;">
          <a-button type="primary" style="margin-right: 10px" @click="downloadAllExcel">导出当前页</a-button>
          <!--          <a-button type="primary">导出全部</a-button>-->
        </div>
        <a-col :span="6">
          <a-card>
            <a-card-meta>
              <a slot="title">{{ '日检配置' }}</a>
              <a-avatar class="card-avatar" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" size="large"/>
              <div slot="description">{{ !!info?.dayConfig ? '使用中...': '暂无配置' }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a @click="editTemplate(1)">{{ !!info?.dayConfig ? '编辑': '新建' }}</a>
            </template>
          </a-card></a-col>

        <a-col :span="6">
          <a-card :hoverable="true">
            <a-card-meta>
              <a slot="title">{{ '月检配置' }}</a>
              <a-avatar class="card-avatar" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" size="large"/>
              <div slot="description">{{ !!info?.monthConfig ? '使用中...': '暂无配置' }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a @click="editTemplate(2)">{{ !!info?.monthConfig ? '编辑': '新建' }}</a>
            </template>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :hoverable="true">
            <a-card-meta>
              <a slot="title">{{ '年检配置' }}</a>
              <a-avatar class="card-avatar" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" size="large"/>
              <div slot="description">{{ !!info?.yearConfig ? '使用中...': '暂无配置' }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a @click="editTemplate(3)">{{ !!info?.yearConfig ? '编辑': '新建' }}</a>
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
      :showPagination="false"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="type" slot-scope="text, record">
        <span>{{ record.type == 1 ? '日检' : '' }}</span>
        <span>{{ record.type == 2 ? '月检' : '' }}</span>
        <span>{{ record.type == 3 ? '年检' : '' }}</span>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="downloadExcel(record)">下载</a>
        </template>
      </span>
    </s-table>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { getHospitalInfo, getHospitalInspectList } from '@/api/manage'
import store from '@/store'
import { getCheckListByHospitalId } from '@/api/check'
import * as XLSX from 'xlsx'

// 将 workbook 装化成 blob 对象
export function workbook2blob (workbook) {
  // 生成excel的配置项
  const wopts = {
    // 要生成的文件类型
    bookType: 'xlsx',
    // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    bookSST: false,
    type: 'binary'
  }
  const wbout = XLSX.write(workbook, wopts)
  // 将字符串转ArrayBuffer
  function s2ab (s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  const blob = new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  })
  return blob
}
// 将 blob 对象创建 blobUrl，通过 a 标签和 createObjectURL 实现下载功能实现下载
export function openDownload (blob, fileName) {
  if (typeof blob === 'object' && blob instanceof Blob) {
    blob = URL.createObjectURL(blob) // 创建blob地址
  }
  const aLink = document.createElement('a')
  aLink.href = blob
  // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
  aLink.download = fileName || ''
  let event
  if (window.MouseEvent) event = new MouseEvent('click')
  //   移动端
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}
/**
 *
 * @param sheetData 数组表格数据
 * @param fileName 文件名
 */
export function exportFile (sheetData, fileName) {
  // 将由对象组成的数组转化成sheet
  const sheet = XLSX.utils.json_to_sheet(sheetData)
  // 百分数和数字更改为数字类型
  // Object.keys(sheet).forEach((key) => {
  //   if (sheet[key].v) {
  //     const val = sheet[key].v
  //     if (!isNaN(val)) {
  //       sheet[key].t = 'n'
  //     }
  //     if (val.lastIndexOf('%') === val.length - 1) {
  //       sheet[key].t = 'n'
  //       sheet[key].z = '0.00%'
  //       sheet[key].v = Number(val.substring(0, val.length - 1)) / 100
  //     }
  //   }
  // })
  // 创建虚拟的workbook
  const wb = XLSX.utils.book_new()
  // 把sheet添加到workbook中
  XLSX.utils.book_append_sheet(wb, sheet, fileName)
  const workbookBlob = workbook2blob(wb)
  openDownload(workbookBlob, `${fileName}.xlsx`)
}
export function exportMultiFile (sheetMap, fileName) {
  // 创建虚拟的workbook
  const wb = XLSX.utils.book_new()
  for (const k in sheetMap) {
    const sheetData = sheetMap[k]
    const sheet = XLSX.utils.json_to_sheet(sheetData)
    XLSX.utils.book_append_sheet(wb, sheet, k)
  }
  const workbookBlob = workbook2blob(wb)
  openDownload(workbookBlob, `${fileName}.xlsx`)
}

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
    this.hId = store.state.user.info.hospitalId || this.$route.query.id
    this.getData(store.state.user.info.hospitalId || this.$route.query.id)
  },
  methods: {
    // 下载当前excel
    async downloadExcel (record) {
      console.log(record)
      const type = +record.type === 1 ? '日检' : +record.type === 2 ? '月检' : '年检'
      const name = `${record.name}(${type})`
      console.log(name)
      let sheetData = []
      try {
        sheetData = JSON.parse(record.inspect)
        sheetData = sheetData.map(el => {
          return {
            '检测名称': el.name || '',
            '检测目的': el.goal || '',
            '检测方法': el.method || '',
            '性能要求': el.require || '',
            '实际性能': el.msg || '',
            '是否通过': +el.status === 0 ? '未检测' : +el.status === 2 ? '已通过' : '待审批'
          }
        })
        exportFile(sheetData, name)
      } catch (e) {
        console.error(e)
        this.$message.error('导出异常,请联系管理员')
      }
    },
    // 下载当前页全部信息
    downloadAllExcel () {
      const d = {}
      console.log('---', this.list)
      try {
        this.list.forEach((el, index) => {
          const type = +el.type === 1 ? '日检' : +el.type === 2 ? '月检' : '年检'
          const name = `${el.name}(${type})`
          let sheetData = JSON.parse(el.inspect)
          sheetData = sheetData.map(el => {
            return {
              '检测名称': el.name || '',
              '检测目的': el.goal || '',
              '检测方法': el.method || '',
              '性能要求': el.require || '',
              '实际性能': el.msg || '',
              '是否通过': +el.status === 0 ? '未检测' : +el.status === 2 ? '已通过' : '待审批'
            }
          })
          d[name] = sheetData
        })
        exportMultiFile(d, '批量导出')
      } catch (e) {
        console.error(e)
        this.$message.error('导出异常,请联系管理员')
      }
    },
    async getData (id) {
      try {
        const { data } = await getHospitalInfo({ id })
        this.info = data
        // this.listDataa = res.result
      } catch (e) {
        console.error(e)
      }
    },
    // 跳转编辑
    handleEdit (record) {
      console.log('跳转编辑,', record)
      const { id, type } = record
      this.$router.push({ path: '/check-info', query: { id, type } })
    },
    // 编辑模板按钮 0 日检 1 月检 2 年检
    editTemplate (templateType) {
      this.$router.push({ path: '/hospital/hospital-config', query: { hId: this.hId, type: templateType } })
    }
  },
  data () {
    return {
      hId: 0,
      info: null,
      list: [],
      listData: parameter => {
        const hId = store.state.user.info.hospitalId || this.$route.query.id
        parameter.pageNum = parameter.pageNo
        parameter.pageSize = 1000000
        return getCheckListByHospitalId(Object.assign(parameter, { hospitalId: hId || null }))
          .then(res => {
            this.list = res.data
            return res
          })
        // return getHospitalInspectList(Object.assign(parameter, { id: this.hId }))
        //   .then(res => {
        //     return res.result
        //   })
      },
      // 表头
      columns: [
        // {
        //   title: '#',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '标题',
          dataIndex: 'name'
        },
        {
          title: '检测频度',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        // {
        //   title: '状态',
        //   dataIndex: 'status',
        //   needTotal: true,
        //   scopedSlots: { customRender: 'status' }
        // },
        // {
        //   title: '更新时间',
        //   dataIndex: 'updatedAt',
        //   sorter: true
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
        return getHospitalInspectList(Object.assign(parameter, this.queryParam))
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
