import express from 'express';
import authController from './../controllers/authController.js';
import authMiddleware from './../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/signup').post(authController.createUser); // /users/signup
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
