import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import Category from '../models/Category.js';
import Course from '../models/Course.js';
import User from './../models/User.js';

const createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).redirect('/login');
	} catch (error) {
		const errors = validationResult(req);

		for (let i = 0; i < errors.array().length; i++) {
			req.flash('error', `${errors.array()[i].msg}`);
		}
		res.status(400).redirect('/register');
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		// no callbacks in async await... so if there are no mail match
		// user will be null and when we try to compare passwords with user.password
		// it will throw a TypeError, which will be caught and handled by catch...
		const user = await User.findOne({ email });
		if (user) {
			bcrypt.compare(password, user.password, function (err, same) {
				if (same) {
					req.session.userID = user._id; // assign db id to session userID
					return res.status(200).redirect('/users/dashboard');
				} else {
					req.flash('error', 'Wrong Password...');
					return res.status(400).redirect('/login');
				}
			});
		} else {
			req.flash('error', 'User does not exist...');
			return res.status(400).redirect('/login');
		}
	} catch (err) {
		if (err instanceof TypeError) {
			res.status(401).json({
				status: 'failure',
				cause: 'no user found with given email',
				err: `${err}`,
			});
		} else {
			res.status(400).json({
				status: 'failure',
				cause: `${err}`,
				err: `${err}`,
			});
		}
	}
};

const logoutUser = async (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
};

const getDashboardPage = async (req, res) => {
	const user = await User.findOne({ _id: req.session.userID }).populate(
		'courses'
	);
	const categories = await Category.find();
	const courses = await Course.find({ createdBy: req.session.userID });
	res.status(200).render('dashboard', {
		pageName: 'dashboard',
		categories,
		user,
		courses,
	});
};

export default {
	createUser,
	loginUser,
	logoutUser,
	getDashboardPage,
};
