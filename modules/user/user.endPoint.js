const { Roles } = require("../../middlewear/auth");



const endPoint = {
    profile : [Roles.Admin,Roles.User,Roles.Hr]
}

module.exports = endPoint