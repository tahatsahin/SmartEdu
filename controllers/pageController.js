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

export default {
	getIndexPage,
	getAboutPage,
};
