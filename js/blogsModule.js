const blogsModules = (function(self , glopes){
    
    var blogLoop ,
        access_door = $('#blogs-list .row'),
        blogsStack = [],
        length ,
        per_page = 5 ;

    
    
const getHomeBlogs = function(){
    $.getJSON(glopes.a ,{type  : glopes.t.blog , select : 'all'}, function(data , statue , xhr){
        ps.getRequestDetail(data , statue , xhr , function(successMessage, errorMessage){
            ps.showStatueMessage(successMessage , errorMessage); 
        });
    })
            .done(function(single_home_blog){
                $.each(single_home_blog ,  function(index ,value){
                    var figure = '<figure id="blog"><div class="image-overlay col-md-4 col-md-offset-0 col-xs-8 col-xs-offset-2" data_value="'+single_home_blog[index].id+'"><img class="img-responsive" alt="Image-For-Blog" src="'+single_home_blog[index].main_image+'"><div class="overlay"><img src="media/binoculars.svg" alt="Icon-For-Navigate-To-Element-source" class="img-responsive"></div></div><div class="mini-data col-md-8 col-md-offset-0 col-xs-10 col-xs-offset-2"><h5>'+single_home_blog[index].head+'</h5><h6><i class="fa fa-calendar" aria-hidden="true"></i>written at '+single_home_blog[index].date+'</h6><figcaption>'+single_home_blog[index].content+'</figcaption></div></figure>';
                    
                    $('#our-blogs').append(figure);
                    ps.equalSize('.our-blogs img' , '.our-blogs .overlay');
                        
                    if (index == 2){
                        return false ;
                    }
                    });
                })
        .fail(function(error){console.log('the error is : ' + error)})
        .complete(function(){
        $('#our-blogs').on('click', 'figure' , function(){
            var idx = $(this).data('value');  
            ps.goInnerPage( false , 'blog-detailed.html' , idx , null);
        });            
    })
}
    
const getMiddleBlogs = function(){
    $.getJSON(glopes.a , {type : glopes.t.blog , select : 'all'},  function (data, statue, xhr) {
        ps.getRequestDetail(data , statue , xhr , function(successMessage , errorMessage){
            ps.showStatueMessage(successMessage , errorMessage);
        })
    })
    .done(function (single_blog) {
                        $.each(single_blog, function (index, value) {
                                    
                            var read_more = $('<a></a>').text('read more ... ');
                            var figcaption_content = $('<figcaption></figcaption>').html(single_blog[index].blog_intro);
                            var last_i_icon = $('<i></i>').addClass('fa fa-comments-o').attr('aria-hidden', 'true');
                            var last_span = $('<span></span>').attr({
                                'data-placement': 'right',
                                title: 'Still Under Development'
                            }).text(32).append(last_i_icon);
                            var first_i_icon = $('<i></i>').addClass('fa fa-user').attr('aria-hidden', 'true')
                            var first_span = $('<span></span>').text(single_blog[index].writer_name).append(first_i_icon);
                            var h6_author = $('<h6></h6>').append(first_span).append(last_span);
                            var h4_blog_head = $('<h4></h4>').text(single_blog[index].head);
                            var lower = $('<div></div>').addClass('col-md-6 col-xs-10 data').append(h4_blog_head).append(h6_author).append(figcaption_content).append(read_more);
                            var blog_date = $('<div></div>').addClass('date col-md-1 col-xs-2').text(single_blog[index].date);
                            var i_icon = $('<i></i>').addClass('fa fa-link fa-lg').attr('aria-hidden', 'true');
                            var a_link = $('<a></a>').append(i_icon);
                            var upper_overlay = $('<div></div>').addClass('overlay').append(a_link);
                            var upper_image = $('<img/>').addClass('img-responsive blog-list-image').attr({
                                alt: 'Image For This Blog Subject',
                                src: single_blog[index].main_image
                            })
                            var upper = $('<div></div>').addClass('image-overlay col-md-5 col-md-offset-0 col-xs-10 col-xs-offset-1').append(upper_image).append(upper_overlay);
                            figure_con = $('<figure></figure>').addClass('col-xs-12 blog_block '+ single_blog[index].tags +'').attr('data-value', '' + single_blog[index].id + '').append(upper).append(blog_date).append(lower);
                            
                            //append our blog-post with dynamic data 
                            $('#blogs-list .row').prepend(figure_con);
                            blogsStack.push(figure_con);
                        });
                    })
    .fail(function (erorr) {
        console.error('the erorr that happend is ' + error)
    })
    .complete(function () {
                        ps.equalSize('.image-overlay img' , '.image-overlay .overlay');
                        
                        //Text The length Of my Blogs in upper pageination nav
                        length = blogsStack.length ;
                        
                        
                        function check_empty(){
                          $('#blogs-list .row').children('figure').remove();
                          $('.pagenaiton-slider').show();
                        };
                        
                        ps.pagniation(length , per_page);
                        ps.basicView(check_empty , per_page , blogsStack , 'blogs-list');
                        
                        
                        $('.tag-filter').on('click', 'li' , function(){
                            control.searchByTag($(this), check_empty , blogsStack , access_door );
                        });
                        access_door.on('click', 'figure', function (){
                            var idx = $(this).data('value');
                            ps.goInnerPage(false ,'blog-detailed.html' , idx, null);
                       });
                    });
}




self.dyniamcResponse = function(){
    if (glopes.c == '/' || '/index.html'){
        getHomeBlogs();
    }
    else if (glopes.c == '/blogs.html'){
        getMiddleBlogs();
    }else {
        return false ;
    }
}

                    
return self ;
                    
})(window.blogsModules || {} , golpes)


blogsModules.dyniamcResponse();