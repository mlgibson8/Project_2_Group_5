const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3001;
const secretValue = crypto.randomBytes(32).toString('hex');

const SequelizeStore = require('connect-session-sequelize')(session.Store)



const hbs = exphbs.create({ helpers });

// setting session

const sess = {
    secret: secretValue,
    cookie: {
        maxAge: 86400000, // expires after 1 day
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});