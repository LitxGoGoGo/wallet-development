const crypto = require("crypto")

function encode(data,password) {
    //AES加密
    const hasher = crypto.createCipher("aes192",password) 
    let code = hasher.update(data,"utf-8","hex") //如果hex不加上去准备返回哈希加密串，就会返回字节
    //确定输出hex加密串
    code += hasher.final("hex") 
    return code 
}



function decode(code,password) {
    const decoder = crypto.createDecipher("aes192",password)
    let str = decoder.update(code,"hex","utf-8" )
    //确定解开的是hex串，输出的是应该以utf-8的形式输出
    str += decoder.final("utf-8") 
    return str  
}


module.exports = {
    encode,decode
}