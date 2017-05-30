const sidebar = (function(self , glopes){
    
const eRoutes = ['/courses.html' , '/blogs.html' , '/course-detailed.html' , '/material.html'],
      routes = ['/events.html' ,'/event-detailed.html' ,  '/blogs.html','/news.html' , '/material-detailed.php'],
        accessDoor = $('.recent-with-image ul');

    
const getSideEvents = function(){
    $.getJSON(glopes.a , {type : glopes.t.event , select : 'all'} , function(data , statue , xhr) {
        ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
            ps.showStatueMessage(successMessage , errorMessage);
        })
    })
    .done(function (sidebar_data) {
        $.each(sidebar_data, function (index, value) {
        //process Data returned by ajax request
            var returnedDate = sidebar_data[index].start_date.replace(/@/g , '');
            var resultDate = returnedDate.replace('*' , 'At');
            var li = '<li data-value="' + sidebar_data[index].id + '"><h5>' + sidebar_data[index].event_name + '</h5><h6><i class="fa fa-calendar" aria-hidden="true"></i>' + resultDate + '</h6></li>'
            $('.recent ul').prepend(li);

            if(index == 4){
                return false ;
            }
        });
    })
    .fail(function (error) {
        console.error('the erorr that happend is : ' + error);
    })
    .complete(function () {
        $('.recent ul').on('click', 'li', function (){
            var idx = $(this).data('value');
            ps.goInnerPage(false , 'event-detailed.html' , idx, null);
        });
    });
    
};
    
const getSideNews = function(){
    $.getJSON(glopes.a , {type : glopes.t.new} , function(data , statue , xhr){
         ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
             ps.showStatueMessage(successMessage , errorMessage);
        })
    })
    .done(function(sidebarNew){
                    $.each(sidebarNew , function(index , value){
                        
                        //process Data returned nby ajax call
                        var date = sidebarNew[index].new_date.replace(/@/g , "");
                        
                        //Get Values 
                        var newNameValue = sidebarNew[index].new_head ;
                        var newImageValue = sidebarNew[index].new_image ;
                        
                        
                        //Crate My View Via Jquery 
                        
                        var newListItem = '<li data-value="'+sidebarNew[index].id+'">'
                        +'<div class="image-overlay col-md-4 col-md-offset-0 col-xs-8 col-xs-offset-2">'
                        +'<img class="img-responsive" alt="image-for-new" src="'+newImageValue+'">'
                        +'<div class="overlay"><i class="fa fa-link fa-lg" aria-hidden="true"></i></div></div>'
                        +'<div class="col-md-8 col-md-offset-0 col-xs-10 col-xs-offset-1">'
                        +'<h5>'+newNameValue+'</h5>'
                        +'<h6><i class="fa fa-calendar" aria-hidden="true"></i>'+date+'</h6></div></li>';
                        
                        
                        accessDoor.prepend(newListItem);
                        ps.equalSize('.recent-with-image .image-overlay img ' , '.recent-with-image .image-overlay .overlay');
                        
                        
                        
                        if(index == 2){
                            return false ;
                        }
                    });
                })
                .fail(function(error){
                    console.log('the error that happend is : ' +  error);
                })
                .complete(function(){
                    accessDoor.on('click', 'li' ,  function(){
                        var idx = $(this).data('value');
                        ps.goInnerPage(false , 'new-detailed.html' , idx , null );
                    });
                })
}
    
    
    self.dyniamcResponse = function(){
        if (glopes.c == window.location.pathname){
            if(eRoutes.indexOf(glopes.c) !== -1){
                getSideEvents();
                return true ;
            }else if (routes.indexOf(glopes.c) !== -1 ){
                getSideEvents();
                getSideNews();
                return true;
            }else {
                return false ;
            }
        }else {
            return '404';
        }

    }
    
    return self ;

})(window.sidebar || {} , golpes);


sidebar.dyniamcResponse();

                
                
               