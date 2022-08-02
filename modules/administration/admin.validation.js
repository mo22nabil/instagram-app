const joi= require('joi')

const changeRole = {
    body : joi.object().required().keys({
        role : joi.string().required()
    }),
    params : joi.object().required().keys({
        id:joi.string().min(24).max(24)
    })
}

const blockUser = {
    params : joi.object().required().keys({
        id:joi.string().min(24).max(24)
    })
}

module.exports = {
    changeRole,
    blockUser
}