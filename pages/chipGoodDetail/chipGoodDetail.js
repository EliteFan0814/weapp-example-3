import request from '../../api/fragment'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    activeTab: 0,
    timeData: {},
    showDialog: false,
    selectedNumber: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getInfo()
  },

  onShow() {
    this.setData({
      selectedNumber: 1
    })
  },

  getInfo() {
    request
      .exchangeDetails({
        setting: this.data.id
      })
      .then((res) => {
        res.value.productContent = res.value.productContent
          ? res.value.productContent.replace(/\<img/gi, '<img class="rich-img" ')
          : ''
        this.setData({
          info: res.value
        })
      })
  },

  onChange(e) {
    this.setData({
      timeData: e.detail
    })
  },

  handleClose() {
    this.setData({
      showDialog: !this.data.showDialog
    })
  },

  handleBuyNum(e) {
    this.setData({
      selectedNumber: e.detail
    })
  },

  handleBuy() {
    let { info, id, selectedNumber } = this.data
    const prodInfo = encodeURIComponent(JSON.stringify(info))
    wx.navigateTo({
      url: `/pages/confirmOrderChip/confirmOrderChip?prodInfo=${prodInfo}&id=${id}&num=${selectedNumber}&type=chipExchange`
    })
  }
})
