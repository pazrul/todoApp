
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