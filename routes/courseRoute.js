import express from 'express';
import courseController from './../controllers/courseController.js';
import roleMiddleware from './../middlewares/roleMiddleware.js';

const router = express.Router();
const roles = ['teacher', 'admin'];

router
	.route('/')
	// allow teachers or admins to create course, not students
	.post(roleMiddleware.roleMiddleware(roles), courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);

export default {
	router,
};
