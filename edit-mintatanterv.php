<?php

include("connect.php");
			$edit_subject_id = trim($_POST['edit_id']);

			$new_subject_name = trim($_POST['posted_name']);
			$new_subject_semester = trim($_POST['posted_semester']);
			$new_subject_credit = trim($_POST['posted_credit']);
			$new_subject_KERESZT = trim($_POST['posted_KERESZT']);

			$edit_required_subjects_id = trim($_POST['required_subjects_id']);

			
			$modositas="UPDATE targyak SET subject_name='".$new_subject_name."', subject_semester='".$new_subject_semester."', credit='".$new_subject_credit."', required_subjects='".$edit_required_subjects_id."' WHERE id='".$edit_subject_id."' ";

			mysqli_query($adatbazis_kapcs,$modositas);
/*
			$modositas_req="UPDATE elotanulmany SET subject_name='".$new_subject_name."', subject_semester='".$new_subject_semester."', credit='".$new_subject_credit."' WHERE id='".$edit_subject_id."' ";

			mysqli_query($adatbazis_kapcs,$modositas_req);
*/			
			
			mysqli_close($adatbazis_kapcs);

/*
			echo ($edit_required_subjects_id);
*/
?>


