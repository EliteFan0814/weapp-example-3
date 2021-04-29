// baseComponents/base-swiper/base-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  // 是否显示面板指示点
  properties: {
    //
    swiperHeight: {
      type: Number,
      value: 240
    },
    indicatorDots: {
      type: Boolean,
      value: true
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      value: true
    },
    // 自动切换时间间隔
    interval: {
      type: Number,
      value: 5000
    },
    // 滑动动画时长
    duration: {
      type: Number,
      value: 500
    },
    //
    swiperList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e) {
      this.triggerEvent('tapItem', e.currentTarget.dataset.id)
    }
  }
})
