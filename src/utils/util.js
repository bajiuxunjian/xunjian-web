
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword (pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1
      score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}

const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0
}
export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.result = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

/**
 * 使用 用户登录的 token 获取用户有权限的菜单
 * 返回结构必须按照这个结构体形式处理，或根据
 * /src/router/generator-routers.js  文件的菜单结构处理函数对应即可
 * @param {*} options
 * @returns
 */
export const userNav = options => {
  //
  // const info = options.url.split('&') || ''
  // const role = info[0].split('=')[1]

  const { role } = options
  let nav = []
  if (~~role === 1) {
    nav = [
      // 业务
      {
        name: 'main',
        parentId: 0,
        id: 801,
        meta: {
          icon: 'dashboard',
          title: '仪表盘',
          show: true
        },
        component: 'RouteView',
        redirect: '/main/homepage'
      },
      {
        name: 'homepage',
        parentId: 801,
        id: 807,
        meta: {
          title: '工作台',
          show: true
        },
        component: 'Dashboard'
      },
      {
        name: 'inspectorList',
        parentId: 801,
        id: 808,
        meta: {
          title: '质检配置列表',
          show: true
        },
        component: 'Inspector'
      },
      {
        name: 'inspector-edit',
        parentId: 801,
        id: 809,
        meta: {
          title: '质检配置',
          show: false
        },
        component: 'InspectorEdit'
      },
      {
        name: 'hospital',
        parentId: 0,
        id: 811,
        meta: {
          title: '医院组',
          show: true,
          icon: 'form'
        },
        component: 'RouteView',
        redirect: '/hospital/hospital-list'
      },
      {
        name: 'hospital-list',
        parentId: 811,
        id: 812,
        meta: {
          title: '医院列表',
          show: true
        },
        component: 'HospitalList'
      },
      {
        name: 'hospital-info',
        parentId: 811,
        id: 813,
        meta: {
          title: '医院详情',
          show: false
        },
        component: 'HospitalInfo'
      },
      {
        name: 'hospital-config',
        parentId: 811,
        id: 814,
        meta: {
          title: '医院质检配置',
          show: false
        },
        component: 'HospitalConfig'
      },
      {
        name: 'check-info',
        parentId: 0,
        id: 822,
        meta: {
          title: '检测日志',
          show: false
        },
        component: 'CheckInfo'
      }

      // dashboard
      // {
      //   name: 'dashboard',
      //   parentId: 0,
      //   id: 1,
      //   meta: {
      //     icon: 'dashboard',
      //     title: '仪表盘',
      //     show: true
      //   },
      //   component: 'RouteView',
      //   redirect: '/dashboard/workplace'
      // },
      // {
      //   name: 'workplace',
      //   parentId: 1,
      //   id: 7,
      //   meta: {
      //     title: '工作台',
      //     show: true
      //   },
      //   component: 'Workplace'
      // },
      // {
      //   name: 'monitor',
      //   path: 'https://www.baidu.com/',
      //   parentId: 1,
      //   id: 3,
      //   meta: {
      //     title: '监控页（外部）',
      //     target: '_blank',
      //     show: true
      //   }
      // },
      // {
      //   name: 'Analysis',
      //   parentId: 1,
      //   id: 2,
      //   meta: {
      //     title: '分析页',
      //     show: true
      //   },
      //   component: 'Analysis',
      //   path: '/dashboard/analysis'
      // },
      //
      // // form
      // {
      //   name: 'form',
      //   parentId: 0,
      //   id: 10,
      //   meta: {
      //     icon: 'form',
      //     title: '表单页'
      //   },
      //   redirect: '/form/base-form',
      //   component: 'RouteView'
      // },
      // {
      //   name: 'basic-form',
      //   parentId: 10,
      //   id: 6,
      //   meta: {
      //     title: '基础表单'
      //   },
      //   component: 'BasicForm'
      // },
      // {
      //   name: 'step-form',
      //   parentId: 10,
      //   id: 5,
      //   meta: {
      //     title: '分步表单'
      //   },
      //   component: 'StepForm'
      // },
      // {
      //   name: 'advanced-form',
      //   parentId: 10,
      //   id: 4,
      //   meta: {
      //     title: '高级表单'
      //   },
      //   component: 'AdvanceForm'
      // },
      //
      // // list
      // {
      //   name: 'list',
      //   parentId: 0,
      //   id: 10010,
      //   meta: {
      //     icon: 'table',
      //     title: '列表页',
      //     show: true
      //   },
      //   redirect: '/list/table-list',
      //   component: 'RouteView'
      // },
      // {
      //   name: 'table-list',
      //   parentId: 10010,
      //   id: 10011,
      //   path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //   meta: {
      //     title: '查询表格',
      //     show: true
      //   },
      //   component: 'TableList'
      // },
      // {
      //   name: 'basic-list',
      //   parentId: 10010,
      //   id: 10012,
      //   meta: {
      //     title: '标准列表',
      //     show: true
      //   },
      //   component: 'StandardList'
      // },
      // {
      //   name: 'card',
      //   parentId: 10010,
      //   id: 10013,
      //   meta: {
      //     title: '卡片列表',
      //     show: true
      //   },
      //   component: 'CardList'
      // },
      // {
      //   name: 'search',
      //   parentId: 10010,
      //   id: 10014,
      //   meta: {
      //     title: '搜索列表',
      //     show: true
      //   },
      //   redirect: '/list/search/article',
      //   component: 'SearchLayout'
      // },
      // {
      //   name: 'article',
      //   parentId: 10014,
      //   id: 10015,
      //   meta: {
      //     title: '搜索列表（文章）',
      //     show: true
      //   },
      //   component: 'SearchArticles'
      // },
      // {
      //   name: 'project',
      //   parentId: 10014,
      //   id: 10016,
      //   meta: {
      //     title: '搜索列表（项目）',
      //     show: true
      //   },
      //   component: 'SearchProjects'
      // },
      // {
      //   name: 'application',
      //   parentId: 10014,
      //   id: 10017,
      //   meta: {
      //     title: '搜索列表（应用）',
      //     show: true
      //   },
      //   component: 'SearchApplications'
      // },
      //
      // // profile
      // {
      //   name: 'profile',
      //   parentId: 0,
      //   id: 10018,
      //   meta: {
      //     title: '详情页',
      //     icon: 'profile',
      //     show: true
      //   },
      //   redirect: '/profile/basic',
      //   component: 'RouteView'
      // },
      // {
      //   name: 'basic',
      //   parentId: 10018,
      //   id: 10019,
      //   meta: {
      //     title: '基础详情页',
      //     show: true
      //   },
      //   component: 'ProfileBasic'
      // },
      // {
      //   name: 'advanced',
      //   parentId: 10018,
      //   id: 10020,
      //   meta: {
      //     title: '高级详情页',
      //     show: true
      //   },
      //   component: 'ProfileAdvanced'
      // },
      //
      // // result
      // {
      //   name: 'result',
      //   parentId: 0,
      //   id: 10021,
      //   meta: {
      //     title: '结果页',
      //     icon: 'check-circle-o',
      //     show: true
      //   },
      //   redirect: '/result/success',
      //   component: 'PageView'
      // },
      // {
      //   name: 'success',
      //   parentId: 10021,
      //   id: 10022,
      //   meta: {
      //     title: '成功',
      //     hiddenHeaderContent: true,
      //     show: true
      //   },
      //   component: 'ResultSuccess'
      // },
      // {
      //   name: 'fail',
      //   parentId: 10021,
      //   id: 10023,
      //   meta: {
      //     title: '失败',
      //     hiddenHeaderContent: true,
      //     show: true
      //   },
      //   component: 'ResultFail'
      // },
      //
      // // Exception
      // {
      //   name: 'exception',
      //   parentId: 0,
      //   id: 10024,
      //   meta: {
      //     title: '异常页',
      //     icon: 'warning',
      //     show: true
      //   },
      //   redirect: '/exception/403',
      //   component: 'RouteView'
      // },
      // {
      //   name: '403',
      //   parentId: 10024,
      //   id: 10025,
      //   meta: {
      //     title: '403',
      //     show: true
      //   },
      //   component: 'Exception403'
      // },
      // {
      //   name: '404',
      //   parentId: 10024,
      //   id: 10026,
      //   meta: {
      //     title: '404',
      //     show: true
      //   },
      //   component: 'Exception404'
      // },
      // {
      //   name: '500',
      //   parentId: 10024,
      //   id: 10027,
      //   meta: {
      //     title: '500',
      //     show: true
      //   },
      //   component: 'Exception500'
      // },
      //
      // // account
      // {
      //   name: 'account',
      //   parentId: 0,
      //   id: 10028,
      //   meta: {
      //     title: '个人页',
      //     icon: 'user',
      //     show: true
      //   },
      //   redirect: '/account/center',
      //   component: 'RouteView'
      // },
      // {
      //   name: 'center',
      //   parentId: 10028,
      //   id: 10029,
      //   meta: {
      //     title: '个人中心',
      //     show: true
      //   },
      //   component: 'AccountCenter'
      // },
      // // 特殊三级菜单
      // {
      //   name: 'settings',
      //   parentId: 10028,
      //   id: 10030,
      //   meta: {
      //     title: '个人设置',
      //     hideHeader: true,
      //     hideChildren: true,
      //     show: true
      //   },
      //   redirect: '/account/settings/basic',
      //   component: 'AccountSettings'
      // },
      // {
      //   name: 'BasicSettings',
      //   path: '/account/settings/basic',
      //   parentId: 10030,
      //   id: 10031,
      //   meta: {
      //     title: '基本设置',
      //     show: false
      //   },
      //   component: 'BasicSetting'
      // },
      // {
      //   name: 'SecuritySettings',
      //   path: '/account/settings/security',
      //   parentId: 10030,
      //   id: 10032,
      //   meta: {
      //     title: '安全设置',
      //     show: false
      //   },
      //   component: 'SecuritySettings'
      // },
      // {
      //   name: 'CustomSettings',
      //   path: '/account/settings/custom',
      //   parentId: 10030,
      //   id: 10033,
      //   meta: {
      //     title: '个性化设置',
      //     show: false
      //   },
      //   component: 'CustomSettings'
      // },
      // {
      //   name: 'BindingSettings',
      //   path: '/account/settings/binding',
      //   parentId: 10030,
      //   id: 10034,
      //   meta: {
      //     title: '账户绑定',
      //     show: false
      //   },
      //   component: 'BindingSettings'
      // },
      // {
      //   name: 'NotificationSettings',
      //   path: '/account/settings/notification',
      //   parentId: 10030,
      //   id: 10034,
      //   meta: {
      //     title: '新消息通知',
      //     show: false
      //   },
      //   component: 'NotificationSettings'
      // }
    ]
  } else {
    nav = [
      // 业务
      {
        name: 'main',
        parentId: 0,
        id: 801,
        meta: {
          icon: 'dashboard',
          title: '仪表盘',
          show: true
        },
        component: 'RouteView',
        redirect: '/main/homepage'
      },
      {
        name: 'homepage',
        parentId: 801,
        id: 807,
        meta: {
          title: '工作台',
          show: true
        },
        component: 'Dashboard'
      },
      // {
      //   name: 'inspectorList',
      //   parentId: 801,
      //   id: 808,
      //   meta: {
      //     title: '质检配置列表',
      //     show: true
      //   },
      //   component: 'Inspector'
      // },
      // {
      //   name: 'inspector-edit',
      //   parentId: 801,
      //   id: 809,
      //   meta: {
      //     title: '质检配置',
      //     show: false
      //   },
      //   component: 'InspectorEdit'
      // },
      // {
      //   name: ''
      // }
      {
        name: 'hospital',
        parentId: 0,
        id: 811,
        meta: {
          title: '医院详情',
          show: true,
          icon: 'form'
        },
        component: 'RouteView',
        redirect: '/hospital/hospital-info'
      },
      // {
      //   name: 'hospital-list',
      //   parentId: 811,
      //   id: 812,
      //   meta: {
      //     title: '医院列表',
      //     show: true
      //   },
      //   component: 'HospitalList'
      // },
      {
        name: 'hospital-info',
        parentId: 811,
        id: 813,
        meta: {
          title: '医院详情',
          show: true
        },
        component: 'HospitalInfo'
      },
      {
        name: 'hospital-config',
        parentId: 811,
        id: 814,
        meta: {
          title: '医院质检配置',
          show: false
        },
        component: 'HospitalConfig'
      },
      {
        name: 'check-info',
        parentId: 0,
        id: 822,
        meta: {
          title: '检测日志',
          show: false
        },
        component: 'CheckInfo'
      }

      // dashboard
      // {
      //   name: 'dashboard',
      //   parentId: 0,
      //   id: 1,
      //   meta: {
      //     icon: 'dashboard',
      //     title: '仪表盘',
      //     show: true
      //   },
      //   component: 'RouteView',
      //   redirect: '/dashboard/workplace'
      // },
      // {
      //   name: 'workplace',
      //   parentId: 1,
      //   id: 7,
      //   meta: {
      //     title: '工作台',
      //     show: true
      //   },
      //   component: 'Workplace'
      // },
      // {
      //   name: 'monitor',
      //   path: 'https://www.baidu.com/',
      //   parentId: 1,
      //   id: 3,
      //   meta: {
      //     title: '监控页（外部）',
      //     target: '_blank',
      //     show: true
      //   }
      // },
      // {
      //   name: 'Analysis',
      //   parentId: 1,
      //   id: 2,
      //   meta: {
      //     title: '分析页',
      //     show: true
      //   },
      //   component: 'Analysis',
      //   path: '/dashboard/analysis'
      // },
      //
      // // form
      // {
      //   name: 'form',
      //   parentId: 0,
      //   id: 10,
      //   meta: {
      //     icon: 'form',
      //     title: '表单页'
      //   },
      //   redirect: '/form/base-form',
      //   component: 'RouteView'
      // },
      // {
      //   name: 'basic-form',
      //   parentId: 10,
      //   id: 6,
      //   meta: {
      //     title: '基础表单'
      //   },
      //   component: 'BasicForm'
      // },
      // {
      //   name: 'step-form',
      //   parentId: 10,
      //   id: 5,
      //   meta: {
      //     title: '分步表单'
      //   },
      //   component: 'StepForm'
      // },
      // {
      //   name: 'advanced-form',
      //   parentId: 10,
      //   id: 4,
      //   meta: {
      //     title: '高级表单'
      //   },
      //   component: 'AdvanceForm'
      // },
      //
      // // list
      // {
      //   name: 'list',
      //   parentId: 0,
      //   id: 10010,
      //   meta: {
      //     icon: 'table',
      //     title: '列表页',
      //     show: true
      //   },
      //   redirect: '/list/table-list',
      //   component: 'RouteView'
      // },
      // {
      //   name: 'table-list',
      //   parentId: 10010,
      //   id: 10011,
      //   path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //   meta: {
      //     title: '查询表格',
      //     show: true
      //   },
      //   component: 'TableList'
      // },
      // {
      //   name: 'basic-list',
      //   parentId: 10010,
      //   id: 10012,
      //   meta: {
      //     title: '标准列表',
      //     show: true
      //   },
      //   component: 'StandardList'
      // },
      // {
      //   name: 'card',
      //   parentId: 10010,
      //   id: 10013,
      //   meta: {
      //     title: '卡片列表',
      //     show: true
      //   },
      //   component: 'CardList'
      // },
      // {
      //   name: 'search',
      //   parentId: 10010,
      //   id: 10014,
      //   meta: {
      //     title: '搜索列表',
      //     show: true
      //   },
      //   redirect: '/list/search/article',
      //   component: 'SearchLayout'
      // },
      // {
      //   name: 'article',
      //   parentId: 10014,
      //   id: 10015,
      //   meta: {
      //     title: '搜索列表（文章）',
      //     show: true
      //   },
      //   component: 'SearchArticles'
      // },
      // {
      //   name: 'project',
      //   parentId: 10014,
      //   id: 10016,
      //   meta: {
      //     title: '搜索列表（项目）',
      //     show: true
      //   },
      //   component: 'SearchProjects'
      // },
      // {
      //   name: 'application',
      //   parentId: 10014,
      //   id: 10017,
      //   meta: {
      //     title: '搜索列表（应用）',
      //     show: true
      //   },
      //   component: 'SearchApplications'
      // },
      //
      // // profile
      // {
      //   name: 'profile',
      //   parentId: 0,
      //   id: 10018,
      //   meta: {
      //     title: '详情页',
      //     icon: 'profile',
      //     show: true
      //   },
      //   redirect: '/profile/basic',
      //   component: 'RouteView'
      // },
      // {
      //   name: 'basic',
      //   parentId: 10018,
      //   id: 10019,
      //   meta: {
      //     title: '基础详情页',
      //     show: true
      //   },
      //   component: 'ProfileBasic'
      // },
      // {
      //   name: 'advanced',
      //   parentId: 10018,
      //   id: 10020,
      //   meta: {
      //     title: '高级详情页',
      //     show: true
      //   },
      //   component: 'ProfileAdvanced'
      // },
      //
      // // result
      // {
      //   name: 'result',
      //   parentId: 0,
      //   id: 10021,
      //   meta: {
      //     title: '结果页',
      //     icon: 'check-circle-o',
      //     show: true
      //   },
      //   redirect: '/result/success',
      //   component: 'PageView'
      // },
      // {
      //   name: 'success',
      //   parentId: 10021,
      //   id: 10022,
      //   meta: {
      //     title: '成功',
      //     hiddenHeaderContent: true,
      //     show: true
      //   },
      //   component: 'ResultSuccess'
      // },
      // {
      //   name: 'fail',
      //   parentId: 10021,
      //   id: 10023,
      //   meta: {
      //     title: '失败',
      //     hiddenHeaderContent: true,
      //     show: true
      //   },
      //   component: 'ResultFail'
      // },
      //
      // // Exception
      // {
      //   name: 'exception',
      //   parentId: 0,
      //   id: 10024,
      //   meta: {
      //     title: '异常页',
      //     icon: 'warning',
      //     show: true
      //   },
      //   redirect: '/exception/403',
      //   component: 'RouteView'
      // },
      // {
      //   name: '403',
      //   parentId: 10024,
      //   id: 10025,
      //   meta: {
      //     title: '403',
      //     show: true
      //   },
      //   component: 'Exception403'
      // },
      // {
      //   name: '404',
      //   parentId: 10024,
      //   id: 10026,
      //   meta: {
      //     title: '404',
      //     show: true
      //   },
      //   component: 'Exception404'
      // },
      // {
      //   name: '500',
      //   parentId: 10024,
      //   id: 10027,
      //   meta: {
      //     title: '500',
      //     show: true
      //   },
      //   component: 'Exception500'
      // },
      //
      // // account
      // {
      //   name: 'account',
      //   parentId: 0,
      //   id: 10028,
      //   meta: {
      //     title: '个人页',
      //     icon: 'user',
      //     show: true
      //   },
      //   redirect: '/account/center',
      //   component: 'RouteView'
      // },
      // {
      //   name: 'center',
      //   parentId: 10028,
      //   id: 10029,
      //   meta: {
      //     title: '个人中心',
      //     show: true
      //   },
      //   component: 'AccountCenter'
      // },
      // // 特殊三级菜单
      // {
      //   name: 'settings',
      //   parentId: 10028,
      //   id: 10030,
      //   meta: {
      //     title: '个人设置',
      //     hideHeader: true,
      //     hideChildren: true,
      //     show: true
      //   },
      //   redirect: '/account/settings/basic',
      //   component: 'AccountSettings'
      // },
      // {
      //   name: 'BasicSettings',
      //   path: '/account/settings/basic',
      //   parentId: 10030,
      //   id: 10031,
      //   meta: {
      //     title: '基本设置',
      //     show: false
      //   },
      //   component: 'BasicSetting'
      // },
      // {
      //   name: 'SecuritySettings',
      //   path: '/account/settings/security',
      //   parentId: 10030,
      //   id: 10032,
      //   meta: {
      //     title: '安全设置',
      //     show: false
      //   },
      //   component: 'SecuritySettings'
      // },
      // {
      //   name: 'CustomSettings',
      //   path: '/account/settings/custom',
      //   parentId: 10030,
      //   id: 10033,
      //   meta: {
      //     title: '个性化设置',
      //     show: false
      //   },
      //   component: 'CustomSettings'
      // },
      // {
      //   name: 'BindingSettings',
      //   path: '/account/settings/binding',
      //   parentId: 10030,
      //   id: 10034,
      //   meta: {
      //     title: '账户绑定',
      //     show: false
      //   },
      //   component: 'BindingSettings'
      // },
      // {
      //   name: 'NotificationSettings',
      //   path: '/account/settings/notification',
      //   parentId: 10030,
      //   id: 10034,
      //   meta: {
      //     title: '新消息通知',
      //     show: false
      //   },
      //   component: 'NotificationSettings'
      // }
    ]
  }
  const json = builder(nav)
  console.log('json', json)
  return json
}
