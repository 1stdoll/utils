import Taro from '@tarojs/taro';
var barcode = require('./barcode');
var qrcode = require('./qrcode');
var env = Taro.getEnv()

function convert_length(length) {
  if (env === 'WEAPP') {
    return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
  }

  if (env === 'ALIPAY') {
    return Math.round(my.getSystemInfoSync().windowWidth * length / 750);
  }
}

function barc(id, code, width, height) {

  if (env === 'WEAPP') {
    barcode.code128(wx.createCanvasContext(id), code, convert_length(width), convert_length(height))
  }

  if (env === 'ALIPAY') {
    barcode.code128(my.createCanvasContext(id), code, convert_length(width), convert_length(height))
  }
}

function qrc(id, code, size) {

  if (env === 'WEAPP') {
    qrcode.api.draw(code, {
      ctx: wx.createCanvasContext(id),
      width: convert_length(size),
      height: convert_length(size)
    })
  }
  if (env === 'ALIPAY') {
    qrcode.api.draw(code, {
      ctx: my.createCanvasContext(id),
      width: convert_length(size),
      height: convert_length(size)
    })
  }
}

module.exports = {
  barcode: barc,
  qrcode: qrc
}