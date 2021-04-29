import request from '../../api/search'
import wxRequest from '../../lib/wxRequest'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keywords: '',
    page: 1,
    totalPage: 0,
    resultList: [],
    downHeight: 0,
    downList: [],
    selectId: 'all',
    selectImg: ''
  },
  handleShow() {
    if (this.data.downHeight) {
      this.setData({
        downHeight: 0
      })
    } else {
      this.setData({
        downHeight: 350
      })
    }
  },
  // 处理碎片选择
  handleSelect(e) {
    const { info } = app.tapData(e)
    this.setData({
      selectId: info.id,
      selectImg: info.hostLogo,
      downHeight: 0,
      page: 1,
      totalPage: 0,
      resultList: []
    })
    this.getResultList()
  },
  // 更改查询关键字
  changeKeywords(e) {
    this.setData({
      keywords: e.detail
    })
  },
  // 点击搜索
  searchNewGood() {
    this.getResultList()
  },
  // 清除查询关键字,清除所有数据
  clearKeywords() {
    this.setData({
      keywords: ''
    })
    this.clearAllInfo()
  },
  // 搜索时清空
  clearAllInfo() {
    this.setData({
      page: 1,
      totalPage: 0,
      resultList: []
    })
  },
  //获取chiplist
  getChipList() {
    request
      .getChipList()
      .then((res) => {
        res.value.fragments.unshift({
          name: '全部',
          id: 'all'
        })
        this.setData({
          downList: res.value.fragments
        })
      })
      .catch((err) => {})
  },
  // 获取商品列表
  getResultList(type) {
    const selectId = this.data.selectId === 'all' ? '' : this.data.selectId
    request.getSearchList(this.data.page, 10, this.data.keywords, selectId).then((res) => {
      this.data.totalPage = res.value.totalPage
      let tempCommon = this.data.resultList
      const resList = res.value.data
      if (type === 'down') {
        tempCommon.push(...resList)
        this.setData({
          resultList: tempCommon
        })
      } else {
        this.setData({
          resultList: resList
        })
      }
    })
  },
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getResultList('down')
    }
  },
  openDetail(e) {
    const { id } = app.tapData(e)
    wx.navigateTo({ url: `/pages/goodDetail/goodDetail?id=${id}` })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.getChipList()
    this.setData({
      keywords: options.value,
      selectId: options.id,
      selectImg: options.url
    })
    this.getResultList()
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
