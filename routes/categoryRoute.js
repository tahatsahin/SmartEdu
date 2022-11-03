import express from 'express';
import categoryController from './../controllers/categoryController.js';

const router = express.Router();

router.route('/').post(categoryController.createCategory);
router.route('/:id').delete(categoryController.deleteCategory);

export default {
	router,
};
