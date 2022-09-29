<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}，{{ user.username }}<span class="welcome-text">，{{ '欢迎回来' }}</span>
          </div>
          <!--          <div>质检中心平台</div>-->
        </div>
      </div>
    </template>
    <template v-slot:extraContent>
      <div class="extra-content">
        <!--        <div class="stat-item">-->
        <!--          <a-statistic title="医院数" :value="2" />-->
        <!--        </div>-->
        <div class="stat-item">
<!--          <a-statistic title="今日已完成质检单位" :value="8" suffix="/ 24" />-->
        </div>
      </div>
    </template>
    <div v-if="~~hId === 0">
      <a-row :gutter="24">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="医院列表"
            :body-style="{ padding: 0 }"
          >
            <!--            <a slot="extra">全部项目</a>-->
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                <a-card :bordered="false" :body-style="{ padding: 0 }" style="cursor: pointer;user-select: none" @click="gotoHospital(item)">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <!--                      <a-avatar size="small" :src="item.cover" />-->
                      <a>{{ item.name }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </a-card-meta>
<!--                  <div class="project-item">-->
<!--                    <a href="/#/">最后更新</a>-->
<!--                    <span class="datetime">9小时前</span>-->
<!--                  </div>-->
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

<!--          <a-card :loading="loading" title="动态" :bordered="false">-->
<!--            <a-list>-->
<!--              <a-list-item :key="index" v-for="(item, index) in activities">-->
<!--                <a-list-item-meta>-->
<!--                  <a-avatar slot="avatar" size="small" :src="item.user.avatar" />-->
<!--                  <div slot="title">-->
<!--                    <span>{{ item.user.nickname }}</span-->
<!--                    >&nbsp; 在&nbsp;<a href="#">{{ item.project.name }}</a-->
<!--                    >&nbsp; <span>{{ item.project.action }}</span-->
<!--                    >&nbsp;-->
<!--                    <a href="#">{{ item.project.event }}</a>-->
<!--                  </div>-->
<!--                  <div slot="description">{{ item.time }}</div>-->
<!--                </a-list-item-meta>-->
<!--              </a-list-item>-->
<!--            </a-list>-->
<!--          </a-card>-->
        </a-col>
        <!--        <a-col-->
        <!--          style="padding: 0 12px"-->
        <!--          :xl="8"-->
        <!--          :lg="24"-->
        <!--          :md="24"-->
        <!--          :sm="24"-->
        <!--          :xs="24">-->
        <!--          <a-card-->
        <!--            title="快速开始 / 便捷导航"-->
        <!--            style="margin-bottom: 24px"-->
        <!--            :bordered="false"-->
        <!--            :body-style="{ padding: 0 }"-->
        <!--          >-->
        <!--            <div class="item-group">-->
        <!--              <a>新增配置</a>-->
        <!--              <a>新增人员</a>-->
        <!--              <a>查看医院</a>-->
        <!--              <a>未定义1</a>-->
        <!--              <a>未定义2</a>-->
        <!--              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>-->
        <!--            </div>-->
        <!--          </a-card>-->
        <!--          <a-card-->
        <!--            title="XX 指数"-->
        <!--            style="margin-bottom: 24px"-->
        <!--            :loading="radarLoading"-->
        <!--            :bordered="false"-->
        <!--            :body-style="{ padding: 0 }"-->
        <!--          >-->
        <!--            <div style="min-height: 400px;">-->
        <!--              &lt;!&ndash; :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  &ndash;&gt;-->
        <!--              <radar :data="radarData" />-->
        <!--            </div>-->
        <!--          </a-card>-->
        <!--          <a-card :loading="loading" title="团队" :bordered="false">-->
        <!--            <div class="members">-->
        <!--              <a-row>-->
        <!--                <a-col :span="12" v-for="(item, index) in teams" :key="index">-->
        <!--                  <a>-->
        <!--                    <a-avatar size="small" :src="item.avatar" />-->
        <!--                    <span class="member">{{ item.name }}</span>-->
        <!--                  </a>-->
        <!--                </a-col>-->
        <!--              </a-row>-->
        <!--            </div>-->
        <!--          </a-card>-->
        <!--        </a-col>-->
      </a-row>
    </div>
    <div v-else>
      <a-row :gutter="24">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            title="待完成检测"
            :body-style="{ padding: 0 }"
          >
            <a-list item-layout="horizontal" :data-source="pendingInspectData" style="padding-left: 20px;">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta
                  :title="item.title"
                >
                  <div slot="description">
                    <b style="color: #000;font-size: 16px">{{ item.name }}</b>
                    <!--                    <a-popconfirm-->
                    <!--                      title="是否确认快速完成?"-->
                    <!--                      ok-text="确认"-->
                    <!--                      cancel-text="取消"-->
                    <!--                      @confirm="() => {}"-->
                    <!--                      @cancel="() => {}"-->
                    <!--                      style="float: right;margin-right: 10px"-->
                    <!--                    >-->
                    <!--                      <a>急速确认</a>-->
                    <!--                    </a-popconfirm>-->
                    <a @click="showInfo(item)" style="float: right;margin-right: 50px">详情</a>
                    <div>
                      {{ item.goal }}
                    </div>
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <!--    <a-drawer-->
    <!--      title="Basic Drawer"-->
    <!--      placement="right"-->
    <!--      :closable="false"-->
    <!--      :visible="visibleDrawer"-->
    <!--      @close="visibleDrawer = false"-->
    <!--    >-->
    <!--      &lt;!&ndash;      :after-visible-change="afterVisibleChange"&ndash;&gt;-->
    <!--      &lt;!&ndash;      @close="onCloseDrawer"&ndash;&gt;-->
    <!--      <p>Some contents...</p>-->
    <!--      <p>Some contents...</p>-->
    <!--      <p>Some contents...</p>-->
    <!--    </a-drawer>-->
  </page-header-wrapper>
</template>

<script>
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { getAllInspectorList, getHospitalList, getRoleList, getServiceList } from '@/api/manage'
import DataSet from '@antv/data-set'
import { getCheckListByHospitalId } from '@/api/check'
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]
export default {
  name: 'DashBoard',
  components: {
    PageHeaderWrapper,
    Radar
  },
  data () {
    return {
      data,
      pendingInspectData: [],
      // 医院id 0为管理员
      hId: 0,
      // 详情展示
      visibleDrawer: false,
      timeFix: timeFix(),
      avatar: '',
      user: {},

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: []
    }
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome
    }),
    currentUser () {
      return {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    },
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    console.log('-----------------')
    console.log(this.user)
    this.hId = this.user.hospitalId || 0
    this.avatar = this.userInfo.avatar

    getRoleList().then(res => {
      // console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then(res => {
      // console.log('workplace -> call getServiceList()', res)
    })
  },
  async mounted () {
    // this.getProjects()
    if (~~this.hId === 0) {
      this.getHospitalList()
    } else {
      //
      await this.getSurplusInspect()
    }

    this.getActivity()
    this.getTeams()
    this.initRadar()
  },
  methods: {
    // 跳转到对应医院详情
    gotoHospital (item) {
      const { id } = item
      this.$router.push({ path: '/hospital/hospital-info', query: { id } })
    },
    // 获取医院列表
    getHospitalList () {
      getHospitalList({ pageNum: 1, pageSize: 100 }).then(res => {
        console.log('=========================')
        console.log(res)
        this.projects = res.data || []
        this.loading = false
      })
    },
    async getSurplusInspect () {
      const { data } = await getCheckListByHospitalId({ hospitalId: this.hId, pageNum: 1, pageSize: 10000 })
      const inspectRes = await getAllInspectorList({ pageNum: 1, pageSize: 10000 })
      const inspectAllList = inspectRes.data || []
      const inspectList = data?.filter(i => !i?.status)
      // 未编辑数组
      const arr = []
      inspectList.forEach(el => {
        console.log(el)
        if (!el?.status) {
          if (el?.inspect) {
            // 有选择内容
            try {
              // console.log('====================', JSON.parse(el.inspect).filter(i => !i?.status))
              arr.push(...JSON.parse(el.inspect).filter(i => !i?.status).map(i => {
                return {
                  ...i,
                  formId: el.id,
                  fromType: el.type
                }
              }))
            } catch (e) {
              console.error(e)
            }
          } else {
            // 没有选择内容
            if (el?.inspectConfig) {
              // 有配置
              try {
                arr.push(...el?.inspectConfig.split(',').map(i => {
                  return {
                    ...inspectAllList.find(j => +j?.id === +i),
                    formId: el.id,
                    fromType: el.type
                  }
                }))
              } catch (e) {
                console.error(e)
              }
            } else {
              // 没有配置
            }
            // console.log('run this')
          }
        }
      })
      // console.log(arr)
      // console.log('------------------------', data)
      this.pendingInspectData = arr
    },
    // 展示当前条数详情
    showInfo (record) {
      console.log('----------------------')
      console.log(record)
      const { formId, fromType } = record
      console.log(formId)
      this.$router.push({ path: '/check-info', query: { id: formId, type: fromType } })
    },
    getProjects () {
      this.$http.get('/list/search/projects').then(res => {
        this.projects = res.result && res.result.data
        this.loading = false
      })
    },
    getActivity () {
      this.$http.get('/workplace/activity').then(res => {
        this.activities = res.result
      })
    },
    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
      })
    },
    initRadar () {
      this.radarLoading = true

      this.$http.get('/workplace/radar').then(res => {
        const dv = new DataSet.View().source(res.result)
        dv.transform({
          type: 'fold',
          fields: ['日检', '月检', '年检'],
          key: 'user',
          value: 'score'
        })

        this.radarData = dv.rows
        this.radarLoading = false
      })
    }
  }
}
</script>

<style scoped lang='less'>
@import './Workplace.less';

.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
