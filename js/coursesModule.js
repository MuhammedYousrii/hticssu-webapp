const coursesControl = (function(self , glopes){
    
    var coursesStack = [],
        coursesNameStack = [],
        length ,
        counter = 0 ,
        p = null ;
    const wow_effects = ['bounceInLeft' , 'bounceInDown' , 'bounceOut' , 'bounceInRight' , 'bounceInLeft' , 'lightSpeedOn' , 'jello' , 'wobble'],
          per_page = 5 ,
          elements = {
            accessDoor : $('#courses-list .row'),
            categoryListItem : $('.category-menu li') ,
            searchBox : $('#search_course'),
            currentPage : $('.current-page'),
            courseListmenu : $('#courseList'),
            searchButton : $('#course-list-search'),
            buttons : {
                get_course : $('#get-course'),
                choose_cat : $('#choose-category')
            },
            inputs : {
                category : $('#course-category'),
                course_name : $('#course-name')
            },
            lists : {
                courses : $('#courses-results'),
            }
};
    
    
    const getHomeCourses = function(){
                
        $.getJSON(glopes.a , {type : glopes.t.course , select : 'all'} , function(data , statue , xhr){
            ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
                ps.showStatueMessage(successMessage , errorMessage);
            })
        })
        .done(function(single_home_course){
            $.each(single_home_course , function(index , value){
                        
                //create Random Wow effects
                function randomArrayeffect (){
                    var effect  = wow_effects[Math.floor(Math.random()*wow_effects.length)];
                    return effect;
                }
                
                    var effect = randomArrayeffect();

                    //Split plateform column in two value (link ,name)
                    var plateformArray = single_home_course[index].plateformName.split('@');
                    var inAccounts = single_home_course[index].instrctorAccounts.split('@');
                    var mainAcc = inAccounts[0];
                    var figure = '<figure class="text-capitalize  col-xs-10 col-xs-offset-1 wow ' + single_home_course[index].category + ' ' +   effect + ' " data-wow-offset="200" data-wow-duration="1s" data-toggle="tooltip" data-placement="top" title="click to go Inner Page" data-value="'+single_home_course[index].id+'" data-name="'+single_home_course[index].name+'" data-plateform="'+plateformArray[0]+'"> <img src="'+single_home_course[index].inImage+'" alt="Image-for-course-instrctuor" class="img-circle"><figcaption class=" col-md-12 col-md-offset-0 col-xs-10 col-xs-offset-1"><h5>'+single_home_course[index].name+'</h5><p><span><i class="fa fa-clock-o fa-lg"></i>'+single_home_course[index].week_duration+' weeks</span><span class="pull-right"><i class="fa fa-video-camera fa-lg" aria-hidden="true"></i>'+single_home_course[index].video_number+'  video</span></p></figcaption><div class="clearfix"></div><article class="col-xs-12 text-center"><h5><a href="'+mainAcc+'">'+single_home_course[index].inName+'</a></h5><h6><a href="'+plateformArray[1]+'"> '+plateformArray[0]+'</a></h6></article><div class="upper"></div><div class="lower"></div></figure>' ;


                    coursesStack.push(figure);
                    coursesNameStack.push([single_home_course[index].name]);
                        
                        
                    });
                })
        .fail(function(error){
            console.error('the error is : ' + error)
        })
        .complete(function(){
                    
            //BootStrap toolTip Plugin 
            $('[data-toggle="tooltip"]').tooltip().show();    
           
            //append All Courses in Search List
            var append_all = (function (){
                for (counter = 0  ; counter < coursesNameStack.length ; counter++ ){
                    var cName = coursesNameStack[counter];
                    var option = $('<option></option>').attr('value' , cName).text(cName);
                    elements.lists.courses.append(option);
                }
            })();
                    
            //get 8 random courses 
            function get_random(block_numbers){
                $('#latest-courses').children('figure').remove();
                for(counter = 0 ; counter < block_numbers ; counter++){
                    var item = coursesStack[Math.floor(Math.random()*coursesStack.length)];
                    $('#latest-courses .row').append(item);
                }
            }
                    
            //Get Option Value ;
            function get_option_value(inputName , event){
                event.preventDefault();
                var cName = inputName.val();
                return cName ;
            }
                    
                    
            //GeT Courses Related To Choosen Tag 
            function related_tag (filter){
                var tag = filter ;
                for (counter = 0 ; counter < coursesStack.length ; counter++){
                    var course = $(coursesStack[counter]);
                    if(course.hasClass(filter)){
                        console.log(course);
                    }
                    else {
                        console.log('not-related');
                    }
                }
            }
                   
                    
            //Invoke Get_Random 
            get_random(8);
                    
            elements.buttons.choose_cat.on('click' , function(e){
                elements.lists.courses.children('option').remove();
                var choosen = get_option_value(elements.inputs.category , e);
                for (counter = 0 ; counter < coursesStack.length ; counter++){
                    var course = $(coursesStack[counter]);
                    if (course.hasClass(choosen)){
                        var option = $('<option></option>').attr('value' , course.data('name'));
                        elements.lists.courses.append(option);
                    }
                }
            });
                    
            elements.buttons.get_course.on('click', function(e){
                var choosen = get_option_value(elements.inputs.course_name , e);
                for (counter = 0 ; counter < coursesStack.length ; counter++){
                    var course = $(coursesStack[counter]);
                    var cName = course.data('name');
                    if (choosen == cName){
                        var idx = course.data('value');
                        var ide = course.data('plateform');
                        ps.goInnerPage(false , 'course-detailed.html' , idx , ide)
                    }
                    else{
                        console.log(choosen + ' ___  ' + cName);
                    }
                }
            });
            
            //Make Shuffle With Html5 Data-attribute
            //Make Class .active move Between All Li
            //Append Latest Filterid  Courses 
            $('#latest-courses li').on('click', function(){
                $(this).addClass('active').siblings().removeClass('active');
                $('#latest-courses .row').children('figure').remove();
                var filter = $(this).data('filter');
                var filterLooper = 0 ;
                //check if value equal random to ecxute it's function
                if (filter == 'random'){
                    counter = 0 ;
                    get_random(8);
                    return false ;
                }
                        

                for(filterLooper ;  filterLooper < coursesStack.length  ;  filterLooper++){
                    var course = coursesStack[filterLooper];
                    var courseObject = $(course);
                    //Get how many course showen in latest course area to stop it at 8 
                    var rowLength = $('#latest-courses .row').children().length ;
                    if(courseObject.hasClass(filter)){
                        $('#latest-courses .row').prepend(courseObject);
                        if (rowLength == 7){
                            return false ;
                        }
                    }
                }
            });
                    
                    
            //Go To Course Page 
            $('#latest-courses').on('click', 'figure' , function(){
                var idx = $(this).data('value');
                var ide = $(this).data('plateform');
                ps.goInnerPage( true, 'course-detailed.html' , idx , ide);
            });
                    
                    
        });
    }
    
    const getInnerCourse =  function(){
        $.getJSON(golpes.a, {type : glopes.t.course , select : glopes.d} , function(data , statue ,xhr){
            ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
                ps.showStatueMessage(successMessage , errorMessage);
            })
        })
        .done(function(single_course) {
            //Split Values into arrayes
            var email = single_course[0].instrctorAccounts.split('@');
            var preRequest = single_course[0].pres.split('@');
            var require = single_course[0].req.split('@');
            var plateform = single_course[0].plateformName.split('@');
            var preLoop = 0;
            p = single_course[0].plateformName ;


            var singleCourse = '<div class="course-image detailed-image col-md-12 col-md-offset-0 col-xs-10 col-xs-offset-1"><img class="img-rounded" alt="image-for-the-course" src="' + single_course[0].background + '"><div class="overlay img-rounded"><h4>' + single_course[0].name + '</h4><h5>Cs-hti <a href="https://www.facebook.com/profile.php?id=100013092248523&fref=ts">بداية جديدة</a></h5><a href="' + single_course[0].link + '"><i title="course-link" class="fa fa-link fa-lg" aria-hidden="true"></i></a></div></div><div class="clearfix"></div><figure class="content-details show-case col-xs-12"><header><h4>Course details</h4><span class="rule"></span></header><figcaption>' + single_course[0].course_content + '</figcaption><figure class="show-case"><header><h4>course-preRequest</h4><span class="rule"></header><ul class="list-unstyled pre-request"></ul></figure><figure class="show-case"><header><h4>course-requirment</h4><span class="rule"></header><ul class="list-unstyled require"></ul></figure> </figure><div class="clearfix"></div><figure class="instructor-data show-case col-xs-12"><header class="text-left"><h4>Course instructor</h4><span class="rule"></span></header><div class="instructor-image col-md-2 col-md-offset-0 col-xs-4 col-xs-offset-4"><img class="img-responsive img-circle" alt="course-instructor-image" src="' + single_course[0].inImage + '"></div><div class="data col-md-9 col-md-offset-0 col-xs-10 col-xs-offset-1"><div class="row"><header class="text-left col-md-7 col-md-offset-0 col-xs-10 col-xs-offset-1 "><h4>' + single_course[0].inName + '</h4><h5>Online Courses Instructor</h5></header><ul class="social-media list-inline col-xs-12"><li><a href="' + email[0] + '"><i class="fa fa-globe" aria-hidden="true"></i><li><a href="' + email[1] + '"><i class="fa fa-facebook fa-lg" aria-hidden="true"></i></a></li><li><a href="' + email[2] + '"><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></a></li><li><a href="' + email[3] + '"><i class="fa fa-linkedin fa-lg" aria-hidden="true"></i></a></li></ul></div><figcaption>' + single_course[0].inBio + '</figcaption></div></figure>';


            //aside deeb dive in course detailes
            var deebDetail = '<li><span class="col-xs-10"><i class="fa fa-calendar fa-lg" aria-hidden="true"></i> Weeks </span><span class="col-xs-2 proprty-value">'+single_course[0].week_duration+'</span></li>'
            +'<li><span class="col-xs-10"><i class="fa fa-video-camera fa-lg" aria-hidden="true"></i> Course Videos </span><span class="col-xs-2 proprty-value">'+single_course[0].video_number+'</span></li>'
            +'<li><span class="col-xs-10"><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i> Course Hours </span> <span class="col-xs-2 proprty-value">'+single_course[0].hour_duration+'</span></li>'
            +'<li><span class="col-xs-9"><i class="fa fa-eye fa-lg" aria-hidden="true"></i>Course Views</span><span class="col-xs-3 proprty-value">'+single_course[0].view_number+'</span></li>'
            +'<li><span class="col-xs-6"> <i class="fa fa-filter fa-lg" aria-hidden="true"></i> Category</span><span class="col-xs-6 proprty-value">'+single_course[0].category+'</span></li>'
            +'<li><span class="col-xs-7"><i class="fa fa-link fa-lg" aria-hidden="true"></i> Plateform </span><span class="col-xs-5 proprty-value">'+plateform[0]+'</span></li>';


            $('.detailed-list .content').append(singleCourse);
            $('.detail-menu').append(deebDetail);


             
            ps.listHandle(preRequest, '.pre-request');
            ps.listHandle(require, '.require');
            ps.equalSize('.detailed-list img', '.detailed-list .overlay');
        })
        .fail(function(error){
                        console.error('the error that  happen is  : ' + error)
                    })
        .complete(function (){
            $.getJSON('http://hticssu.com/php/relCourse.php', {'plateform-name' : p} , function(data , statue , xhr) {
                ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
                    ps.showStatueMessage(successMessage , errorMessage);
                });
            })
            .done(function (relCourse) {
                $.each(relCourse, function (i, v) {
                        var li = '<li data-value="'+relCourse[i].id+'" data-plateform="'+relCourse[i].platefromName+'"><div class="image-overlay col-md-4 col-md-offset-0 col-xs-8 col-xs-offset-2">'
                        +'<img class="img-responsive img-circle" alt="image-for-new" src="' + relCourse[i].inImage + '">'
                        +'<div class="overlay"><i class="fa fa-link fa-lg" aria-hidden="true"></i></div></div>'
                        +'<div class="col-md-8 col-md-offset-0 col-xs-10 col-xs-offset-1"><h5>' + relCourse[i].name + '</h5>'
                        +'<h6><a href="'+relCourse[i].plateformName.split('@')[1]+'">'+relCourse[i].plateformName.split('@')[0] +'</a></h6></div></li>';

                        $('.related-courses ul').append(li);
                });
                
                $('.related-courses ul li').on('click', function(){
                    var idx = $(this).data('value');
                    var ide = $(this).data('plateform');
                    ps.goInnerPage(true , 'course-detailed.html' , idx , ide);
                })
            })
            .fail(function(error){
                console.error(JSON.stringify(error , false , 2))
            });
        });
    };
    
    const getmMiddleCourses = function(){
        $.getJSON(glopes.a , {type : glopes.t.course , select : 'all'} , function(data , statue ,xhr){
            ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
                ps.showStatueMessage(successMessage , errorMessage);
            })
        })
        .done(function(single_course){
            
            $.each(single_course, function (index, value) {
                var plateformName = single_course[index].plateformName.split('@');
                var figure = '<figure class="col-xs-12 ' + single_course[index].category + '">'
                +'<div class="image-overlay col-md-4 col-md-offset-0 col-xs-10 col-xs-offset-1" >'
                +'<img class="img-responsive" src="' + single_course[index].background + '" alt="image-from-course">'
                +'<div class="overlay"><a href="' + single_course[index].link + '">'
                +'<i data-toggle="tooltip" data-placement="bottom" title="direct Link To Course" class="fa fa-binoculars fa-3x" aria-hidden="true"></i></a></div></div>'
                +'<div class="col-md-8 col-md-offset-0 col-xs-10 col-xs-offset-1 data">'
                +'<h4>' + single_course[index].name + '</h4>'
                +'<h6><i class="fa fa-clock-o fa-lg"></i>' + single_course[index].week_duration + ' weeks</h6>'
                +'<figcaption>' + single_course[index].course_content + '</figcaption><a href="#" data-value="'+single_course[index].id+'" data-plateform="'+plateformName[0]+'" class="read-more">read more</a><h4>Course Presented By <a href="' + plateformName[1] + '">' + plateformName[0] + '</a></h4><h5>Course Teach  By <a href="' + single_course[index].instrctorAccounts.split('@')[0] + '">' + single_course[index].inName + '</a></h5></div><input class="sr-only" type="number" value="' + single_course[index].id + '"></figure><div class="clearfix"></div>';
                
                //Append All Returned CoursesNames On searchBox List
                var courseOption = $('<option></option>').attr('value' , single_course[index].name);
                elements.courseListmenu.append(courseOption);


                //Push All CoursesBlocks In one Array To Do MyOperation On it
                coursesStack.push(figure);
                ps.equalSize('img' , '.overlay');

                            
            });
        })
        .fail(function(error){
            console.error('The Error is : ' + JSON.stringify(error , false , 2));
        })
        .complete(function(){
            //setUp Length Variable With Nums Of CoursesReturned ..
            length = coursesStack.length ;   
                $('[data-toggle="tooltip"]').tooltip()
            
            
            //Check If List Is Empty When do some Operations
            function check_empty(){
                $('#courses-list .row').children('figure').remove();
                $('.pagenaiton-slider').show();
            }
                        
            
            
            //Search ForCourse Function by name 
            function search_course_byName(searchBox , parentCon){
                var choosen = searchBox.val();
                if (choosen == null || choosen == '' || choosen == '<script>'){
                    toastr["warning"]("You Choose Wrong Course Or You Didn\'t type Any thing So We return basicView", "Wrong Choice");
                    ps.basicView(check_empty , per_page , coursesStack ,  'courses-list');
                    return false ;
                }
                elements.accessDoor.children('figure').remove();
                for (counter = 0 ; counter < length; counter++) {
                    var courseObject = $(coursesStack[counter]);
                    var courseName = courseObject.find('h4:first-of-type').text();
                    if (choosen == courseName) {
                        elements.accessDoor.append(courseObject);
                        ps.equalSize('img' , '.overlay');
                    }
                }
            }

            
            //make pagination dynamic on table length and the per_page courses
            ps.pagniation(length , per_page);

            //Create Basic View in some Cases 
            ps.basicView(check_empty , per_page , coursesStack ,  'courses-list');



            //Get More Elements With pagnition with dataAttrbiute 
            $('.pagenaiton-slider li').on('click', function () {
                var page_number = $(this).data('page-num');
                if(page_number == 0){
                    elements.currentPage.text(page_number);
                    return  ps.basicView(check_empty , per_page , coursesStack ,  'courses-list');
                    
                }else {
                     $(window).scrollTop(100); 
                    $(this).addClass('active').siblings().removeClass('active').parent().siblings().removeClass('active');
                    var idx_start = $(this).data('start');
                    var idx_end = $(this).data('end');
                    elements.currentPage.text(page_number);
                    check_empty();
                    for (counter = idx_start; counter < idx_end ; counter++) {
                        var item = coursesStack[counter];
                        $('#courses-list .row').append(item)
                    }
                    ps.equalSize('.image-overlay img', '.image-overlay .overlay');
                    }
               
            });

            //make category system with data
            elements.categoryListItem.on('click', function () {
                var filter = $(this).data('filter');
                if(filter  == 'all'){
                    ps.basicView(check_empty , per_page , coursesStack ,  'courses-list');
                    return false ;
                }
                else if (filter == 'collapse'){
                    return false ;
                }
                else {
                    $(this).addClass('active').siblings('li').removeClass('active');
                    elements.accessDoor.children('figure').remove();
                    $('.pagenaiton-slider').hide();
                    var filterLooper = 0;
                    $('#courseList').children().remove();
                    for (filterLooper; filterLooper < length; filterLooper++) {
                        var course = coursesStack[filterLooper];
                        var courseObject = $(course);
                        var courseName = courseObject.find('h4:first-of-type').text();
                        var rowLength = $('#latest-courses .row').children().length / 2;
                        if (courseObject.hasClass(filter)) {
                            elements.accessDoor.append(courseObject);
                            var option = $('<option value="' + courseName + '">' + courseName + '</option>');
                            $('#courseList').append(option);
                        }
                    }
                    ps.equalSize('#courses-list .row img', '#courses-list .row .overlay');
                }
                
            });




            elements.searchBox.on({
                focus : function(){
                    toastr["info"]("Choose one Of the courses in the list then Press Enter Or click On Search-button", "tip");
                },
                keydown : function(e){
                    if(e.keyCode == 16){
                        search_course_byName(elements.searchBox , elements.accessDoor);
                    }
                }
            });
            elements.searchButton.on('click', function(e){
                e.preventDefault();
                search_course_byName(elements.searchBox , elements.accessDoor);
            });

            // Go To Course Detaile page 
            elements.accessDoor.on('click', 'figure .read-more', function () {
                var idx = $(this).attr('data-value');
                var ide = $(this).data('plateform');
                ps.goInnerPage(true , 'course-detailed.html' , idx , ide );
            });

        });
    };

    this.dyniamcResponse = function(){
        if(glopes.c == '/' || glopes.c == '/index.html'){
            getHomeCourses();   
        }else if (glopes.c == '/courses.html'){
            getmMiddleCourses();
        }else if (glopes.c == '/course-detailed.html') {
            getInnerCourse();
        }else {
            return false ;
        }
    };
        
    return this ;
    
})(window.coursesControl || {} , golpes); 


coursesControl.dyniamcResponse();