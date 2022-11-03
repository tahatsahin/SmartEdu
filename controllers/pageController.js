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
const getLoginPage = (req, res) => {
	res.status(200).render('login', {
		pageName: 'login',
	});
};

export default {
	getIndexPage,
	getAboutPage,
	getRegisterPage,
	getLoginPage,
};
