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
      {name: "待取货", value: 0}, 
      {name: "代发货", value: 10}, 
      {name: "待收货", value: 20}, 
      {name: "确认收货", value: 30}, 
    ],
    active: '',
    showTab: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.drawOrder()
    this.drawOrderScreen()
  },

  drawOrder(type) {
    let { page, status, list } = this.data
    request
      .drawOrder({
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

  drawOrderScreen() {
    request.drawOrderScreen().then((res) => {
      this.setData({  showTab: true })
    })
  },
  
  onChange(e) {
    this.setData({ status: e.detail.name })
    this.drawOrder()
  },
  open(e){
    let {url, id} = e.currentTarget.dataset;
    wx.navigateTo({url: `/pages/${url}/${url}?id=${id}`});
  },
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.drawOrder('down')
    }
  }
})
