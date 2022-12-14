import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['student', 'teacher', 'admin'],
		default: 'student',
	},
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Course',
		},
	],
});

UserSchema.pre('save', function (next) {
	const user = this;
	const saltRounds = 10;
	// encryption func
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(saltRounds, (err, saltRounds) => {
		// use encrypted version
		if (err) return next(err);
		bcrypt.hash(user.password, saltRounds, (err, hash) => {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

const User = mongoose.model('User', UserSchema);

export default User;
