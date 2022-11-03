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
});

UserSchema.pre('save', function (next) {
	const user = this;
	const saltRounds = 10;
	// encryption func
	bcrypt.hash(user.password, saltRounds, (err, hash) => {
		// use encrypted version
		user.password = hash;
		next();
	});
});

const User = mongoose.model('User', UserSchema);

export default User;
