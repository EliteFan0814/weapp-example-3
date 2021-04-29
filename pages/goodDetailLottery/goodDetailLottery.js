import request from '../../api/lottery'
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
    chipList: [],
    selectedId: undefined,
    selectedNumber: 1,
    selectedSpec: {},
    activeTab: 'detail',
    goodContent: '',
    isPushing: false,
    buyRecord: [],
    page: 1,
    totalPage: 0,
    endDate: ''
  },
  //
  getBuyRecord(type) {
    request.getLotteryRecord(this.data.page, 10, this.data.id).then((res) => {
      this.data.totalPage = res.value.totalPage
      let tempCommon = this.data.buyRecord
      const resList = res.value.data
      if (type === 'down') {
        tempCommon.push(...resList)
        this.setData({
          buyRecord: tempCommon
        })
      } else {
        this.setData({
          buyRecord: resList
        })
      }
    })
  },
  // 触底无限加载
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getBuyRecord('down')
    }
  },
  //
  handleChangeTab(e) {
    // if(e.detail.name === 'record'){
    //   this.setData({
    //     page:1,
    //     totalPage:1,
    //     buyRecord:[]
    //   })
    //   this.getBuyRecord()
    // }
  },
  getGoodInfo() {
    request.getLotteryDetail(this.data.id).then((res) => {
      const temp = res.value.productContent ? res.value.productContent.replace(/\<img/gi, '<img class="rich-img" ') : ''
      this.setData({
        goodInfo: res.value,
        endDate: res.value.endDate.split(' ')[0],
        goodContent: temp,
        swiperList: res.value.hostProductPics,
        chipList: res.value.fragments
        // goodSpec: res.value.skus,
        // selectedSpec: res.value.skus[0],
        // selectedId: res.value.skus[0].id
      })
    })
  },

  // 购物数量
  handleBuyNum(e) {
    this.setData({
      selectedNumber: e.detail
    })
  },
  // 加入购物车
  // handleCart(e) {
  //   const { info, num } = app.tapData(e)
  //   request
  //     .addToCart(info.productId, num, info.id, info.seckillSkuId || '')
  //     .then((res) => {
  //       app.toastSuccess('添加成功！')
  //       this.setData({
  //         showDialog: false
  //       })
  //     })
  //     .catch((err) => {})
  // },
  // 立即抽奖
  handleLottery(e) {
    this.setData({
      isPushing: true
    })
    request
      .joinLottery(this.data.goodInfo.id)
      .then((res) => {
        app.toastSuccess('参与成功')
        this.setData({
          showDialog: false,
          isPushing: false
        })
        setTimeout(() => {
          wx.navigateTo({ url: '/pages/myJoinLottery/myJoinLottery' })
        }, 300)
      })
      .catch((err) => {
        this.setData({
          isPushing: false
        })
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
    if (this.data.goodInfo.status != 0) return
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
  },
  onShow() {
    this.getBuyRecord()
  },

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
