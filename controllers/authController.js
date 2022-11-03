import bcrypt from 'bcrypt';
import User from './../models/User.js';

const createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json({
			status: 'success',
			user,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		// no callbacks in async await... so if there are no mail match
		// user will be null and when we try to compare passwords with user.password
		// it will throw a TypeError, which will be caught and handled by catch...
		const user = await User.findOne({ email });

		bcrypt.compare(password, user.password, function (err, same) {
			if (same) {
				req.session.userID = user._id; // assign db id to session userID
				return res.status(200).redirect('/');
			} else {
				return res.status(401).send('wrong password');
			}
		});
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

export default {
	createUser,
	loginUser,
};
