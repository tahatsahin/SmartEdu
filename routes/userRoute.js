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
			.custom(async (userEmail) => {
				const user = await User.findOne({ email: userEmail });
				if (user) {
					return Promise.reject('Email already exists...');
				}
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
router.route('/:id').delete(authController.deleteUser);
router
	.route('/dashboard')
	// check if user signed in
	// if not redirect to login page
	// otherwise get dashboardpage
	.get(authMiddleware.noAuth, authController.getDashboardPage);

export default {
	router,
};
