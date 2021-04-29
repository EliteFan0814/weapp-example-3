// pages/teamAccount/teamAccount.js
import request from "../../api/personal";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    list: [],
    totalPage: 1,
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    if(options.id){
      console.log(options.id);
      this.setData({id: options.id})
    }
    this.getData();
  },
  // onShow() {
  //   this.setData({
  //     page: 1,
  //   });
  // },

  getData(type) {
    let { list, page, id } = this.data;
    request.getFragmentAccount({
      page,
      pageSize: 10,
      fragmentId: id
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
