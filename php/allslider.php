
<?php
$servername = "gator3176";
$username = "media_hticsuser";
$password = "Ips^biBk,Nn_";
$dbname = "media_htics";


$db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);


$result = $db->prepare("SELECT *  FROM slider");
$result->execute();

while ($row = $result->fetch(PDO::FETCH_ASSOC))
{ 
$rows[]=$row;
}

echo json_encode($rows);


