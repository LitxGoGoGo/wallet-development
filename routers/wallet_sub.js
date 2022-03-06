const sub = require("koa-router")() 
const md5 = require("../modules/md5")
const db = require("../modules/mysql")
const words = require("../modules/words")
const fs = require("fs") 
const crypto = require("crypto")
const AES = require("../modules/aes192") 
//用于创建数据库中account和password
//是ajax提交路由
sub.post("/createAccount",async (ctx)=>{

    //接受表单数据
    const address = ctx.request.fields.address 
    const password = md5(ctx.request.fields.password) //二次加密
    //开始插入数据库
    const rs = await db._query("insert into wallet_accounts(address,password)values(?,?)",[address,password])
    if(rs.affectedRows>0) {
        ctx.body = {
            error:0 
        }
    }else{
        ctx.body = {
            error:1 
        }
    }

} )

//助记词页面
sub.get("/words",async (ctx)=>{
    //获取助记词数据
    const helpWords = words.getHelpWords() 
    await ctx.render("words.html",{helpWords})  

} )

//创建私钥
sub.post("/createPrivate",async (ctx)=>{

        //获取所有的助记词字符串
        let words = ctx.request.fields.words 
        //获取地址信息
        let address = ctx.request.fields.address
        //进行sha256的助记词加密
        const hasher = crypto.createHash("sha256")
        //把助记词转为字节
        const wordsBytes = Buffer.from( words ) 
        //console.log("助记词字节:",wordsBytes)
        //修改明文为密文
        const privateKey = hasher.update(wordsBytes).digest("hex")  
        //定义对象
        const privateObject = {
            address:address,
            private:privateKey
        }
    
        //javascript的json其实就是对象的序列化
        const privateDataJson = JSON.stringify(privateObject) 

        //第1步：先获取用户的id是什么
        const rs = await db._query("select id,password from wallet_accounts where address=?",[address]) 
        if(rs.length>0) {
            //能够查出来就获取id
            const fk = rs[0].id 
            //创建明文钥
            const aesKey = md5( rs[0].password ) 
            //console.log(rs[0].password,"，三次后:",aesKey)
            //使用aes的加密，加密对象
            const content = AES.encode(privateDataJson,aesKey) 
            //录入数据库
            const res = await db._query("insert into wallet_dat(id,content)values(?,?)",[fk,content]) 
            //如果创建成功，自动帮用户登录
            if(res.affectedRows>0){
                ctx.session.user = fk 
            }
        }




        //fs.writeFileSync("../statics/wallets/liangge.json", privateDataJson)
        //fs.writeFileSync(  __dirname.replace("routers","") + `statics/wallets/${address}.dat`, privateDataJson )
        ctx.body = {
            error:0
        }
})




module.exports = sub.routes() 