import { fly } from '../utils/request'

const requestApi = {
  // 绑定微信信息
  bindWxInfo(NickName, AvatarUrl) {
    return fly.post('/api/Member/BindWxInfo', { NickName, AvatarUrl })
  },
  // 绑定微信电话
  bindPhone(EncryptedData, IV) {
    return fly.post('/api/Member/BindMobile', { EncryptedData, IV })
  },
  // 获取个人信息
  getUserInfo() {
    return fly.get('/api/Member/GetOne')
  },
  // 获取默认
  getDefaultAddress() {
    return fly.get('/api/MemberAddress/LoadDefualt')
  },
  // 用户碎片持有
  getFragment() {
    return fly.get('/api/FragmentMember/HoldInfo')
  },
  
  // 积分商品兑换
  buyExchange(data) {
    return fly.post('/api/IntegralOrder/Create', data)
  },
  // 碎片持有情况
  getFragment() {
    return fly.get('/api/FragmentMember/HoldInfo')
  },
  // 碎片流水
  getFragmentAccount(params) {
    return fly.get('/api/FragmentMember/List', params)
  },
  
  // 抽奖订单
  drawOrder(params) {
    return fly.get('/api/LotteryOrder/List', params)
  },
  // 抽奖订单筛选
  drawOrderScreen(params) {
    return fly.get('/api/LotteryOrder/CornerStatistics', params)
  },
  // 抽奖订单详情
  drawOrderInfo(params) {
    return fly.get('/api/LotteryOrder/MemGetOne', params)
  },

  // 我参与的抽奖
  joinDrawOrder(params) {
    return fly.get('/api/Lottery/MyJoinList', params)
  },
//   // 抽奖订单详情
//   drawOrderInfo(params) {
//     return fly.get('/api/LotteryOrder/MemGetOne', params)
//   },
}

export default requestApi


