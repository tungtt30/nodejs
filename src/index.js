const path = require('path');
const express = require('express');
const morgan = require('morgan');
var methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const hbs = handlebars.create({ extname: '.hbs', helpers: {sum: (a, b) => a+b} });
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');

// connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
// method override
app.use(methodOverride('_method'))
// app.use(morgan('combined'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//Template engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // cách mình tìm đến file, hệ điều hành window

// route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
