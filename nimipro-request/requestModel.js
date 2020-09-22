import Taro from '@tarojs/taro'
import { getToken } from './utils.js'
import {
  NOCONSOLE,
  // MAINHOST
} from '../config'
// import {
//   commonParame
// } from '../config/requestConfig'

const testApiServer = 'https://itaptest-api.ucitymetro.com';
const apiServer = 'https://crm-api.joylinkcenter.com';

// "appid": "wx8d9584d470b4efc5", //优城
// "appid": "wx35738cd35fdd5a15", //悦邻汇

export default (options = { method: 'GET', test: false }) => {
  // if (!NOCONSOLE) {
  //   console.log(
  //     `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
  //       options.data
  //     )}`
  //   );
  // }

  if (!options.url) {
    Taro.showToast({
      icon: 'none',
      title: '哎呀！出错了~',
    })
    return;
  }

  const headerJSON = {
    'Content-Type': 'application/json; charset=UTF-8',
    'token': getToken()
  }

  console.log('request=>', options)

  return Taro.request({
    url: `${options.test ? testApiServer : apiServer}${options.url}`,
    data: options.data || null,
    header: { ...headerJSON, ...options.header },
    method: options.method,
  }).then((res) => {
    const { data, statusCode } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!NOCONSOLE) {
        console.log(
          `${new Date().toLocaleString()}【 M='${options.url}' 】`,
          res.data
        );
      }
      if (data.code !== "0000") {
        Taro.hideLoading()
        if (data.code === "0007" || data.code === "0008") {
          Taro.showToast({
            icon: 'none',
            title: '未登录',
          })
        }
        else if (data.code === "0001") {
          Taro.showToast({
            icon: 'none',
            title: data.msg || '哎呀！出错了~'
          })
        }
        else if (data.code === "0009") {
          Taro.showToast({
            icon: 'none',
            title: '登录状态异常',
          })
        }
        else {
          Taro.showToast({
            icon: 'none',
            title: data.msg,
            // title: `服务器错误\n${data.code}\n${data.msg}`,
          })
        }
      }
      return data
    } else {
      Taro.hideLoading()
      Taro.showToast({
        icon: 'none',
        title: '哎呀！出错了~',
      })
      return
    }
  });
};
