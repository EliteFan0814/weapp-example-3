import request from '../../api/order'
import personal from '../../api/personal'
import wxPosition from '../../utils/authPosition'
import pay from '../../utils/pay'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    integral: 0,
    latitude: undefined,
    longitude: undefined,
    radio: 'WX',
    cartIdList: [],
    cartInfoList: [],
    address: {},
    addressId: undefined,
    addressStatus: false,
    activeId: undefined,
    getWay: 'autoGet',
    selfGetInfo: undefined,
    isGetPositionAuth: false,
    mainActiveIndex: 0,
    timeSelectList: [
      {
        text: '今天',
        children: [
          { text: '15:00', id: 1 },
          { text: '16:00', id: 2 },
          { text: '17:00', id: 3 }
        ]
      },
      {
        text: '明天',
        children: [
          { text: '15:00', id: 1 },
          { text: '16:00', id: 2 },
          { text: '17:00', id: 3 }
        ]
      }
    ],
    isSelectedTime: false,
    total: 0,
    showTimeDialog: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },

    selectDateDay: undefined,
    selectDateTime: undefined,
    isPushing: false,
    buyNowProd: {},
    buyNowSpec: {},
    buyNowNum: 0,
    type: undefined
  },
  // 未授权定位则打开授权设置页面
  showAuthPosition() {
    wxPosition.isAuthPosition().then((res) => {
      if (res) {
        this.setData({ isGetPositionAuth: true })
      }
    })
  },
  getUserInfo() {
    personal
      .getUserInfo()
      .then((res) => {
        let { accountInfo } = res.value
        this.setData({
          integral: accountInfo.intergral
        })
      })
      .catch((err) => {})
  },
  // 确认订单
  payOrder() {
    if (this.data.getWay === 'autoGet' && !this.data.addressId) return app.toastFail('请选择收货地址！')
    this.setData({
      isPushing: true
    })
    if (this.data.type === 'cart') {
      // 购物车购买
      request
        .buyCart(this.data.cartIdList, this.data.addressId)
        .then((res) => {
          const payInfo = res.value.prepayObj
          pay
            .wxPay(payInfo)
            .then((res) => {
              app.toastSuccess('支付成功！')
              console.log(res)
              this.setData({
                isPushing: false
              })
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/orderList/orderList'
                })
              }, 1500)
            })
            .catch((err) => {
              app.toastFail('支付失败！')
              this.setData({
                isPushing: false
              })
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/orderList/orderList?status=0'
                })
              }, 1500)
            })
        })
        .catch((err) => {
          this.setData({
            isPushing: false
          })
        })
    } else if (this.data.type === 'buyNow') {
      // 立即购买
      request
        .buyNow(this.data.buyNowSpec.id, this.data.buyNowProd.shopId, this.data.buyNowNum, this.data.addressId)
        .then((res) => {
          const payInfo = res.value.prepayObj
          pay
            .wxPay(payInfo)
            .then((res) => {
              app.toastSuccess('支付成功！')
              console.log(res)
              this.setData({
                isPushing: false
              })
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/orderList/orderList'
                })
              }, 1500)
            })
            .catch((err) => {
              app.toastFail('支付失败！')
              this.setData({
                isPushing: false
              })
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/orderList/orderList?status=0'
                })
              }, 1500)
            })
        })
        .catch((err) => {
          this.setData({
            isPushing: false
          })
        })
    } else if (this.data.type === 'exchange') {
      let { addressId, buyNowProd, buyNowNum } = this.data
      personal
        .buyExchange({ addressId, settingId: buyNowProd.settingId, count: buyNowNum })
        .then((res) => {
          app.toastSuccess('兑换成功！')
          this.setData({
            isPushing: false
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/orderListIntegral/orderListIntegral'
            })
          }, 1500)
        })
        .catch((err) => {
          // app.toastFail('支付失败！')
          this.setData({
            isPushing: false
          })
        })
      // }
    }
  },
  // 获取购物车信息
  getCartInfo() {
    request.getCartInfo(this.data.cartIdList).then((res) => {
      this.setData({
        cartInfoList: res.value
      })
      console.log(this.data.cartInfoList)
      this.computeTotal()
    })
  },
  // 计算总金额
  computeTotal() {
    let total = 0
    if (this.data.type === 'cart') {
      this.data.cartInfoList.map((item) => {
        total = total + item.price
      })
    } else if (this.data.type === 'buyNow') {
      total = this.data.buyNowSpec.specialPrice * this.data.buyNowNum
    } else if (this.data.type === 'exchange') {
      total = this.data.buyNowProd.intergral * this.data.buyNowNum
    }
    this.setData({
      total: total.toFixed(2)
    })
  },
  // 获取默认地址
  getDefaultAddress() {
    personal.getDefaultAddress().then((res) => {
      if (res.value.id) {
        this.setData({
          address: res.value,
          addressId: res.value.id,
          addressStatus: res.value.status
        })
      }
    })
  },
  // 打开选择地址
  openAddress() {
    let type = 'select'
    if (this.data.type === 'exchange') {
      type = 'exchangeSelect'
    }
    wx.navigateTo({
      url: `/pages/addressList/addressList?type=${type}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      type: options.type
    })
    const res = await wxPosition.asyncGetPosition()
    if (res) {
      this.setData({
        isGetPositionAuth: true
      })
    }
    // 立即购买
    if (options.type === 'buyNow' || options.type === 'exchange') {
      this.getUserInfo()
      let { prodInfo, specInfo, num, type } = options
      prodInfo = decodeURIComponent(prodInfo)
      if (specInfo) {
        specInfo = decodeURIComponent(specInfo)
        const buyNowSpec = JSON.parse(specInfo)
        this.setData({
          buyNowSpec: buyNowSpec
        })
      }
      const buyNowProd = JSON.parse(prodInfo)
      this.setData({
        buyNowProd: buyNowProd,
        buyNowNum: num,
        type
      })
      this.computeTotal()
    } else if (options.type === 'cart') {
      // 购物车购买
      this.setData({
        cartIdList: JSON.parse(options.cartIdList)
      })
      this.getCartInfo()
    }
    // this.getTimes()
    this.getDefaultAddress()
    // this.getSelfGetInfo()
  }
})
