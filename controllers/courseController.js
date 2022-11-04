import Course from './../models/Course.js';
import Category from './../models/Category.js';

const createCourse = async (req, res) => {
	try {
		const course = await Course.create({
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			createdBy: req.session.userID,
		});
		res.status(201).redirect('/courses');
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

const getAllCourses = async (req, res) => {
	try {
		// filter with category
		// get query
		const categorySlug = req.query.categories;
		// get category slug according to query
		const category = await Category.findOne({ slug: categorySlug });
		// define a filter which have the category id
		let filter = {};
		if (categorySlug) {
			filter = { category: category._id };
		}
		// filter courses with the category id
		const courses = await Course.find(filter).sort('-dateCreated');
		const categories = await Category.find();
		res.status(200).render('courses', {
			courses,
			categories,
			pageName: 'courses',
		});
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

const getCourse = async (req, res) => {
	try {
		const course = await Course.findOne({ slug: req.params.slug }).populate(
			'createdBy'
		);
		const categories = await Category.find();
		res.status(200).render('course', {
			course,
			categories,
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
	getCourse,
};
