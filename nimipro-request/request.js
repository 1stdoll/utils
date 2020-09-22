import Taro from '@tarojs/taro'
import {
  NOCONSOLE,
  MAINHOST
} from '../config'
import {
  commonParame
} from '../config/requestConfig'

export default (options = { method: 'GET', data: {} }) => {
  if (!NOCONSOLE) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options.data
      )}`
    );
  }

  // 根据不同的环境来补全请求地址
  let url = ''
  if ('WEB' === Taro.getEnv()) {
    url = options.url
  } else {
    url = `${MAINHOST}${options.url}`
  }

  return Taro.request({
    url: url,
    data: {
      ...commonParame,
      ...options.data,
    },
    header: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': Taro.getStorageSync('token')
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!NOCONSOLE) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res.data
        );
      }
      if (data.status !== 'ok') {
        Taro.showToast({
          title: `${res.data.error.message}~` || res.data.error.code,
          icon: 'none',
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
};
