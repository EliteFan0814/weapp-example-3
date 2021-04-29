import request from '../../api/personal'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleColor: '#fff',
    navOpacity: 0,
    capsuleToTop: app.globalData.capsuleToTop,
    userInfoHeight: 150 + app.globalData.capsuleToTop, // html clas类 user-info 的高度
    operateList: [
      {
        iconUrl: '',
        name: '积分兑换订单',
        value: 1,
        jumpUrl: '/pages/orderListIntegral/orderListIntegral',
        otherInfo: ''
      },
      {
        iconUrl: '',
        name: '碎片兑换订单',
        value: 1,
        jumpUrl: '/pages/orderListFragment/orderListFragment',
        otherInfo: ''
      },
      {
        iconUrl: '',
        name: '抽奖中奖订单',
        value: 1,
        jumpUrl: '/pages/orderListLottery/orderListLottery',
        otherInfo: ''
      },
      { iconUrl: '', name: '我参与的抽奖', value: 1, jumpUrl: '/pages/myJoinLottery/myJoinLottery', otherInfo: '' },
      { iconUrl: '', name: '收货地址管理', value: 1, jumpUrl: '/pages/addressList/addressList', otherInfo: '' }
    ],
    isBindWx: false,
    isBindWxPhone: false
  },
  onShow() {
    this.getData()
  },
  getData() {
    this.getFragment()
    this.getUserInfo()
  },
  getFragment() {
    request.getFragment().then((res) => {
      this.setData({
        fragment: res.value.fragments
      })
    })
  },
  // 绑定微信信息
  bindWxInfo(e) {
    const info = e.detail.wxInfo
    if (!this.data.isBindWx) {
      request
        .bindWxInfo(info.nickName, info.avatarUrl)
        .then((res) => {
          app.globalData.isBindWx = true
          this.setData({
            isBindWx: true
          })
          // wx.setStorageSync('token', '')
          this.getUserInfo()
        })
        .catch((err) => {})
    } else {
    }
  },
  // 绑定微信手机号
  bindWxPhone(e) {
    const info = e.detail.wxInfo
    request
      .bindPhone(info.encryptedData, info.iv)
      .then((res) => {
        app.toastSuccess('绑定成功')
        this.setData({
          isBindWxPhone: true
        })
        this.getUserInfo()
      })
      .catch((err) => {})
  },
  // 获取个人信息
  getUserInfo() {
    request
      .getUserInfo()
      .then((res) => {
        app.globalData.isBindWx = res.value.infoAuth
        app.globalData.isBindWxPhone = res.value.mobileAuth
        this.setData({
          userInfo: res.value,
          isBindWx: res.value.infoAuth,
          isBindWxPhone: res.value.mobileAuth
        })
      })
      .catch((err) => {})
  },
  // 打开 我的碎片
  openExchange() {
    wx.navigateTo({ url: '/pages/myFragment/myFragment' })
  },
  // 打开 积分兑换商城
  openIntegralMall() {
    wx.navigateTo({ url: '/pages/integralMall/integralMall' })
  },
  // 打开 抽奖专区
  openLottery() {
    wx.navigateTo({ url: '/pages/chiplottery/chiplottery' })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  onPageScroll: function (e) {
    let a = e.scrollTop / 60
    if (a <= 0) {
      this.setData({
        titleColor: '#fff'
      })
    }
    if (a >= 1) {
      a = 1
      this.setData({
        titleColor: '#000'
      })
    }
    this.setData({
      navOpacity: a
    })
  },

  onPullDownRefresh: function () {
    this.getData()
    setTimeout(() => {
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 400)
  }
})
