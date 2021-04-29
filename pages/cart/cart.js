import request from '../../api/cart'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selected: [],
    cartList: [],
    selAll: false,
    total: 0
  },

  // 购物车列表
  getCartList() {
    request.getCartList().then((res) => {
      res.value.map((item) => {
        item.isSelectShopAllList = []
        item.selected = []
      })
      this.setData({
        cartList: res.value,
        selected: [],
        selAll: false,
        total: 0
      })
      this.computeTotal()
    })
  },

  // 处理 店铺全选按钮
  handleselectShopAll(e) {
    const { index } = app.tapData(e)
    const key = `cartList[${index}].selected` // 设置子元素选择
    const ItemKey = `cartList[${index}].cartItems` // 设置子元素选择
    const shopKey = `cartList[${index}].isSelectShopAllList` //设置店铺全选标签
    this.setData({ [shopKey]: e.detail })
    const tempSelectId = [],
      tempSelectItem = []
    // 如果是全选，则遍历并存入全选的商品id
    if (e.detail.length) {
      this.data.cartList[index].cartItems.map((item) => {
        item.isSelect = true
        tempSelectId.push(item.id + '')
        tempSelectItem.push(item)
      })
      this.setData({
        [key]: tempSelectId,
        [ItemKey]: tempSelectItem
      })
    } else {
      this.data.cartList[index].cartItems.map((item) => {
        item.isSelect = false
        tempSelectItem.push(item)
      })
      this.setData({
        [key]: [],
        [ItemKey]: tempSelectItem
      })
    }
    this.checkSelAllStation()
    this.computeTotal()
  },
  // 处理商品选择按钮
  handleSelect(e) {
    const { shopindex, index, shopid } = app.tapData(e)
    const key = `cartList[${shopindex}].selected` // 设置子元素选择
    const shopKey = `cartList[${shopindex}].isSelectShopAllList` //设置店铺全选标签
    const itemKey = `cartList[${shopindex}].cartItems[${index}].isSelect` //当前选择的商品选项的 isSelect 属性
    const nowSelectLength = this.data.cartList[shopindex].selected.length // 选择的元素列表长度
    const itemsLength = this.data.cartList[shopindex].cartItems.length // 所有子元素长度
    this.setData({
      [itemKey]: e.detail.length >= nowSelectLength ? true : false,
      [key]: e.detail
    })
    // 如果   选择的子类数组长度 === 所有子类长度   则当前店铺为全选
    if (e.detail.length === itemsLength) {
      this.setData({
        [shopKey]: [shopid]
      })
    } else {
      this.setData({
        [shopKey]: []
      })
    }
    // 店铺为全选时，判断是否所有店铺都为全选
    this.checkSelAllStation()
    this.computeTotal()
  },
  // 处理页面底部全选按钮
  handleSelAll() {
    // 进行全不选操作
    if (this.data.selAll) {
      const temp = this.data.cartList.map((item) => {
        item.isSelectShopAllList = []
        item.selected = []
        item.cartItems.map((innerItem) => {
          innerItem.isSelect = false
        })
        return item
      })
      this.setData({
        cartList: temp
      })
    } else {
      // 进行全选操作  遍历所有写入所有选项
      const temp = this.data.cartList.map((item) => {
        item.isSelectShopAllList = [item.shopId]
        item.selected = item.cartItems.map((innerItem) => {
          innerItem.isSelect = true
          return innerItem.id + ''
        })
        return item
      })
      this.setData({
        cartList: temp
      })
    }
    this.checkSelAllStation()
    this.computeTotal()
  },
  // 设置商品购买数量
  handleCartNum(e) {
    const { info, shopindex, index } = app.tapData(e)
    const key = `cartList[${shopindex}].cartItems[${index}].count`
    request
      .cartAdd(info.id, e.detail)
      .then((res) => {
        this.setData({
          [key]: e.detail
        })
        this.computeTotal()
      })
      .catch((err) => {})
  },
  // 删除商品
  async cartDeleteByOne(e) {
    const res = await app.showModal('删除商品', '是否删除当前商品？')
    if (res) {
      const { id } = app.tapData(e)
      request.cartDeleteByOne(id).then((res) => {
        this.getCartList()
      })
    }
    // todo
    // if (res) {
    //   const { id, shopindex, index } = app.tapData(e)
    //   const tempData = this.data.cartList
    //   const nowItems = tempData[shopindex].cartItems[index]
    //   request.cartDeleteByOne(id).then((res) => {
    //     // 如果删除的是已经选择的商品，则记录下该商品id
    //     let deleteId = ''
    //     if (nowItems.isSelect) {
    //       deleteId = nowItems.id
    //     }
    //     tempData[shopindex].cartItems.splice(index, 1)
    //     tempData.map((item) => {
    //       let tempItem = item.selected
    //       item.selected.map((innerItem, innerIndex) => {
    //         if (innerItem === deleteId) {
    //           tempItem.splice(innerIndex, 1)
    //         }
    //       })
    //       item.selected = tempItem
    //     })
    //     this.setData({
    //       cartList: tempData
    //     })
    //     // 店铺为全选时，判断是否所有店铺都为全选
    //     this.checkSelAllStation()
    //     this.computeTotal()
    //     // this.getCartList()
    //   })
    // }
  },
  // 计算总金额
  computeTotal() {
    let total = 0
    this.data.cartList.map((item) => {
      item.cartItems.map((innerItem) => {
        if (innerItem.isSelect) {
          total = total + innerItem.count * innerItem.specialPrice
        }
      })
    })
    total = total.toFixed(2)
    if (total > 0) {
      this.setData({
        total: total
      })
    } else {
      this.setData({
        total: 0
      })
    }
  },
  // 判断并设置页面底部全选按钮状态
  checkSelAllStation() {
    let isAllSelectFlag = true
    this.data.cartList.map((item) => {
      if (!item.isSelectShopAllList.length) {
        isAllSelectFlag = false
      }
    })
    this.setData({
      selAll: isAllSelectFlag
    })
  },
  // 结算购物车订单
  confirmCartOrder() {
    let idList = []
    this.data.cartList.map((item) => {
      // if(item.)
      idList = [...idList, ...item.selected]
    })
    console.log('idList', idList)
    const cartIdList = JSON.stringify(idList)
    wx.navigateTo({
      url: `/pages/confirmOrder/confirmOrder?type=cart&cartIdList=${cartIdList}`
    })
  },
  // 跳转首页
  jumpIndex() {
    wx.switchTab({ url: '/pages/index/index' })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCartList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
