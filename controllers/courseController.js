import Course from './../models/Course.js';
import Category from './../models/Category.js';
import User from '../models/User.js';

const createCourse = async (req, res) => {
	try {
		const course = await Course.create({
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			createdBy: req.session.userID,
		});
		req.flash(
			'success',
			`Course "${course.name}" has been created succesfully`
		);
		res.status(201).redirect('/courses');
	} catch (err) {
		req.flash('error', "Couldn't create course!");
		res.status(400).redirect('/courses');
	}
};

const getAllCourses = async (req, res) => {
	try {
		// filter with category
		// get query
		const categorySlug = req.query.categories;
		// get search query
		const query = req.query.search;
		// get category slug according to query
		const category = await Category.findOne({ slug: categorySlug });
		// define a filter which have the category id
		let filter = {};
		if (categorySlug) {
			filter = { category: category._id };
		}
		if (query) {
			filter = { name: query };
		}
		if (!query && !categorySlug) {
			(filter.name = ''), (filter.category = null);
		}
		// filter courses with the category id
		const courses = await Course.find({
			$or: [
				{ name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
				{ category: filter.category },
			],
		})
			.sort('-dateCreated')
			.populate('createdBy');
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
		const user = await User.findById(req.session.userID);
		const course = await Course.findOne({ slug: req.params.slug }).populate(
			'createdBy'
		);
		const categories = await Category.find();
		res.status(200).render('course', {
			course,
			categories,
			user,
			pageName: 'courses',
		});
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

const enrollCourse = async (req, res) => {
	try {
		const user = await User.findById(req.session.userID);
		if (user.courses.includes(req.body.course_id)) {
			res.status(406).json({
				status: 'failure',
				err: 'You have already enrolled this course!',
			});
		} else {
			await user.courses.push({ _id: req.body.course_id });
			await user.save();
			res.status(200).redirect('/users/dashboard');
		}
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

const releaseCourse = async (req, res) => {
	try {
		const user = await User.findById(req.session.userID);
		if (!user.courses.includes(req.body.course_id)) {
			res.status(406).json({
				status: 'failure',
				err: 'You are not enrolled this course!',
			});
		} else {
			await user.courses.pull({ _id: req.body.course_id });
			await user.save();
			res.status(200).redirect('/users/dashboard');
		}
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
	enrollCourse,
	releaseCourse,
};
