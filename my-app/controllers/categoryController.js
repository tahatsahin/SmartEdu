import Category from './../models/Category.js';

const createCategory = async (req, res) => {
	try {
		const category = await Category.create(req.body);
		res.status(201).redirect('/users/dashboard');
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			err,
		});
	}
};

const deleteCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndRemove(req.params.id);
		res.status(204).redirect('/users/dashboard');
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
