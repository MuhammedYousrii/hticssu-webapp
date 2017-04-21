<?php header('Access-Control-Allow-Origin: *');  ?>
<?php


define('DB_SERVER', 'server180');
define('DB_USERNAME', 'media_hticsuser');
define('DB_PASSWORD', 'Ips^biBk,Nn_');
define('DB_CHARSET', 'UTF8');
define('DB_DATABASE', 'media_htics');
define('PDO_DSN', 'mysql:host=' . DB_SERVER . ';dbname=' . DB_DATABASE . ';charset=' . DB_CHARSET);

$conn = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));
$NullIsset = "You didn't Pass Any Value In Form";
$queryError = "Error Happen When Make Fetch On Tabels at DB";
$not_Found = "UserName Or Password Didn't exisit ";
function check_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = strip_tags($data);
        $data = htmlspecialchars($data);
        return $data;
}



if(isset($_GET['username'])){
    if(empty($_GET['username'])){
        echo $NullIsset; 
    }else {
        $username = check_input($_GET['username']);
    }
}
if(isset($_GET['password'])){
    if(empty($_GET['password'])){
        echo $NullIsset; 
    }else {
    $password = $_GET['password'] ;
    }
}




if($conn){
    $query = $conn->prepare("SELECT `user_name`, `user_image`, `user_password`, `people_case` , `user_gender` FROM `people` WHERE user_password = '$password' ");
    if($query){
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);
        if($row['user_password'] == $password){
            echo json_encode($row);
        }
        else {
            echo json_encode($not_found);
        }
        
        
    }else{
        echo $queryError ;
    }
}
else {
    echo 'Error happen When Connecting With DataBase' ;
    var_dump($e->getMessage());
}
    
    
        

?>