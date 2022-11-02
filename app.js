import express from 'express';

const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
	res.send('index page');
});

app.listen(PORT, () => {
	console.log(`start server at port ${PORT}`);
});
