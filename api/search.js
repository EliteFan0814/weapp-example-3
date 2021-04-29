import { fly } from '../utils/request'

const requestApi = {
  // 碎片列表
  getChipList() {
    return fly.get('/api/FragmentMember/HoldInfo')
  },
  getSearchList(page, pageSize, searchKey = '', fragmentId = '') {
    return fly.get('/api/ShopProduct/MemberList', { page, pageSize, searchKey, fragmentId })
  },
  // 碎片兑换商品列表
  exchangeList(page, pageSize, searchKey = '', fragmentId = '') {
    return fly.get('/api/FragmentProduct/List', {page, pageSize, searchKey, fragmentId})
  }
}
export default requestApi
