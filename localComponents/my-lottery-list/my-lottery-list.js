import request from '../../api/index'
import wxRequest from '../../lib/wxRequest'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lotteryTime: {
      type: Boolean,
      value: true
    },
    moreTime: {
      type: Boolean,
      value: false
    },
    refresh: {
      type: Number,
      value: +new Date()
    }
  },
  externalClasses: ['good-item-style'],
  /**
   * 组件的初始数据
   */
  data: {
    page: 1,
    totalPage: 0,
    lotteryList: []
  },
  observers: {
    refresh: function () {
      this.setData({
        page: 1,
        totalPage: 0,
        lotteryList: []
      })
      this.firstLottery()
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.firstLottery()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    openDetail(e) {
      const { id } = app.tapData(e)
      wx.navigateTo({ url: '/pages/goodDetailLottery/goodDetailLottery?id=' + id })
    },
    async firstLottery() {
      try {
        const res = await request.getLotteryList(1, 10, '', '', '', true)
        res.value.data.forEach((item) => {
          item.endDate = item.endDate.split(' ')[0] || ''
        })
        this.setData({
          totalPage: res.value.totalPage,
          lotteryList: res.value.data,
          page: this.data.page + 1
        })
      } catch (err) {}
    },
    async getLotteryList() {
      if (this.data.page <= this.data.totalPage) {
        const res = await request.getLotteryList(this.data.page, 10, '', '', '', true)
        res.value.data.forEach((item) => {
          item.endDate = item.endDate.split(' ')[0] || ''
        })
        let tempCommon = this.data.lotteryList
        const resList = res.value.data
        tempCommon.push(...resList)
        this.setData({
          totalPage: res.value.totalPage,
          page: this.data.page + 1,
          lotteryList: tempCommon
        })
      }
    },
    getChip(e) {
      const { id, url } = app.tapData(e)
      wx.navigateTo({ url: '/pages/searchResult/searchResult?id=' + id + '&url=' + url })
    }
  }
})
