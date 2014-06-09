$(document).ready(function(){

	$('.delete-todo').on('click', function(e){
		var contentBody = $(this).data('id'),
			$self = $(this);
		e.preventDefault();
		
		$.ajax({
			type: 'DELETE',
			url: 'todos/' + contentBody + '/delete',
			success: function() {
				$self.parent().slideUp(200, function(){
					$(this).remove();
				})
				//alert('Deleted!');
			},
			error: function (xhr, ajaxOptions, thrownError) {
	        	//alert(xhr.status);
	        	alert(thrownError);
	      	}
		});
	});
});