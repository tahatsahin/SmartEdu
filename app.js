import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

import pageRoute from './routes/pageRoute.js';
import courseRoute from './routes/courseRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import userRoute from './routes/userRoute.js';

// initialize express
const app = express();

// get credentials for db from env variables
dotenv.config();
const USER_NAME = process.env.dbuser;
const PWD = process.env.pwd;
// define db url
const DB_URL = `mongodb+srv://${USER_NAME}:${PWD}@cluster0.eupg0no.mongodb.net/?retryWrites=true&w=majority`;

// connect db
mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('db connected');
	})
	.catch((err) => {
		console.log(err);
	});

// template engine initilize
app.set('view engine', 'ejs');

// global variable for user session
global.userIN = null;

// middleware
// folder of static files
app.use(express.static('public'));
// json and urlencoded is needed for getting a param from body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// user session
app.use(
	// user session
	session({
		secret: 'my_keyboard_cat', // self defined secret
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: DB_URL, // storing session in db using mongostore
		}),
	})
);
// user session for all pages
app.use('*', (req, resp, next) => {
	userIN = req.session.userID;
	next();
});

// routing
// main page
app.use('/', pageRoute.router);
// courses page
app.use('/courses', courseRoute.router);
// categories page
app.use('/categories', categoryRoute.router);
// users page
app.use('/users', userRoute.router);

// override POST and GET methods to be able to delete categories
app.use(
	methodOverride('_method', {
		methods: ['POST', 'GET'],
	})
);

// define port
const PORT = 8080;
// listen port
app.listen(PORT, () => {
	console.log(`start server at port ${PORT}`);
});
