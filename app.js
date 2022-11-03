import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import session from 'express-session';

import pageRoute from './routes/pageRoute.js';
import courseRoute from './routes/courseRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import userRoute from './routes/userRoute.js';

import dotenv from 'dotenv';

const app = express();

// get credentials for db from env variables
dotenv.config();
const USER_NAME = process.env.dbuser;
const PWD = process.env.pwd;

// connect db
mongoose
	.connect(
		`mongodb+srv://${USER_NAME}:${PWD}@cluster0.eupg0no.mongodb.net/?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('db connected');
	})
	.catch((err) => {
		console.log(err);
	});

// template engine
app.set('view engine', 'ejs');

// global variable
global.userIN = null;

// middleware
app.use(express.static('public'));
app.use(express.json()); // json and urlencoded is needed for
app.use(express.urlencoded({ extended: true })); // getting a param from body
app.use(
	// user session
	session({
		secret: 'my_keyboard_cat', // self defined secret
		resave: false,
		saveUninitialized: true,
	})
);
app.use('*', (req, resp, next) => {
	userIN = req.session.userID;
	next();
});

// routing
app.use('/', pageRoute.router);
app.use('/courses', courseRoute.router);
app.use('/categories', categoryRoute.router);
app.use('/users', userRoute.router);

// override POST and GET methods
app.use(
	methodOverride('_method', {
		methods: ['POST', 'GET'],
	})
);

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`start server at port ${PORT}`);
});
