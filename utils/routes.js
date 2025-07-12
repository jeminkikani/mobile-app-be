const express = require('express');
const userRoutes = require('../apis/routes/userRoutes');
const Router = express.Router()

Router.use("/user", userRoutes);

module.exports = Router