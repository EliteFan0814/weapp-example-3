import request from '../../api/integral'
import personalRequest from '../../api/personal'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleColor: '#fff',
    navOpacity: 0,
    userInfoHeight: 140 + app.globalData.capsuleToTop, // html clas类 user-info 的高度
    btnList: [
      { name: '分类', value: 1 },
      { name: '热门兑换', value: 2 }
    ],
    activeIndex: 0,
    activeClassId: 'all',
    classList: [],
    residueHeight: 0,
    page: 1,
    totalPage: 1,
    list: [],
    activeBtnValue: 1,
    userInfo: {}
  },
  handleChange(e) {
    console.log(e)
    if (e.detail.val === 1) {
      this.setData({
        activeBtnValue: 1
      })
    } else {
      this.setData({
        activeBtnValue: 2
      })
    }
  },
  onLoad: function (options) {
    this.getOtherWrapHeight()
    this.integralCate()
  },
  onShow() {
    this.getUserInfo()
  },
  // 获取个人信息
  getUserInfo() {
    personalRequest
      .getUserInfo()
      .then((res) => {
        this.setData({
          userInfo: res.value
        })
      })
      .catch((err) => {})
  },

  //获取剩余高度
  getOtherWrapHeight() {
    let query = wx.createSelectorQuery()
    query
      .select('.other-wrap')
      .boundingClientRect((res) => {
        this.setData({
          residueHeight: res.height
        })
      })
      .exec()
  },

  integralCate() {
    request.integralCate().then((res) => {
      res.value.unshift({
        name: '全部',
        id: 'all'
      })
      this.setData({
        classList: res.value,
        activeClassId: res.value[0].id
      })
    })
  },

  open(e) {
    let { url } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/${url}/${url}` })
  }
})
