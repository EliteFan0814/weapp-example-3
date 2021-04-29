Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object,
      value: {}
    },
    useSetting: {
      type: Boolean,
      value: true
    },
    isBindWx: {
      type: Boolean,
      value: false
    },
    isBindWxPhone: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击获取微信昵称头像并更新到后台
    getWxUserInfoByPage: function (e) {
      let user = e.detail.userInfo
      this.triggerEvent('bindWxInfo', { wxInfo: user })
    },
    // 获取并绑定手机号
    getPhoneNumber(e) {
      if (e.detail.errMsg.indexOf('ok') > -1) {
        this.triggerEvent('bindWxPhone', { wxInfo: e.detail })
      } else {
        wx.showToast({
          title: '拒绝绑定手机，可能影响小程序正常使用',
          icon: 'none'
        })
      }
    },
    handleSetting(e) {
      console.log(e)
    },
    open(e){
      let {url} = e.currentTarget.dataset;
      wx.navigateTo({url: `/pages/${url}/${url}`});
    }
  }
})
