import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 889

const getHospitalInspectList = () => {
  const result = [
    {
      key: 1,
      id: 1,
      status: true,
      name: '2022-08-22',
      description: '日检'
    },
    {
      key: 2,
      id: 2,
      status: false,
      name: '2022-08-23',
      description: '月检'
    }

  ]
  return builder({
    data: result
  })
}

const mockHospitalList = () => {
  const result = [
  {
    key: 1,
    id: 1,
    name: '兰州重离子医院mock',
    description: '这是一段描述'
  },
  {
    key: 2,
    id: 2,
    name: '福建重离子医院mock',
    description: '这是一段描述'
  }

  ]
  return builder({
    data: result
  })
}

const serverList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: 'No ' + tmpKey,
      name: '医院名称' + tmpKey,
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const projects = () => {
  return builder({
    'data': [{
      id: 1,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      title: '兰州医院',
      description: '医院介绍详情',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 2,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      title: '福建医院',
      description: '医院介绍详情',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    }
    // {
    //   id: 3,
    //   cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    //   title: 'Ant Design',
    //   description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    //   status: 1,
    //   updatedAt: '2018-07-26 00:00:00'
    // },
    // {
    //   id: 4,
    //   cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    //   title: 'Ant Design Pro',
    //   description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    //   status: 1,
    //   updatedAt: '2018-07-26 00:00:00'
    // },
    // {
    //   id: 5,
    //   cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
    //   title: 'Bootstrap',
    //   description: '凛冬将至',
    //   status: 1,
    //   updatedAt: '2018-07-26 00:00:00'
    // },
    // {
    //   id: 6,
    //   cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
    //   title: 'Vue',
    //   description: '生命就像一盒巧克力，结果往往出人意料',
    //   status: 1,
    //   updatedAt: '2018-07-26 00:00:00'
    // }
    ],
    'pageSize': 10,
    'pageNo': 0,
    'totalPage': 6,
    'totalCount': 57
  })
}

const activity = () => {
  return builder([{
    id: 1,
    user: {
      nickname: '王腾辉',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '兰州医院',
      action: '更新',
      event: '日检'
    },
    time: '2018-08-23 14:47:00'
  },
  {
    id: 1,
    user: {
      nickname: '巴玖',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
    },
    project: {
      name: '兰州医院',
      action: '创建',
      event: '年检'
    },
    time: '2018-08-23 09:35:37'
  },
  {
    id: 1,
    user: {
      nickname: '巴玖',
      avatar: '@image(64x64)'
    },
    project: {
      name: '兰州医院',
      action: '更细',
      event: '日检'
    },
    time: '2017-05-27 00:00:00'
  }
  // {
  //   id: 1,
  //   user: {
  //     nickname: '曲丽丽',
  //     avatar: '@image(64x64)'
  //   },
  //   project: {
  //     name: '高逼格设计天团',
  //     action: '更新',
  //     event: '六月迭代'
  //   },
  //   time: '2018-08-23 14:47:00'
  // },
  // {
  //   id: 1,
  //   user: {
  //     nickname: '@name',
  //     avatar: '@image(64x64)'
  //   },
  //   project: {
  //     name: '高逼格设计天团',
  //     action: 'created',
  //     event: '六月迭代'
  //   },
  //   time: '2018-08-23 14:47:00'
  // },
  // {
  //   id: 1,
  //   user: {
  //     nickname: '曲丽丽',
  //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  //   },
  //   project: {
  //     name: '高逼格设计天团',
  //     action: 'created',
  //     event: '六月迭代'
  //   },
  //   time: '2018-08-23 14:47:00'
  // }
  ])
}

const teams = () => {
  return builder([{
    id: 1,
    name: '罗主任',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  },
  {
    id: 2,
    name: '赵五元',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
  },
  {
    id: 1,
    name: '王腾辉',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
  },
  {
    id: 1,
    name: '巴玖',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
  },
  {
    id: 1,
    name: '李霆',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'
  }
  ])
}

const radar = () => {
  return builder([{
    item: '维度1',
    '日检': 70,
    '月检': 30,
    '年间': 40
  },
  {
    item: '维度2',
    '日检': 60,
    '月检': 70,
    '年间': 40
  },
  {
    item: '维度3',
    '日检': 50,
    '月检': 60,
    '年间': 40
  }
  // {
  //   item: '贡献',
  //   '个人': 40,
  //   '团队': 50,
  //   '部门': 40
  // },
  // {
  //   item: '热度',
  //   '个人': 60,
  //   '团队': 70,
  //   '部门': 40
  // },
  // {
  //   item: '引用',
  //   '个人': 70,
  //   '团队': 50,
  //   '部门': 40
  // }
  ])
}

Mock.mock(/\/hospitalList/, 'get', mockHospitalList)
Mock.mock(/\/getHospitalInspectList/, 'get', getHospitalInspectList)

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
