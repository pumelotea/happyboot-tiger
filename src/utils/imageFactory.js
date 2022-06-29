/**
 * 图片添加水印
 *  callback  //回调方法，返回base64的图片
 *  image: Image()  //底图对象
 *  sign: Image()  //水印对象
 *  left: Number  //水印左侧位置
 *  top: Number  //水印顶部位置
 *  imageWidth: Number  //底图宽度
 *  imageHeight: Number  //底图高度
 *  signWidth: Number  //水印宽度
 *  signHeight: Number  //水印高度
 * */
export function watermark(callback, image, sign, left = 0, top = 0, imageWidth = '', imageHeight = '', signWidth = '', signHeight = '') {
  if (!image || !sign) {
    callback({
      success: false,
      data: '底图或水印不能为空！'
    })
  } else {
    let imageSize = {w: 0, h: 0}
    let signSize = {w: 0, h: 0}
    imageSize.w = imageWidth || image.width
    imageSize.h = imageHeight || image.height
    signSize.w = signWidth || sign.width
    signSize.h = signHeight || sign.height
    //创建一个canvas
    const canvas = document.createElement('canvas')
    //根据底图的大小设置canvas的宽高
    canvas.width = imageSize.w
    canvas.height = imageSize.h
    const ctx = canvas.getContext('2d')
    //绘制底图
    ctx.drawImage(image, 0, 0, imageSize.w, imageSize.h)
    //绘制水印
    ctx.drawImage(sign, left, top, signSize.w, signSize.h)
    //返回base64
    callback({
      success: true,
      data: canvas.toDataURL('image/png', 1)
    })
  }
}

/**
 * 图片裁剪
 * callback  //回调方法，返回base64的图片
 * image: Image()  //底图对象
 * left: Number  //裁剪左侧距离
 * right: Number  //裁剪右侧距离
 * top: Number  //裁剪顶部距离
 * bottom: Number  //裁剪底部距离
 * width: Number  //底图宽度
 * height: Number  //底图高度
 * */
export function cropper(callback, image, left = 0, right = 0, top = 0, bottom = 0, width = 0, height = 0) {
  if (!image) {
    callback({
      success: false,
      data: '底图不能为空！'
    })
  } else {
    let imageSize = {w: 0, h: 0}
    imageSize.w = width || image.width
    imageSize.h = height || image.height

    let canvasSize = {w: 0, h: 0}

    if ((left + right) >= imageSize.w) {
      callback({
        success: false,
        data: '左右距离参数错误！'
      })
      return
    } else if ((top + bottom) >= imageSize.h) {
      callback({
        success: false,
        data: '顶底距离参数错误！'
      })
      return
    } else {
      canvasSize.w = imageSize.w - left - right
      canvasSize.h = imageSize.h - top - bottom
    }

    //创建一个canvas
    const canvas = document.createElement('canvas')
    //根据裁剪的大小设置canvas的宽高
    canvas.width = imageSize.w
    canvas.height = imageSize.h
    const ctx = canvas.getContext('2d')
    //绘制底图
    ctx.drawImage(image, 0, 0, imageSize.w, imageSize.h)
    //裁剪
    const clip = ctx.getImageData(left, top, canvasSize.w, canvasSize.h)
    //调整画布大小
    canvas.width = canvasSize.w
    canvas.height = canvasSize.h
    ctx.putImageData(clip, 0, 0)
    //返回base64
    callback({
      success: true,
      data: canvas.toDataURL('image/png', 1)
    })
  }
}

/**
 * 调整图片宽高
 * callback  //回调方法，返回base64的图片
 * image: Image()  //底图对象
 * width: Number  //调整的宽度
 * height: Number  //调整的高度
 * */
export function resize(callback, image, width = 0, height = 0) {
  if (!image) {
    callback({
      success: false,
      data: '底图不能为空！'
    })
  } else {
    let imageSize = {w: 0, h: 0}
    imageSize.w = width || image.width
    imageSize.h = height || image.height

    //创建一个canvas
    const canvas = document.createElement('canvas')
    //根据调整的大小设置canvas的宽高
    canvas.width = imageSize.w
    canvas.height = imageSize.h
    const ctx = canvas.getContext('2d')
    //绘制底图
    ctx.drawImage(image, 0, 0, imageSize.w, imageSize.h)
    //返回base64
    callback({
      success: true,
      data: canvas.toDataURL('image/png', 1)
    })
  }
}

/**
 * 调整图片质量
 * callback  //回调方法，返回base64的图片
 * image: Image()  //底图对象
 * quality: Number  //图片质量 0 - 1
 * */
export function quality(callback, image, quality = 1) {
  if (!image) {
    callback({
      success: false,
      data: '底图不能为空！'
    })
  } else {
    //创建一个canvas
    const canvas = document.createElement('canvas')
    //根据调整的大小设置canvas的宽高
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext('2d')
    //绘制底图
    ctx.drawImage(image, 0, 0)
    //返回base64
    callback({
      success: true,
      data: canvas.toDataURL('image/png', quality)
    })
  }
}
