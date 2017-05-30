//window.oncontextmenu = () => {
//        return false ;
//}
//window.onkeydown = (e) => {
//        if(e.keyCode == 123){return false;}else if(e.ctrlKey && e.shiftKey && e.keyCode == 73){return false;}
//    }
//
//
//

window.onload = function(){
    $('#loader .loader-icon , #loader h2').fadeOut(2000).promise().done(function(){
       $(this).parent().fadeOut(1000 , function(){
           $('#new').fadeIn();
       });
    });
}
