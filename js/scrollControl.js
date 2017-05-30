var moveDown = document.getElementById('move-down'),
    moveUp = document.getElementById('move-up');
   
moveDown.onclick = () =>{
    ps.scrollMethod(800 , 'pos');
}
moveUp.onclick = () =>{
    ps.scrollMethod(0 , 'neg');
}
window.onscroll = () => {
    var self = this ,
        scroll = self.pageYOffset ,
        hid = 'hidden';
    console.log(scroll);
    if (scroll >= 800){
        moveDown.className = hid;
        moveUp.className = 'nav-btn';
    } 
    else if (scroll <= 2000) {
        moveDown.className = 'nav-btn';
        moveUp.className = hid;
    }
    else {
        console.log('ahmed');
    }
}

