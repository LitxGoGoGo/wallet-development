const Koa = require("koa")
const Static = require("koa-static")
const body = require("koa-better-body")
const convert = require("koa-convert")
const Router = require("koa-router")()
const path = require("path") 
const render = require('koa-art-template')
const session = require("koa-session") 

const app = new Koa() 
const port = 9999
app.listen(port,()=>{
    console.log("koa-server start:" + port) 
})
 

app.keys = ["dfjalsdfjlubo345394834095&*^%$$q4xcsd"]

app.use(session({
    maxAge: 86400000,
}, app))

//处理post请求(提交)
app.use( convert( body({

}) ) ) 

render(app, {
    root: path.join(__dirname, 'templates'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})


//定义主路由
//配置子路理由
Router.use("/",require("./routers/createPassword_sub.js")) 
Router.use("/wallet",require("./routers/wallet_sub.js")) 
Router.use("/account",require("./routers/account_sub.js"))
//配置过的主路由和子路由都使用上
app.use( Router.routes() )


//静态资源
app.use( Static("./statics") )

