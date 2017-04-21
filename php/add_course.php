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



    if(isset($_POST['course-name'])){
        if (empty($_POST['course-name'])){
             echo  'You didn\'t pass any val ' ;
        }
        else {
           $course_name = check_input($_POST['course-name']);    
        }
            
    }
    if(isset($_POST['course-image'])){
         if (empty($_POST['course-image'])){
             echo  'You didn\'t pass any val ' ;
        }
        else {
            $course_image = check_input($_POST['course-image']);
        }
    }
    $course_content = $_POST['course-content'];        
    if(isset($_POST['course-pre'])){
        if(empty($_POST['course-pre'])){
            echo $empty_input_message ;
        }
        else {
            $course_pre = check_input($_POST['course-pre']);   
        }
    }
    if(isset($_POST['course-req'])){
        if(empty($_POST['course-req'])){
            echo $empty_input_message ;
        }
        else {
            $course_req = check_input($_POST['course-req']);  
        }
    }
    
    $course_link = $_POST['course-link'];
    $week_duration = $_POST['week-duration'];
    $video_number = $_POST['video-number'];
    $hour_duration = $_POST['hour-duration'];
    $view_number = $_POST['view-number'];
    $course_category = $_POST['course-category'];
    $course_plateform = $_POST['course-plateform'];
    $instructor_name = $_POST['instructor-name'];
    $instructor_image = $_POST['instructor-image'];
    $instructor_bio = $_POST['instructor-bio'];
    $instructor_accs = $_POST['instructor-accs'];
    $comment = 'how are you';

    

    

$sql = "INSERT INTO `courses`(`category`, `name`, `link`, `course_content`, `week_duration`, `video_number`, `hour_duration`, `view_number`, `pres`, `req`, `inName`, `inImage`, `instrctorAccounts`, `plateformName`, `background`, `inBio`, `comment`) VALUES ('$course_category' , '$course_name', '$course_link' , '$course_content' , '$week_duration' , '$video_number', '$hour_duration' , '$view_number', '$course_pre' , '$course_req' , '$instructor_name' , '$instructor_image' , '$instructor_accs' , '$course_plateform' ,  '$course_image' , '$instructor_bio' , '$comment' )";


   if ($conn->exec($sql)) {
   	    echo "New record created successfully" ;
        echo $course_name ; 
        echo $course_image ;
        echo $course_content ;
        echo $course_pre ;
   }
    else {
        echo 'failure << can not do query';
        echo $course_name ; 
        echo $course_category ;
        echo $instructor_name ;
        var_dump($e->getMessage());
    }



?>