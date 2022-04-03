var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var testRouter = require('./routes/test');

var loginRouter = require('./routes/login_t');

var usersRouter = require('./routes/users');



/* Upload Middleware https://dev.to/cyberwolve/how-to-upload-and-store-images-in-mongodb-database-c3f */


const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const authUtils = require('./utils/auth');
const authRouter = require('./routes/auth');
const hbs = require('hbs');

const app = express();

app.use(flash());
/* Connect to MongoDB for Users */
require('dotenv/config');
MongoClient.connect(process.env.DATABASE_URL, (err, client) => {
  if(err) {
    throw err;
  }

  const db = client.db('user-profiles');
  const users = db.collection('users');
  app.locals.users = users;
});


/* Passport Setter for User Management */

passport.use(new Strategy((username, password, done) => {
  app.locals.users.findOne({ username }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }
    if (user.password != authUtils.hashPassword(password)) {
      return done(null, false);
    }
    return done(null, user);
  })
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  done(null, {id});
});


require('dotenv/config');


/*Mongo DB*/



const dbURI = process.env.DATABASE_URL;

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, error => {
  console.log('connected');
});

const Object=  require('./models/object')



/* CREATING AN OBJECT */

app.get('/add-object-action', (req,res) => {
  const object = new Object({

    objectName: 'Tempest',
    objectDescription: 'It is in a teapot!',
    objectCategory: 'ceramic',
    disposalMethod: 'garbage',
    disposalRegionLatitude: '100.200',
    disposalRegionLongitude: '-90.211',
    ecoScore: 'LOW'
  });
  object.save().then((result) => {
    res.send(result)
  })
      .catch((err) => {
        console.log(err)
      })

})

/*app.get('/all-objects', ())*/


/*
  Implementing MongoDB
 */


/*
if(process.env.DATABASE_URL) {
  require('dotenv').config()
}


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected'))




*/



/*
async function main() {
  const uri = "mongodb+srv://repsychle_production:thisisatestingpassword@cluster0.vtfzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

  const client = new MongoClient(uri);

  try {
    await client.connect();

    await listDatabases(client);


  }

  catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases: ");
  databasesList.databases.forEach(db => {
    console.log('- ${db.name}');
  })
}
*/


app.use('/favicon.ico', express.static('./public/images/'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname,'views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'session secret',
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  next();
});
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/test/', testRouter);
app.use('/login', loginRouter);
app.use("/public/", express.static('public'));





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
