// localComponents/my-chip/my-chip.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rightText: {
      type: String,
      value: ''
    },
    fragment: {
      type: Array,
      value: []
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
    handleClick(){
      this.triggerEvent('btnTap')
    }
  }
})
