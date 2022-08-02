const joi = require('joi');

const profile = {
    headers: joi.object().required().keys({
        authorization : joi.string().required()
    }).options({allowUnknown:true})
}
const profileTwo = {
    body: joi.object().required().keys({
        name : joi.string().required()
    })
}
const updatePassword = {
    body: joi.object().required().keys({
        oldPassword  : joi.string().required().pattern(new  RegExp (/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
        newPassword  : joi.string().required().pattern(new  RegExp (/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
        cPassword  : joi.string().valid(joi.ref('newPassword')).required(),
    })
}

module.exports  = {
    profile,
    profileTwo,
    updatePassword
}
