import { fly } from '../utils/request'

const requestApi = {
  // 碎片订单
  fragmentOrder(params) {
    return fly.get('/api/FragmentOrder/List', params)
  },
  // 碎片订单详情
  orderInfo(params) {
    return fly.get('/api/FragmentOrder/MemGetOne', params)
  },
  // 角标
  integralInfo(params) {
    return fly.get('/api/FragmentOrder/CornerStatistics', params)
  },
  // 收货
  confirm(data) {
    return fly.post('/api/FragmentOrder/Finish', data)
  },
  // 兑换
  Create(data) {
    return fly.post('/api/FragmentOrder/Create', data)
  },

  // 碎片兑换商品列表
  exchangeList(params) {
    return fly.get('/api/FragmentProduct/List', params)
  },
  // 碎片兑换商品详情
  exchangeDetails(params) {
    return fly.get('/api/FragmentProduct/GetOne', params)
  },
  // 碎片兑换确认订单
  confirmChipOrder(fragmentSettingId, addressId, count) {
    return fly.post('/api/FragmentOrder/Create', { fragmentSettingId, addressId, count })
  },
  
}
export default requestApi
