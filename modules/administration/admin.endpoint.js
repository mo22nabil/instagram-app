const { Roles } = require("../../middlewear/auth");


const endpoint = {
    getAllUsers : [Roles.Admin],
    changeRole : [Roles.Admin]
}


module.exports = endpoint