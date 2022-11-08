import express from 'express';
import pageController from './../controllers/pageController.js';
import redirectMiddleware from './../middlewares/redirectMiddleware.js';

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendEmail);
router
	.route('/register')
	// check if user signed in
	// if not redirect to register page
	// otherwise go to main page
	.get(redirectMiddleware.alreadySignedIn, pageController.getRegisterPage);
router
	.route('/login')
	// check if user signed in
	// if not redirect to login page
	// otherwise go to main page
	.get(redirectMiddleware.alreadySignedIn, pageController.getLoginPage);

export default {
	router,
};
