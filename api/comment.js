import { fly } from '../utils/request'

const requestApi = {
  // 立即评价
  getCartList() {
    return fly.get('/api/Cart/List')
  }
}
export default requestApi
