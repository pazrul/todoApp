var addNewForm = '<h1>Add New Todo</h1><form name="adduser" method="post" action="/addtodo"><div><textarea name="todoContent" id="addTodoBody"></textarea></div><div id="addNoteSubmit"><input type="submit" value="Send"></div></form>',
	confirmDelete = '<h2>Are you sure you want to delete?</h2><a href="#" class="confirmed">Yup, lets do it</a><br><a href="#" class="negative">Whoops, nevermind</a>',
	generateModal= function(modalBody) {
	var $modal = $('<div />', { 'id' : 'modal-background' }),
		$modalBody = $('<div />', { 'class' : 'modal-content' });
		$modalBody.append(modalBody);
	
	$('body').append($modal.append($modalBody).fadeIn(200));
	$('.modal-content').on('click', function(e){
		e.stopPropagation();
	});
	$('#modal-background').on('click', function(){
		$(this).fadeOut(500, function(){
			$(this).remove();
		})
	});
};

$(document).ready(function(){

	$('.delete-todo').on('click', function(e){
		var contentBody = $(this).data('id'),
			$self = $(this);
		e.preventDefault();
		generateModal(confirmDelete);
		$('.modal-content .confirmed').on('click',function(e) {
			e.preventDefault();
			$.ajax({
				type: 'DELETE',
				url: 'todos/' + contentBody + '/delete',
				success: function() {
					$('#modal-background').click();
					$self.parent().slideUp(400, function(){
						$(this).remove();
					})
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert(thrownError);
				}
			});
		});
		$('.modal-content .negative').on('click', function(e) {
			e.preventDefault();
			console.log('test');
			$('#modal-background').fadeOut(500, function(){
				$(this).remove();
			});
		});
		
		
	});
	$('#addNew').on('click', function(e){
		e.preventDefault();
		generateModal(addNewForm);
	})
});