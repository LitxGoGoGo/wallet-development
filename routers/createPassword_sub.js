const sub = require("koa-router")() 
const account = require("../modules/address")

sub.get("/",async (ctx)=>{

    const address = account.getAccount()


    ctx.render("createPassword.html",{
        address
    })
} )



module.exports = sub.routes() 