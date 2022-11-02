import express from 'express';
import ejs from 'ejs';

import pageRoute from './routes/pageRoute.js';

const app = express();

// template engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));

// routing
app.use('/', pageRoute.router);

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`start server at port ${PORT}`);
});
