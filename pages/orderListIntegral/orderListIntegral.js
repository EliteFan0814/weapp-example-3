// pages/orderListIntegral/orderListIntegral.js
import request from '../../api/integral'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      { name: '待收货', value: 10 },
      { name: '确认收货', value: 20 },
      { name: '待发货', value: 0 }
    ],
    status: '',
    page: 1,
    list: []
  },
  copyText(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '复制失败',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { status } = options
    if (status && status != 'null') {
      this.setData({ status: Number(status) })
    }
    this.integralOrder()
  },

  integralOrder(type) {
    let { page, status, list } = this.data
    request
      .integralOrder({
        page,
        pageSize: 10,
        status
      })
      .then((res) => {
        const { data, totalPage } = res.value
        if (type == 'down') {
          list.push(...data)
          this.setData({
            list,
            totalPage,
            tabList: res.exValue.IntegralOrderStatusStr
          })
        } else {
          this.setData({
            list: data,
            totalPage,
            tabList: res.exValue.IntegralOrderStatusStr
          })
        }
      })
  },

  confirm(e) {
    let { id } = e.currentTarget.dataset
    app.showModal('提示', '是否确认收货？').then((res) => {
      if (!res) return
      request.confrim(JSON.stringify(id)).then((res) => {
        if (res.success) app.toastSuccess('收货成功')
        this.integralOrder()
      })
    })
  },

  onChange(e) {
    this.setData({ status: e.detail.name })
    this.integralOrder()
  },
  open(e) {
    let { url, id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/${url}/${url}?id=${id}` })
  },

  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.integralOrder('down')
    }
  }
})
