import { fly } from '../utils/request'

const requestApi = {
  // 获取平台公告
  getNoticeList(page, pageSize, type = 'platform_us') {
    return fly.get('/api/Article/List', { page, pageSize, type })
  },
  // 公告详情
  getNoticeDetail(id) {
    return fly.get('/api/Article/GetOne', { id })
  },
  // 单页文章
  getNoticeDetailSingle(type) {
    return fly.get('/api/Article/GetOneByType', { type })
  },
  // 抽奖商品
  getLotteryList(page, pageSize, searchKey = '', fargmentId = '', status = '', isHome = false) {
    return fly.get('/api/Lottery/List', { page, pageSize, searchKey, fargmentId, status, isHome })
  },
  // 商城分类
  getShopClassList() {
    return fly.get('/api/PlatProductType/List')
  },
  // 商家商品列表
  getShopGoodList(page, pageSize, searchKey, typeId) {
    return fly.get('/api/PlatProduct/List', { page, pageSize, searchKey, typeId })
  },
  // 商品列表
  getGoodsList(page, pageSize, searchKey = '', platType = '', productId = '', productType = '', shopId = '') {
    return fly.get('/api/ShopProduct/MemberList', {
      page,
      pageSize,
      searchKey,
      platType,
      productId,
      productType,
      shopId
    })
  }
}
export default requestApi
