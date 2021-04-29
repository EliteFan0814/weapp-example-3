// baseComponents/no-list/no-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fontSize: {
      type: Number,
      value: 26
    },
    topDistance: {
      type: Number,
      value: 20
    },
    title: {
      type: String,
      value: '暂无订单,快去逛逛吧~'
    },
    redirect: {
      type: Boolean,
      value: true
    },
    btnName: {
      type: String,
      value: '去逛逛'
    },
    // 图片宽
    imgW: {
      type: Number,
      value: 400
    },
    otherInfo: {
      type: String,
      value: '去首页看看吧'
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
    handleClick() {
      this.triggerEvent('btnTap')
    }
  }
})
