const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

const port = process.env.PORT || 3000;
const nav = [{
  link: '/books',
  title: 'Books'
},
{
  link: '/authors',
  title: 'Authors'
},
{
  link: '/about',
  title: 'About'
},
{
  link: '/auth/logout',
  title: 'Log out'
}
];

app.use(morgan('tiny'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));

const bookRouter = require('./src/routes/bookRoutes')(nav);
const authorRouter = require('./src/routes/authorRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    { message: req.flash('loginMessage') }
  );
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About'
  });
});

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
