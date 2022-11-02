import Course from './../models/Course.js';

const createCourse = async (req, res) => {
	try {
		const course = await Course.create(req.body);
		res.status(201).json({
			status: 'success',
			course,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

const getAllCourses = async (req, res) => {
	try {
		const courses = await Course.find();
		res.status(200).render('courses', {
			courses,
			pageName: 'courses',
		});
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

export default {
	createCourse,
	getAllCourses,
};
