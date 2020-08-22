const express = require('express');
const router = express.Router();

const UserController = require('../../controller/userController');
const authMiddleware = require('../../middlewares/auth');

/**
 * @route POST api/user/register
 * @desc Register user 
 * @access Public
 */
router.post('/register',UserController.createUser);

/**
 * @route POST api/user/login
 * @desc Login user 
 * @access Public
 */
router.post('/login',UserController.loginUser);

/**
 * @route GET api/user
 * @desc Auto Login user 
 * @access Public
 */
router.get('/login',authMiddleware,UserController.autoLoginUser);

module.exports = router;