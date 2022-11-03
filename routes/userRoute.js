import express from 'express';
import authController from './../controllers/authController.js';

const router = express.Router();

router.route('/signup').post(authController.createUser); // /users/signup
router.route('/login').post(authController.loginUser);

export default {
	router,
};
