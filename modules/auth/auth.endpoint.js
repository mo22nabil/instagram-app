const { Roles } = require("../../middlewear/auth");



const endpoint = {
    logout : [Roles.User,Roles.Hr,Roles.Admin]
}
module.exports = endpoint