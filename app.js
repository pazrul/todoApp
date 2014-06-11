
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
var lessMiddleware = require('less-middleware');

var URI = process.env.MONGOLAB_URI || process.env.MONGOLAB_URL || "mongodb://heroku_app26159854:qta0vg352k0l0g58jvl1io8aja@ds049997.mongolab.com:49997/heroku_app26159854";
var db = monk(URI);

var app = express();

GLOBAL.db = db;

// all environments
app.use(function(req, res, next) {
  app.locals.pretty = true;
  next();
});
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.options('/deletetodo/:id', function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE');
  res.end();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/todos', todos.list);
app.get('/todos/:delete?', todos.delModal);
app.get('/newtodo/:partial?', todos.newtodo);


app.post('/addtodo', todos.addtodo);

app.delete('/todos/:id/delete', todos.deleteTodo);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
