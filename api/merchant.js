import { fly } from '../utils/request'

const requestApi = {
  // 商家列表
  getShopList(page, pageSize, searchKey = '', latitudeLongitude = '', isHaveReturn) {
    return fly.get('/api/Shop/List', { page, pageSize, searchKey, latitudeLongitude, isHaveReturn })
  },
  getMapResult(latitudeLongitude) {
    return fly.get('/api/Shop/IsHaveReturn', { latitudeLongitude })
  },
  // 收藏列表
  getCollectShopList(page, pageSize, searchKey = '') {
    return fly.get('/api/Shop/CollectList', { page, pageSize, searchKey })
  },
  getShopDetail(id) {
    return fly.get('/api/Shop/sysGetOne', { id })
  },
  // 收藏商家
  collectShop(shopId, isAdd) {
    return fly.post('/api/Shop/FavoritesShop', { shopId, isAdd })
  },
  // 商品分类
  shopCommodityClass(shopId) {
    return fly.get('/api/ShopProductType/SysList', { shopId })
  }
}
export default requestApi
