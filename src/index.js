const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const hbs = handlebars.create( { extname: '.hbs'});
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')))
//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('hbs', hbs.engine )
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, '\\resources\\views')); // cách mình tìm đến file, hệ điều hành window

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/news' , (req, res) => {
  res.render('news');
  console.log(res,req)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
