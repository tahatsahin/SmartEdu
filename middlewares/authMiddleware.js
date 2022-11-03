import User from '../models/User.js';

const noAuth = (req, res, next) => {
	User.findById(req.session.userID, (err, user) => {
		if (err || !user) {
			return res.redirect('/login');
		}
		next();
	});
};

export default {
	noAuth,
};
