const express = require("express");
const isAuth = require('../../middleware');
const UsersController = require('../../controllers/users');

const router = express.Router();

/**
 * @route POST api/user/register
 * @desc Register user account.
 * @access Public
 */
router.post('/register', UsersController.register_user);

/**
 * @route POST api/user/authenticate
 * @desc User login/authentication.
 * @access Public
 */
router.post('/authenticate', UsersController.authenticate_user);

/**
 * @route GET api/user/data
 * @desc Query db and return user data.
 * @access Private
 */
router.get('/data', isAuth, UsersController.get_user_data);

/**
 * @route GET api/user/logout
 * @desc Logout - Destroys user session used for authentication.
 * @access Public
 */
router.get('/logout', UsersController.user_logout);

module.exports = router;