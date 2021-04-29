const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否隐藏滚动条
    hideScrollBar: {
      type: Boolean,
      value: false
    },
    // 页面其他元素占据高度
    residueHeight: {
      type: Number,
      value: 0
    },
    classList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeItemIndex: 0, // 高亮的 item 角标
    activeClassId: undefined,
    headerHeight: 0,
    page: 1,
    totalPage: 0,
    contentList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 处理右侧列表点击事件
    handleClick(e) {
      const { index, id } = e.currentTarget.dataset
      this.setData({
        activeItemIndex: index,
        activeClassId: id
      })
    },
    // 下拉获取新页面数据
    scrollLowerGetList(e) {
      console.log(1)
    }
  }
})
