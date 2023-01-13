const express = require('express');
const app = express();
const { gofile } = require('./havepw.js');
const { gethtml } = require('./pwnull.js');
const cors = require('cors');
const path = require('path');

// ###使用说明 接口为   /getlzy   为post请求
// 1. url 为 蓝奏云地址
// 2. pw 为密码
// 3. 请按需通过post传递数据
// by longan2244
// github :https://github.com/longan2244
// 博客  ：longans.top
//qq :2244420174
// app.use('/', express.static(path.join(__dirname, './dist')));
app.use(cors())
app.use(express.urlencoded({ extended: false }))
//这里是post请求 不懂联系我QQ //qq :2244420174
app.post('/getlzy', (req, res) => {
  let url = req.body.url;
  let p = req.body.pw;
  // 有密码
  if (p) {
    //获取直链成功返回
    return gofile(url, p).then((data) => {
      return res.send(data)
    }).catch(err => {
      return res.send({
        code: 0,
        msg: '获取直链失败 检查密码是否需要 或正确'
      })
    })
  }
  //没有密码
  gethtml(url).then(data => {
    //qq :2244420174
    return res.send(data)
  }).catch(err => {
    return res.send({
      code: 0,
      msg: '获取直链失败 检查密码是否需要 或正确'
    })
  })

})

app.listen(5139, () => {
  console.log('成功启动');
});
