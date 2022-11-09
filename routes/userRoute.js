import express from 'express';
import { body } from 'express-validator';
import authController from './../controllers/authController.js';
import authMiddleware from './../middlewares/authMiddleware.js';
import User from './../models/User.js';

const router = express.Router();

router.route('/signup').post(
	[
		body('name').not().isEmpty().withMessage('Please Enter Your Name...'),
		body('email')
			.isEmail()
			.withMessage('Please Enter Valid Email...')
			.custom((userEmail) => {
				return User.findOne({ email: userEmail }).then((user) => {
					if (user) {
						return Promise.reject('Email already exists...');
					}
				});
			}),
		body('password')
			.not()
			.isEmpty()
			.withMessage('Please Enter A Password...'),
	],

	authController.createUser
); // /users/signup
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router
	.route('/dashboard')
	// check if user signed in
	// if not redirect to login page
	// otherwise get dashboardpage
	.get(authMiddleware.noAuth, authController.getDashboardPage);

export default {
	router,
};
