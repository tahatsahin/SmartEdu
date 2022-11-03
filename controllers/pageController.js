const getIndexPage = (req, res) => {
	res.status(200).render('index', {
		pageName: 'index',
	});
};
const getAboutPage = (req, res) => {
	res.status(200).render('about', {
		pageName: 'about',
	});
};
const getRegisterPage = (req, res) => {
	res.status(200).render('register', {
		pageName: 'register',
	});
};

export default {
	getIndexPage,
	getAboutPage,
	getRegisterPage,
};
