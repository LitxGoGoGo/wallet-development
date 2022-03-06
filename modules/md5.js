function md5(password) {
    const crypto = require("crypto") //系统库
    //选择加密方式的选择器
    const md5Selector = crypto.createHash("md5") 
    //定义加密的明文: 123456
    const key = password  + "&&^*(#$$(#$*#(dfasdfasdfwuewirwudfasdfkasdjfj"
    //加密:使用md5的方式修改明文为哈希字符串（32位）
    const hash = md5Selector.update(key).digest("hex") 
    return hash 
}


module.exports = md5