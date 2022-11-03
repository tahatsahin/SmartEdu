import User from './../models/User.js';
import bcrypt from 'bcrypt';

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

// TODO: there is no response in wrong password case
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { err, user } = await User.findOne({ email });
		if (user) {
			bcrypt.compare(password, user.password, function (err, same) {
				console.log(same);
				if (same) {
					// user session
					return res.status(200).send('logged in');
				}
			});
		}
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

export default {
	createUser,
	loginUser,
};
