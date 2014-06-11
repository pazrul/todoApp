var errorMessage = '<h1>Something went wrong, try again in a few seconds',
	generateModal= function(modalBody) {
	var $modal = $('<div />', { 'id' : 'modal-background' }),
		$modalBody = $('<div />', { 'class' : 'modal-content' });
		$modalBody.append(modalBody);
	
	$('body').append($modal.append($modalBody).fadeIn(200));
	$('.modal-content').on('click', function(e){
		e.stopPropagation();
	});
	$('#modal-background').on('click', function(){
		$(this).find('*').off();
		$(this).fadeOut(500, function(){
			$(this).remove();
		})
	});
};

$(document).ready(function(){

	$('.delete-todo').on('click', function(e){
		var $self = $(this);
		e.preventDefault();
		$.ajax({
			type: 'GET',
			url: 'todos/delete',
			success: function(data) {
				generateModal(data);
				addModalListeners($self);
			},
			error: function() {
				generateModal(errorMessage);
			}
		});
	});
	addModalListeners = function($callingItem){
		$('.modal-content .confirmed').on('click', function(e) {
			e.preventDefault();
			$.ajax({
				type: 'DELETE',
				url: 'todos/' + $callingItem.data('id') + '/delete',
				success: function() {
					$('#modal-background').click();
					$callingItem.parent().slideUp(400, function(){
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
			$('#modal-background').fadeOut(500, function(){
				$(this).remove();
			});
		});
	}
		
	//});
	$('#addNew').on('click', function(e){
		e.preventDefault();
		$.ajax({
			type: 'GET',
			url: '/newtodo/partial',
			success: function(data){
				generateModal(data);
			},
			error: function(){
				generateModal(errorMessage);
			}
		})
		
	})
});