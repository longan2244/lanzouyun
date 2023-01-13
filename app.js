const express = require('express');
const app = express();
const { gofile } = require('./havepw.js');
const { gethtml } = require('./pwnull.js');
// ###使用说明 接口为   /getlzy   为post请求
// 1. url 为 蓝奏云地址
// 2. pw 为密码
// 3. 请按需通过post传递数据
// by longan2244
// github  https://github.com/longan2244
app.use(express.urlencoded({ extended: false }))
app.post('/getlzy', (req, res) => {
  let url = req.body.url;
  let p = req.body.pw
  // 有密码
  if (p) {
    //获取直链成功返回
    return gofile(url, p).then((data) => {
      return res.send(data)
    })
  }
  //没有密码
  gethtml(url).then(data => {
    return res.send(data)
  })

})

app.listen(5139, () => {
  console.log('成功启动');
});
