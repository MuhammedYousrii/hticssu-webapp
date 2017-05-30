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


if (isset ($_GET['q'])){
    if(empty ($_GET['q'])){
        die("We havenot Any value To search with it ");
    }
    else {
        $select = check_input($_GET['q']);
    }
}







$result = $GLOBALS['db']->prepare("SELECT `source_name`, `source_link`, `material_name`, `source_type`, `source_names` FROM `material_sources` WHERE `material_name` = '$select'");

if ($result){ 
    $result->execute();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)){ $rows[]=$row;}
    $name = $rows[0]['material_name'];
    
    
    
    $result = $GLOBALS['db']->prepare("SELECT `material_image` , `material_describe` , `material_professor`  FROM hti_material WHERE `material_name` = '$name' ");
    $result->execute();
    $row = $result->fetch(PDO::FETCH_ASSOC);    
    $image = $row['material_image'];
    $des = $row['material_describe'];
    
}else {
    return false ;
}



?>


<!DOCTYPE html>
<html lang="en-us">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="<?php echo $name." materials for Hti-Cs Students" ?>">
        <meta name="keywords" content='Hti,Student,Union,ComputerScience,Courses,Matrial,Events,instuite'>
        <meta name="author" content="new-start scintefic-team">
        <meta name="application-name" content="Hti-cs student-union">
        <meta property="og:image" content=" <?php echo $image?> ">
        <meta property="og:title" content="<?php echo $name." sources For Hti-Cs students"?> ">
        <meta property="og:description" content="<?php echo $des ;?> ">
        <meta property="og:type" content="article">
        <meta property="og:url" content="<?php echo "http://hticssu.com/material-detailed.php?q=".$name ; ?>">
        <title><?php echo $name." Hti-CS Student Union" ; ?></title>
        <link rel="icon" href="media/logofinal.png">
        <!-- For Erialer IE versions -->
        <!--[if lt IE 9]>
        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
        <![endif]-->
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
        <link rel="stylesheet" href="Css/sweetalert.css" media="all">
        <link rel="stylesheet" href="Css/hover.css" media="all">
        <link rel="stylesheet" href="Css/home.css" media="screen">
    </head>
    <body id="material-detailed-page">
        <div id="loader" class="overlay-loader">
		      <div class="loader-background color-flip"></div>
            <img class="loader-icon spinning-cog" src="media/cog06.svg" alt="Spinner-image-for-load-screen">
            <h2>Loading ...</h2>
	   </div> 
        
        
        
        <header class="root-header">
            <!--The upper Static nav-->
            <nav id="upper-nav">
                <div class="container">
                    
                    <!--Text Data contact To our Community-->
                    <ul id="contact-data" class="col-md-7 col-xs-12 list-unstyled text-uppercase" data-step="1" data-intro="ok This is" data-position="bottom">
                        <li class="hidden-xs">
                            <i class="fa fa-map-marker fa-lg" aria-hidden="true"></i>
                        <span></span>
                        </li>
                        <li>
                            <i class="fa fa-phone fa-lg" aria-hidden="true"></i>
                            <span></span>
                        </li>
                        <li>
                            <i class="fa fa-location-arrow fa-lg" aria-hidden="true"></i>
                            <span></span>
                        </li>
                </ul>
                    
                    <!--Our Social Media Links For Contact-->
                    <ul id="social-media-links" class="list-inline col-md-5 col-xs-12">
                        <li><a href="https://www.facebook.com/profile.php?id=100013092248523&fref=ts"><i class="fa fa-facebook fa-lg" aria-hidden="true"></i></a></li>
                        <li><a href=""><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></a></li>
                        <li><a><i class="fa fa-linkedin fa-lg" aria-hidden="true"></i></a></li>
                        <li><a><i class="fa fa-youtube fa-lg" aria-hidden="true"></i></a></li> 
                    </ul>
                </div>
            </nav> 
    
            
            
            <!--The Lower Dynamic Navbar (it's dynamic in active bar)-->
            <nav class="navbar navbar-default">
                <div class="container">
            
                    <!-- Brand and toggle button get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed btn btn-primary" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#"><img src="media/logofinal.png" class="img-responsive" alt="website-brand"></a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav navbar-right text-capitalize">
                            <li><a href="/" class="hvr-bounce-to-top">Home  </a></li>
                            <li><a href="aboutUs.html" class="hvr-bounce-to-top" >About Us</a></li>
                            <li class="disabled" role="presentation"><a data-toggle="tooltip" data-placement="bottom" title="Still Under Development" href="#" class="hvr-bounce-to-top" >our team</a></li>
                            <li><a href="courses.html" class="hvr-bounce-to-top" >courses</a></li>
                            
                            <!--DropDown List-item For Display all pages of website -->
                            <li class="dropdown active">
                                <!--This item Data-->
                                <a href="#" class="dropdown-toggle hvr-bounce-to-top" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">pages<span class="sr-only">(current)</span><span class="caret"></span></a>
                                
                                
                                <ul class="dropdown-menu">
                                    <li><a href="events.html" class="hvr-bounce-to-top">our Events</a></li>
                                    <li><a href="blogs.html" class="hvr-bounce-to-top">Our Blogs</a></li>
                                    <li><a href="news.html" class="hvr-bounce-to-top">our News</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="material.html" class="hvr-bounce-to-top">online HTI-material </a></li>
                                </ul>
                            
                            
                            </li><!--End Of DropDown List-items -->
                            
                            <li><a href="contactUs.html" class="hvr-bounce-to-top">Contact Us</span></a></li>
                            
                            <li><button class="btn btn-danger hidden-xs"  data-toggle="tooltip" data-placement="right" title="still Under Development">Rate WebSite</button></li>


      </ul>
    </div><!-- /.navbar-collapse -->
               
                </div><!-- /.container -->
            </nav>

        
            <!--The photo of Page With Root -->
            <section class="root-con">
            <div class="overlay">
                <div class="container">
                    <header>
                        <h3>hti-material Detailed</h3>
                        <span class="rule"></span>
                    </header>
                    <ul class="list-inline text-capitalize">
                        <li><a href="/">home</a></li>
                        <li><i class="fa fa-chevron-right" aria-hidden="true"></i></li>
                        <li><a href="material.html">materials-grid</a></li>
                        <li><i class="fa fa-chevron-right" aria-hidden="true"></i></li>
                        <li><a href="material-detailed.html">material-deatiled</a></li>
                    </ul>
                </div>
            </div>
        </section>

        </header>

        <main class="sr-only">
            bunch of refernces for material sources like exams , quizs , sheets , lectures , slides and pdf to help you find any source for any material easyliy so no needed to try hard on groups then got no thing 
        </main>


        <section id="sources-detail-con" class="detailed-con">
            <div class="container">
                <div class="row">
                    <section class="col-md-9 col-xs-12 detailed-list common-list">
                        <div class="row">
                            
                            <section class="material-describe col-xs-12">
                                <figure class="no-padding col-md-6 col-xs-12">
                                    <img src="<?php echo $row['material_image']?>" alt="<?php echo $row['material_image']?>-material-img" class="img-responsive">
                                    <figcaption>
                                        <?php echo $row['material_professor'] ?>
                                    </figcaption>
                                </figure>
                                <article class="col-md-6 col-xs-12">
                                    <header>
                                        
                                        <h4> 
                                            <?php echo $rows[0]['material_name'] ?>
                                        </h4>
                                        
                                        <span class="rule"></span> 
                                    </header>
                                    <p>
                                        <?php echo $row['material_describe'] ?>
                                    </p>
                                </article>
                            </section>
                            
                            
                            
                              <div class="clearfix"></div>
                            
                            <section class="show-case">
                                <header>
                                    <h4>chapters sources</h4>
                                    <span class="rule"></span>
                                </header>
                                <ul class="chapters">
                                    <?php 
                                        for($index = 0 ; $index < count($rows) ; $index++){
                                            if ($rows[$index]['source_type'] == "chapter"){
                                                $source_link = $rows[$index]['source_link'] ;
                                                $source_name = $rows[$index]['source_name'] ;
                                                $source_uploder = $rows[$index]['source_names'] ;
                                                


                                                echo  "<li class='source-list-item'>"
                                                     ."<a href="
                                                     .$source_link
                                                     ." target='_blank'"
                                                     .">"
                                                     .$source_name
                                                     ."</a>"
                                                     ."<span> Uploded By ->> ["
                                                     .$source_uploder
                                                     ."]</span></li>";  
                                            };
                                        };
                                    ?>
                                </ul>
                            </section>
                            
                            
                          
                            <section class="show-case">
                                <header>
                                    <h4>Exames sources</h4>
                                    <span class="rule"></span>
                                </header>
                                <ul class=" exams">
                                    <?php 
                                    for($index = 0 ; $index < count($rows) ; $index++){
                                        if ($rows[$index]['source_type'] == "exam"){
                                            $source_link = $rows[$index]['source_link'] ;
                                            $source_name = $rows[$index]['source_name'] ;
                                            $source_uploder = $rows[$index]['source_names'] ;
                                        
                                            
                                            echo  "<li class='source-list-item'>"
                                                 ."<a href="
                                                 .$source_link
                                                 ." target='_blank'"
                                                 .">"
                                                 .$source_name
                                                 ."</a>"
                                                 ."<span> Uploded By -> [ "
                                                 .$source_uploder
                                                 ." ]</span></li>";  
                                        };
                                    
                                      
                                    };
                                    ?>
                                </ul>
                            </section>
                            
                            
                            <section class="show-case">
                                <header>
                                    <h4>Tasks & sheets sources</h4>
                                    <span class="rule"></span>
                                </header>
                                <ul class="tasks">
                                    <?php 
                                        for($index = 0 ; $index < count($rows) ; $index++){
                                            if ($rows[$index]['source_type'] == "task"){
                                                $source_link = $rows[$index]['source_link'] ;
                                                $source_name = $rows[$index]['source_name'] ;
                                                $source_uploder = $rows[$index]['source_names'] ;


                                                echo  "<li class='source-list-item'>"
                                                     ."<a href="
                                                     .$source_link
                                                     ." target='_blank'"
                                                     .">"
                                                     .$source_name
                                                     ."</a>"
                                                     ."<span> Uploded By ->> ["
                                                     .$source_uploder
                                                     ."]</span></li>";  
                                            };
                                        };
                                    ?>
                                </ul>
                            </section>
                            
                            
                            <section class="show-case">
                                <header>
                                    <h4>Books</h4>
                                    <span class="rule"></span>
                                </header>
                                <ul class="books">
                                    <?php 
                                        for($index = 0 ; $index < count($rows) ; $index++){
                                            if ($rows[$index]['source_type'] == "book"){
                                                $source_link = $rows[$index]['source_link'] ;
                                                $source_name = $rows[$index]['source_name'] ;
                                                $source_uploder = $rows[$index]['source_names'] ;


                                                echo  "<li class='source-list-item'>"
                                                     ."<a href="
                                                     .$source_link
                                                     ." target='_blank'"
                                                     .">"
                                                     .$source_name
                                                     ."</a>"
                                                     ."<span> Uploded By ->> ["
                                                     .$source_uploder
                                                     ."]</span></li>";  
                                            };
                                        };
                                    ?>
                                </ul>
                            </section>
                            
                        </div>
                        
                        
                    </section>
                    
                    
                    <aside class="col-md-3 hidden-xs aside-new-event">    
                        <section class="recent makeGap">
                            <header class="text-left center-block normal-aside-header">
                                <h4>Recent event</h4>
                                <span class="rule"></span>
                            </header>
                            <ul class="list-unstyled">                                
                            </ul>
                                <a class="btn all" href="events.html"> All Events</a>
                        </section>
                        <div class="clearfix"></div>
                        <section class="recent-with-image">
                            <header class="text-left center-block normal-aside-header">
                                <h4>Lateast News</h4>
                                <span class="rule">
                                </span>
                            </header>
                            <ul class="list-unstyled">
                                <a class="btn all" href="events.html">All News</a>
                            </ul>
                        </section>
                    </aside>
                    
                    <section id="add-material">
                        <header>
                            Add Material
                            <span><i class="fa fa-chevron-up pull-right" aria-hidden="true"></i></span>
                        </header>
                        <form id="send-material">
                            <div class="form-group col-xs-12 piece">
                                <label for="material-link" class="sr-only">Link</label>
                                <input type="url" class="form-control url" name="material-link" placeholder="shared-link for-Material" data-length="" data-focus=""
                            </div>
                                
                                
                            <div class="form-group col-xs-12 piece">
                                <label for="material-uploder" class="sr-only">username</label>
                                <input type="text" class="form-control username" name="material-uploder" placeholder="your Name like derb-herb" data-length="" data-focus="">
                            </div>
                            <button type="submit" class="pull-right btn btn-info"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                            
                        </form>
                    </section>
                        
                        
                </div>
            </div>
        </section>



<!-- Footer Area -->
        <footer>
            
        </footer>
        
        
        
             <script
			  src="https://code.jquery.com/jquery-2.2.4.min.js"
			  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
			  crossorigin="anonymous">
        </script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-             2Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
        <script src="https://use.fontawesome.com/1c51655d76.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
        <script src="js/sweetalert.min.js"></script>
        <script src="js/interact.js"></script>
        <script src="js/jquery.nicescroll.js"></script>
        <script src="js/staticPieces.js"></script>
        <script src="js/preventAccess.js"></script>
        <script src="js/core.js"></script>
        <script src="js/htiModule.js"></script>
        <script src="js/sidebarModule.js"></script>

        <script>
        $(function(){
                //fire nice scroll
                $("body").niceScroll({
                   cursorcolor:"#002e3b" ,
                   cursorwidth : '10px',
                   cursorborder : '2px solid #002e3b' ,
                   cursorborderradius : '1px',
                   horizrailenabled: false 
                }); 
             //BootStrap toolTip Plugin 
                $('[data-toggle="tooltip"]').tooltip().show();
            
           $('#send-material').on('submit', function(e){
               htiMaterials.AddingMaterial($(this) , e);
           });
        })
    </script>
    </body>
</html>




    
        
        
        
        

        