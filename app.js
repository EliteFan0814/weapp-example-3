// app.js
App({
  onLaunch() {
    wx.setStorageSync('token', '')
  },
  globalData: {
    isLogin: wx.getStorageSync('token') ? true : false,
    userInfo: null,
    isBindWx: false,
    isBindWxPhone: false,
    selectedClassIndex: 0,
    capsuleToTop: wx.getSystemInfoSync()['statusBarHeight'] + 6,
    upImgUrl: 'https://xcw.fxcloud.net/api/Files/UploadFiles?isPublic=true'
  },
  // input双向绑定
  setData(e, _this) {
    const name = e.currentTarget.dataset.name
    _this.setData({
      // e.detail.value为小程序原生 input 返回值 e.detail 为 vant 返回值
      [name]: typeof e.detail.value == 'undefined' ? e.detail : e.detail.value
    })
  },
  // 获取tap点击后传入的数据
  tapData(e) {
    return e.currentTarget.dataset
  },
  //失败提示
  toastFail(e) {
    wx.showToast({
      title: e,
      icon: 'none'
    })
  },
  //成功提示
  toastSuccess(e) {
    wx.showToast({
      title: e
    })
  },
  // 交互弹框
  showModal(title, content) {
    return new Promise((reslove, reject) => {
      wx.showModal({
        title,
        content,
        success(res) {
          if (res.confirm) {
            reslove(true)
          } else if (res.cancel) {
            reslove(false)
          }
        }
      })
    })
  },
  // 小程序上传图片
  wxUpImg(number = 1) {
    const that = this
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: number,
        success(res) {
          const tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: that.globalData.upImgUrl,
            filePath: tempFilePaths[0],
            name: 'files',
            formData: {
              user: 'test'
            },
            success(res) {
              const data = JSON.parse(res.data)
              resolve(data)
            },
            fail(err) {
              reject(err)
            }
          })
        }
      })
    })
  }
})
