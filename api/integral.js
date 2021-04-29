import { fly } from '../utils/request'

const requestApi = {
   // 积分商城分类
   integralCate(params) {
    return fly.get('/api/PlatProductType/List', params)
  },
  // 积分商城列表
  integralList(params) {
    return fly.get('/api/IntegralProduct/List', params)
  },
  // 积分商品详情
  integralGoodInfo(params) {
    return fly.get('/api/IntegralProduct/GetOne', params)
  },
  
  // 积分流水 
  integralBill(params) {
    return fly.get('/api/MemberIntegral/List', params)
  },
  // 积分订单
  integralOrder(params) {
    return fly.get('/api/integralOrder/List', params)
  },
  // 积分订单详情
  integralInfo(params) {
    return fly.get('/api/IntegralOrder/MemGetOne', params)
  },

  // 积分订单收货
  confrim(data) {
    return fly.post('/api/IntegralOrder/Finish', data)
  },
}
export default requestApi
