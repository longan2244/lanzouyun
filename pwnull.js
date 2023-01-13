// 爬虫模块
const cheerio = require('cheerio');
const ajax = require('axios');
const { ajaxtolzy } = require('./havepw.js')
/**
 * ---------------无密码的情况---------
 * @param {*} url 地址
 * @returns   
 */
module.exports.gethtml = async (url) => {
  let { data: res } = await ajax({
    method: 'get',
    url
  })
  let $ = cheerio.load(res)
  // 获取iframe地址
  let iframe = `${url.split(`.com`)[0]}.com${$('.ifr2').attr('src')}`

  let { data: resolve } = await ajax({
    method: 'get',
    url: iframe,
    headers: {
      'Referer': `${url}?p`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
  $ = cheerio.load(resolve)
  let sign = `${resolve.split(`$.ajax({`)[1].split(`data : `)[2].split(`dataType : 'json',`)[0].split('},')[0].split(`'sign':'`)[1].split(`','`)[0]}`
  let ures = await ajaxtolzy(url, sign)
  return ures
}