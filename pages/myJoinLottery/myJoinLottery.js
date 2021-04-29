// pages/orderListIntegral/orderListIntegral.js
import request from '../../api/personal'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    status: '',
    list: [],
    tabList: [

    ],
    active: '',
    showTab: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.joinDrawOrder()
  },

  joinDrawOrder(type) {
    let { page, status, list } = this.data
    request
      .joinDrawOrder({
        page,
        pageSize: 10,
        status
      })
      .then((res) => {
        const { data, totalPage } = res.value
        data.forEach((item) => {
          item.beginDate = item.beginDate.split(' ')[0] || ''
          item.endDate = item.endDate.split(' ')[0] || ''
        })
        if (type == 'down') {
          list.push(...data)
          this.setData({
            list,
            totalPage
          })
        } else {
          this.setData({
            list: data,
            totalPage
          })
        }
      })
  },
  
  onChange(e) {
    this.setData({ status: e.detail.name })
    this.joinDrawOrder()
  },
  open(e){
    let {url, id} = e.currentTarget.dataset;
    wx.navigateTo({url: `/pages/${url}/${url}?id=${id}`});
  },
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.joinDrawOrder('down')
    }
  }
})
