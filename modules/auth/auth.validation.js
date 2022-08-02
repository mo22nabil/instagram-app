const joi = require('joi');


const signup ={
    body:joi.object().required().keys({
        userName  : joi.string().required().pattern(new  RegExp (/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
        email  : joi.string().email().required(),
        password  : joi.string().required().pattern(new  RegExp (/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
        cpassword  : joi.string().valid(joi.ref('password')).required(),
        age  : joi.number().min(18).required().messages({
            'number.min':"you still young"
        }),
        gender  : joi.string().required()
    })
}
const confirmEmail ={
    params:joi.object().required().keys({
        token  : joi.string().required()
    })
}
const login ={
    body:joi.object().required().keys({
        email  : joi.string().email().required(),
        password  : joi.string().required().pattern(new  RegExp (/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/))
    })
}
const sendCode ={
    body:joi.object().required().keys({
        email  : joi.string().email().required(),
    })
}

const forgetPassword ={
    body:joi.object().required().keys({
        email  : joi.string().email().required(),
        newPassword  : joi.string().required().pattern(new  RegExp (/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
        cPassword  : joi.string().valid(joi.ref('newPassword')).required(),
        code:joi.number().required().min(4).max(4)
    })
}

module.exports = {
    signup,
    confirmEmail,
    login,
    sendCode,
    forgetPassword
}