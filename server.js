const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to the file.');
		}
	});

	next();
});

// Maintenance Mode
// app.use((req,res) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: "We'll be back soon!",
// 		errorMsg: 'This is currently being updated.'
// 	});
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!<h1>');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Welcome!',
	});
});

app.get('/about',(req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req,res) => {
	res.send({
		message: 'Error.'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});