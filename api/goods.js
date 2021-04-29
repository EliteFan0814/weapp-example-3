import { fly } from '../utils/request'

const requestApi = {
  // 获取商品列表
  getGoodsList(page, pageSize, searchKey = '', productId = '', productType = '', shopId = '', isSpecial = false) {
    return fly.get('/api/ShopProduct/MemberList', {
      page,
      pageSize,
      searchKey,
      productId,
      productType,
      shopId,
      isSpecial
    })
  },
  // 获取商品详情
  getGoodDetail(productId) {
    return fly.get('/api/ShopProduct/GetProduct', { productId })
  },
  // 获取商家列表
  getShopList(page, pageSize, searchKey = '', latitudeLongitude = '') {
    return fly.get('/api/Shop/List', {
      page,
      pageSize,
      searchKey,
      latitudeLongitude
    })
  },
  // 立即购买
  buyNow(skuId, shopId, count, addressId) {
    return fly.post('/api/Shop/List', { skuId, shopId, count, addressId })
  },
  // 获取商品评价
  getGoodComment(page, pageSize, productId) {
    return fly.get('/api/Comment/SysCommentList', { page, pageSize, productId })
  }
}
export default requestApi
