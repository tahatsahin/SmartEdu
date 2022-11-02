import Course from './../models/Course.js';

const createCourse = async (req, res) => {
	const course = await Course.create(req.body);

	try {
		res.status(201).json({
			status: 'success',
			course,
		});
	} catch {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

export default {
	createCourse,
};
