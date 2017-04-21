<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
$servername = "server180";
$username = "media_hticsuser";
$password = "Ips^biBk,Nn_";
$dbname = "media_htics";


$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

$blog_name = $_POST['head'];


$sql = "INSERT INTO blog(id, head)
    VALUES ('$blog_name')";
    
   if ($conn->exec($sql)) {
   	    echo "New record created successfully" ;
    


   }

    else {
        echo 'failure'.mysql_error();
    }

?>