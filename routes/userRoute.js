import express from 'express';
import authController from './../controllers/authController.js';

const router = express.Router();

router.route('/signup').post(authController.createUser);

export default {
	router,
};
