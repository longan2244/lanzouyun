const ajax = require('axios');
/**
 * ---------------有密码的情况---------
 * @param {*} url 地址
 * @param {*} p  密码
 * @returns   
 */
//获取html结构
async function gofile(url, p) {
  let { data: res } = await ajax({
    method: 'get',
    url,
  })
  let sign = getsign(res)
  return await ajaxtolzy(url, sign, p)
}
//发ajax请求到蓝奏云
async function ajaxtolzy(url, sign, p) {
  let data = {
    action: 'downprocess',
    sign,
    p
  }
  try {
    let { data: res } = await ajax({
      method: 'post',
      url: `${url.split('.com')[0]}.com/ajaxm.php`,
      headers: {
        'Referer': `${url}?p`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
    if (res.zt != 1) {
      return {
        msg: '获取失败',
        code: 0,
      }
    }
    //获取下来的直连
    return {
      msg: '获取成功',
      code: 1,
      data: {
        url: `${res.dom}/file/${res.url}`
      }
    }

  } catch (error) {
    return {
      msg: '系统错误',
      code: 0,
    }
  }
}
//获取sign
function getsign(res) {
  // console.log(res);
  return res.split(`$.ajax({`)[1].split(`success:function(msg)`)[0].split(`,`)[3].split(`data : 'action=downprocess&sign=`)[1].split(`&p='+pwd`)[0];
}


module.exports = {
  ajaxtolzy,
  gofile
};