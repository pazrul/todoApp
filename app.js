
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var todos = require('./routes/todos');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');

var URI = process.env.MONGOLAB_URI || process.env.MONGOLAB_URL || 'mongodb://heroku_app16796234:3a71b260hnvgsp99ns2l02fa6i@ds043368.mongolab.com:43368/heroku_app16796234';
var db = monk(URI);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
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

app.get('/', routes.index);
app.get('/todos', todos.list(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
