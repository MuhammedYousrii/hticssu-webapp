//Handle UpperNavgitaionBar With it static data
 const communityContactData = {
        textData : {
            address : 'The M Bulding Next to Small El 10 PoliceStation' ,
            phoneNumber : '01281476659',
            googleMail : 'info@hticssu.com',
        },
        
        linkedData : {
            facebookLink : 'https://www.facebook.com/HTI.SU.CS/?fref=ts',
            twitterLink : 'https://twitter.com/hti_cs' ,
            youtuebLink : 'https://Hti.Su.Cs@Gmail.Com'
        }
    }
 var upperNavControl = (function(){
        var upperNav = $('.root-header,.header').children('#upper-nav').find('#contact-data');
        upperNav.children('li').first().children('span').text(communityContactData.textData.address);
        upperNav.children('li').eq(1).children('span').text(communityContactData.textData.phoneNumber);
        upperNav.children('li').last().children('span').text(communityContactData.textData.googleMail);
        
        
        var upperNavOne = upperNav.next();
        upperNavOne.children('li').first().children('a').attr({
            'href' : communityContactData.linkedData.facebookLink,
            'target' : '_blank'  
        });
        upperNavOne.children('li').eq(1).children('a').attr({
            'href' : communityContactData.linkedData.twitterLink ,
            'target' : '_blank' 
        });
        upperNavOne.children('li').last().children('a').attr('href' , communityContactData.linkedData.youtuebLink);
        
    })();


    /*Load Static Footer At Every Single Page*/
    $('footer').load('footer.html')
    
    /*Include dependices For Footer*/
    $('head').append('<link rel="stylesheet" href="Css/lightbox.min.css" media="screen">');
    $('body').append('<script src="js/lightbox.min.js"></script>');

