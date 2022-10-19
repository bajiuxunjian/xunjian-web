<template>
  <page-header-wrapper
  >
    <!--    content="质检配置列表的介绍巴拉巴拉巴拉不知道填什么"-->
    <a-list
      rowKey="id"
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="inspectorList"
      class="card-list"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="!item || item.id === undefined">
          <a-button class="new-btn" type="dashed" @click="addConfig">
            <a-icon type="plus"/>
            新增质检配置
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <b slot="title">{{ item.name }}</b>
            <a slot="extra" v-if="+item.day == 1">日检</a>
            <a slot="extra" v-if="+item.month == 1">月检</a>
            <a slot="extra" v-if="+item.year == 1">年检</a>
            <a-card-meta>
              <div class="meta-content" slot="description">{{ item.goal }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a @click="addConfig(item)">编辑</a>
              <a-popconfirm placement="top" ok-text="Yes" cancel-text="No" @confirm="del(item.id)">
                <template slot="title">
                  <p>删除质检配置可能导致已经在用的检测异常且无法找回,是否确认删除？</p>
                </template>
                <a>删除</a>
              </a-popconfirm>
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </page-header-wrapper>
</template>

<script>

import { delInspectorById, getAllInspectorList } from '@/api/manage'

// const dataSource = []
// dataSource.push({})
// for (let i = 0; i < 3; i++) {
//   dataSource.push({
//     id: i,
//     title: '检测名称',
//     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
//     content: '我是展示检测目的巴拉巴拉巴拉'
//   })
// }

export default {
  name: 'InspectorList',
  mounted () {
    this.getAllInspectorList()
  },
  methods: {
    // 拉取所有检测单元列表
    async getAllInspectorList () {
      const res = await getAllInspectorList()
      this.inspectorList = res?.data || []
      // console.log('=====================', this.inspectorList)
      this.inspectorList.unshift({})
    },
    // 跳入新增
    addConfig (item) {
      item ? this.$router.push({ path: '/main/inspector-edit', query: { id: item.id } }) : this.$router.push({ path: '/main/inspector-edit' })
    },
    // 删除检测数据
    async del (id) {
      try {
        await delInspectorById({ id })
        await this.getAllInspectorList()
      } catch (e) {
        console.error('结果异常')
      }
    }
  },
  data () {
    return {
      inspectorList: [{}],
      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png'
      // dataSource
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
  height: 220px;
}
</style>
