<template>
  <page-header-wrapper class="aaa">
    <a-button style="text-align: center" @click="$router.go(-1)">返回</a-button>
    <a-card
      v-for="(item, index) in list"
      style="width: 80%;margin:4px auto"
      :key="index"
      :title="item.name">
      <!--      <a slot="extra" href="#">未完成</a>-->
      <a slot="extra" href="#" style="color: red">{{ !item.status?"待检测": +item.status == 1?"待批准":"已完成" }}</a>
      <div style="display: flex;margin-bottom: 10px">
        <span style="width: 120px;display: inline-block">检测目的:</span>
        <div style="width: calc(100% - 120px)">{{ item.goal }}</div>
      </div>
      <div style="display: flex;margin-bottom: 10px">
        <span style="width: 120px;display: inline-block;">检测方法:</span>
        <div style="width: calc(100% - 120px)">{{ item.method }}</div>
      </div>
      <div style="display: flex;margin-bottom: 10px">
        <span style="width: 120px;display: inline-block;">性能要求:</span>
        <div style="width: calc(100% - 120px)">{{ item.require }}</div>
      </div>
      <div style="display: flex;margin-bottom: 10px">
        <span style="width: 120px;display: inline-block;">图片上传:</span>
        <div style="width: calc(100% - 120px)">
          <a-upload
            :disabled="role === 1"
            action=""
            list-type="picture-card"
            :file-list="item.fileList"
            @preview="handlePreview"
            :customRequest="customUpload"
            @change="changeUploadInfo(item,index)"
          >
            <div v-if="fileList.length < 8 && role !== 1" >
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </div>
      </div>

      <!--      @change="handleChange"-->

      <div style="display: flex;margin-bottom: 10px;height: 40px;line-height: 40px">
        <span style="width: 120px;display: inline-block;">实际性能:</span>
        <div style="width: calc(100% - 120px)">
          <a-input v-model="item.msg" placeholder="请输入实际性能数值" :disabled="role != 2 || item.status == 2" style="width: 200px"/>
        </div>
      </div>
      <div v-if="role == 1 && !!item.msg">
        <a-button type="primary" style="float: right" @click="update(item,index, true)">
          {{ item.status == 1 ? "批准通过":"取消批准" }}
        </a-button>
      </div>
      <div v-if="role == 2">
        <a-button type="primary" style="float: right" @click="update(item,index)">
          {{ item.status ? "修改数值":"满足实际性能" }}
        </a-button>
      </div>
    </a-card>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </page-header-wrapper>
</template>

<script>

import { getCheckInfoById, updateCheckListById } from '@/api/check'
import { getAllInspectorList } from '@/api/manage'
import store from '@/store'
import OSS from 'ali-oss'
import { v4 as uuidv4 } from 'uuid'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'CheckInfo',
  created () {
  },
  mounted () {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    if (this.id && this.type) {
      this.getInspectList(this.type)
    }
    // console.log('=============================')
    // console.log(store.state.user.info.roleInt)
    this.role = store.state.user.info.roleInt || 0
  },
  data () {
    return {
      actIndex: -1,
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'http://xunjian89.oss-cn-zhangjiakou.aliyuncs.com/img/5fdb24d1-5f41-4266-a3a7-356bda971399.jpg?OSSAccessKeyId=LTAI5t81TEb8BWreakY6krH5&Expires=1665913158&Signature=KdPvSNw7tuZaw%2BiDOM%2F6c0VJBWQ%3D'
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error'
        }
      ],
      role: 0,
      list: [],
      allList: [],
      checkData: null,
      confirmListData: [],
      // 图像预览
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    // 图片上传
    customUpload (e) {
      console.log('aaaaaaaaaaaa')
      console.log(e)
      const { file } = e
      this.upload(file)
    },
    // 长传图片 item 详情
    changeUploadInfo (item, index) {
      this.actIndex = index
      console.log(item, index)
      item.fileList = item.fileList.filter(i => i.status === 'done')
      const newList = [...this.list]
      this.$set(this.list, newList)
      this.update(item, this.actIndex)
    },
    /**
     *  oss上传图片时转化为buffer
     * @param {bold} img 图片流
     */
    readFileAsBuffer (file) {
      const reader = new FileReader()
      return new Promise((resolve) => {
        reader.readAsDataURL(file)
        reader.onload = function () {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ''
          )
          resolve(new OSS.Buffer(base64File, 'base64'))
        }
      })
    },
    // 图片上传到oss
    upload (file) {
      new Promise((resolve) => {
        // 此处要使用oss生成对应的buffer
        const buf = this.readFileAsBuffer(file)
        resolve(buf)
      }).then((buf) => {
        // 此处文件名若有重复的，会在阿里云oss上生成不同版本的文件，配置服务器上的oss可以在上传的时候获取到对应的版本，
        // 后续通过版本和路径可以拿到对应的内容，此处不详细介绍了
        const url = `img/${uuidv4()}.jpg` // 此处的'/'会上传到阿里云对应的目录文件夹下，没有文件夹，会自动新建
        window.client.put(url, buf).then((res) => {
          console.log(res)
          this.signatureUrl(res)
        })
      })
    },
    // 生成能够回显的地址(3600秒的有效时间)
    signatureUrl (data) {
    // 此时的url就是可以访问链接
      const url = window.client.signatureUrl(decodeURIComponent(data.name))
      console.log('url is : ', url)
      try {
        const uid = uuidv4()
        const fileInfo = {
            uid: uid,
            name: `${uid}.jpg`,
            status: 'done',
            url: url
          }
        console.log(fileInfo)
        console.log(this.list)
        console.log('rnu1', this.actIndex)
        if (this.list[this.actIndex]?.fileList?.length) {
          this.list[this.actIndex].fileList.push(fileInfo)
          const item = this.list[this.actIndex]
          const newList = [...this.list]
          this.$set(this.list, newList)
          this.update(item, this.actIndex)
        } else {
          console.log('run 2', this.list)
          // this.list[this.actIndex].fileList = [fileInfo]
          this.list[this.actIndex].fileList = [fileInfo]
          const newList = [...this.list]
          this.$set(this.list, newList)
          const item = this.list[this.actIndex]
          this.update(item, this.actIndex)
          console.log(newList)
        }
      } catch (e) {
        console.error('上传错误')
      }
    },
    // 更新表数据
    async update (el, index, isApprove) {
      const item = el
      console.log(el, index)
      if (isApprove) {
        +item.status === 2 ? item.status = 1 : item.status = 2
      } else {
        item.status = +!!item?.msg
      }
      // console.log('===========================', item)

      // console.log(this.confirmListData)
      // console.log(this.checkData.inspect)
      try {
        // const inspect = this.checkData.inspect || '[]'
        // const strArr = JSON.parse(inspect)
        const strArr = this.list
        strArr[index] = item
        this.checkData.status = +!strArr?.find(i => !i?.status) || 0
        this.checkData.inspect = JSON.stringify(strArr) || ''
        // console.log({ ...this.checkData })
        console.log({ ...this.checkData })
        await updateCheckListById({ ...this.checkData })
        this.$message.success('保存成功')
        return
      } catch (e) {
        this.$message.error('保存失败,请联系管理员')
        console.error(e)
      }
      // eslint-disable-next-line no-unreachable
      // this.confirmListData[index] = item
    },
    async getCheckData (id) {
      const { data } = await getCheckInfoById({ id })
      // console.log('--------------------------------')
      this.checkData = data
      // 获取配置详情
      const { inspectConfig, inspect } = data
      // console.log('--------------', data)
      const configArr = inspectConfig?.split(',')
      if (inspect) {
        try {
          this.list = JSON.parse(inspect)
        } catch (e) {
          this.list = []
        }
      } else {
        // configArr
        // console.log(this.allList)
        this.list = this.allList.filter(i => !!configArr.find(j => +j === +i.id))
      }
      this.confirmListData = []
      this.confirmListData = this.list.map(i => i)

      // console.log('---------------', this.confirmListData)
    },
    // 根据检测类型查找对应原子
    async getInspectList (type) {
      const param = {
        day: 0,
        year: 0,
        month: 0
      }
      switch (+type) {
        case 1:
          param.day = 1
          break
        case 2:
          param.month = 1
          break
        case 3:
          param.year = 1
          break
      }
      const { data } = await getAllInspectorList({ ...param })
      this.allList = data || []
      const res = await this.getCheckData(this.id)
      console.log(res)
    },
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    }
  }
}
</script>

<style scoped>
.aaa {
  /*user-select: none;*/
}
</style>
