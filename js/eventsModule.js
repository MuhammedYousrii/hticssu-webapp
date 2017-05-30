
const eventsControl = (function(self , glopes){
     var eventStack = [] ,
         per_page = 3 ,
         counter = 0 ,
         length ;
    const elements = {
             accessDoor : $('#events-list .row'),
             pagenationControl : $('.pagenaiton-slider'),
             currentPage : $('.current-page'),
             eventMainImage : $('.event-image img'),
             eventName : $('.event-image h4'),
             eventDetail : $('.event-detail .event-describe'),
             eventLocation : $('.event-locate figcaption span'),
             startTimeOne : $('.event-start-time .event-date'),
             startTimeTwo : $('.event-start-time .time'),
             endTimeOne : $('.event-end-time .event-date'),
             endTimeTwo : $('.event-end-time .time'),
         };
    
    
const getHomeEvent = function(){
    var eventLooper = 0 ;

    $.getJSON(glopes.a , {type : glopes.t.event , select : 'all'} , function(data , statue ,xhr){
            ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
                ps.showStatueMessage(successMessage , errorMessage);
            });
        })
        .done(function(single_home_event){
                //array of effects that applied on getten block with for loop
                var wow_effects = ['bounceInLeft' , 'bounceInDown' , 'bounceInRight' , 'bounceInLeft'];
            $.each(single_home_event , function(index , value){
                        
                        
                        //Split the data to two things and use the first part
                        var date = single_home_event[index].start_date.split('@');//[day , monthe, year]
                      
                        
                        
                        
                        
                        
                        //Creating My view With dynamic Json Data
                        
                        
                        
                        //the lower partition
                        var clock_icon = $('<i></i>').addClass('fa fa-clock-o').attr('aria-hidden' , 'true');
                        var event_time  = $('<span></span>').append(clock_icon).append(single_home_event[index].time_interface);
                        var event_name = $('<h5></h5').text(single_home_event[index].event_name);
                        var text_con = $('<div></div>').addClass('col-md-9 col-xs-9').append(event_name).append(event_time);
                        var date_mon = $('<figcaption></figcaption>').text(date[1]);
                        var date_num = $('<span><span>').text(date[0]);
                        var date = $('<figure></figure').addClass('col-md-2 col-xs-3 event-date').append(date_num).append(date_mon);
                      
                        
                        
                        
                        
                        
                        //The Upper Partition
                        var link_icon = $('<i></i>').addClass('fa fa-link fa-lg').attr('aria-hidden' , 'true');
                        var event_link = $('<a></a>').attr('href' , single_home_event[index].event_link).append(link_icon);
                        var overlay = $('<div></div>').addClass('overlay img-rounded').append(event_link);
                        var event_image = $('<img>').addClass('img-responsive img-rounded').attr({
                            alt : 'event image' ,
                            src : single_home_event[index].event_image 
                        });
                       
                        
                        
                        
                          var data_con = $('<div><div>').append(date).append(text_con);
                          var upper_part = $('<figure></figure>').addClass('image-overlay col-xs-12').append(event_image).append(overlay);
                        
                        var event_block = $('<div></div>').addClass('col-md-4 col-xs-12 wow '+wow_effects[index]+' event-figure '+single_home_event[index].event_case+'').attr({
                            'data-wow-offset' : '200' ,
                            'data-wow-duration' : '1s',
                            'title' : 'click To Go inner' ,
                            'data-toggle' : 'tooltip' ,
                            'data-placement' : 'top' ,
                            'data-value' : single_home_event[index].id
                        }).append(upper_part).append(data_con);
                        
                        
                        
                        $('#our-events .row').append(event_block);
                        ps.equalSize('.image-overlay img' , '.image-overlay .overlay');
                    });
                })
        .fail(function(error){console.error('the erorr is ' + error)})
        .complete(function(){
            $('#our-events').on('click', '.event-figure' , function(){
                var idx = $(this).data('value');
                ps.goInnerPage(false , 'event-detailed.html' , idx , null);
            });
        });
    };
    
const getMiddleEvents = function(){
    $.getJSON(glopes.a , {type : glopes.t.event , select : 'all'}, function (data , statue ,xhr) {
            ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
                ps.showStatueMessage(successMessage , errorMessage)
            })    
        })
        .done(function(single_event){
            $.each(single_event , function (index, value){
                var dateNum = single_event[index].start_date.split('*')[0].split('@')[0];
                var dateText = single_event[index].start_date.split('*')[0].split('@')[1];




                var figure = '<figure class="col-xs-12"><div class="image-overlay col-md-5 col-md-offset-0 col-xs-10"><img class="img-responsive" src="' + single_event[index].event_image + '" alt="main-image-from-event"><div class="overlay"><a href="' + single_event[index].event_link + '"><i class="fa fa-link fa-lg" aria-hidden="true"></i></a></div></div><figure class="date col-md-1 col-xs-2"><span>'+dateNum+'</span><figcaption>'+dateText+'</figcaption></figure><div class="col-md-6 col-md-offset-0 col-xs-10 data"><h4>' + single_event[index].event_name + '</h4><h6><span><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>' + single_event[index].time_interface + '</span></h6><h6><span><i class="fa fa-star-o fa-lg" aria-hidden="true"></i>Global Rate still under Development</span></h6><figcaption>' + single_event[index].event_description + '</figcaption><a href="#" data-value="'+single_event[index].id+'" class="btn hvr-buzz-out go-inner read-more"> Read More</a></div></figure>';

                $('#events-list .row').append(figure);
                eventStack.push(figure);
                            
            });
        })
        .fail(function (error){
            console.error('the erorr that Happen is  : ' + JSON.stringify(error , false , 2));
        })
        .complete(function(data){
            //Text The length Of my courses in upper nav
            length = eventStack.length ;
                        
                        
            //Check Empty for the list of elements 
            function check_empty(){
                elements.accessDoor.children('figure').remove();
                elements.pagenationControl.show();
            }
                        
                        
            //Create Basic view 
            ps.basicView(check_empty , per_page , eventStack , 'events-list' );
            ps.pagniation(length , per_page);
                        
                        
                        
              //Get More Elements With pagnition with dataAttrbiute 
            $('.pagenaiton-slider li').on('click', function () {
                var currentPage = $(this).data('page-num');
                if(currentPage == 0){
                    return ps.basicView(check_empty , per_page , eventStack , 'events-list' );
                }
                else {
                    $(this).addClass('active').siblings().removeClass('active').parent().siblings().removeClass('active');
                    var idx_start = $(this).data('start');
                    var idx_end = $(this).data('end');
                    elements.currentPage.text(currentPage);
                    check_empty();
                    for (eventLoop = idx_start ; eventLoop < idx_end ; eventLoop++) {
                        var item = eventStack[eventLoop];
                        $('#events-list .row').append(item)
                    }
                    ps.equalSize('#events-list .row img', '#events-list .row .overlay');
                }
                
            });
                        
                        
                        
            //Go To Detaiel page 
            $('#events-list').on('click', 'figure .read-more', function (){
                var idx = $(this).data('value');
                ps.goInnerPage(false , 'event-detailed.html' , idx , null);
            });
            
            ps.equalSize(elements.accessDoor.children('img') , elements.accessDoor.children('.overlay'));
        });
};
    
    const getInnerEvent = function(){
        $.getJSON(glopes.a ,{type : glopes.t.event , select : glopes.d}, function(data , statue , xhr){
            ps.getRequestDetail(data , statue ,xhr , function(successMessage , errorMessage){
                ps.showStatueMessage(successMessage , errorMessage);
            });
        })
            .done(function(singleEvent) {
                    //process data rturned with ajax call
                    //Split My Connected Data into array 
                    var speaker_images = singleEvent[0].speakers_images.split('@');
                    var speaker_names = singleEvent[0].speakers_names.split('@');
                    var speaker_jobs = singleEvent[0].speakers_jobs.split('@');
                    var speaker_accounts = singleEvent[0].speakers_accounts.split('@');
                    var speaker_bios = singleEvent[0].speakers_bio.split('@');
                                
                                
                                
                    //ControlReturned Date string  
                    var eventStartDate = singleEvent[0].start_date.split('*') ;
                    var startDateCle = eventStartDate[0].replace(/@/g , '');
                    var startDateTime = eventStartDate[1];
                    var eventEndDate = singleEvent[0].end_date.split('*');
                    var endDateCle = eventEndDate[0].replace(/@/g , '');
                    var endDateTime = eventEndDate[1]
                                
                                
                    elements.eventMainImage.attr('src' , singleEvent[0].event_image);
                    elements.eventName.text(singleEvent[0].event_name);
                    elements.eventDetail.html(singleEvent[0].event_description);
                    elements.eventLocation.append(singleEvent[0].event_location);
                    elements.startTimeOne.append(startDateCle);
                    elements.startTimeTwo.append(startDateTime);
                    elements.endTimeOne.append(endDateCle);
                    elements.endTimeTwo.append(endDateTime);
                                
                                
                    //Run Equality function 
                    ps.equalSize('.detailed-list img', '.detailed-list .overlay')

                    while (counter < speaker_names.length) {
                        
                        var speaker = '<figure class="slide text-center">' + '<img class="col-md-6 col-md-offset-3 col-xs-6 col-xs-offset-3 img-circle img-responsive" src="' + speaker_images[counter] + '">' + ' <div class="clearfix"></div>' + '<div class="speaker-data col-xs-10 col-xs-offset-1">' + '<h4 id="speaker-name">' + speaker_names[counter] + '</h4>' + '<h6 id="speaker-position">' + speaker_jobs[counter] + '</h6>' + '<p id="speaker-bio">' + speaker_bios[counter] + '</p></div><div class="clearfix"></div>' + '<ul class="list-inline speaker-social col-xs-10 col-xs-offset-1">' + '<li><a href=' + speaker_accounts[counter].split('*')[0] + '><i class="fa fa-facebook fa-lg" aria-hidden="true"></i></a></li>' + '<li><a href="' + speaker_accounts[counter].split('*')[1] + '"><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></a></li>' + '<li><a href="' + speaker_accounts[counter].split('*')[2] + '"><i class="fa fa-linkedin fa-lg" aria-hidden="true"></i></li></ul></figure>';
                        $('.speakers-slider').append(speaker);
                        counter++;
                    }
        })
            .fail(function (error) {
            console.error('the error that happend is : ' + JSON.stringify(error));
        })
            .complete(function () {
            //Fire BxSlider Plugin  In The Event Detailed
            $('.speakers-slider').bxSlider({
                slideWidth: 280,
                minSlides: 1,
                maxSlides: 2,
                moveSlides: 1,
                slideMargin: 15
            });
        });
    };
    
   
    
    
    self.dyniamcResponse = function(){
        if (glopes.c == '/' || glopes.c == '/index.html'){
            getHomeEvent();
        }else if (glopes.c == '/events.html'){
            getMiddleEvents();
        }else if (glopes.c == "/event-detailed.html") {
            getInnerEvent();
        }else {
            return false ;
        }
    }
     
    
    return self ;

                   

})(window.eventControl || {} , golpes);

eventsControl.dyniamcResponse();