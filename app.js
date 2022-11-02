import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';

import pageRoute from './routes/pageRoute.js';
import courseRoute from './routes/courseRoute.js';

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

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing
app.use('/', pageRoute.router);
app.use('/courses', courseRoute.router);

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`start server at port ${PORT}`);
});
