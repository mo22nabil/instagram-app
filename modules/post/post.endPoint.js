const { Roles } = require("../../middlewear/auth");



const endpoint = {
    createPost : [Roles.User,Roles.Admin]
}
module.exports = endpoint