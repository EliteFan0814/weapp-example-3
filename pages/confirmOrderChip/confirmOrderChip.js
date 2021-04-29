import request from '../../api/order'
import fragment from '../../api/fragment'
import personal from '../../api/personal'
import wxPosition from '../../utils/authPosition'

import pay from '../../utils/pay'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    myChipList: [],
    totalChip: 0,
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
    isSelectedTime: false,
    total: 0,
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
    let { addressId, buyNowProd, buyNowNum } = this.data
    fragment
      .confirmChipOrder(buyNowProd.settingId, addressId, buyNowNum)
      .then((res) => {
        app.toastSuccess('兑换成功！')
        this.setData({
          isPushing: false
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/orderListFragment/orderListFragment'
          })
        }, 500)
      })
      .catch((err) => {
        this.setData({
          isPushing: false
        })
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
  getMyChip() {
    personal.getFragment().then((res) => {
      let { fragments, totalCount } = res.value
      this.setData({
        myChipList: fragments,
        totalChip: totalCount
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      type: options.type
    })
    this.getMyChip()
    const res = await wxPosition.asyncGetPosition()
    if (res) {
      this.setData({
        isGetPositionAuth: true
      })
    }
    let { prodInfo, num, type } = options
    prodInfo = decodeURIComponent(prodInfo)
    const buyNowProd = JSON.parse(prodInfo)
    let total = 0
    buyNowProd.fragments.map((item) => {
      total = total + item.count
    })
    total = total.toFixed(0)
    this.setData({
      buyNowProd: buyNowProd,
      buyNowNum: num,
      type,
      total
    })
    this.getDefaultAddress()
  }
})
