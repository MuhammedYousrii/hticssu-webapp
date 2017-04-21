<?php 
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    header('Access-Control-Allow-Origin: *');
//    if ($_SERVER['HTTP_ORIGIN'] == 'http://hticssu.com'){
//        echo 'a7a';
//        header('Access-Control-Allow-Origin: http://hticssu.com/');
//        header('Content-type: application/json');
//        header('Access-Control-Allow-Credentials: true');
//        }
//    else {
//        echo  "You haven't  permesion To Use This Api";
//        return false ;
//    }
}else {
    echo 'This Api Support Post Method Only' ;
}

?>

<?php


define('DB_SERVER', 'server180');
define('DB_USERNAME', 'media_hticsuser');
define('DB_PASSWORD', 'Ips^biBk,Nn_');
define('DB_CHARSET', 'UTF8');
define('DB_DATABASE', 'media_htics');
define('PDO_DSN', 'mysql:host=' . DB_SERVER . ';dbname=' . DB_DATABASE . ';charset=' . DB_CHARSET);



$db = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));
$conn_error = "Problem Happen When Connecting To Database ";
$nullIsset = "We didn't have Value to search with it";
$nullQuery = "we didn't Find any think with this val";
function check_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = strip_tags($data);
    $data = htmlspecialchars($data);
    return $data;
  }


if ($db){


if(isset ($_GET['plateform-name'])){
    if(empty($_GET['plateform-name'])){
        echo $nullIsset ;
        return false ;
    }else {
        $plateform_name = check_input($_GET['plateform-name']);
    }
}
    


$query = $db->prepare("SELECT  `id` ,`plateformName`, `inImage` , `name`  FROM `courses` WHERE `plateformName` = '$plateform_name'");
    
if($query){
    $query->execute();
    while ($row = $query->fetch(PDO::FETCH_ASSOC)){ $rows[]=$row;}
    echo json_encode($rows);
}
else {
    echo $nullQuery;
}

}else {
    echo $conn_error ;
}
?>