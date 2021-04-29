// pages/myFragment/myFragment.js
import request from '../../api/personal'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfoHeight: 180 + app.globalData.capsuleToTop, // html clas类 user-info 的高度
    list: [],
    total: 0,
    myFragment: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getFragment();
  },

  getFragment(){
    request.getFragment().then(res=>{
      let {fragments, totalCount} = res.value;
      fragments.sort(item=>{
        return item.count - item.count
      })
      this.setData({
        list: fragments,
        total: totalCount,
        myFragment: fragments.slice(0, 3)
      })
    })
  },

  open(e){
    let {url, id, img} = e.currentTarget.dataset;
    wx.navigateTo({url: `/pages/${url}/${url}?id=${id}&url=${img}`});
  }
})