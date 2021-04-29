import request from '../../api/merchant'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    totalPage: 1,
    collectList: [],
    searchKey: ''
  },
  // 更改查询关键字
  changeKeywords(e) {
    this.setData({
      searchKey: e.detail
    })
  },
  // 点击搜索
  searchNewGood() {
    this.getCollectList()
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
      collectList: []
    })
    this.getCollectList()
  },
  getCollectList(type) {
    request.getCollectShopList(this.data.page, 10, this.data.searchKey).then((res) => {
      res.value.data.map((item, index) => {
        item.isFavorites = true
      })
      this.data.totalPage = res.value.totalPage
      let tempCommon = this.data.collectList
      const resList = res.value.data
      if (type === 'down') {
        tempCommon.push(...resList)
        this.setData({
          collectList: tempCommon
        })
      } else {
        this.setData({
          collectList: resList
        })
      }
    })
  },
  // 触底无限加载
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getCollectList('down')
    }
  },
  // 收藏/取消收藏商家
  async collectShop(e) {
    const { index, id, flag } = app.tapData(e)
    if (flag) {
      const res = await app.showModal('取消收藏', '确认取消收藏？')
      if (res) {
        request
          .collectShop(id, false)
          .then((res) => {
            const key = 'collectList[' + index + '].isFavorites'
            app.toastSuccess('取消成功')
            this.setData({
              [key]: false
            })
          })
          .catch((err) => {})
      }
    } else {
      request
        .collectShop(id, true)
        .then((res) => {
          const key = 'collectList[' + index + '].isFavorites'
          app.toastSuccess('收藏成功')
          this.setData({
            [key]: true
          })
        })
        .catch((err) => {})
    }
  },
  openShop(e) {
    const { id } = app.tapData(e)
    console.log(id)
    wx.navigateTo({ url: '/pages/shopDetail/shopDetail?id=' + id })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
