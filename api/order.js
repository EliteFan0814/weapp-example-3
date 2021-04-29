import { fly } from '../utils/request'

const requestApi = {
  // 订单
  orderList(params) {
    return fly.get('/api/ShopOrder/List', params)
  },
  // 订单详情
  orderInfo(params) {
    return fly.get('/api/ShopOrder/GetOne', params)
  },
  // 订单支付
  payOrder(data) {
    return fly.post('/api/ShopOrder/GetPayOrder', data)
  },
  // 取消
  cancel(data) {
    return fly.post('/api/ShopOrder/Cancel', data)
  },
  // 收货
  confirm(data) {
    return fly.post('/api/ShopOrder/Confirm', data)
  },
  // refund
  refund(data) {
    return fly.post('/api/ShopOrder/ApplyRefund', data)
  },
  // 立即购买
  buyNow(skuId, shopId, count, addressId) {
    return fly.post('/api/ShopOrder/PayImmediately', { skuId, shopId, count, addressId })
  },
  // 购物车购买
  buyCart(cartId, addressId) {
    return fly.post('/api/ShopOrder/CartSettled', { cartId, addressId })
  },
  // 确认订单商品详情
  getCartInfo(cartIds) {
    return fly.post('/api/Cart/GetCartProduct', cartIds)
  }
}

export default requestApi
