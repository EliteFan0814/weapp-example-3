// pages/orderListIntegral/orderListIntegral.js
import request from '../../api/fragment'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTabList: false,
    tabList: [],
    status: '',
    page: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { status } = options
    if (status && status != 'null') {
      this.setData({ status: Number(status) })
    }
    this.fragmentOrder()
  },

  fragmentOrder(type) {
    let { page, status, list } = this.data
    request
      .fragmentOrder({
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
            tabList: res.exValue.FragmentOrderStatusStr,
            showTabList: true
          })
        } else {
          this.setData({
            list: data,
            totalPage,
            tabList: res.exValue.FragmentOrderStatusStr,
            showTabList: true
          })
        }
      })
  },
  onChange(e) {
    this.setData({ status: e.detail.name === null ? '' : e.detail.name })

    this.fragmentOrder()
  },
  open(e) {
    let { url, id } = e.currentTarget.dataset
    console.log(url)
    wx.navigateTo({ url: `/pages/${url}/${url}?id=${id}` })
  },
  
  confirm(e){
    let {id} = e.currentTarget.dataset;
    app.showModal('提示', '是否确认收货？').then(res=>{
      if(!res) return;
      request.confrim(JSON.stringify(id)).then(res=>{
        if(res.success) app.toastSuccess('收货成功');
        this.getInfo();
      })
    })
  },
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.fragmentOrder('down')
    }
  }
})
