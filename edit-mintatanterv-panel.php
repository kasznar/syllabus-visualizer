<?php
include("connect.php");

$edit_id = trim($_POST['edit_id']);


$result = mysqli_query($adatbazis_kapcs,"SELECT * FROM targyak WHERE (id='".$edit_id."')");
$row = mysqli_fetch_array($result);


echo ('
	<p class="cancel">
	<b class="cancel-overlay" onclick="edit_overlay_off()">X</b>
	</p>


	<p>
	Tárgynév<br>
	<input type="text" id="edit_subject_name" value="'.$row["subject_name"].'">
	</p>
	<p class="button-row">
	<input type="submit" class="button ?'.$edit_id.'" id="confirm_delete_subject_button" value="Tantárgy törlése">
	</p>
	<p>
	Mintatanterv szerinti félév<br>
	<input type="text" id="edit_subject_semester" value="'.$row["subject_semester"].'">
	</p>
	<p>
	Kredit<br>
	<input type="text" id="edit_subject_credit" value="'.$row['credit'].'">
	</p>
	<p>
	Kereszt félév
	<input type="checkbox" id="edit_subject_KERESZT">
	</p>
	<p class="button-row">
	<input type="submit" class="button ?'.$edit_id.'" id="confirm_edit_subject_button" value="Módosítás">
	</p>
');




$required = mysqli_query($adatbazis_kapcs,"SELECT * FROM targyak");


echo ('<p> Kötelező előtanulmány </p>');


/*echo ($row["subject_semester"]);*/
echo '<div class="required-item-container">';

while($row2 = mysqli_fetch_array($required))
{
					
	if ($row2['subject_semester'] < $row["subject_semester"]) {

		echo '<div class="required-item req?'. $row2['id'];

		$req_subjects = $row["required_subjects"];
		
		if (strpos($req_subjects, $row2['id']) !== false) {
			echo ' req-selected';
		}

		echo '">'.$row2['subject_name'].' </div>';
	}
}

echo "</div>";















mysqli_close($adatbazis_kapcs);



?>