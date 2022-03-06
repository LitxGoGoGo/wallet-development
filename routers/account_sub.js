const sub = require("koa-router")() 
const md5 = require("../modules/md5")
const db = require("../modules/mysql")
sub.get("/index",async (ctx)=>{

    if(ctx.session.user){
        await ctx.render("account.html")
    }else{
        ctx.response.redirect("/") //http://localhost:9999/ 
    }

    
} )



sub.get("/checkout",async (ctx)=>{

    if(ctx.session.user){
        delete ctx.session.user // delete ctx.session["user"]
        //退出登录就跳回首页
        ctx.response.redirect("/")
    }
    
} )

//钱包登录
sub.post("/login",async (ctx)=>{
    //获取地址
    let address = ctx.request.fields.address 
    //获取数据库密码(二次md5的密码了)
    const rs = await db._query("select id,password from wallet_accounts where address=?",[address]) 
    if(rs.length>0){
        const pass = md5(ctx.request.fields.pass) 
        if(rs[0].password===pass){
            //我就设置登录状态
            ctx.session.user = rs[0].id 
            //跳转
            //ctx.response.redirect("/account/index")
            ctx.body = {
                error:0, 
               
            }
        }else{
            ctx.body = {
                error:100, 
                message:"登录密码不正确,请重新输入密码"
            }
        }
    }else{
        ctx.body = {
            error:100, 
            message:"无法获取钱包地址，请重新创建"
        }
    } 
})



module.exports = sub.routes() 