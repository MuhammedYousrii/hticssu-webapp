const newsControl = (function(self , glopes){
    
    const searchByTag = function(listItem , checkEmpty ,  elementsList , parentContainer){
            var li = listItem ;
            var index ;
            var filter = li.data('tag-filter');
            li.addClass('active').siblings().removeClass('active');
            if(checkEmpty){
                checkEmpty();
            }
            if(filter == 'all'){
                basicView();
                return false ;
            }
             for(index = 0 ; index < elementsList.length ; index++ ){
                 var single_post_blog = $(elementsList[index]);
                 //convert it into jquery object
                 console.log(single_post_blog);
                 if(single_post_blog.hasClass(filter)){
                     parentContainer.append(single_post_blog);
                 }
                 else {console.log('make process on one and dosen\' found')}
             }
        };
    
    
    
    var newsLoop ,
        length ,
        access_door = $('#news-list .row'),
        news_stack = [],
        per_page = 4 ;
                
const getHomeNews = function(){
        
    $.getJSON(glopes.a , {type : glopes.t.new} , function(data , statue , xhr){
        ps.getRequestDetail(data , statue , xhr , function(successMessage, errorMessage){
            ps.showStatueMessage(successMessage , errorMessage); 
        });
    })
        .done(function(single_new){
        $.each(single_new , function(index , value){
                        
            var date = single_new[index].new_date.replace(/@/g, "");
                        
            var upper_image = $('<img/>').addClass('img-rounded img-responsive').attr({
                 'alt' : 'image-that decribe this new' ,
                 src : single_new[index].new_image 
             })
            var i_icon = $('<i></i>').addClass('fa fa-link fa-lg img-rounded').attr('aria-hidden' , 'true');
            var a_link = $('<a></a>').attr("href" , ''+single_new[index].new_links+'' ).append(i_icon);
            var upper_overlay = $('<div></div>').addClass('overlay img-rounded img-responsive').append(a_link);
            var upper = $('<div></div>').addClass('image-overlay col-md-12 col-md-offset-0 col-xs-10 col-xs-offset-1 no-padding').append(upper_image).append(upper_overlay);
            var date_icon = $('<i></i>').addClass('fa fa-clock-o').attr('aria-hidden' , 'true');
            var h5_date = $('<h5></h5>').addClass('col-xs-12').append(date_icon).append(date);
            var h4_new_head = $('<h4></h4>').addClass('col-xs-12').text(single_new[index].new_head);
            var p_content = $('<p></p>').addClass('col-xs-12').html(single_new[index].new_content)
            var read_more = $('<a></a>').addClass('btn btn-danger hvr-buzz-out').text('Read More');
            var lower = $('<figcaption></figcaption>').addClass('col-xs-12').append(h5_date).append(h4_new_head).append(p_content).append(read_more);
            figure_con = $('<figure></figure>').addClass('col-md-4 col-xs-12 wow fadeInLeft new_block').attr({
                'data-wow-offset' : '200' ,
                'data-wow-duration' : '0.5s' ,
                'data-value' : single_new[index].id
}).append(upper).append(lower);
                        
            $('#news .row').prepend(figure_con);
                        
            if(index == 2){
                return false ;
            }
        });
    })
        .fail(function(error){console.log('The erorr that happen is ' + JSON.stringify(error , false , 2))})
        .complete(function(){
        $('#news').on('click', '.new_block ', function(){
            var idx = $(this).data('value');
            ps.goInnerPage( false , 'new-detailed.html' , idx , null);
        });
        ps.equalSize('#news img' , '#news .overlay');
    }); 
    }
    
const getInnerNews = function(){
         
        //Cash My Elements 
        var tagLooper = 0 ,
            elements = {
                imageBox : $('.new-image img'),
                teamBox : $('.new-image h4'),
                contentBox : $('.show-case-body'),
                headBox : $('.header h4'),
                tagList : $('.tags'),
                writerBio : $('#writer-detailed .writer-bio'),
                writerName : $('#writer-detailed .writer-name'),
                writerImage : $('#writer-detailed .img-writer'),
                headerWriterName : $('.header h6 span').first(),
                headerDate  : $('.header .date'),
            };
                                    
                
        $.getJSON(glopes.a , {type : glopes.t.new} , function (data , statue , xhr){
            ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
                ps.showStatueMessage(successMessage , errorMessage);
            }) 
        })
            .done(function(single_new){
                    $.each(single_new , function(index, value){
                        if(single_new[index].id == glopes.d){
                            
                            //process data rturned by ajax request 
                            var contentValue = single_new[index].new_content ;
                            var headValue = single_new[index].new_head ;
                            var tagsValue = single_new[index].new_tags.split('@');
                            var imgSource = single_new[index].new_image ;
                            
                            
                            //Peocess Date Returned By Ajax 
                            var newDate = single_new[index].new_date.split('@');
                            
                            console.log(newDate);
                            
                            
                            elements.imageBox.attr('src' , imgSource);
                            elements.teamBox.text(single_new[index].team_name);
                            elements.contentBox.html(contentValue);
                            elements.headBox.text(headValue);
                            elements.headerDate.children('span').text(newDate[0]);
                            elements.headerDate.children('figcaption').text(newDate[1]);
                            elements.writerBio.text(single_new[index].writer_bio);
                            elements.headerWriterName.append(single_new[index].new_writer);
                            elements.writerName.text(single_new[index].new_writer);
                            elements.writerImage.attr('src'  , single_new[index].writer_image);
                            control.ul_rows_handler(tagLooper , tagsValue , elements.tagList);
                            
                            
                        };
                    });
                    
                })
            .fail(function(error){console.error(JSON.stringify(error , false , 2))})
            .complete(function(){
                    ps.equalSize(elements.imageBox , '.detailed-image-new .overlay');
                })
    }
    
    
    const getMiddleNews = function(){
        $.getJSON(glopes.a, {type : glopes.t.new} , function (data, statue, xhr) {
            ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
                ps.showStatueMessage(successMessage , errorMessage);
            })
    })
    .done(function(single_new){
        $.each(single_new, function (index, value) {
                        
            //Process Our data returned by ajax 
            var date = single_new[index].new_date.split('@');
            var shortcutContent = single_new[index].new_content.substring(0 , 400).concat('   ............. ');    
                        
                        
                        
                        
            //Create My View 
            var read_more = $('<a></a>').addClass('btn btn-danger hvr-buzz-out col-xs-offset-1 go-inner read-more').text('Read More');
            var new_content = $('<figcaption></figcaption>').html(shortcutContent);
            var last_i_icon = $('<i></i>').addClass('fa fa-comments-o').attr('aria-hidden', 'true');
            var last_span = $('<span></span>').attr({
                'data-placement': 'right',
                title: 'Still Under Development'
            }).text('Commenting System Still Under Testing Yet').prepend(last_i_icon);
            var first_i_icon = $('<i></i>').addClass('fa fa-user').attr('aria-hidden', 'true')
            var first_span = $('<span></span>').append(first_i_icon).append('  ' + single_new[index].new_writer);
            var h6_author = $('<h6></h6>').append(first_span).append(last_span);
            var h4_new_head = $('<h4></h4>').text(single_new[index].new_head);
            var lower = $('<div></div>').addClass('col-md-6 col-xs-10 data').append(h4_new_head).append(h6_author).append(new_content).append(read_more);
            var date_mon = $('<figcaption></figcaption>').text(date[1]);
            var date_num = $('<span></span>').text(date[0]);
            var new_date = $('<figure></figure>').addClass('date col-md-1 col-xs-2').append(date_num).append(date_mon);
            var i_icon = $('<i></i>').addClass('fa fa-link fa-lg').attr('aria-hidden', 'true');
            var a_link = $('<a></a>').append(i_icon);
            var upper_overlay = $('<div></div>').addClass('overlay').append(a_link);
            var upper_image = $('<img/>').addClass('img-responsive new-list-image').attr({
                alt: 'Image For This new Subject',
                src: single_new[index].new_image
            })
            var upper = $('<div></div>').addClass('image-overlay col-md-5 col-md-offset-0 col-xs-10 col-xs-offset-1').append(upper_image).append(upper_overlay);
            figure_con = $('<figure></figure>').addClass('col-xs-12 new_block '+ single_new[index].new_tags +'').attr('data-value', '' + single_new[index].id + '').append(upper).append(new_date).append(lower).append(read_more);

            
            
            //append our blog-post with dynamic data 
                $('#news-list .row').prepend(figure_con);
                ps.equalSize('.image-overlay img' , '.image-overlay .overlay');
                news_stack.push(figure_con);
        })
                })
    .fail(function(error){
        console.error("The Error That Happend " + error);
    })
    .complete(function(){
        //setup length so the Nums Of Reyurned News
        length = news_stack.length ;
                    

         //Text The length Of my news in upper nav
        $('.pagenaiton-counter #result-number').text(length);

        function check_empty(){
              $('#news-list .row').children('figure').remove();
              $('.pagenaiton-slider').show();
        };

        //make pagination dynamic on table length and the per_page courses
        ps.pagniation(length , per_page);

        //Create Basic View in some Cases
        ps.basicView(check_empty , per_page , news_stack , 'news-list');



        $('.tag-filter').on('click', 'li' , function(){
            searchByTag($(this) , check_empty , news_stack , access_door);

            });

         //Get More Elements With pagnition with dataAttrbiute 
        $('.pagenaiton-slider li').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var idx_start = $(this).data('start');
            var idx_end = $(this).data('end');
            var page_number = $(this).data('data-page-num');
            check_empty();
            for (newsLoop = idx_start ; newsLoop < idx_end ; newsLoop++) {
                var item = news_stack[newsLoop];
                $('#news-list .row').append(item)
            }
            $('.pagenaiton-counter #page-number').text(page_number);
            ps.equalSize('#news-list .row img', '#news-list .row .overlay');
        });


        //Go Detaiel Page
        access_door.on('click', 'figure .read-more' , function(){
            var idx = $(this).data('value');
            ps.goInnerPage(false , 'new-detailed.html' , idx , null);
        })
    })
    }
    
    
    self.dyniamcResponse = function(){
        if(glopes.c == '/' || glopes.c == '/index.html'){
            getHomeNews();
        }else if(glopes.c == '/news.html'){
            getMiddleNews();
        }else if(glopes.c == '/news-detailed.html'){
            getInnerNews();
        }else {
            return false ;
        }
    }
    
    
    
    return self ;
    
    
    
    
})(window.newsControl || {} , golpes);


newsControl.dyniamcResponse();