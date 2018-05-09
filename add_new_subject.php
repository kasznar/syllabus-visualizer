<?php

include("connect.php");
			$new_subject_name = trim($_POST['posted_name']);
			$new_subject_semester = trim($_POST['posted_semester']);
			$new_subject_credit = trim($_POST['posted_credit']);
			$new_subject_KERESZT = trim($_POST['posted_KERESZT']);

			$beillesztes="INSERT INTO targyak(subject_name, subject_semester, credit) VALUES ('".$new_subject_name."','".$new_subject_semester."','".$new_subject_credit."')";
			mysqli_query($adatbazis_kapcs,$beillesztes);

			$id = mysqli_insert_id($adatbazis_kapcs);
			echo($id);
			mysqli_close($adatbazis_kapcs);
?>