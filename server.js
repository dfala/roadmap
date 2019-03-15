var express     = require('express'),
    serveStatic = require('serve-static'),
    favicon     = require('serve-favicon'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    mongoose    = require('mongoose'),
    session     = require('express-session'),
    ejs         = require('ejs'),
    path        = require('path'),
    redis       = require('redis'),
    RedisStore  = require('connect-redis')(session),
    keys        = require('./config/keys.js');

// App definition
var app   = express();
app.set('view engine', 'ejs');

var sessionCookie = { httpOnly : true };

var https = require('https'),
    http  = require('http'),
    fs    = require('fs');

if (keys.env !== "development") {
  var privateKey  = fs.readFileSync('./config/myblueplayground.key', 'utf8'),
      certificate = fs.readFileSync('./config/server.crt', 'utf8'),
      ca          = fs.readFileSync('./config/bundle.ca-bundle', 'utf8'),
      credentials = {key: privateKey, cert: certificate, ca: ca};

  var sessionCookie = { httpOnly : true, secure: true };
}

// Connections
var mongooseUri = keys.db;
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Mongoose listening to your soul on:', mongooseUri);
});

if (keys.env === 'development') {
  var portNum = 3000;
} else {
  var portNum = 80;
}

if (keys.env !== 'development') {
  http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(portNum);

  var httpsServer = https.createServer(credentials, app);
  httpsServer.listen(443, function () {
    console.log('HTTPS server listening on port: 443 in ' + keys.env + ' mode.');
  });

} else {
  app.listen(portNum, function () {
      console.log('Making some pancakes on port:', portNum);
  });
}


////////////////////////////////////
////////////////////////////////////
///// HTTP OR HTTPS CONNECTION /////
////////////////////////////////////
////////////////////////////////////

// Middleware
// app.use(favicon(path.join(__dirname,'app','images','favicon.ico')));
app.use(session({
  store: new RedisStore({ host: 'localhost', port: 6379, client: redis.createClient()}),
  secret: keys.sessionSecret,
  resave: true,
  saveUninitialized: true,
  maxAge : 3600000 * 24 * 365,
  cookie: sessionCookie
}));

// app.use('/static', express.static('public'));
app.use(serveStatic(__dirname + "/dist"));

app.use(cors());
app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.json({limit: '400mb'}));
app.use(bodyParser.urlencoded({limit: '400mb', extended: true}));

require('./controllers/RoutesController.js')(app);
require('./controllers/ApiController.js')(app);
