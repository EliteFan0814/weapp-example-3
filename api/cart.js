import { fly } from '../utils/request'

const requestApi = {
  // 购物车列表
  getCartList() {
    return fly.get('/api/Cart/List')
  },
  // 商品详情
  getGoodDetail(productId) {
    return fly.get('/api/ShopProduct/GetProduct', { productId })
  },
  addToCart(shopId, productId, skuId, count) {
    return fly.post('/api/Cart/Add', { shopId, productId, skuId, count })
  },
  // 购买商品数量
  cartAdd(id, count) {
    return fly.post('/api/Cart/AddOrDeductProduct', { id, count })
  },
  // 删除
  cartDeleteByOne(id) {
    return fly.post('/api/Cart/Delete', id)
  },
  // 结算
  cartSettled(cartId, addressId) {
    return fly.post('/api/ShopOrder/CartSettled', { cartId, addressId })
  }
}
export default requestApi
