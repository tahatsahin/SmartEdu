import mongoose from 'mongoose';

const { Schema } = mongoose;

const CourseSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
