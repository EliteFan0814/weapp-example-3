import request from '../../api/personal'
import wxPosition from '../../utils/authPosition'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: {},
    phone: '',
    refundDialog: false,
    remark: '',
    selfGetInfo: undefined,
    isGetPositionAuth: false
  },
  // 展示自提地址
  async showAddress(e) {
    const { info } = app.tapData(e)
    const locationTemp = info.pickUpLatlng.split(',')
    const address = info.pickUpAddress
    if (this.data.isGetPositionAuth) {
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = Number(locationTemp[1])
          const longitude = Number(locationTemp[0])
          wx.openLocation({
            latitude,
            longitude,
            address,
            scale: 18
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    } else {
      this.showAuthPosition()
    }
  },
  // 未授权定位则打开授权设置页面
  showAuthPosition() {
    wxPosition.isAuthPosition().then((res) => {
      if (res) {
        this.setData({ isGetPositionAuth: true })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      id: options.id
    })
    const res = await wxPosition.asyncGetPosition()
    if (res) {
      this.setData({
        isGetPositionAuth: true
      })
    }
    this.getInfo()
    // this.getPhone()
  },

  getInfo() {
    request.drawOrderInfo({orderId: this.data.id}).then((res) => {
      this.setData({
        info: res.value
      })
    })
  },

  confirm(e){
    let {id} = e.currentTarget.dataset;
    app.showModal('提示', '是否确认收货？').then(res=>{
      if(!res) return;
      request.confrim(JSON.stringify(id)).then(res=>{
        if(res.success) app.toastSuccess('收货成功');
        this.getInfo();
      })
    })
  },

})
