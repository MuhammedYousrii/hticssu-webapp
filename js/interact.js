$(function(){var a=$("#add-material header");a.on("click",function(){const a=$(this),b=a.next("form"),c=a.children("span"),d=$("<i></i>").addClass("fa fa-chevron-up pull-right").attr("aria-hidden","true"),e=$("<i></i>").addClass("fa fa-chevron-down pull-right").attr("aria-hidden","true");a.hasClass("active")?(b.slideUp("slow"),c.html(d)):(b.slideDown("slow"),c.html(e)),a.toggleClass("active")})});



