 const HomeControl = (function(self , glopes){
       
        
        
        
        const getSlides = function (){
        
        $.getJSON(glopes.a , {type : glopes.t.slider , select : 'all'} , function(data , statue ,  xhr){
            ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
                ps.showStatueMessage(successMessage , errorMessage);
            });

        })
            .done(function(single_layer){
                
                $.each(single_layer , function(index , value){
                    var item =  '<div class="item"><div class="overlay"></div><img src="'+single_layer[index].image+'" alt="image-for-student-in-how-to-disuss-image"><article class="carousel-caption"><header><h5>Media Team</h5><h1>'+single_layer[index].headline+'</h1><span class="rule center-block"></span><h4>'+single_layer[index].time+'</h4></header><a href="events.html" data-value="'+single_layer[index].id+'" class="btn" id="check-event">Check Events</a></article><section class="message"><h2 class="message_same">'+single_layer[index].abber+'</h2><h6 class="message_same">by <a href="https://www.facebook.com/profile.php?id=100013092248523&fref=ts">NEW_START</a>media Team</h6></section></div> ';
                    $('#carousel-example-generic .carousel-inner').prepend(item);
                });
                
                
            })
            .fail(function(error){console.error('the error is ' + error)})
            .complete(function(){
                $('.carousel-inner').on('click', 'div.active' , function(){
                   var idx = $(this).find('a').data('value'); 
                   ps.goInnerPage(false , 'event-detailed.html' , idx , null) ;
                });
                
            });
                
            }
              
              
              
        const getProfs = function(){
            var counter  ,
                profStack = [];
            $.getJSON(glopes.a, {type : glopes.t.profs ,select : 'all'} , function(data , statue ,xhr ){
                ps.getRequestDetail(data , statue , xhr , function(successMessage, errorMessage){
                    ps.showStatueMessage(successMessage , errorMessage); 
                });
            })
                .done(function(single_prof){
                    $.each(single_prof , function(index,value){
                        //Split mails Column in four values for every icon 
                        var emails = single_prof[index].email.split('@');
                        var slide = '<figure class="slide prof text-center"><img class="img-responsive img-circle col-md-4 col-md-offset-4" src="'+single_prof[index].image+'" alt="Professor-image"><div class="clearfix"></div><div class="mini-data col-md-12 col-md-offset-0 col-xs-10 col-xs-offset-1"><h4>'+single_prof[index].name+'</h4><h5>'+single_prof[index].job+'</h5><figcaption>'+single_prof[index].bio+'</figcaption><ul class="prof-social list-inline"><li><a href="'+emails[0]+'"><i class="fa fa-facebook fa-lg" aria-hidden="true"></i></a></li><li><a href="'+emails[1]+'"><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></a></li><li><a><i class="fa fa-linkedin fa-lg" aria-hidden="true"></i></a></li><li><a><i class="fa fa-google fa-lg" aria-hidden="true"></i></a></li></ul></div></figure>';
                        
                        profStack.push(slide);
                    });
                })
                .fail(function(error){console.log('the erorr is : '  + error)})
                .complete(function(){  
                    for(counter = 0 ; counter < profStack.length ; counter++){
                        $('.prof-slider').append(profStack[counter]);
                    }
                    
                    $('.prof-slider').bxSlider({
                        slideWidth: 270,
                        minSlides: 1,
                        maxSlides: 2,
                        moveSlides: 1,
                        slideMargin: 15
                    }); 
    })
        };
    
        
        self.dynamicResponse = function(){
            if (glopes.c == '/' || glopes.c == '/index.html'){
                getSlides();
                getProfs();
            }else {
                return false ;
            }
           
        };
    
    
        return self ;
    
    })(window.HomeControl || {} , golpes);
    HomeControl.dynamicResponse();
   


var goEventsBtns = document.getElementsByClassName('go-events'),
    goEventsBtn = document.getElementsByClassName('sa-events'),
    goCoursesBtn = document.getElementsByClassName('sa-courses'),
    goContactBtn = document.getElementsByClassName('go-contact'),
    goNewsBtn = document.getElementsByClassName('sa-news'),
    goMaterialsBtn = document.getElementsByClassName('sa-materials');


goEventsBtns[0].onclick = function(){
    window.location.href = "events.html";
}
goEventsBtn[0].onclick = function(){
    window.location.href = "events.html";
}
goCoursesBtn[0].onclick = function(){
    window.location.href = "courses.html";
}
goContactBtn[0].onclick = function(){
    window.location.href = "contactUs.html";
}
goNewsBtn[0].onclick = function(){
    window.location.href = "news.html";
}
goMaterialsBtn[0].onclick = function (){
    window.location.href = "material.html";
}
