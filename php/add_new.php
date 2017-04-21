<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
define('DB_SERVER', 'server180');
define('DB_USERNAME', 'media_hticsuser');
define('DB_PASSWORD', 'Ips^biBk,Nn_');
define('DB_CHARSET', 'UTF8');
define('DB_DATABASE', 'media_htics');
define('PDO_DSN', 'mysql:host=' . DB_SERVER . ';dbname=' . DB_DATABASE . ';charset=' . DB_CHARSET);

$conn = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));
function check_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = strip_tags($data);
    $data = htmlspecialchars($data);
    return $data;
  }
$empty_input_message = 'You Pass Empty Value In One Of InputsBox';


if(isset($_POST['headline'])){
        if(empty($_POST['headline'])){
            echo $empty_input_message ;
        }else {
         $new_name = check_input($_POST['headline']);   
        }
    }
if(isset($_POST['image'])){
        if(empty($_POST['image'])){
            echo $empty_input_message ;
        }else {
         $new_image = check_input($_POST['image']);   
        }
    }

$new_content = $_POST['new-content'];

if(isset($_POST['writer-name'])){
        if(empty($_POST['writer-name'])){
            echo $empty_input_message ;
        }else {
         $new_writer = check_input($_POST['writer-name']);   
        }
    }
if(isset($_POST['writer-image'])){
        if(empty($_POST['writer-image'])){
            echo $empty_input_message ;
        }else {
         $new_writer_image = check_input($_POST['writer-image']);   
        }
    }
if (isset($_POST['writer-bio'])){
    if(empty($_POST['writer-bio'])){
        echo $empty_input_message ;
    }else {
        $new_writer_job = check_input($_POST['writer-job']);
        }
}

$new_writer_bio = $_POST['writer-bio'];
$refer_link = $_POST['links'];
$new_tags = $_POST['tags'];


$sql = "INSERT INTO `news`(`new_head`, `new_image`, `new_content`, `new_tags`, `new_links`, `new_writer`,`writer_image`, `writer_bio`, `writer_job`) 
        VALUES ('$new_name', '$new_image' , '$new_content' , '$new_tags' ,  '$refer_link' , '$new_writer' , '$new_writer_image' , '$new_writer_bio','$new_writer_job' )";

   if ($conn->exec($sql)) {
   	    echo "New record created successfully" ;
    

   }

    else {
        echo 'failure ,, Some Error Happens That Prevent From Making Query';
        var_dump($e->getMessage());
    }
















?>