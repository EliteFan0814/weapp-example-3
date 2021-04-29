import request from "../../api/fragment";

const app = getApp();
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
    id: "",
    swiperList: [],
    timeData: {},
    goodInfo: {},
    chipList: [],
    selectedId: undefined,
    selectedNumber: 1,
    selectedSpec: {},
    activeTab: "detail",
    goodContent: "",
    isPushing: false,
    buyRecord: [],
    page: 1,
    totalPage: 0,
  },
  //
  onLoad: function (options) {
    this.setData({ id: options.id });
    this.getGoodInfo();
  },

  getGoodInfo() {
    request.exchangeDetails({ setting: this.data.id }).then((res) => {
      const temp = res.value.productContent
        ? res.value.productContent.replace(/\<img/gi, '<img class="rich-img" ')
        : "";
      this.setData({
        goodInfo: res.value,
        goodContent: temp,
        swiperList: res.value.hostProductPics,
        chipList: res.value.fragments,
      });
    });
  },

  // 购物数量
  handleBuyNum(e) {
    this.setData({
      selectedNumber: e.detail,
    });
  },

  // 立即兑换
  handleLottery(e) {
    wx.navigateTo({
      url: `/pages/fragmentExchangeConfirm/fragmentExchangeConfirm?id=${this.data.id}`,
    });
  },
  //选择规格
  handleSelect(e) {
    const { info } = app.tapData(e);
    this.setData({
      selectedId: info.id,
      selectedSpec: info,
    });
  },

  handleClose() {
    this.setData({
      showDialog: !this.data.showDialog,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    index.getIntegral();
    const inviteCode = app.globalData.userInfo
      ? app.globalData.userInfo.inviteCode
      : "";
    return {
      title: this.data.goodInfo.title,
      path: `/pages/goodDetail/goodDetail?id=${this.data.id}&inviteCode=${inviteCode}`,
    };
  },
});
