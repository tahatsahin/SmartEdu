import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const CategorySchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	slug: {
		type: String,
		unique: true,
	},
});

// create slug before writing to db
CategorySchema.pre('validate', function (next) {
	this.slug = slugify(this.name, {
		lower: true,
		strict: true,
	});
	next();
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
