<?php
include("connect.php");

for ($i=1; $i < 10; $i++) { 
	$result = mysqli_query($adatbazis_kapcs,"SELECT * FROM targyak");
	$empty_semester = true; 
	echo '<div class="semester-row-wrapper">';
		echo '<div class="semester-row" id="semester-row_'. $i .'">';

			while($row = mysqli_fetch_array($result))
				{
					
					if ($row['subject_semester'] == $i) {

						echo '<div class="subject-item" id="'. $row['id'].'">'.$row['subject_name'].'<br>kredit:'. $row['credit'] .'</div>';
						$empty_semester = false;
					}
				}

			if ($empty_semester) {
				echo '<div class="no-subject-item">üres</div>';
			}
		
		echo '</div>';
	echo '</div>';
}

mysqli_close($adatbazis_kapcs);

?>