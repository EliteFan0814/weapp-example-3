import request from '../../api/merchant'
import wxPosition from '../../utils/authPosition'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    totalPage: 1,
    searchKey: '',
    shopList: [],
    isGetPositionAuth: false,
    longitude: undefined,
    latitude: undefined,
    isHaveReturn: false
  },
  // 更改查询关键字
  changeKeywords(e) {
    this.setData({
      searchKey: e.detail
    })
  },
  // 点击搜索
  searchNewGood() {
    this.getShopList()
  },
  // 清除查询关键字,清除所有数据
  clearKeywords() {
    this.setData({
      searchKey: ''
    })
    this.clearAllInfo()
  },
  // 搜索时清空
  clearAllInfo() {
    this.setData({
      page: 1,
      totalPage: 0,
      shopList: []
    })
    this.getShopList()
  },
  getShopList(type) {
    let location = ''
    if (this.data.longitude) {
      location = this.data.longitude + ',' + this.data.latitude
    } else {
      location = ''
    }
    request
      .getShopList(this.data.page, 10, this.data.searchKey, location, this.data.isHaveReturn)
      .then((res) => {
        this.data.totalPage = res.value.totalPage
        let tempCommon = this.data.shopList
        const resList = res.value.data
        if (type === 'down') {
          tempCommon.push(...resList)
          this.setData({
            shopList: tempCommon
          })
        } else {
          this.setData({
            shopList: resList
          })
        }
      })
      .catch((err) => {})
  },
  // 触底无限加载
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getShopList('down')
    }
  },
  // 收藏/取消收藏商家
  collectShop(e) {
    const { index, id, flag } = app.tapData(e)
    request
      .collectShop(id, !flag)
      .then((res) => {
        if (flag) {
          app.toastSuccess('取消收藏成功')
        } else {
          app.toastSuccess('收藏成功')
        }
        const key = 'shopList[' + index + '].shopInfo.isFavorites'
        console.log(key)
        this.setData({
          [key]: !flag
        })
      })
      .catch((res) => {})
  },
  openShop(e) {
    const { id } = app.tapData(e)
    wx.navigateTo({ url: '/pages/shopDetail/shopDetail?id=' + id })
  },
  onSearch() {
    this.getShopList()
  },
  onChange(e) {
    this.setData({
      searchKey: e.detail
    })
  },
  // 未授权定位则打开授权设置页面
  showAuthPosition() {
    wxPosition.isAuthPosition().then((res) => {
      if (res) {
        this.setData({ isGetPositionAuth: true })
        this.getShopList()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    const res = await wxPosition.asyncGetPosition()
    if (res) {
      this.setData({
        isGetPositionAuth: true,
        longitude: res.longitude,
        latitude: res.latitude
      })
      const location = this.data.longitude + ',' + this.data.latitude
      const result = await request.getMapResult(location)
      this.setData({
        isHaveReturn: result.value
      })
    } else {
      this.setData({
        isHaveReturn: false,
        longitude: '',
        latitude: ''
      })
    }
    this.getShopList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
