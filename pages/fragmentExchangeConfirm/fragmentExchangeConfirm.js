import request from "../../api/fragment";
import personal from "../../api/personal";
import wxPosition from "../../utils/authPosition";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    latitude: undefined,
    longitude: undefined,
    address: {},
    addressId: undefined,
    addressStatus: false,
    isGetPositionAuth: false,

    isPushing: false,
    goodInfo: {},
    chipList: [],
  },

  onLoad: async function (options) {
    const res = await wxPosition.asyncGetPosition();
    if (res) {
      this.setData({
        isGetPositionAuth: true,
      });
    }
    this.setData({ id: parseInt(options.id) });
    this.getDefaultAddress();
    this.getGoodInfo();
  },

  getGoodInfo() {
    request.exchangeDetails({ setting: this.data.id }).then((res) => {
      this.setData({
        goodInfo: res.value,
        chipList: res.value.fragments,
      });
    });
  },

  // 未授权定位则打开授权设置页面
  showAuthPosition() {
    wxPosition.isAuthPosition().then((res) => {
      if (res) {
        this.setData({ isGetPositionAuth: true });
      }
    });
  },

  // 获取默认地址
  getDefaultAddress() {
    personal.getDefaultAddress().then((res) => {
      if (res.value.id) {
        this.setData({
          address: res.value,
          addressId: res.value.id,
          addressStatus: res.value.status,
        });
      }
    });
  },
  // 打开选择地址
  openAddress() {
    let type = "select";
    if (this.data.type === "exchange") {
      type = "exchangeSelect";
    }
    wx.navigateTo({
      url: `/pages/addressList/addressList?type=${type}`,
    });
  },

  exchange() {
    if (!this.data.addressId) return app.toastFail("请选择收货地址！");
    this.setData({
      isPushing: true,
    });
    request
      .Create({
        fragmentSettingId: this.data.id,
        addressId: this.data.addressId,
        count: 1,
      })
      .then((res) => {
        this.setData({
          isPushing: false,
        });
        if (res.success) {
          app.toastSuccess("兑换成功"); 
          setTimeout(()=>{
            wx.redirectTo({
              url: `/pages/orderListFragment/orderListFragment`,
            })
          }, 1500)
        }
      })
      .catch((err) => {
        this.setData({
          isPushing: false,
        });
      });
  },
});
