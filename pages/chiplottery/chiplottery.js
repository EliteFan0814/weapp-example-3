import request from '../../api/index'
import requestPersonal from '../../api/personal'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleColor: '#fff',
    navOpacity: 0,
    userInfoHeight: 110 + app.globalData.capsuleToTop, // html clas类 user-info 的高度
    page: 1,
    totalPage: 0,
    lotteryList: [],
    myChipList: [],
    totalChip: 0,
    lotteryTime: true,
    moreTime: true
  },
  openDetail(e) {
    const { id } = app.tapData(e)
    wx.navigateTo({ url: '/pages/goodDetailLottery/goodDetailLottery?id=' + id })
  },
  getChip(e) {
    const { id } = app.tapData(e)
    wx.navigateTo({ url: '/pages/searchResult/searchResult?id=' + id })
  },
  getMyChip() {
    requestPersonal.getFragment().then((res) => {
      let { fragments, totalCount } = res.value
      this.setData({
        myChipList: fragments,
        totalChip: totalCount
      })
    })
  },
  open(e) {
    let { url } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/${url}/${url}` })
  },
  // 获取商品列表
  getLotteryList(type) {
    request.getLotteryList(1, 10).then((res) => {
      res.value.data.forEach((item) => {
        item.beginDate = item.beginDate.split(' ')[0] || ''
        item.endDate = item.endDate.split(' ')[0] || ''
      })
      this.data.totalPage = res.value.totalPage
      let tempCommon = this.data.lotteryList
      const resList = res.value.data
      if (type === 'down') {
        tempCommon.push(...resList)
        this.setData({
          lotteryList: tempCommon
        })
      } else {
        this.setData({
          lotteryList: resList
        })
      }
    })
  },
  // 触底无限加载
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getLotteryList('down')
    }
  },
  onLoad: function () {
    this.getLotteryList()
    this.getMyChip()
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
  }
})
