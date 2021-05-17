// 引入mockjs,创建mockjs对象
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// 模拟数据的封装
let Result = {
    code: 200,
    msg: '操作成功',
    data: null
};
//模拟'/captcha'请求的返回结果:即模拟点击验证码图像后的响应结果
Mock.mock('/captcha', "get", () =>  {
    // 点击验证码图像响应后的返回结果:
    // 验证码的响应需要两个结果:token随机码和验证码图像
    Result.data = {
        // 生成的token随机码是一个32为数据
        token: Random.string(32),
        captchaImg: Random.dataImage('100x50', 'pn454')  // 注意这里的x是英文字母x,不然会报错
    }
    return Result
})


//模拟'/login'请求的返回结果:即模拟用户登录信息响应
Mock.mock('/login', "post", () =>  {
    Result.code=401
    Result.msg = "验证码错误"
    // 无法在header中传入jwt
    return Result
})