
function new_overlay_on() {
	$("#new_overlay").slideDown(300);
}

function new_overlay_off() {
	$("#new_overlay").slideUp(300);
}

function edit_overlay_on() {
	$("#edit_overlay").slideDown(300);
}

function edit_overlay_off() {
	$("#edit_overlay").slideUp(300);
}

function list_elements(){
	$.get("list-mintatanterv.php", function(data, status){

    	$(".subjects-container").html(data); //load subjects

    	var bodyHeight = $("body").height();
    	var bodyWidth = $("body").width();
    	var canvas =document.querySelector('canvas');
    	$(".overlay").height(bodyHeight);

    	canvas.height = bodyHeight;
    	canvas.width = bodyWidth;

    	get_n_draw();

    }); //load items from database 
}


function draw_line(from, to, color) {

	var first = $("#"+from).offset();
	var second = $("#"+to).offset();

	var first_left = first.left;
	var first_top = first.top;
	var second_left = second.left;
	var second_top = second.top;

	var first_width = $("#"+from).outerWidth();
	var first_height = $("#"+from).outerHeight();
	var second_width = $("#"+to).outerWidth();
	var second_height = $("#"+to).outerHeight();

	var c = document.getElementById("bg-canvas");
	var ctx = c.getContext("2d");

	ctx.beginPath();
	ctx.strokeStyle=color;

	ctx.lineWidth=2;
	ctx.moveTo(first_left+(first_width/2),first_top+first_height);
	ctx.bezierCurveTo(first_left+(first_width/2),second_top-(second_top-first_top)/2,
					second_left+(second_width/2),first_top+first_height+(second_top-first_top-first_height)/2,
					second_left+(second_width/2),second_top);
	ctx.stroke();
} 



function get_n_draw() {

	var colors = ['#607D8B', '#FF9800', '#CDDC39', '#8BC34A', '#009688', '#00BCD4', '#9C27B0', '#E91E63', '#F44336'];

	$.get("draw-mintatanterv-lines.php", function(data, status){
		var all_string = data;

		var all_arr = all_string.split("!!");
		all_arr.pop();

    	all_arr.forEach(function(item){	
            var to_arr = item.split(">");

            var from_str = to_arr[1];
            var from_arr = from_str.split(";");
            from_arr.pop();

            from_arr.forEach(function(item){
            	
				var color = colors[Math.floor(Math.random() * colors.length)];
            	draw_line(item, to_arr[0], color);
       		});
       	});
    }); //get connected elements from db
}


$(document).ready(function(){
	list_elements();

	$("#confirm_new_subject_button").click(function(){

		var new_subject_name = $("#subject_name").val();
		var new_subject_semester = $("#subject_semester").val();
		var new_subject_credit = $("#subject_credit").val();
		var new_subject_KERESZT = $("#subject_KERESZT").val();
		
		$.post('add_new_subject.php',{
			posted_name: new_subject_name,
			posted_semester: new_subject_semester,
			posted_credit: new_subject_credit,
			posted_KERESZT: new_subject_KERESZT 
		}, function(data){
		
		list_elements();
		new_overlay_off();

		});

	}); //confirm new subject clicked

	$(".subjects-container").on("click", ".subject-item" , function(){
        var this_edit_id = $(this).attr('id');

        $.post('edit-mintatanterv-panel.php',{
			edit_id: this_edit_id
		}, function(data){
			$("#edit_overlay-wrapper").html(data);
		});

		edit_overlay_on();

    }); //click on subject


    $(".subjects-container").on("click", ".no-subject-item" , function(){
  
		new_overlay_on();

    }); //click on subject

	$("#edit-container").on("click", "#confirm_delete_subject_button" , function(){
        
        var delete_subject_id_class = $(this).attr('class');
    	var arr = delete_subject_id_class.split("?");
    	var id = arr[1];
        
        $.post('delete-mintatanterv.php',{
			edit_id: id
		}, function(data){
		});

		edit_overlay_off();
		//$("#"+id+"").hide();

		list_elements();

    }); //click on delete

	$("#edit-container").on("click", "#confirm_edit_subject_button" , function(){
        
        var edit_subject_id_class = $(this).attr('class');
    	var arr = edit_subject_id_class.split("?");
    	var id = arr[1];

		var new_subject_name = $("#edit_subject_name").val();
		var new_subject_semester = $("#edit_subject_semester").val();
		var new_subject_credit = $("#edit_subject_credit").val();
		var new_subject_KERESZT = $("#edit_subject_KERESZT").val();

		var required_subjects_id = "";
		
		$( ".req-selected" ).each(function() {
			var class_string = $(this).attr('class');
			var req_id = class_string.substring(class_string.lastIndexOf("?")+1,class_string.lastIndexOf(" "))
  			required_subjects_id += req_id + ";";
		});

		$.post('edit-mintatanterv.php',{
			required_subjects_id: required_subjects_id,
			edit_id: id,
			posted_name: new_subject_name,
			posted_semester: new_subject_semester,
			posted_credit: new_subject_credit,
			posted_KERESZT: new_subject_KERESZT 
		}, function(data){
		
		});

		list_elements();

		edit_overlay_off();

    }); //click on delete

	$("#edit-container").on("click", ".required-item" , function(){
        
        var delete_subject_id_class = $(this).attr('class');
    	var arr = delete_subject_id_class.split("req?");
    	var id = arr[1];
        
	$(this).toggleClass("req-selected");

    }); //click on required subject

}); //document ready




