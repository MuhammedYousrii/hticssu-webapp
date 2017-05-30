$(document).ready(function(){
    
    
    const admin = {
        username : 'noshy' ,
        password : 'dollarman' ,
        usernameone : 'muhammed-reda' ,
        passwordone : 'elzywawellymnha'
    }
    
    //fire nice scroll
   $("body").niceScroll({
       cursorcolor:"#002e3b" ,
       cursorwidth : '10px',
       cursorborder : '2px solid #002e3b' ,
       cursorborderradius : '1px',
       horizrailenabled: false ,
       enablekeyboard: false
   }); 
    
    
    $('.toggle-dashboard-aside').on('click', function(){
       var adminAside = $(this).parents('#admin-profile'); 
        adminAside.toggleClass('active'); 
        if(adminAside.hasClass('avtive') === true){
            $(this).append('<i class="fa fa-long-arrow-left" aria-hidden="true"></i>');
        }
    });
    //Define Toastr Properties 
    toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": true,
          "progressBar": true,
          "positionClass": "toast-top-right",
          "preventDuplicates": true,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "3000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }

    //create dynamic html with $.each loop 
    $.each($('input , textarea') , function(index , value){
        var input  = $(this),
            placeHold = input.attr('placeholder'),
            IdValue = input.prevAll('label').attr('for');
        input.attr({
            'data-blur' : placeHold ,
//            'required' : true ,
            'id' : IdValue 
        });
        
        //Create Length Shower Before Every input input in the form 
        if($(this).hasClass('hidden') === false && $(this).attr('type') !== 'submit'){
            var max_span = $('<span></span>').addClass('max').text($(this).data('length'));
            var rem_span = $('<span></span>').addClass('rem').text($(this).data('length'));
            var lengthShowCase = $('<div></div>').addClass('length').append(max_span).append(' || ').append( rem_span);
            var helperTextBox = $('<div></div>').addClass('user-assistant hidden').attr('role' , 'note');
            $(this).before(lengthShowCase);
            $(this).before(helperTextBox);
        }
    })

    
    //Declare my parent namespace
    //check is exisis and create it
    var dashboard_nameSpace = dashboard_nameSpace || {};
    
    
     
    //my data base in multi dimensional array 
    //var value_stack = [];
    var custom_stack = [];
    
    // <!-- declare my classes and modules -->
    
    //Declare the parent clsses    <!-- Input value validating Operators -->
    var valueOperateMethods = function (){};
    
    
    //Collection Of Modules And Methods To Help Creating Goo Prefomance
    var tagControl = (function(){
        var looper ,
            categoryModule = categoryModule || {}  ,
            listModule = listModule || {} ;
         
         
         
         categoryModule.propertites = {
            courseCategories : ['all@' , '.new@' , 'programming@' , 'gaming@' , 'web@' , 'design@' , 'ios@'],
            categoryInput : $('#course-category'),     
         }
         categoryModule.returnCommonCategory = function (){
            for (looper = 0 ; looper < categoryModule.propertites.courseCategories.length ; looper++ ){
                //Create Li 
                var CatItem = $('<li></li>').text(categoryModule.propertites.courseCategories[looper]).attr('data-category' , categoryModule.propertites.courseCategories[looper]);
                dashboard_nameSpace.valueValidateMethods.elements.categoryListItem.append(CatItem);
            }
        } 
         categoryModule.postChoosenCategory = function (categoryName){
            var preAddvedVal = categoryModule.propertites.categoryInput.val();
            categoryModule.propertites.categoryInput.val(preAddvedVal + categoryName);
        }
         
         listModule.propertites = {
             addNewItem : $('.listItem'),
         }
         listModule.addNewItem = function(button , input){
             var Button = button ,
                 input = input ,
                 preVal = input.val(),
                 addSign = button.text();
                
             input.val(preVal + addSign);
         }
         
        
        return {
            categoryControl : categoryModule ,
            listControl : listModule 
        };
    })();
    
    
   
    

    //add methods via prototyping to parent class (valueOopearte)
    valueOperateMethods.prototype.maxLength = function(value){

            
                var agentVal = value[0],
                    length = value[1],
                    inputRoot = $(value[2]),
                    helperText = value[3],
                    submitButton = $('input[type="submit"]');
                
                if(agentVal.length > length){
                    toastr["error"]("the " + helperText +   " Elemnet length is more than specfied number The Form Will Not Submited If You'nt correct this "  ,  "erorr");
                    inputRoot.focusout();
                    return 'error';
                }
                else if (agentVal == null || agentVal == '') {
                    toastr['warning']('Your input is empty You Should enter any value To send' , 'warning');
                    submitButton.removeClass('btn-primary').addClass('btn-warning').attr('disabled' , 'true');
                    return 'empty' ;
            }
                else {
                    toastr['success']('Great !! You\'ve Filled The ' + helperText + ' InputField With Correct Length ' , 'Success');
                    return 'success';
                } 
              
    }
    valueOperateMethods.prototype.select = function(input , e){
            e.preventDefault();
            var hash = '#' ,
                id = $(input).attr('id'),
                hashID = hash.concat(id),
                length = $(hashID).data('length'),
                helper = $(hashID).prevAll('label').text(),
                value = $(hashID).val();
            return  [value , length , hashID , helper ] ;
    }
    valueOperateMethods.prototype.lengthShower = function(value){
        
            var helperText = value[3],
                inputRoot = $(value[2]),
                maxLength = value[1] ,
                valLength = inputRoot.val().length ,
                rem = maxLength - valLength ;
            inputRoot.prevAll('.length').children('.max').text(maxLength);
            inputRoot.prevAll('.length').children('.rem').text(rem);
        
            if(rem <= -1 ){
                toastr["error"]("the " + helperText +   "you used the max numbers of chars "  ,  "erorr");
            }
    }
    valueOperateMethods.prototype.checkName = function(nameValueLength){
        if (nameValueLength.length  <= 30){
             toastr["warning"]("Your HeadLine Or Name Is Very Shortly you Sure it's true"  ,  "Warning");
        }
    }
    valueOperateMethods.prototype.checkUrlvalid = function(urlValue){
        //Create Anchor Element To devide my data into parts   
        var parser = document.createElement('a');
            parser.href = urlValue;
        
        
            var protocol = parser.protocol ,
                fullhostName = parser.hostname.split('.'),
                domainExtension = fullhostName[fullhostName.length-1],
                Hashing = parser.hash;
        
        
            if(protocol !== 'https:' && protocol !== 'http:'){
                toastr["error"]("You have Error In Your URL :: " + protocol + " Fix It " , "URL ERROR");
               
            }
            else {
                 if(domainExtension !== 'com' && domainExtension !== 'org'){
                    toastr["error"]("You have Error In Your URL :: "  + domainExtension + " Fix It " , 'URL ERROR');
                }
                else {
                    console.log('every things okii')
                }
            }
        
        
            
//            parser.port;     // => "3000"
//            parser.pathname; // => "/pathname/"
//            parser.search;   // => "?search=test"
//            parser.hash;     // => "#hash"
//            parser.host; // => "example.com:3000"
    }
    
    
    
    
    //Add Variables To My Main Class 
    // <!-- Add Values to our name spaces -->
    valueOperateMethods.prototype.elements = {
        inputBox : $('input'),
        form : $('form'),
        showTab : $('<div></div>').addClass('show-tab editable'), 
        textBox : $('.virtual-input'),
        categoryListItem : $('.common-category'),
    };
        

    
   

   
    
    
    /* Create constrcutor function that eqal  sub class from first parent class */
    function requestInfo(data , statue , xhr){
        this.data = data ; 
        this.statue = statue ;
        this.xhr = xhr ;
    }
    
    
    //Add medthods to sub Classes 
    requestInfo.prototype.callback = function(){
        var requestObject = "the data returned by request are : " + this.data  + "  " + " the statue of request is : " + this.statue + "  " + 'and the methods object responsed from server is ' + this.xhr ;
        return console.log(requestObject);
    } 
    
    
    
    
    
   
    //create Sub namespaces in dashboard  nameSpace
    dashboard_nameSpace.valueValidateMethods = new valueOperateMethods();
    dashboard_nameSpace.request_detail = new requestInfo();
    dashboard_nameSpace.categoryControl = tagControl.categoryControl ;
    dashboard_nameSpace.listControl = tagControl.listControl ;
    dashboard_nameSpace.userAssissent = {
        'course' : [
            {
                'course-name' : "Write The Correct Name of Course ,, it's good Praictse That Your Name To Be More Than 40 Char " ,
                'course-image' : "Get The Url Of Main Image Of Course That will be as background Of innerCourse Page " ,
                'course-link' : "the url Of holeCourse Playlist On YoutuebChannel or Any PlateForm Like  EDX , COURSERA ETC..." ,
                'course-plateform' : "type The Name Of Channel Or Any PlateForm That Produced this Course the insert This sign '@' then the Url Link Of This Channel be careful The Link should Be valid One okii",
                'course-describe' : "Copy And Paste The Descripition Of Course From his Source and if it's Not Found You Can Write Pro One With Your Self OKii",
                'course-prerequests' : "Write Your Single PreRequest Then Click On Add Button To Add another On Ok ",
                'course-instructor-name' : "It Should Be Valid Human Name with Maximum Three Words",
                'course-instructor-image' : 'Copy Url Of instructor image And paste it Or Uplod it On freeHost And Get the Url Of it i recommended cloudnairy',
                'course-instructor-bio' : 'Search For instructor and Type good Bio About Them In Text Only at maximum 500char',
                'admin-login-username' : 'Hello Admin ,, Enter Your reserved User Name' ,
                'admin-login-username' :'Put Your Presonal Password And Make Sure That you enter it correctly',
                'course-category' : 'For Best Results or Searching this Course Use the Common category by only click on him ',
                'week-duration' : 'type How many Weeks You Expected User To End This Course ok!!'  ,
                'course-instructor-accounts' : 'You Should Write Accounts Of Instructor firstly his presonal-website then facebookAcc then twitter then linked in if founded',
                'course-videos' : 'The Numbers Of Hole Videos Of Course' 
            }
        ],
        'new' : [
            {
                'new-head' : 'عليك أدخال أسم خبر صحيح يناسب الخبر بالعربية او بالانجليزية .. ويفضل ان يزيد عن 40 حرف',      
                'new-image' : 'يجب انت تضع لينك صحيح للصورة والا لن تتمكن من رفع الخبر ,, يفضل فريق العمل انا تقوم برفع الصورة علي هوست مثل كلاودنيري ',
                'new-body' : 'Here You Will Meet Our BetaViers"ion from BiankyEditor That Will Help You To Make a Great New',
                'new-tag' : 'Write single Tag Then Click On "@" Button Then Write yout another Tag etc...',
                'writer-name' : 'The Name OF Man Who write This new ,, or The Team That Write It ,, media , operation , sport etc... ' ,
                'refer-link' : 'Link for This New On faceBook Or Twitter if Founded'
            }
        ],
    }
    
    
     
    
    dashboard_nameSpace.categoryControl.returnCommonCategory();
    dashboard_nameSpace.valueValidateMethods.elements.categoryListItem.children('li').on('click', function(){
        var value = $(this).data('category');
        tagControl.categoryControl.postChoosenCategory(value);
    })
    dashboard_nameSpace.listControl.propertites.addNewItem.on('click', function(){
        var targetInput = $(this).nextAll('input');
        tagControl.listControl.addNewItem($(this) , targetInput);
    });
    
    
    var fullbiankyEditorOptions = [ 
         ['fontStyle' , ['bold' , 'italic' , 'underline' , 'strikeThorough'] , 'normal-bianky-list'],
         ['alignment' , ['justifyFull' , 'justifyLEft' , 'justifyCenter' , 'justifyRight' ] , 'normal-bianky-list'],
         ['useractive' , ['indent', 'outdent' , 'undo' , 'redo'] , 'normal-bianky-list'],
         ['lists' , ['InsertOrderedList', 'InsertUnorderedList'] ,'normal-bianky-list'],
         ['textoperation' , ['copy' , 'cut' , 'delete'], 'normal-bianky-list'],
         ['extrnalResource' ,['CreateLink' , 'insertImage' , 'code'] ,'normal-bianky-list'],
         ['headingSizes ' , ['font-size','1' , '2' , '3' , '4' , '5' , '6' , false] , 'select-bianky-list'],
         ['foreColor' , ['course-font-color'] , 'bianky-input-box']
        ];
    
//     var courseContent = new biankyEditor(richTextField , '#toolbar' , fullbiankyEditorOptions, '#course-form' , 'course-content');
//        courseContent.fireDesignMode();
//        courseContent.biankyView();
    
//     var blogContent = new biankyEditor(blogMainContent , '#blog-toolbar' , fullbiankyEditorOptions, '#blog-form' , 'blog-content');
//        blogContent.fireDesignMode();
//        blogContent.biankyView();
    
    
        
        var newContent = new biankyEditor(newRichTextField , '#new-toolbar' , fullbiankyEditorOptions, '#new-form' , 'new-content');
        newContent.fireDesignMode();
        newContent.biankyView();
    
    
    $('.binaky-btn').on('click', function(){
       var control = $(this).data('control');
       newContent.execCom($(this) , control);
    });
    $('.control-modal').on('click', function(){
        var type = $(this).parent('.btn-group').parent('#modal-form').attr('data-type');
        newContent.controlModal(type);
    })
    
    
    $('.cancel , .close').on('click' , function(){
       $('.bianky-modal').removeClass('active'); 
    });
    $('#save-content').on('click', function(e){
                e.preventDefault();
                newContent.getContent('html');
                })


    
   
    
    $('#dash-navbar li').on('click', function(){
   $(this).addClass('active').siblings().removeClass('active');
    var show = $(this).data('show');
    var cla = '.' + show ;
        
    $(''+cla+'').show().siblings('form').hide();
    });
    
    $('#login-form').on('submit',  function(e){
        e.preventDefault();
//        var userInfo = $(this).serialize();
        var username = $(this).find('#admin-login-username').val();
        var password = $(this).find('#admin-login-password').val();
        
        if(username == admin.username && password == admin.password || username == admin.usernameone && password == admin.passwordone){
            $('.admin-login-modal').fadeOut(1000);
        }
        
//        var userLogin = $.post('http://hticssu.com/php/userLogin.php' , userInfo , function(data  , statue , xhr){
//          var userLogunReques = new dashboard_nameSpace.request_detail(data , statue , xhr);
//            userLogunReques.callback();
//            console.log(userLogunReques.xhr);
//        })
//        .done(function(data){
//           console.log(data);
//            swal('Great' , 'You Login successfully ' , 'success');
//        });
       
    });
    
    
    
    dashboard_nameSpace.valueValidateMethods.elements.inputBox.on({
        change : function(e){    
            var inputValue = dashboard_nameSpace.valueValidateMethods.select(this , e);
            dashboard_nameSpace.valueValidateMethods.maxLength(inputValue);
            if($(this).hasClass('headline')){
                dashboard_nameSpace.valueValidateMethods.checkName(inputValue[0])
            }
            if($(this).hasClass('urllink')){
                dashboard_nameSpace.valueValidateMethods.checkUrlvalid(inputValue[0]);
            }
            
        },
        keyup : function(e){
            var inputValue = dashboard_nameSpace.valueValidateMethods.select(this , e),
                rem = dashboard_nameSpace.valueValidateMethods.lengthShower(inputValue),
                userAssistantBox = $(this).prev('.user-assistant'),
                helperText = $(this).data('helper');
            
            userAssistantBox.removeClass('hidden').text(helperText).fadeOut(10000);
            
        },
        focus : function(e){
            e.preventDefault();
            var focusData = $(this).data('focus'),
                parentFormType = $(this).parents('form').data('form'),
                InputBoxId = $(this).attr('id'),
                GetHelperText ;
            
            if (parentFormType == 'course'){
                GetHelperText = dashboard_nameSpace.userAssissent.course[0][""+InputBoxId+""];
            }
            else if (parentFormType == 'new'){
                GetHelperText = dashboard_nameSpace.userAssissent.new[0][""+InputBoxId+""];
            }
            else if (parentFormType == 'blog'){
                GetHelperText = dashboard_nameSpace.userAssissent.blog[0][""+InputBoxId+""];
            }
            
            $(this).attr('placeholder' , focusData);
            $(this).attr('data-helper' , GetHelperText);

        },
        blur : function(){
            var blurData  = $(this).data('blur'),
                userAssistantBox = $(this).prev('.user-assistant');
            $(this).attr('placeholder' , blurData);
            userAssistantBox.addClass('hidden');
        }        
    });
    dashboard_nameSpace.valueValidateMethods.elements.form.on('submit',  function(e){
        e.preventDefault();
        var str = $(this).serialize();
        console.log(str);
        var formUrl = $(this).data('form');
        var postSubject = $.post('http://hticssu.com/php/add_'+formUrl+'.php' , str , function(data , statue , xhr){
//            var CourseForm = new dashboard_nameSpace.request_detail(data , statue , xhr);
//            CourseForm.callback();
//            console.log(CourseForm.xhr);
        })
        .done(function(data){
            swal('Good Job!' , 'You send Course Successfully' , 'success')                
            console.log(data);
        })
        .fail(function(erorr){
            console.error(error);
            swal ('OOpps!!!!' , 'this is wrong happen' , 'error');
        })
    });
    
});













  
