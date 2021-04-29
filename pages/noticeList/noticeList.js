import request from '../../api/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    totalPage: 1,
    noticeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoticeList()
  },
  // 获取列表
  getNoticeList(type) {
    request.getNoticeList(this.data.page, 10, 'platform_us').then((res) => {
      this.data.totalPage = res.value.totalPage
      let tempList = this.data.noticeList
      const resList = res.value.data
      if (type === 'down') {
        tempList.push(...resList)
        this.setData({
          noticeList: tempList
        })
      } else {
        this.setData({
          noticeList: resList
        })
      }
    })
  },
  // 触底加载
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getNoticeList('down')
    }
  },
  open(e) {
    const { id, title } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/notice/notice?id=${id}&title=${title}`
    })
  }
})
