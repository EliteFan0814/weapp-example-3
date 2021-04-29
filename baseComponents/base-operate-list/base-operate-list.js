// baseComponents/base-operate-list/base-operate-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否使用 icon 图标
    useIcon: {
      type: Boolean,
      value: true
    },
    operateList: {
      type: Array,
      value: [
        { iconUrl: '', name: '积分兑换订单', value: 1, jumpUrl: '', otherInfo: '' },
        { iconUrl: '', name: '碎片兑换订单', value: 1, jumpUrl: '', otherInfo: '' },
        { iconUrl: '', name: '抽奖中奖订单', value: 1, jumpUrl: '', otherInfo: '' }
      ]
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
    handleClick(e) {
      const { url } = e.currentTarget.dataset
      if(url){
        wx.navigateTo({url})
      }else{
        
      }
    }
  }
})
