var express     = require('express'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    mongoose    = require('mongoose'),
    session     = require('express-session'),
    passport    = require('passport'),
    ejs         = require('ejs'),
    path        = require('path'),
    keys        = require('./config/keys.js');

// App definition
var app = express();
app.set('view engine', 'ejs');

require('./config/passport')(passport);

// Middleware
app.use(session({
    secret: 'super mega secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'app')));


require('./controllers/RoutesController.js')(app);
require('./controllers/ApiController.js')(app, passport);

// Connections
if (keys.env == 'DEVELOPMENT') { var portNum = 3000; } else { var portNum = 80; }

var mongooseUri = keys.db;
mongoose.connect(mongooseUri, {
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Mongoose uri:', mongooseUri);
});


app.listen(portNum, function () {
    console.log('Active on port: ' + portNum, 'in ' + keys.env + ' mode.');
});
