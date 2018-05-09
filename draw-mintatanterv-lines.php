<?php
include("connect.php");

$required = mysqli_query($adatbazis_kapcs,"SELECT * FROM targyak");

while($row2 = mysqli_fetch_array($required))
{

	if ( $row2['required_subjects'] !== "") {
		echo (  $row2['id'] . ">" . $row2['required_subjects'] . "!!");
	}
}

mysqli_close($adatbazis_kapcs);
?>