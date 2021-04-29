// 获取定位信息
const wxPosition = function () {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        resolve(err)
      }
    })
  })
}
// 查看用户定位权限，引导授权
const isAuthPosition = function () {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res) => {
        let result = res.authSetting['scope.userLocation']
        resolve(result)
      }
    })
  })
}

// 封装定位结果，如果能定位则返回定位信息，否则返回 false 说明并未授权定位
const asyncGetPosition = async function () {
  const res = await wxPosition()
  if (res.errMsg.indexOf('ok') !== -1) {
    return res
  } else {
    return false
  }
}
export default {
  asyncGetPosition,
  isAuthPosition
}
