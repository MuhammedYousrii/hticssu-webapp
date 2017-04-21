<?php header('Access-Control-Allow-Origin: *'); ?>
<?php

define('DB_SERVER', 'server180');
define('DB_USERNAME', 'media_hticsuser');
define('DB_PASSWORD', 'Ips^biBk,Nn_');
define('DB_CHARSET', 'UTF8');
define('DB_DATABASE', 'media_htics');
define('PDO_DSN', 'mysql:host=' . DB_SERVER . ';dbname=' . DB_DATABASE . ';charset=' . DB_CHARSET);

$db = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));
function check_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = strip_tags($data);
    $data = htmlspecialchars($data);
    return $data;
  }


if($db){
    if (isset($_GET['type'])){
    if (empty($_GET['type'])){
        echo 'there are Erorr happen , 404';
    }
    else {
        $type = check_input($_GET['type']);
    }
}
    if (isset ($_GET['select'])){
    if(empty ($_GET['select'])){
        echo "there Are Erorr Happen , 404" ;
    }
    else {
        $select = check_input($_GET['select']);
    }
}
    
    function dynamic_respond($content_type , $id_val){
    
    
    if ($content_type == 'slider'){
        $result = $GLOBALS['db']->prepare("SELECT *  FROM slider");
        $result->execute();

        while ($row = $result->fetch(PDO::FETCH_ASSOC))
        { 
            $rows[]=$row;
        }
        
        echo json_encode($rows);  
    }
    
    else if ($content_type == 'event'){
        if ($id_val  == 'all'){
            $result = $GLOBALS['db']->prepare("SELECT *  FROM events");
        }
        
        
        else {
            $result = $GLOBALS['db']->prepare("SELECT `id`, `event_name`, `event_image`, `event_description`, `start_date`, `end_date`, `time_interface`, `speakers_images`, `speakers_names`, `speakers_jobs`, `speakers_bio`, `speakers_accounts`, `event_link`, `event_location`, `event_case` FROM `events` WHERE id = $id_val ");
        }
        
        $result->execute();
        while ($row = $result->fetch(PDO::FETCH_ASSOC))
        { 
            $rows[]=$row;
        }
        echo json_encode($rows);    
    } 
    
    else if ($content_type == 'course'){
        if ($id_val == 'all'){
            $result = $GLOBALS['db']->prepare("SELECT *  FROM courses");
        }
        else {
            $result = $GLOBALS['db']->prepare("SELECT `id`, `category`, `name`, `link`, `course_content`, `week_duration`, `video_number`, `hour_duration`, `view_number`, `pres`, `req`, `inName`, `inImage`, `instrctorAccounts`, `plateformName`, `background`, `inBio`, `comment` FROM `courses` WHERE id = $id_val");
        }
        $result->execute();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)){ $rows[]=$row;}
        echo json_encode($rows);    
    }
    
    else if ($content_type == 'new'){
        $result = $GLOBALS['db']->prepare("SELECT *  FROM news");
        $result->execute();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)){ $rows[]=$row;}
        echo utf8_encode(json_encode($rows));
    }
       
    else if ($content_type == 'blog'){
        if ($id_val == 'all'){
            $result = $GLOBALS['db']->prepare("SELECT *  FROM blog");
        }
        else {
            $result = $GLOBALS['db']->prepare(" SELECT `id`, `head`, `main_image`, `date`, `blog_intro`, `blog_content`, `wisdom`, `tags`, `writer_name`, `writer_image`, `writer_bio`, `writer_accounts` FROM `blog` WHERE id = $id_val ");    
             
            
        }
        $result->execute();
         while ($row = $result->fetch(PDO::FETCH_ASSOC))
                {
                    $rows[]=$row;
                }
            echo json_encode($rows);
       
    } 
    
    else if ($content_type == 'prof'){
        $result = $GLOBALS['db']->prepare("SELECT *  FROM professors");
        $result->execute();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)){ $rows[]=$row;}
        echo json_encode($rows);
    }
    
    else if ($content_type == 'hti_material'){
        $result = $GLOBALS['db']->prepare("SELECT *  FROM hti_material");
        $result->execute();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)){ $rows[]=$row;}
        echo json_encode($rows);    
    }
        
    else {
        echo  '404' ;
    }
   
    
}
    dynamic_respond($type , $select);

}else {
    echo "unable To Connecting With Hti-cs servers";
}



    







?>

