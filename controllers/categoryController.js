import Category from './../models/Category.js';

const createCategory = async (req, res) => {
	try {
		const category = await Category.create(req.body);
		res.status(201).json({
			status: 'success',
			category,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

const deleteCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		await category.deleteOne();
		res.status(204).json({
			status: 'success',
		});
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

export default {
	createCategory,
	deleteCategory,
};
