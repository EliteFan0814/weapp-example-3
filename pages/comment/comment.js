// pages/order/orderevaluate.js
import { addcom } from '../../api/comment'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    order_item_id: '',
    order_item: {},
    picurls: [],
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = JSON.parse(options.item)
    this.setData({
      order_item_id: obj.id,
      order_item: obj
    })
  },
  // 上传图片
  aspectFitf() {},
  // 删除图片
  deleteimg(e) {
    this.data.fileList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      fileList: this.data.fileList
    })
    console.log(this.data.fileList)
  },
  // 上传图片
  afterRead(e) {
    const { file } = e.detail
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://guanlinyouxuan.com/member/image/upload',
      filePath: file.path,
      name: 'file',
      formData: {
        user: 'test'
      },
      success: (res) => {
        var item = JSON.parse(res.data)
        const { fileList = [] } = this.data
        fileList.push({
          fileurl: item.data.fileurl,
          url: item.data.fileurl_str
        })
        this.setData({
          fileList
        })
      }
    })
  },

  delImg(e) {
    let index = e.detail.index
    let data = this.data.fileList
    data.splice(index, 1)
    this.setData({
      fileList: data
    })
  },

  filterList() {
    let list = []
    const { fileList = [], picurls = [] } = this.data
    fileList.map((item) => {
      list.push(item.fileurl)
    })
    this.setData({
      picurls: list
    })
  },

  setInputval(e) {
    // app.pulicSetData(e, this)
    console.log(e)
    this.setData({
      content: e.detail.value
    })
  },
  submit() {
    this.filterList()
    this.addcom()
  },

  addcom() {
    if (this.data.content) {
      const { order_item_id, content, picurls } = this.data
      addcom({
        order_item_id,
        content,
        picurls
      })
        .then((res) => {
          if (res.code == 1) {
            app.toastSuccess('评价成功')
            wx.navigateBack()
          } else {
            app.toastFail(res.msg)
          }
        })
        .catch((err) => {
          app.toastFail(err.msg)
        })
    } else {
      app.toastFail('请输入评价内容')
    }
  }
})
