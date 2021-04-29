import request from '../../api/integral'
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
    activeClassId: 'all',
    headerHeight: 0,
    page: 1,
    totalPage: 0,
    contentList: []
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.firstGetContent()
    },
    ready: function () {},
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
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
        activeClassId: id,
        page: 1,
        totalPage: 0,
        contentList: []
      })
      this.firstGetContent()
    },
    async firstGetContent() {
      try {
        let typeId = this.data.activeClassId === 'all' ? '' : this.data.activeClassId
        const res = await request.integralList({ page: 1, pageSize: 10, isHot: true })
        this.setData({
          totalPage: res.value.totalPage,
          contentList: res.value.data,
          page: this.data.page + 1
        })
        console.log(this.data.contentList)
      } catch (err) {}
    },
    // 上拉获取新页面数据
    async scrollLowerGetList() {
      if (this.data.page <= this.data.totalPage) {
        let typeId = this.data.activeClassId === 'all' ? '' : this.data.activeClassId
        const res = await request.integralList({ page: this.data.page, pageSize: 10, isHot: true })
        let tempCommon = this.data.contentList
        const resList = res.value.data
        tempCommon.push(...resList)
        this.setData({
          totalPage: res.value.totalPage,
          page: this.data.page + 1,
          contentList: tempCommon
        })
      }
    },
    open(e) {
      let { url, id } = e.currentTarget.dataset
      wx.navigateTo({ url: `/pages/${url}/${url}?id=${id}` })
    }
  }
})
