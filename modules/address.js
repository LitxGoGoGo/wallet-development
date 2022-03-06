
module.exports = {
    getAccount(){
        const crypto = require("crypto") 
        const base58 = require("bs58")
        //需要一个椭圆曲线算法的数学库,获取secp256k1类型的曲线就可以了
        const ecdsa = crypto.createECDH("secp256k1") 
        //第0步: （1）生成随机数32字节  (2)利用该随机数是生成一段私钥（k）
        const randNumber32 = crypto.randomBytes(32)
        const privateKey = ecdsa.setPrivateKey(randNumber32)


        //第1步： 在私钥中获取的公钥k->a , 33字节的公钥
        const publicKey = ecdsa.getPublicKey('hex', 'compressed')
        //由于公钥是哈希串，如果希望得到哈希串的字节大小buffer.from,要加上hex的编码，否则是utf-8
        //console.log( Buffer.from(publicKey,"hex") )  



        //对公钥进行sha256加密
        const publicKeyBytes = Buffer.from(publicKey,"hex") //公钥的字节
        const public256 = crypto.createHash("sha256").update(  publicKeyBytes ).digest() 
        //对公钥的sha256对象进行 RIPEMD160加密 
        const pubKey160Hash = crypto.createHash("rmd160").update(  public256 ).digest() 


        //第2步:构造version是1个字节
        const version = Buffer.from([0x34]) 

        //第3步： version + pubKey160Hash
        //const buffer21 = Buffer.alloc(21) 

        const buffer21 = Buffer.concat( [version,pubKey160Hash],21 )


        //第4步： 对version+pubKey160Hash进行2次sha256加密
        const sha256_1 = crypto.createHash("sha256").update(  buffer21 ).digest() 
        const sha256_2 = crypto.createHash("sha256").update(  sha256_1 ).digest() 

        // console.log( Buffer.from(sha256_2,"hex") ) 

        const checksum = Buffer.alloc(4) 

        sha256_2.copy( checksum,0,0,4 )


        const bitcoinAddressBytes = Buffer.concat( [buffer21,checksum],25 )

        //console.log(bitcoinAddressBytes)

        const bitCoinAddress =  base58.encode( bitcoinAddressBytes )

        return bitCoinAddress
    }
}