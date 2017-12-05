import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../src/index.html'));
});


app.get('/users', function(req, res) {
	res.json([
		{"id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@example.com"},
		{"id": 2, "firstName": "Lorem", "lastName": "Jons", "email": "lorem@example.com"},
		{"id": 3, "firstName": "Ipsum", "lastName": "Gates", "email": "ipsum@example.com"},
		{"id": 4, "firstName": "Dola", "lastName": "Jobs", "email": "jobs@example.com"}
	]);
});

app.listen(port, function(err) {
	if (err) {
		console.log(err); // eslint disable-line no-console
	} else {
		open('http://localhost:' + port);
	}
});
