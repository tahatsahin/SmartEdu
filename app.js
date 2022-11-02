import express from 'express';
import ejs from 'ejs';

const app = express();

// template engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));

// routing
app.get('/', (req, res) => {
	res.status(200).render('index', {
		pageName: 'index',
	});
});
app.get('/about', (req, res) => {
	res.status(200).render('about', {
		pageName: 'about',
	});
});

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`start server at port ${PORT}`);
});
