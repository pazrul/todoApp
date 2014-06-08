
/*
 * GET full list of todos in Database.
 */

exports.list = function(db) {
	return function(req, res) {
		var collection = db.get('todos');
		collection.find({}, {}, function(e, docs) {
			res.render('list', {
				"todos" : docs
			});
		});
	};
};
/*
* Get page to add new todo
*/

exports.newtodo = function(req, res) {
	res.render('new-todo', { title: 'Add New Note'});
};

/*
* POST Add new Todo to DB
*/

exports.addtodo = function(db){
	return function(req, res) {
		//var userName = req.body.username;
		var todoContent = req.body.todoContent;

		var collection = db.get('todos');

		//Submit to DB
		collection.insert({
			//"username": userName,
			"content": todoContent,
			"completed" : false,
			"created_at": new Date()
		}, function(err, doc) {
			if (err){
				res.send("There was a problem adding the info to the DB");
			}
			else {
				res.redirect("list");
			}
		});
	};
};