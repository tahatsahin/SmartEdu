import express from 'express';
import courseController from './../controllers/courseController.js';

const router = express.Router();

router.route('/').post(courseController.createCourse);
router.route('/').get(courseController.getAllCourses);

export default {
	router,
};
