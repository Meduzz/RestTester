$(function(){
	$("#add").on("click", function(){
		$("#headerTmpl").tmpl().appendTo("#headers");
		$(".remove").off('click');
		$(".remove").on('click', removeCallback);
	});
	
	$("#send").on('click', function() {
		var form = $(this).parents("form").serialize();
		
		$.post("/", form, function(data) {
			$(".result").prepend("<p>"+data+"<p/>");
		});
		return false;
	});
	
	$("#clear").on('click', function() {
		$(".result p").remove();
	});
});

function removeCallback() {
	$(this).parents(".form-group").remove();
}
