<?php
session_start();
header('Content-type: application/json');

function find_data($type) {
    $cdir = scandir(__DIR__."/wd");
    foreach ($cdir as $key => $value) {
        if (!in_array($value,array(".",".."))) {
          if ($value == $type."_data.json") {
              $result = json_decode(file_get_contents("./wd/".$value), true);
              return $result;
          }
        }
    }

    return array("error" => "file_not_found");
}

$return = array();
if(isset($_GET['type'])) {
    if($_GET['type'] == "raws") {
        $return = find_data("raws");
    } elseif ($_GET['type'] == "patterns") {
        $return = find_data("patterns");
    } else {
        $return["error"] = "wrong_data_type";
    }
} else {
    $return["error"] = "missing_data_type";
}
echo json_encode($return);
?>
