$(document).ready(function(){
   
   
    
    
  /*  $('.see-all,.read-more').on('click', function(){
        window.location.href('hticssu.com/subGallery.html');
        var url = 'http/::getmedia.php.com';
        $.ajax({
            type : "GET" ,
            url : url  ,
            success : function(res){
                alert(res)
            }
        })
    });
    
    var url = "http/::getmedia.php.com";
   $.ajax({
       type : "GET" ,
       url : url ,
       success : function(res){
           alert(res);
           //Make each loop with data
       }
   }); */
    
    
    //Go To Home 
    $('#go-home').on('click', function(){
       window.location.href = 'contactUs.html'; 
    });
});

//Animate Effect With scrollabr (simple Parallex)
$(window).scroll(function(){
    var wmScroll = $(this).scrollTop();
    $('#root-con header , article header').css({
     'transform' :  'translate(' + wmScroll / 50+ '% )' ,
    });
    $('article img').css({
        'transform' : 'translate(-'+ wmScroll / 100+'%)' ,
    });
    });