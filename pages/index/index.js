import request from '../../api/index'
import requestGoods from '../../api/goods'
const app = getApp()

Page({
  data: {
    navOpacity: 0,
    titleColor: '#fff',
    capsuleToTop: app.globalData.capsuleToTop,
    userInfo: {},
    page: 1,
    totalPage: 0,
    classArr: [
      {
        className: '商城分类',
        classImg: '/static/img/index/1.png',
        url: '/pages/shopClass/shopClass'
      },
      {
        className: '积分商城',
        classImg: '/static/img/index/2.png',
        url: '/pages/integralMall/integralMall'
      },
      {
        className: '碎片兑换',
        classImg: '/static/img/index/3.png',
        url: '/pages/fragmentExchange/fragmentExchange'
      },
      {
        className: '店铺收藏',
        classImg: '/static/img/index/4.png',
        url: '/pages/shopCollect/shopCollect'
      }
    ],
    noticeList: [],
    goodsList: [],
    refresh: +new Date()
  },
  // 获取通知列表
  getNoticeList() {
    request
      .getNoticeList(1, 100, 'platform_us')
      .then((res) => {
        this.setData({
          noticeList: res.value.data
        })
      })
      .catch((err) => {})
  },
  // 获取商品列表
  getGoodsList(type) {
    requestGoods.getGoodsList(1, 10, ).then((res) => {
      this.data.totalPage = res.value.totalPage
      let tempCommon = this.data.goodsList
      const resList = res.value.data
      if (type === 'down') {
        tempCommon.push(...resList)
        this.setData({
          goodsList: tempCommon
        })
      } else {
        this.setData({
          goodsList: resList
        })
      }
    })
  },
  // 触底无限加载
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getGoodsList('down')
    }
  },
  openSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  },
  openMoreLottery() {
    wx.navigateTo({ url: '/pages/chiplottery/chiplottery' })
  },
  openGoodDetail(e) {
    const { id } = app.tapData(e)
    wx.navigateTo({ url: '/pages/goodDetail/goodDetail?id=' + id })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.getData();
  },
  getData(){
    this.getNoticeList()
    this.getGoodsList()
  },
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
    this.setData({
      page: 1,
      totalPage: 0,
      goodsList: [],
      refresh: this.data.refresh + 1
    })
    this.getNoticeList()
    this.getGoodsList()
    setTimeout(() => {
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 400)
  }
})
