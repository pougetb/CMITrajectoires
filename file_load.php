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
        $new_file_name = session_id()."___".$file_name;
        $file_tmp_name = $_FILES["sheet"]["tmp_name"];
        $file_ext = strtolower(end(explode('.',$_FILES["sheet"]["name"])));

        if(strcmp($file_ext, "csv") !== 0) {
            $errors[] = "Error: Wrong file format, you should send a properly formatted csv";
        }

        if(empty($errors)==true) {
            move_uploaded_file($file_tmp_name, "sheets/".$new_file_name);
            $python_bin = "C:\ProgramData\Anaconda3\python.exe";
            $main_exec = "C:\ProjetCMI\cmi-pattern-detect-master\main.py";
            $data_file = __DIR__."/sheets/".$new_file_name;
            $_SESSION["working"] = 1;
            $command = 
                "{$python_bin} {$main_exec} ".
                "{$_POST["start-date"]} {$_POST["end-date"]} ".
                "{$_POST["interval"]} {$_POST["epsilon"]} {$_POST["mint"]} ".
                "{$data_file}";
            exec("nohup ".escapeshellcmd($command)." > /dev/null 2> error_log.txt &");
            $_SESSION["errors"] = $errors;
            header("Location: appli.php");
            exit();
        } else {
            $_SESSION["errors"] = $errors;
            header("Location: upload.php");
            exit();
        }
    } else {
        $errors[] = "Error: An error occured with the upload, please retry.";
        $_SESSION["errors"] = $errors;
        header("Location: upload.php");
        exit();
    }
} else {
    $errors[] = "Error: You already have a job running, please retry later.";
    $_SESSION["errors"] = $errors;
    header("Location: upload.php");
    exit();
}
?>
