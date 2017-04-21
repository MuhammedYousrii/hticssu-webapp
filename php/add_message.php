<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
define('DB_SERVER', 'server180');
define('DB_USERNAME', 'media_hticsuser');
define('DB_PASSWORD', 'Ips^biBk,Nn_');
define('DB_CHARSET', 'UTF8');
define('DB_DATABASE', 'media_htics');
define('PDO_DSN', 'mysql:host=' . DB_SERVER . ';dbname=' . DB_DATABASE . ';charset=' . DB_CHARSET);

$conn = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));


if ($conn){
    function check_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = strip_tags($data);
    $data = htmlspecialchars($data);
    return $data;
  }

    $empty_input_message = 'You Pass Empty Value In One Of InputsBox';


     
    if(isset($_POST['name'])){
        if(empty($_POST['name'])){
            echo $empty_input_message ;
        }else{
            $username = check_input($_POST['name']);  
        }
    }
    if(isset($_POST['email'])){
        if(empty($_POST['email'])){
            echo $empty_input_message ;
        }else {
            $email = check_input($_POST['email']);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo 'Email Has Problem at His formated';
            }
        }
    }
    $hti_id = $_POST['idnumber'];
    $message = $_POST['message'];


$sql = "INSERT INTO `contactUs`(`user_id`, `user_name`, `user_email`, `user_message`)
        VALUES ('$hti_id' , '$username' , '$email' , '$message')";
    
    
    
if ($conn->exec($sql)){
    echo "Okii";
}
else {
echo "Error Happen When Saving";
var_dump($e->getMessage());
}
    
    
    
}else {
    echo "connection Failed To DataBase";
}





?>