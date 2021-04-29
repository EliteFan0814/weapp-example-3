import request from '../../api/index'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headerHeight: 38 + app.globalData.capsuleToTop + 54,
    hideScrollBar: false,
    activeItemIndex: 0, // 高亮的 item 角标
    activeClassId: 'all',
    classList: [],
    searchKey: '',
    residueHeight: 0,
    page: 1,
    totalPage: 0,
    classGoodList: []
  },
  // 更改查询关键字
  changeKeywords(e) {
    this.setData({
      searchKey: e.detail
    })
  },
  // 点击搜索
  searchNewGood() {
    this.firstGetContent()
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
    this.firstGetContent()
  },
  // 处理右侧列表点击事件
  handleClick(e) {
    const { index, id } = e.currentTarget.dataset
    this.setData({
      activeItemIndex: index,
      activeClassId: id,
      page: 1,
      totalPage: 0,
      classGoodList: []
    })
    this.firstGetContent()
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
  getShopClassList() {
    request.getShopClassList().then((res) => {
      res.value.unshift({
        name: '全部',
        id: 'all'
      })
      console.log(res.value)
      this.setData({
        classList: res.value,
        activeClassId: res.value[0].id
      })
    })
  },
  async firstGetContent() {
    try {
      let typeId = this.data.activeClassId === 'all' ? '' : this.data.activeClassId
      const res = await request.getGoodsList(1, 10, this.data.searchKey, typeId)
      this.setData({
        totalPage: res.value.totalPage,
        classGoodList: res.value.data,
        page: this.data.page + 1
      })
    } catch (err) {}
  },
  // 上拉获取新页面数据
  async scrollLowerGetList() {
    if (this.data.page <= this.data.totalPage) {
      let typeId = this.data.activeClassId === 'all' ? '' : this.data.activeClassId
      const res = await request.getGoodsList(this.data.page, 10, this.data.searchKey, typeId)
      let tempCommon = this.data.classGoodList
      const resList = res.value.data
      tempCommon.push(...resList)
      this.setData({
        totalPage: res.value.totalPage,
        page: this.data.page + 1,
        classGoodList: tempCommon
      })
    }
  },
  openDetail(e) {
    const { id } = app.tapData(e)
    wx.navigateTo({ url: '/pages/goodDetail/goodDetail?id=' + id })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopClassList()
    this.firstGetContent()
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
