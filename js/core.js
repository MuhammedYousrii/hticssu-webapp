const publicMethods =  function (){
    this.data = null ;
    this.statue = null ;
    this.xhr = null ;
    this.imageHeight = null ;
    this.imageWidth = null ;
    this.targetPage = null ;
    this.itemID = null ;
    this.coursePlateform = null ;
    this.jsonApi = 'http://hticssu.com/php/get_all.php';
    this.elementType = null;
    this.itemsLength = null ;
    this.pageSize = null ;
    this.perPage = null ;
};


publicMethods.prototype.constructor = publicMethods ;

publicMethods.prototype.getRequestDetail = function(data , statue , xhr , callback){
    /*Check If Arguments null or has value*/
    if  (data || data !== null && statue || statue !== null && xhr  || xhr !== null){
        this.data = data ;
        this.statue = statue ;
        this.xhr = xhr  ;
        
        if(this.xhr.status == 200){
            console.log('request Sended at  : ' + this.statue + ' mode </br>');
            if(callback){
            callback('Load Data SccusseFully From Servers', false);
            }
            return true ;
        }
        else {
            if(callback){
                callback( false  , 'Error When Fetch Data From Server');    
            }
            
        }
    }
    
    return false ;
}

publicMethods.prototype.showStatueMessage = function(success , error){
    if(success){
        console.log('MissionDone -- ' + success);
        return true ;
    }
    else {
        console.log('error' + error);
    }
}

publicMethods.prototype.equalSize = function(itemOne , itemTwo){
    if(this.isValueThere(itemOne) && this.isValueThere(itemTwo)){
        this.imageHeight = $(itemOne).height();
        this.imageWidth = $(itemOne).width();
            $(itemTwo).width(this.imageWidth);
            $(itemTwo).height(this.imageHeight);
        
        return true ;
    }
    
    return false ;
}

publicMethods.prototype.isValueThere = function(element){
    return  element !== null ;
}

publicMethods.prototype.goInnerPage = function(coursePost , targetHtmlPage , itemID , coursePlateform){
    if (this.isValueThere(targetHtmlPage) &&  this.isValueThere(itemID) ){
        this.targetPage = targetHtmlPage ;
        this.itemID = itemID ;    
        
        
        if(coursePost){
        this.coursePlateform = coursePlateform ;
        localStorage.setItem('ide_value' , this.coursePlateform);
    }
    
    
        localStorage.setItem('idx_value' , this.itemID);
        window.location.href = this.targetPage ;
        return true ;
    }
    
    return false ;
}

publicMethods.prototype.inherit =  function (childObject, parentObject) {
	    var copyOfParent = Object.create(parentObject.prototype);
	    copyOfParent.constructor = childObject;
	    childObject.prototype = copyOfParent;
	}

publicMethods.prototype.pagniation = function (length , per_page){
            var numOfBlocks = $('.result-number'),
                numOfPages = $('.pages-num'),
                pages_number = Math.round(length / per_page ),
                pageination =  1 ;            
            
            // append Data inide selecting elements 
            numOfBlocks.text(length);
            numOfPages.text(pages_number);
            if(length == per_page){
                return false ;
            }else if ( '1' === 1) {
                return false ;
            }else{
                 do {
                
                    var li = $('<li></li>').attr({
                        'data-toggle' : 'tooltip',
                        'data-placement' : 'right',
                        'title' : 'more Five Courses' ,
                        'data-end' : length ,
                    });
                    var start = length-= per_page ;
                    var span_list_item = $('<span></span>').addClass('list-item').text(Math.round(pages_number));
                    li.attr({
                        'data-start' : start ,
                        'data-page-num' : pages_number 
                    }).append(span_list_item);
                    pages_number-- ;
                    $('.pagenaiton-slider ul').prepend(li);
                }
                while (pageination <= pages_number);
            }
            
            
           
        }

publicMethods.prototype.basicView = function(check, agentVal , elementsList , listName){
    var counter ;
    var proFunction = check;
    this.perPage = agentVal ;
    proFunction();
    $('[data-toggle="tooltip"]').tooltip().show();    
            
    for (counter = 0 ; counter < this.perPage ; counter++){
        var element = elementsList[counter];
        $('#'+ listName +' .row').append(element);
        this.equalSize('.row img' , '.row .overlay');
    }
};

publicMethods.prototype.listHandle =  function(list, listName) {
    var counter = 0 ;
    var listLenght = list.length ;
    if(counter == listLenght){
        $('.detailed-list').find(listName).text('No Data avaliable To show In This Section');
        return false ;
    }
    else {
        while (counter < listLenght) {
        var li = $('<li class="' + counter + '"></li>').text(list[counter]);
        $('.detailed-list').find(listName).append(li);
        counter++
        }
    }
   
}

publicMethods.prototype.scrollMethod = (stopPoint , dir) => {
    var scroll = window.pageYOffset ;
    var id = setInterval(()=>{
        if(dir == 'pos'){
            scroll += 10 ;
        }else {
            scroll -= 10 ;
        }
        
        window.scroll(0 , scroll);
        if(scroll == stopPoint){
            clearInterval(id);
        }
    },0.1)
}


const ps = new publicMethods();
const golpes = (function(){
    const jsonApi = 'http://hticssu.com/php/get_all.php' ,
          post_type = {
              course : 'course' ,
              event : 'event' ,
              blog : 'blog' ,
              new : 'new' ,
              hti :'hti_material' ,
              slider : 'slider',
              profs : 'prof',
              sources : 'material-sources'
          };
    
    var idxValue = localStorage.getItem('idx_value'),
        ideValue = localStorage.getItem('ide_value'),
        currentPageUrl = window.location.pathname;
    
    return  {
        a : jsonApi ,
        t : post_type ,
        d : idxValue ,  
        e : ideValue ,
        c : currentPageUrl ,
    }
})();


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
    
                
