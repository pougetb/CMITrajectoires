<?php
session_start();
$errors = array();

if(!is_dir("sheets")){
    mkdir("sheets");
}
if(!is_dir("wd")){
    mkdir("wd"); 
}

if(!isset($_SESSION["working"])) {
    if(isset($_FILES["sheet"])) {
        $file_name = $_FILES["sheet"]["name"];
        $new_file_name = $file_name;
        $file_tmp_name = $_FILES["sheet"]["tmp_name"];
        $file_ext = strtolower(end(explode('.',$_FILES["sheet"]["name"])));

        if(strcmp($file_ext, "csv") !== 0) {
            $errors[] = "Error: Wrong file format, you should send a properly formatted csv";
        }

        if(empty($errors)==true) {
            move_uploaded_file($file_tmp_name, "sheets/".$new_file_name);
        }
    } else {
        $errors[] = "Error: An error occured with the upload, please retry.";
    }
} else {
    $errors[] = "Error: You already have a job running, please retry later.";
}

$_SESSION["errors"] = $errors;
header("Location: appli.php");
exit();
?>
