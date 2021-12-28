const path = require('path');
const express = require('express');
const morgan = require('morgan');
var methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const hbs = handlebars.create({
    extname: '.hbs',
    helpers: { sum: (a, b) => a + b ,
        sortable: (field, sort) => {

            const sortType = field === sort.column ? sort.type : 'default'
            const icons = {
              default: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
              </svg>`,
              asc: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
              <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
            </svg>`,
              desc: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
              <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"/>
              <path fill-rule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"/>
              <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
            </svg>`
            }
            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc'
            }
            const icon = icons[sortType]
            const type = types[sortType]

            return `<a href="?_sort&column=${field}&type=${type}"><span>${icon}</span></a>`
        }},
    
});
const app = express();
const port = 3000;
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const route = require('./routes');
const db = require('./config/db');

// connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(SortMiddleware);
//HTTP logger
// method override
app.use(methodOverride('_method'));
app.use(morgan('tiny')); //combined
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
//----------


// route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
