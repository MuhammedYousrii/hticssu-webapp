<?php header('Access-Control-Allow-Origin: *');  ?>
<?php

//
//define('DB_SERVER', 'server180');
//define('DB_USERNAME', 'media_hticsuser');
//define('DB_PASSWORD', 'Ips^biBk,Nn_');
//define('DB_CHARSET', 'UTF8');
//define('DB_DATABASE', 'media_htics');
//define('PDO_DSN', 'mysql:host=' . DB_SERVER . ';dbname=' . DB_DATABASE . ';charset=' . DB_CHARSET);
//
//$db = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));


$user_name_one = 'ahmedMonty';
$user_password_one = 'pgk32gr6/Y=A~Yd2,k}';


$user_name_two = 'aya-hesham';
$user_password_two = 'K2KkJGPccmk9VMUnCV';


$user_name_three = 'muhammed-yousrii';
$user_password_three = 'muhammed225136578';


$user_name_four = 'muhammed-reda';
$user_password_four = 'HC52s4qQ8JENRmCfE7';

$username = $_POST['username'];
$password = $_POST['password'];

if ($username == $user_name_one && $password == $user_password_one ||
    $username = $user_name_two && $password == $user_password_two ||
    $username = $user_name_three && $password == $user_password_three ||
    $username = $user_name_four && $password == $user_password_four ){
    echo 'Okii' ;
}else {
    echo 'Wrong';
}


?>