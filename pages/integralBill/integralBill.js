// pages/teamAccount/teamAccount.js
import request from "../../api/integral";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    list: [],
    totalPage: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onShow() {
    this.setData({
      page: 1,
    });
    this.getData();
  },

  getData(type) {
    let { list, page } = this.data;
    request.integralBill({
      page,
      pageSize: 10,
      way: "",
    }).then((res) => {
      const { data, totalPage } = res.value;
      if (type == "down") {
        list.push(...data);
        this.setData({
          list,
          totalPage,
        });
      } else {
        this.setData({
          list: data,
          totalPage,
        });
      }
    });
  },
  
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1;
      this.getData("down");
    }
  },
});
