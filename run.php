<?php
session_start();
$errors = array();

function find_sheet() {
    return "ok";
}

if(isset($_POST["submit"])) {
    $data_file = find_sheet();
    if(!is_array($data_file)) {
        
    } else {
        $errors[] = $data_file["error"];
    }
} else {
    $errors[] = "Error: Something wrong happened. Please retry.";
}

$_SESSION["errors"] = $errors;
header("Location: appli.php");
exit();
?>
