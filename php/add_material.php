<?php header('Access-Control-Allow-Origin: *'); ?>
<?php

define('DB_SERVER', 'server180');
define('DB_USERNAME', 'media_hticsuser');
define('DB_PASSWORD', 'Ips^biBk,Nn_');
define('DB_CHARSET', 'UTF8');
define('DB_DATABASE', 'media_htics');
define('PDO_DSN', 'mysql:host=' . DB_SERVER . ';dbname=' . DB_DATABASE . ';charset=' . DB_CHARSET);

$nullVal = "empty" ;
$notValid = "invalid";
$conn = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));
function check_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = strip_tags($data);
    $data = htmlspecialchars($data);
    return $data;
  }



if($conn){
    
    
if (isset ($_POST['material-link'])){
    if(empty ($_POST['material-link'])){
        die($nullVal);
    }
    else {
        if (filter_var($_POST['material-link'], FILTER_VALIDATE_URL) === FALSE) {
            die($notValid);
        }else {
        $source_link = check_input($_POST['material-link']);
        }
    }
}
if (isset ($_POST['material-uploder'])){
    if(empty ($_POST['material-uploder'])){
        die($nullVal);
        return false ;
    }
    else {
        $uploder_name = check_input($_POST['material-uploder']);
    }
}



$sql = "INSERT INTO `suggested_materials` (`source_link`, `source_uploder`) VALUES ('$source_link' , '$uploder_name')";


if ($conn->exec($sql)){
    echo "Send Material Successfully ,, waited to filter by Admins ";
}else {
    echo "Error Happen When trying to Send Material to Servers ,, try again";
}
    
    
    
    
}
else {
    echo "Error Happen When Connecting To Hticssu Servers ";
}

