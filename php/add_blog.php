<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
$servername = "server180";
$username = "media_hticsuser";
$password = "Ips^biBk,Nn_";
$dbname = "media_htics";


$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);


function check_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = strip_tags($data);
    $data = htmlspecialchars($data);
    return $data;
  }

$empty_input_message = 'You Pass Empty Value In One Of InputsBox';



    if(isset($_POST['headline'])){
        if (empty($_POST['headline'])){
             echo  'You didn\'t pass any val ' ;
        }
        else {
           $blog_headline = check_input($_POST['headline']);    
        }
            
    }
    if(isset($_POST['blog-image'])){
         if (empty($_POST['blog-image'])){
             echo  'You didn\'t pass any val ' ;
        }
        else {
            $blog_image = check_input($_POST['blog-image']);
        }
    }
//    $blog_intro = $_POST['blog-intro'];
    $blog_intro = $_POST['blog-content'];      
    if(isset($_POST['blog-tags'])){
        if(empty($_POST['blog-tags']))
        {
            echo $empty_input_message ;
        }
        else {
            $blog_tags = check_input($_POST['blog-tags']);
        }
    }
    if(isset($_POST['blog-wisdom'])){
        if(empty($_POST['blog-wisdom']))
        {
            echo $empty_input_message ;
        }
        else {
            if (is_string($_POST['blog-wisdom'])){
            $blog_wisdom = check_input($_POST['blog-wisdom']);
            }
        }
    }
    if(isset($_POST['writer-name'])){
        if(empty($_POST['writer-name']))
        {
            echo $empty_input_message ;
        }
        else {
            if (is_string($_POST['writer-name'])){
            $blog_writer_name = check_input($_POST['writer-name']);
            }
        }
    }
    if(isset($_POST['writer-image'])){
        if(empty($_POST['writer-image']))
        {
            echo $empty_input_message ;
        }
        else {
            if (is_string($_POST['writer-image'])){
            $blog_writer_image = check_input($_POST['writer-image']);
            }
        }
    }
    if(isset($_POST['writer-info'])){
        if(empty($_POST['writer-info']))
        {
            echo $empty_input_message ;
        }
        else {
            if (is_string($_POST['writer-info'])){
            $blog_writer_info = check_input($_POST['writer-info']);
            }
        }
    }
    if(isset($_POST['writer-accounts'])){
        if(empty($_POST['writer-accounts']))
        {
            echo $empty_input_message ;
        }
        else {
            if (is_string($_POST['writer-accounts'])){
            $blog_writer_accounts = check_input($_POST['writer-accounts']);
            }
        }
    }



$sql = "INSERT INTO `blog`( `head`, `main_image`, `blog_intro`, `blog_content`, `wisdom`, `tags`, `writer_name`, `writer_image`,                        `writer_bio`, `writer_accounts`) 
            VALUES ('$blog_headline' , '$blog_image', '$blog_intro' , '$blog_content' , '$blog_wisdom' , '$blog_tags', '$blog_writer_name' , '$blog_writer_image', '$blog_writer_bio' , '$blog_writer_accounts')";


   if ($conn->exec($sql)) {
   	    echo "New record created successfully" ;
        echo $blog_headline ; 
        echo $blog_image ;
   }
    else {
        echo 'failure << can not do query';
        echo $blog_headline ; 
        var_dump($e->getMessage());
    }



?>