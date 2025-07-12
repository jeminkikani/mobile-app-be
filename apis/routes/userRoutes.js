const express = require('express')
const userRoutes = express.Router()
const { Register, Login, getRoleWise } = require('../controllers/user.controller');
const { validateHeader } = require('../../utils/validateHeader');
const { UserRoles } = require('../../utils/common')

userRoutes.post('/register', Register);
userRoutes.post('/login', Login);
userRoutes.get('/get', validateHeader([UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.USER]), getRoleWise);

module.exports = userRoutes