var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');

const testRouter = require('./routes/test');

const loginRouter = require('./routes/login_t');
const mongoose = require('mongoose');



var app = express();


/*
/!*Mongo DB*!/

const morgan = require('morgan')

const dbURI = process.env.DATABASE_URL;

// Connect to MongoDB

*/






/*const {MongoClient} = require("mongodb");*/

/*
  Implementing MongoDB
 */

if(process.env.NODE_ENV !== 'production') {
require('dotenv').config()
}

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected'))







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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test/', testRouter);
app.use('/login', loginRouter);
app.use("/public/", express.static('public'));


app.listen(process.env.PORT || 4000)


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
