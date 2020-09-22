import Taro from '@tarojs/taro'

const app = Taro.getApp()
const env = Taro.getEnv()

export const getToken = () => Taro.getStorageSync('token')
export const replaceHtml = (html = '') => {
  console.log(html)
  var res = html.replace(/\<(font)/g, '<span')
    .replace(/\<(font)/g, '/span')
    .replace(/\<(br)\>/g, '<br />')
    .replace(/\<(section)\>/g, '')
    .replace(/\<\/(section)\>/g, '')
    .replace(/\<(p)/g, '<p class="rich_p" ')
    .replace(/\<(img)/g, '<img style="max-width:100%;height:auto"')
    // .replace(/\<[i][m][g]/g, '<img class="rich_img"')
    .replace(/(line-height\:)\s(normal)/g, 'line-height:1.8em')

  // console.log(html.indexOf('img'))
  // .replace(/(font-size:)[\s]*[\d]*(px)/g, 'font-size:1em')
  // console.log(res)
  return res
}

export function moment(date) {
  let T = 0
  let aTc = 0
  if (!date) {
    T = new Date()
  } else {
    if (typeof date === 'string') {
      T = new Date(date.replace(/[-]/g, '/'))
    } else {
      T = new Date(date)
    }

  }
  let Tarr = [1, 2, 3, 4, 5, 6]
  const dataArr = (D) => {
    Tarr[0] = D.getFullYear()
    Tarr[1] = D.getMonth() + 1
    Tarr[2] = D.getDate()
    Tarr[3] = D.getHours()
    Tarr[4] = D.getMinutes()
    Tarr[5] = D.getSeconds()
  }
  dataArr(T)

  const format = (v) => {
    let F = v || 'YYYY-M-D H:m:S'
    let Ft = Tarr
    if (F.indexOf('MM') !== -1) {
      if (Ft[1] < 10) Ft[1] = `0${Ft[1]}`
    }
    if (F.indexOf('DD') !== -1) {
      if (Ft[2] < 10) Ft[2] = `0${Ft[2]}`
    }
    if (F.indexOf('HH') !== -1 || F.indexOf('hh') !== -1) {
      if (Ft[3] < 10) Ft[3] = `0${Ft[3]}`
    }
    if (F.indexOf('mm') !== -1) {
      if (Ft[4] < 10) Ft[4] = `0${Ft[4]}`
    }
    if (F.indexOf('SS') !== -1) {
      if (Ft[5] < 10) Ft[5] = `0${Ft[5]}`
    }
    // console.log('time=>', Ft)
    let f = F.replace(/[Y]+/g, Ft[0])
      .replace(/[M]+/g, Ft[1])
      .replace(/[D]+/g, Ft[2])
      .replace(/[H]+/g, Ft[3])
      .replace(/[h]+/g, Ft[3])
      .replace(/[m]+/g, Ft[4])
      .replace(/[S]+/g, Ft[5])
    return f
  }
  const add = (v = 0, t = '') => {
    if (!t) {
      t = 'day'
    }
    let V = v
    let Tt = t
    let adT = T
    switch (Tt) {
      case 'year':
        adT.setFullYear(adT.getFullYear() + V)
        break;
      case 'month':
        adT.setMonth(adT.getMonth() + V)
        break;
      case 'day':
        adT.setDate(adT.getDate() + V)
        break;
      case 'hour':
        adT.setHours(adT.getHours() + V)
        break;
      case 'minutes':
        adT.setMinutes(adT.getMinutes() + V)
        break;
      case 'seconds':
        adT.setSeconds(adT.getSeconds() + V)
        break;
    }
    dataArr(adT)
    aTc = adT
    const ad = {
      format,
      count,
      value: Tarr,
      callback: adT
    }
    return ad
  }

  const count = (end) => {
    let ct = [0, 0, 0, 0, 0]
    let l = 0
    // console.log('end  => ', end)
    let now = new Date()
    if (typeof (end) === 'string') {

      let enD = new Date(end.replace(/[-]/g, '/'))
      console.log('end  Date => ', enD)

      l = enD - now
      console.log('count now-end=> ', l)
      if (!end && aTc !== 0) {
        enD = aTc
      }
      l = parseInt(l / 1000)
      // console.log('count_l=>', l)

    }
    if (typeof (end) === 'number') {
      l = parseInt(end / 1000)
    }
    // console.log('count l=> ', l)
    if (end && l > 0) {
      ct[0] = l >= 86400 ? parseInt(l / 86400) : 0
      ct[1] = l >= 3600 ? parseInt(l % 86400 / 3600) : 0
      ct[2] = parseInt(l / 3600)
      ct[3] = l >= 60 ? parseInt(l % 3600 / 60) : 0
      ct[4] = parseInt(l % 60)
    }
    return ct
  }
  const mt = {
    format,
    add,
    count,
    value: Tarr
  }
  return mt
}


export function getDate(date) {
  let T = new Date(date)
  if (!date) {
    T = new Date()
  }
  let Tarr = [1, 2, 3, 4, 5, 6]
  Tarr[0] = T.getFullYear()
  Tarr[1] = T.getMonth() + 1
  Tarr[2] = T.getDate()
  Tarr[3] = T.getHours()
  Tarr[4] = T.getMinutes()
  Tarr[5] = T.getSeconds()
  // console.log(Tarr)
  return Tarr
}

export function getPayMethod(d) {
  let p = ''
  switch (d) {
    case 1:
      p = '支付宝'
      break;
    case 2:
      p = '银联'
      break;
    case 3:
      p = '微信支付'
      break;
    case 4:
      p = '积分兑换'
      break;
    case 6:
      p = '活动奖品'
      break;
    case 7:
      p = '苏宁支付'
      break;
    case 8:
      p = '线下支付'
      break;
    case 9:
      p = '微信支付'
      break;
  }
  return p
}

export function PayMethod() {
  const d = Taro.getEnv()
  let p = 1
  switch (d) {
    case 'WEAPP':
      p = 9;
      break;
    case 'ALIPAY':
      p = 10;
      break;
  }
  return p
}


export function PayHandle(data, { onSuccess, onFail, onCancel, complete }) {
  const env = Taro.getEnv()
  console.log('pay type => ', env)
  if (env === 'WEAPP') {
    Taro.requestPayment({
      ...data,
      signType: data.paySignType,
      package: data.wxPackage,
      complete: pay => {
        console.log(pay)
        Taro.hideLoading()
        if (complete) complete()
        if (pay.errMsg.indexOf('fail cancel') !== -1) {
          if (onCancel) onCancel()
          return;
        }
        if (pay.errMsg.indexOf('fail') !== -1) {
          if (onFail) onFail()
          return;
        }
        if (onSuccess) onSuccess()
      }
    })
  } else if (env === 'ALIPAY') {
    my.tradePay({
      tradeNO: data.tradeNo,
      complete(pay) {
        console.log(pay)
        Taro.hideLoading()
        const { resultCode } = pay
        if (complete) complete()
        if (
          resultCode === '9000' ||
          resultCode === '8000' ||
          resultCode === '6004'
        ) {
          if (onSuccess) onSuccess()
        }
        if (
          resultCode === '6002' ||
          resultCode === '4000'
        ) {
          if (onFail) onFail()
        }
        if (resultCode === '6001') {
          if (onCancel) onCancel()
        }
      }
    })
  }
}

export function pathParams(url) {
  // console.log('url=>', url)
  const paramsArr = url.replace(/(https)[^\?]+\?/, '').split('&')
  const params = {}
  // console.log('paramsArr=>', paramsArr)
  paramsArr.forEach((i, d) => {
    const a = i.split('=')
    params[a[0]] = a[1]
  })
  // console.log(data)
  return params
}

export function MiniParams(url) {
  // console.log('url=>', url)
  const paramsArr = url.split('&')
  const params = {}
  // console.log('paramsArr=>', paramsArr)
  paramsArr.forEach((i, d) => {
    const a = i.split('=')
    let apptype = 0
    const typeMap = ['wx', 'ali']
    if (env === 'ALIPAY') {
      apptype = 1
    }
    if (a[0].toLowerCase().indexOf(typeMap[1 - apptype]) > -1) return
    if (a[0].toLowerCase() === `${typeMap[apptype]}appid`) {
      params['appId'] = a[1]
      return
    }
    if (a[0].indexOf('path') > -1) {
      if (a[0] === `${typeMap[apptype]}path` || (a[0] === 'path' && !params.path)) {
        params['path'] = decodeURIComponent(a[1])
        return
      }
      return
    }
    if (typeof params['extraData'] === 'undefined') params['extraData'] = {}
    params['extraData'][a[0]] = a[1]
  })
  // console.log(data)
  return params
}


export const getKitchenStatus = (status, type, send) => {
  let text = ''
  switch (status) {
    case 10:
      text = '待付款'
      break;
    case 20:
      text = '已付款(备餐中)'
      break;
    case 22:
      if (type === 12) {
        text = '待配送'
      } else {
        text = '待取餐'
      }
      break;
    case 30:
      if (type === 12) {
        switch (send) {
          case 1:
            text = '等待骑士取货'
            break;
          case 2:
            text = '骑士配送中'
            break;
          case 3:
            text = '骑士已送达'
            break;
          case 4:
            text = '等待骑士接单'
            break;
          case 5:
            text = '已取消'
            break;
          case 100:
            text = '骑士已到店'
            break;
        }
      } else {
        text = '待取餐'
      }
      break;
    case 60:
      text = '退款申请中'
      break;
    case 70:
      text = '已完成'
      break;
    case 90:
      text = '审核不通过'
      break;
    case 100:
      text = '待付款'
      break;
    case 110:
      text = '已退款'
      break;
    case 500:
      text = '已取消'
      break;
  }
  return text
}


// export function scanCode(url) {
//   if (url.indexOf('sywrj') > -1) {
//     Taro.navigateTo({
//       url: '../webView/index?url=https%3A%2F%2Fh5.joylinkcenter.com%2Fspa%2Flogin%2Fbyminipro%3Fto%3D%2Fspa%2Fivm%2Fgoods%26biz%3D01' + encodeURIComponent('&qrCode=' + url)
//     })
//     return
//   }
//   // if (env === 'WEAPP') return
//   if (url.indexOf('flash-key') > -1) {
//     // console.warn('flash-key=>', result.indexOf('flash-key') !== -1)
//     // this.globalData.qrCode = qrCode
//     Taro.navigateTo({
//       url: '../user-lightCipher-manage/index?qrCode=' + encodeURIComponent(url)
//     })
//     return
//   }
//   if (url.indexOf('ylcf') > -1) {
//     const data = pathParams(url)
//     console.warn('ylcf data=>', data)
//     Taro.navigateTo({
//       url: '../kitchen-shop/index?id=' + data.shopId
//     })
//     return
//   }
//   if (url.indexOf('desk') > -1) {
//     const data = pathParams(url)
//     console.warn('desk data=>', data)
//     app.globalData.deskNo = data.No
//     Taro.navigateTo({
//       url: '../kitchen/index'
//     })
//     return
//   }
// }

