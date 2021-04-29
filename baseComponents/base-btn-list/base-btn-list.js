// baseComponents/base-btn-list/base-btn-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      const { index, val } = e.currentTarget.dataset;
      this.setData({
        activeIndex: index,
      });
      this.triggerEvent("exchange", { index: index, val: val });
    },
  },
});
