const authRouter = require("./auth/auth.router")
const userRouter = require("./user/user.router")
const postRouter = require("./post/post.router")
const adminRouter = require("./administration/admin.router")




module.exports={
    authRouter,
    userRouter,
    postRouter,
    adminRouter
}