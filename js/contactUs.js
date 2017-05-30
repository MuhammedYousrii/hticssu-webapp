$(document).ready(function(){
    
    
    
    var window = $(window);
    var form = $('form');
    var textArea = $('textarea');
    var send = form.find('input[type="submit"]');
    var url = 'http://hticssu.com/php/add_message.php';
    
    
    function resetForm (){
        $('form').find('input , text-area').val(' ');
        send.attr('disabled' , 'disabled');
        location.reload();
    }
    
    //Golabl Options for toastr
    toastr.options = {
           "closeButton": true,
           "debug": false,
           "newestOnTop": false,
           "progressBar": true,
           "positionClass": "toast-top-full-width",
           "preventDuplicates": false,
           "onclick": null,
           "showDuration": "300",
           "hideDuration": "1000",
            "timeOut": "3000",
           "extendedTimeOut": "1000",
           "showEasing": "swing",
           "hideEasing": "linear",
           "showMethod": "fadeIn",
           "hideMethod": "fadeOut"
       }
           
    //Show tips For password input 
    form.find('#idnumber').on({
        focus : function(){
        toastr["info"]("Your Id Number Should Consist 8 numbers And shouldn't contanin any char", "Tip");
            send.removeAttr('disabled');
        },
        blur : function(){
            var id = $(this).val();
            if(id.length < 8 || id.length > 8 ){
            toastr["error"]("Your Id Number Should Consist 8 numbers And shouldn't contanin any char", "Wrong Data");
            send.attr('disabled' , 'disabled');
            }
            else {toastr.remove()}
            send.removeAttr('disabled');
        }
    });
    
    
    form.find('#username').on({
        focus : function(){
            toastr["info"]("You Can only  or Any signs ,, You Should Enter Your Real name", "tip")
            send.removeAttr('disabled');
    },
        blur : function(){
        var name = $(this).val();
            if($.isNumeric(name) || name == null || name == ""){
            toastr["error"]("Your Username  Should Be Real WithOut Any numbers Or Any strange sign and shouldn't be Empty", "Wrong Data");
            send.attr('disabled' , 'disabled');
            }
            else{toastr.remove()}
            send.attr('enabled')
        }
    });
    
    form.find('#email').on({
       focus : function(){
           toastr['info']('You Should Enter Valid Email That Consist of "name" "domain" & "@" sign', 'Tip');
            send.attr('disabled' , 'true');
       },
        blur : function(){
            var domains = [
                'yahoo.com' ,
                'gmail.com',
                'outlook.com'
            ]
            var email = $(this).val();
            var domain = email.split('@'); 
            if (domains.indexOf(domain[1]) >= 0) {
                toastr.remove();
                send.attr('enabled');
            }else {
                 toastr['error']('You Should Enter Email With Valid Domain' , 'Wrong Data');
                  send.attr('disabled' , 'disabled');
            }
    }
    });
    
    textArea.on({
        focus : function(){
            toastr['info']('You Should Fill This area' , 'Tip');
            send.removeAttr('disabled');
        },
        blur : function(){
            if(textArea.val() == null || textArea.val() == ""){
            toastr['error']('You Shouldm\'t Let It Empty' , 'Wrond Data')
            send.attr('disabled' , 'disabled')
    }
        }
    })
    
    //Set Max Length for char in TextArea 
    var charMax = $('textarea').attr('maxLength');
    textArea.on('keyup', function(){
        var charVal = $(this).val().length; 
        var rem = charMax - charVal ;
        $('#rem').text(rem);
        if(rem == 1){
            textArea.blur();
        } 
    });
    
    
    //Show Password For user To ensure 
    $('#show-pass').on('click' , function(){
       if($(this).hasClass('show')){
           $(this).next('input').attr('type' , 'text');
           $(this).removeClass('show');
           $(this).children('i').removeClass('fa-eye').addClass('fa-eye-slash');
       } 
        else {
            $(this).next('input').attr('type' ,  'password');
            $(this).addClass('show');
            $(this).children('i').removeClass('fa-eye-slash').addClass('fa-eye')

        }
        
    });
    
    

    
//Get Value Of Inputs and Send it To database and Dashboard 
    $('form').on('submit',function(e){
       e.preventDefault();
    
       var formData = $(this).serialize();
            
       console.log(formData);
        
        var contactMessageRequest = $.post(url , formData , function(data , statue , xhr){
           console.log(xhr);
            if(xhr.responseText == 'Okii'){
                swal('Good Job!' , 'You Send message Successfully' , 'success');
                resetForm();
            }
            else {
               swal ('opps!!!!' , 'There is wrong happen' , 'error');
                resetForm();
            }
        });
        
           
//        var feedback = {
//        name : name ,
//        email : email ,
//        idnumber : idnumber ,
//        message : message
//        }
//        var url = 'http://hticssu.com/php/add_message.php';
//    
//    
//        $.ajax({
//            type : 'POST',
//            url : url ,
//            data : feedback ,
//            success : function(res){
//            
//                console.log(res);
//            },
//            fail : function(err){
//            console.log(err);
//            swal ('opps!!!!' , 'There is wrong happen' , 'error');
//            }
//           
//    });

   }); 
});


//Animate Effect With scrollabr (simple Parallex)
$(window).scroll(function(){
    var wScroll = $(this).scrollTop();
    $('#root-con header').css({
     'transform' :  'translate(' + wScroll / 50+ '% )' ,
    }); 
        
    $('#contact-us-describe article').css({
        'transform' : 'translate(' + wScroll / 80 + '%)' 
    })
    });