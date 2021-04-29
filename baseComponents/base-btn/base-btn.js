// baseComponents/base-btn/base-btn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 按钮名称
    btnName: {
      type: String,
      value: 'btnName'
    },
    // 正在触发
    isPushing: {
      type: Boolean,
      value: false
    },
    // 禁止使用
    disabled: {
      type: Boolean,
      value: false
    }
  },
  // 向外暴露css class 类，方便父组件接管自定义组件样式
  externalClasses: ['btn-style'],
  data: {
    btnWidth: 0,
    btnHeight: 0
  },
  methods: {
    handleTap() {
      if (this.data.isPushing) {
        return
      }
      this.triggerEvent('btnTap')
    }
  },
  // 组件生命周期
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      let query = this.createSelectorQuery()
      query
        .select('.text-wrap')
        .boundingClientRect((res) => {
          this.setData({
            btnWidth: res.width,
            btnHeight: res.height
          })
        })
        .exec()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    }
  }
})
