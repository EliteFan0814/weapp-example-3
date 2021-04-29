import request from '../../api/merchant'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleColor: '#fff',
    navOpacity: 0,
    userInfoHeight: 110 + app.globalData.capsuleToTop, // html clas类 user-info 的高度
    activeIndex: 0,
    btnList: [
      { name: '分类', value: 'class' },
      { name: '特价', value: 'cheap' },
      { name: '公告', value: 'notice' }
    ],
    classList: [],
    shopId: undefined,
    isFavorites: undefined,
    shopInfo: {},
    residueHeight: 0,
    tabType: 'class'
  },

  onLoad: function (options) {
    this.getOtherWrapHeight()
    this.setData({
      shopId: options.id
    })
    this.getShopDetail()
    this.getClass()
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
  //
  getShopDetail() {
    request
      .getShopDetail(this.data.shopId)
      .then((res) => {
        this.setData({
          shopInfo: res.value,
          isFavorites: res.value.isFavorites
        })
      })
      .catch((err) => {})
  },

  // 改变分类特价公告筛选
  changeType(e) {
    this.setData({
      tabType: e.detail.val
    })
  },

  collect(e) {
    request
      .collectShop(this.data.shopId, !this.data.isFavorites)
      .then((res) => {
        if (this.data.isFavorites) {
          app.toastSuccess('取消成功！')
          this.setData({
            isFavorites: false
          })
        } else {
          app.toastSuccess('收藏成功！')
          this.setData({
            isFavorites: true
          })
        }
      })
      .catch((err) => {})
  },

  getClass() {
    request.shopCommodityClass(this.data.shopId).then((res) => {
      res.value.unshift({ id: '', name: '全部' })
      this.setData({
        classList: res.value
      })
    })
  },

  onReachBottom() {
    if (this.data.tabType == 'cheap') {
      this.selectComponent('#cheap').shopListReset()
    }
  }
})
