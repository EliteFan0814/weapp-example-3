// pages/orderList/orderList.js
import request from '../../api/order'
import pay from '../../utils/pay'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: [],
    isGetTabs: false,
    list: [],
    scrollTop: 0,
    loading: false,
    page: 1,
    totalPage: 1,
    status: '',
    remark: '',
    isPushing: false
  },

  onLoad: function (options) {
    let { status } = options
    if (status && status != 'null') {
      this.setData({ status: Number(status) })
    }
  },
  onShow() {
    this.setData({ page: 1 })
    this.getData()
  },
  getData(type) {
    const { page, status, list } = this.data
    request.orderList({ page, pageSize: 10, status }).then((res) => {
      const { data, totalPage } = res.value
      if (data.length) {
        data.forEach((item) => {
          item.isOpen = false
          item.length = item.orderDetails.length
          item.firstChild = [item.orderDetails[0]]
          item.serviceDate = item.selectSend
          item.isPushing = false
        })
      }
      if (type == 'down') {
        list.push(...data)
        this.setData({
          list,
          totalPage,
          loading: false,
          tabList: res.exValue.OrderStatusStr,
          isGetTabs: true
        })
      } else {
        this.setData({
          list: data,
          totalPage,
          loading: false,
          tabList: res.exValue.OrderStatusStr,
          isGetTabs: true
        })
      }
    })
  },

  onChange(e) {
    this.setData({ status: e.detail.name == null ? '' : e.detail.name })
    this.getData()
  },
  openClick(e) {
    const { item, index } = e.currentTarget.dataset
    if (item.orderDetails.length == 0) return
    const { list } = this.properties
    list[index]['isOpen'] = !list[index]['isOpen']
    this.setData({
      list
    })
  },
  pay(e) {
    let { id } = e.currentTarget.dataset
    if (this.data.isPushing) return
    this.setData({ isPushing: true })
    request
      .payOrder(JSON.stringify(id))
      .then((res) => {
        const payInfo = res.value.prepayObj.prepayObj
        pay
          .wxPay(payInfo)
          .then((res) => {
            app.toastSuccess('支付成功！')
            console.log(res)
            this.setData({
              isPushing: false
            })
          })
          .catch((err) => {
            app.toastFail('支付失败！')
            this.setData({
              isPushing: false
            })
          })
      })
      .catch((err) => {
        this.setData({
          isPushing: false
        })
      })
  },
  cancelOrder(e) {
    let { id } = e.currentTarget.dataset
    const self = this
    wx.showModal({
      title: '提示',
      content: '确定取消订单吗？',
      success: function (res) {
        if (res.confirm) {
          request.cancel(JSON.stringify(id)).then((res) => {
            app.toastSuccess('取消订单成功')
            self.getData()
          })
        }
      }
    })
  },

  makePhone(e) {
    let { phone } = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  confirm(e) {
    let { id } = e.currentTarget.dataset
    app.showModal('提示', '是否确认收货？').then((res) => {
      if (!res) return
      request.confirm(JSON.stringify(id)).then((res) => {
        if (res.success) app.toastSuccess('收货成功')
        this.getData()
      })
    })
  },

  open(e) {
    wx.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${e.currentTarget.dataset.id}` })
  },

  // 申请退款
  refund(e) {
    let { id } = e.currentTarget.dataset
    this.setData({
      orderId: id,
      refundDialog: true
    })
  },
  inputChange(e) {
    app.setData(e, this)
  },
  refundCancel() {
    this.setData({
      refundDialog: false,
      remark: ''
    })
  },

  submit() {
    const { remark, orderId } = this.data
    if (!remark) {
      return app.toastFail('请输入退款原因')
    } else {
      request.refund({ remark, orderId }).then((res) => {
        if (res.success) {
          app.toastSuccess('申请成功')
          this.setData({ refundDialog: false })
          this.getData()
        }
      })
    }
  },

  loadMore() {
    if (this.data.loading) return
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getData('down')
      this.setData({
        loading: true
      })
    }
  }
})
