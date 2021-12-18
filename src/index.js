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
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


//Template engine
app.engine('hbs', hbs.engine )
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, '\\resources\\views')); // cách mình tìm đến file, hệ điều hành window

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/news' , (req, res) => {
  res.render('news');  
})
app.get('/search' , (req, res) => {
  res.render('search');
})
app.post('/search' , (req, res) => {
  res.send('');
  console.log(req.body)
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
