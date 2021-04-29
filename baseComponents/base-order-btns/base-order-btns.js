// baseComponents/base-order-btns/base-order-btns.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    orderBtnList: [
      { img: './pending.png', name: '待支付', status: 0 },
      { img: './stocking.png', name: '待发货', status: 10 },
      { img: './sending.png', name: '已发货', status: 20 },
      { img: './evaluate.png', name: '待评价', status: 30 },
      { img: './end.png', name: '已完成', status: 50 }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      let {status} = e.currentTarget.dataset;
      wx.navigateTo({ url: `/pages/orderList/orderList?status=${status}` })
    },
    openOrder() {
      wx.navigateTo({ url: '/pages/orderList/orderList' })
    }
  }
})
