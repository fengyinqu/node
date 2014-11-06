var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');



var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/OrderShare')
var routesuser = require('./routes/User')
var index = require('./routes/index');

var config=require('./config');
var app = express();
server = require('http').createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || config.port);





//以下这种方法报错 Error: Most middleware (like session) is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.
//原因是express4.0以上不再集成session中间件
//需要单独安装
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);

//app.use(session({
//    secret: config.cookieSecret,
//    store: new MongoStore({db:"sessiondb"})
//}));

app.use(session({
    secret: config.cookieSecret,
    store: new MongoStore({
        db : "sessiondb"
    })
}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", index);


//路由的两种注册方法
//{原生
//    var express = require('express');
//    var router = express.Router();
//    router.get('/', function(req, res) {
//        res.send('respond with a resource');
//    });
//    app.use("abc", router);
//}
//{express
//    app.get('/BindTemplate', function(req,res){
//        res.render('OrderShare/BindTemplate');
//    });
//    app.post('/signup', function(req,res){
//        res.render('OrderShare/BindTemplate');
//    });
//}

routes(app);
routesuser(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
server.listen(3000, function () {
    console.log('Express server listening on port 3000' );
});

//module.exports = app;

