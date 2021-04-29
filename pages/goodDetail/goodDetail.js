import request from '../../api/goods'
import requestCart from '../../api/cart'
// import index from '../../api/index'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    swiperList: 5,
    showDialog: false,
    id: undefined,
    swiperList: [],
    timeData: {},
    goodInfo: {},
    goodSpec: [],
    selectedId: undefined,
    selectedNumber: 1,
    selectedSpec: {},
    activeTab: 'detail',
    goodContent: '',
    buyRecord: [],
    page: 1,
    totalPage: 0,
    commonList: []
  },
  //
  getBuyRecord() {
    request.getBuyRecord(this.data.id).then((res) => {
      this.setData({
        buyRecord: res.value
      })
    })
  },
  //
  handleChangeTab(e) {
    console.log(e)
  },
  getGoodInfo() {
    request.getGoodDetail(this.data.id).then((res) => {
      const temp = res.value.desc ? res.value.desc.replace(/\<img/gi, '<img class="rich-img" ') : ''
      this.setData({
        goodInfo: res.value,
        goodContent: temp,
        swiperList: res.value.picsArray,
        goodSpec: res.value.productSkus,
        selectedSpec: res.value.productSkus[0],
        selectedId: res.value.productSkus[0].id
      })
    })
  },
  // 处理倒计时
  onTimeChange(e) {
    this.setData({
      timeData: e.detail
    })
  },
  // 购物数量
  handleBuyNum(e) {
    this.setData({
      selectedNumber: e.detail
    })
  },
  getGoodComment(type) {
    request
      .getGoodComment(this.data.page, 10, this.data.id)
      .then((res) => {
        this.data.totalPage = res.value.totalPage
        let tempCommon = this.data.commonList
        const resList = res.value.data
        if (type === 'down') {
          tempCommon.push(...resList)
          this.setData({
            commonList: tempCommon
          })
        } else {
          this.setData({
            commonList: resList
          })
        }
      })
      .catch((err) => {})
  },
  // 触底无限加载
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getGoodComment('down')
    }
  },
  // 加入购物车
  handleCart(e) {
    const { prod, info, num } = app.tapData(e)
    console.log(info, num)
    requestCart
      .addToCart(prod.shopId, prod.id, info.id, num)
      .then((res) => {
        app.toastSuccess('添加成功！')
        this.setData({
          showDialog: false
        })
      })
      .catch((err) => {})
  },
  //
  openShop(e) {
    const { id } = app.tapData(e)
    wx.navigateTo({ url: '/pages/shopDetail/shopDetail?id=' + id })
  },
  // 立即购买
  handleBuy(e) {
    const { prod, spec, num } = app.tapData(e)
    const prodInfo = encodeURIComponent(JSON.stringify(prod))
    const specInfo = encodeURIComponent(JSON.stringify(spec))
    wx.navigateTo({
      url: `/pages/confirmOrder/confirmOrder?type=buyNow&prodInfo=${prodInfo}&specInfo=${specInfo}&num=${num}`
    })
  },
  //选择规格
  handleSelect(e) {
    const { info } = app.tapData(e)
    this.setData({
      selectedId: info.id,
      selectedSpec: info
    })
  },
  // 打开购物车
  openCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 打开首页
  openIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  handleClose() {
    this.setData({
      showDialog: !this.data.showDialog
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ id: options.id })
    this.getGoodInfo()
    this.getGoodComment()
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
  onShareAppMessage: function (res) {
    index.getIntegral()
    const inviteCode = app.globalData.userInfo ? app.globalData.userInfo.inviteCode : ''
    return {
      title: this.data.goodInfo.title,
      path: `/pages/goodDetail/goodDetail?id=${this.data.id}&inviteCode=${inviteCode}`
    }
  }
})
