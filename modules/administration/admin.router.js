const router = require('express').Router()
const { auth } = require('../../middlewear/auth.js');
const validation = require('../../middlewear/validation.js');
const endpoint = require('./admin.endpoint.js');
const adminController = require('./controller/admin.js')
const validators = require('./admin.validation')


//get all users
router.get('/users'  , auth(endpoint.getAllUsers) ,adminController.getAllUsers);


//change privilage
router.patch('/user/:id/role'  ,validation(validators.changeRole)   ,auth(endpoint.changeRole) ,adminController.changeRole);


//block user
router.patch('/user/:id/block'  ,validation(validators.blockUser)   ,auth(endpoint.changeRole) ,adminController.changeRole);


module.exports = router 