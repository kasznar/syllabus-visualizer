<?php
include("connect.php");

$edit_id = trim($_POST['edit_id']);


mysqli_query($adatbazis_kapcs,"DELETE FROM targyak WHERE (id='".$edit_id."')");

mysqli_close($adatbazis_kapcs);


?>
