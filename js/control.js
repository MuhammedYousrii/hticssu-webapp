$(window).scroll(function () {
    var scroll = $(this).scrollTop();
    var windowWidth = $(this).width();

    function affixEffect() {
        if (scroll > 320 && scroll < 1400) {
            if (windowWidth > 900)
                $('aside').addClass('fixed')
        } else {
            $('aside').removeClass('fixed')
        }
    }

    function checkWidth() {
        if (windowWidth < 750) {
            $('#events-list figure .date').after('<div class="clearfix"></div>')
        }
    }

});

$(document).ready(function () {

                var get_single_blog = function(){
                var Elements = {
                    BlogImage : $('.blog-image img'),
                    BlogImageName : $('.blog-image h4'),
                    blogHeadline : $('div.header h4'),
                    blogWriterName : $('div.header h6').children('span').first(),
                    blogContentIntro : $('.blog-content #intro'),
                    wisdomConetnt : $('.wisdom figcaption'),
                    writerName : $('.writer-name'),
                    writerBio : $('.writer-bio'),
                };
                var blogCall = $.getJSON(control.url_nav.api_url , {type : control.url_nav.type_array[2] , select : control.url_nav.idxValue2} , function (data , statue , xhr){
                        var single_blog_request = new control.request_detail(data , statue , xhr);
                        console.log(single_blog_request.xhr);
                        /*Change My Meta Dynamic to my Returned Content*/
                        $('#meta-describe').attr('content' , single_blog_request.data[0].blog_intro);
                        $('#meta-title').attr('content' , single_blog_request.data[0].head);
                        $('#meta-url').attr('content' , 'http://hticssu.com/blog-detailed.html' );
                        $('#meta-keyword').attr('content' , single_blog_request.data[0].tags )
                        
                    })
                    .done(function (single_blog) {
                                
                                
                                
                                var tag = single_blog[0].tags.split(' ');
                                
                                var i ; 
                                for(i = 0 ; i < tag.length ; i++){
                                var li = $('<li></li>').text(tag[i]);
                                $('.tags').append(li);
                                }
                                
                                Elements.BlogImage.attr('src' , single_blog[0].main_image);
                                Elements.BlogImageName.text(single_blog[0].head)
                                Elements.blogHeadline.text(single_blog[0].head);
                                Elements.blogWriterName.append(single_blog[0].writer_name);
                                Elements.blogContentIntro.append(single_blog[0].blog_content);
                                Elements.wisdomConetnt.text(single_blog[0].wisdom);
                                Elements.writerName.text(single_blog[0].writer_name);
                                Elements.writerBio.text(single_blog[0].writer_bio);
                                control.equality('.detailed-image img' , '.detailed-image .overlay');
                    })
                    .fail(function (error) {
                        console.error(error)
                    })
                    .complete(function () {
                        var htmlPageName = window.location.href ;
                        console.log(htmlPageName);
                        var text = $('.code code p').text().split('@');
                         $('.code code p ').text('');
                        var j ;
                        for( j = 0 ; j < text.length ; j++){
                            var li = $('<li></li>').text(text[j]);
                            $('.code code p').append(li);
                        }
                    });
            };
            
                
                    
            
    })(); 

        
//       ,
//        
//        
//        check_length : function(father , child){
//            this.father = father ;
//            this.child = child ;
//            
//            this.remove = function(){
//                $(this.father).children(this.child).remove();
//            }
//            return this.remove();
//        },
//        
//        
//        go_inner : function (block_name , dataType , inner_page){
//            var idx = block_name.data(dataType);
//            localStorage.setItem('idx_value2' , idx);
//            window.location.href = inner_page ;
//        },
//        
//        
//        ,
//        
//        
//        
//        
//        
//        searchByTag : function(listItem , checkEmpty ,  elementsList , parentContainer){
//            var li = listItem ;
//            var index ;
//            var filter = li.data('tag-filter');
//            li.addClass('active').siblings().removeClass('active');
//            if(checkEmpty){
//                checkEmpty();
//            }
//            if(filter == 'all'){
//                basicView();
//                return false ;
//            }
//             for(index = 0 ; index < elementsList.length ; index++ ){
//                 var single_post_blog = $(elementsList[index]);
//                 //convert it into jquery object
//                 console.log(single_post_blog);
//                 if(single_post_blog.hasClass(filter)){
//                     parentContainer.append(single_post_blog);
//                 }
//                 else {console.log('make process on one and dosen\' found')}
//             }
//        },
//        
//        
//        
//        
//        
//        
//
//        
//
//        commentControl: {
//            post_comment: function (form_name , content_type) {
//                $(form_name).on('submit', function(e) {
//                    e.preventDefault();
//                                        var content_type =  content_type;
//
//                    var feedback1 = {
//                            username: user_name,
//                            useremail: user_mail,
//                            usercomment: user_comment,
//                            contentid: contnet_id ,
//                            contenttype : content_type
//                        }
//                        //Send Comment Value To Php file To insert it into Database..
//                    var postComment = $.post('http://hticssu.com/addComment.php', {feedback1 , contenttype : contenttype}, function (data, statue, xhr) {
//                        var comment_sending = new control.request_detail(data  ,statue , xhr);
//                        console.log(comment_sending.xhr);
//                    })
//                        .done(function (data) {
//                            console.log('You did it ' + data)
//                        })
//                        .fail(function (error) {
//                            console.erorr('comment dosn\'t send ' + error)
//                        });
//                });
//
//            },
//            
//            show_comment: function () {
//                var get_comment = $.getJSON(control.url_nav.api_url , {type : control.url_nav.type_array[5]} ,function (data, statue, xhr) {
//                    var getting_comment = control.request_detail(data , statue , xhr);
//                    console.log(getting_comment);
//                })
//                .done(function(comments){
//                    console.log(comments);
//                })
//            }
//        },
//
//
//            
//            
//            
//        
//        
//        
//
//        
//    }
//
//
//    var fire_aside_data = control.methods.get_aside_data;
//    var fire_control_object = control.dynamic_response;
//    fire_aside_data();
//    fire_control_object();
//        
//        
});