
/*
 * GET full list of todos in Database.
 */

exports.list = function(req, res) {
	var collection = db.get('todos');
	collection.find({}, {}, function(e, docs) {
		res.render('list', {
			'todos' : docs
		});
	});
	};

/*
* Get page to add new todo
*/

exports.newtodo = function(req, res) {
	if (req.params.partial){
		res.render('partials/partial-new-todo', {title: 'Add New Todo'});
	}
	else {
		res.render('new-todo', { title: 'Add New Todo'});
	}
};

/*
* POST Add new Todo to DB
*/

exports.addtodo = function(req, res) {
	//var userName = req.body.username;
	var todoContent = req.body.todoContent;
	var collection = db.get('todos');

	//Submit to DB
	collection.insert({
		//'username': userName,
		'content': todoContent,
		'completed' : false,
		'created_at': new Date()
	}, function(err, doc) {
		if (err){
			res.send('There was a problem adding the info to the DB');
		}
		else {
			res.redirect('/todos');
		}
	});
};

exports.updateModal = function(req, res) {
	var id = req.params.id,
	collection = db.get('todos');
	collection.findOne({_id: id}, function(err, doc) {
		if (doc){
			res.render( 'partials/partial-update', {
				'todo' : doc
			});
		}
	})

	//res.render('partials/partial-update', doc);
}

exports.updateTodo = function(req, res) {
	var id = req.params.id,
		content = req.body.content,
		collection = db.get('todos');
	collection.update({_id: id }, {'content': content }, function(err, doc) {
		if (doc){
			
		}
		res.redirect('/');
	});
}
exports.delModal = function(req, res) {
	if (req.params.delete) {
		res.render('partials/partial-delete');
	}
	else {
		res.redirect('/todos');
	}
}

exports.deleteTodo = function(req, res) {
	var id = req.params.id,
	collection = db.get('todos');
	collection.remove({
		'_id' : id
	},function(err, doc) {
		if (err){
			res.send('There was a problem with the DB');
		}
		else {
			res.send('');
		}
	});
}

/*
* 404 page
*/

exports.catchAll = function(req, res) {
	res.render('404');
}