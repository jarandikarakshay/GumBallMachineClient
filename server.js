
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , gumballmachine = require('./routes/gumballmachine')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
//app.set('port', process.env.PORT || 4000);
app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

app.get('/', routes.index);
app.get('/gumballmachine', gumballmachine.getGumballMachine);
app.put('/gumballmachine', gumballmachine.insertQuarter);
app.post('/gumballmachine', gumballmachine.turnCrank);

//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});

http.createServer(app).listen(app.get('port'), app.get('ipaddress'), function() {
    console.log('%s: Node server started on %s:%d ...',
            Date(Date.now() ), app.get('ipaddress'), app.get('port'));
});

//server = express.createServer();
//server.listen(app.get('port'), app.get('ipaddress'), function() {
//    console.log('%s: Node server started on %s:%d ...',
//            Date(Date.now() ), app.get('ipaddress'), app.get('port'));
//});