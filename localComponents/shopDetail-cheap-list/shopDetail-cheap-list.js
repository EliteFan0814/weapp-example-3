const app = getApp();
import request from "../../api/goods";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否隐藏滚动条
    hideScrollBar: {
      type: Boolean,
      value: false,
    },
    // 页面其他元素占据高度
    residueHeight: {
      type: Number,
      value: 0,
    },

    shopId: {
      type: String,
      value: "",
      observer() {
        this.shopCommodityList();
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeItemIndex: 0, // 高亮的 item 角标
    headerHeight: 0,
    page: 1,
    totalPage: 0,
    contentList: [],
    commodityList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 下拉获取新页面数据
    scrollLowerGetList(e) {
      if (this.data.page < this.data.totalPage) {
        this.data.page += 1;
        this.shopCommodityList("down");
      }
    },

    shopCommodityList(type) {
      request
        .getGoodsList(
          this.data.page,
          10,
          "",
          "",
          this.data.activeClassId,
          this.properties.shopId,
          true
        )
        .then((res) => {
          this.data.totalPage = res.value.totalPage;
          let commodityList = this.data.commodityList;
          const resList = res.value.data;
          if (type == "down") {
            commodityList.push(...resList);
            this.setData({
              commodityList: this.data.list,
            });
          } else {
            this.setData({
              commodityList: res.value.data,
            });
          }
        });
    },

    shopListReset() {
      this.setData({
        page: 1,
        list: [],
      });
      this.shopCommodityList();
    },
    openGoodDetail(e) {
      const { id } = app.tapData(e);
      wx.navigateTo({ url: "/pages/goodDetail/goodDetail?id=" + id });
    },
  },
});
