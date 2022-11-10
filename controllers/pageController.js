import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Course from './../models/Course.js';
import User from '../models/User.js';

const getIndexPage = async (req, res) => {
	const courses = await Course.find().sort('-dateCreated').limit(2);
	const totalCourses = await Course.find().countDocuments();
	const totalStudents = await User.find().countDocuments({ role: 'student' });
	const totalTeachers = await User.find().countDocuments({ role: 'teacher' });

	res.status(200).render('index', {
		pageName: 'index',
		courses,
		totalCourses,
		totalStudents,
		totalTeachers,
	});
};
const getAboutPage = (req, res) => {
	res.status(200).render('about', {
		pageName: 'about',
	});
};
const getRegisterPage = (req, res) => {
	res.status(200).render('register', {
		pageName: 'register',
	});
};
const getLoginPage = (req, res) => {
	res.status(200).render('login', {
		pageName: 'login',
	});
};
const getContactPage = (req, res) => {
	res.status(200).render('contact', {
		pageName: 'contact',
	});
};
const sendEmail = async (req, res) => {
	try {
		const outputMessage = `
			<h1>Mail Details</h1>
			<ul>
				<li>Name: ${req.body.name}</li>
				<li>Email: ${req.body.email}</li>
			</ul>
			<h1>Message</h1>
			<p>${req.body.message}</p>
		`;

		dotenv.config();
		const usermail = process.env.usermail;
		const mailpwd = process.env.mailpwd;
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: usermail, // generated ethereal user
				pass: mailpwd, // generated ethereal password
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Smart EDU Contact Form 👻" <tahatsahin@gmail.com>', // sender address
			to: 'tahatsahin@gmail.com', // list of receivers
			subject: 'Smart EDU Contact Form New Message', // Subject line
			html: outputMessage, // html body
		});

		req.flash('success', "We've received your message succesfully.");

		res.status(200).redirect('/contact');
	} catch (err) {
		// req.flash('error', `Something went wrong... ${err}`);
		req.flash('error', `Something went wrong...`);
		console.log(err);
		res.status(200).redirect('/contact');
	}
};

export default {
	getIndexPage,
	getAboutPage,
	getRegisterPage,
	getLoginPage,
	getContactPage,
	sendEmail,
};
