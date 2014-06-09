$(document).ready(function(){

	$('.delete-todo').on('click', function(e){
		e.preventDefault();
		var contentBody = $(this).data('id');
		
		$.ajax({
			type: 'DELETE',
			url: 'todos/' + contentBody + '/delete',
			success: function() {
				alert('Deleted!');
			},
			error: function (xhr, ajaxOptions, thrownError) {
	        	//alert(xhr.status);
	        	alert(thrownError);
	      	}
		});
	});
});