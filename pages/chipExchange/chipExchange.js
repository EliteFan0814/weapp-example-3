// pages/chipExchange/chipExchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  open(e){
    let {url} = e.currentTarget.dataset;
    wx.navigateTo({url: `/pages/${url}/${url}`});
  }
})