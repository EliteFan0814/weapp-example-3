import { fly } from "../utils/request";

const requestApi = {
  // 抽奖商品
  getLotteryDetail(lotteryId) {
    return fly.get("/api/Lottery/GetOne", { lotteryId });
  },
  // 参与抽奖
  joinLottery(lotteryId) {
    return fly.post("/api/Lottery/Join", lotteryId);
  },
  // 抽奖记录
  getLotteryRecord(page, pageSize, lotteryId) {
    return fly.get("/api/Lottery/JoinRecord", { page, pageSize, lotteryId });
  },
};
export default requestApi;
