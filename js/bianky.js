//Helper Methods In Class hust Like Creating Element

var BiankyEditorHelperMethods = (function(){
    
    //Create Sub Modules 
    var linkModule = linkModule || {},
        imageModule = imageModule || {}, 
        codeModule = codeModule || {},
        createBiankyView = createBiankyView || {};
    
    
    
    var customModal = $('.bianky-modal');
    var formGroup1 = customModal.find('#modal-form').children('.form-group').first();
    var formGroup2 = customModal.find('#modal-form').children('.form-group').eq(1);
    var extrnalFormGroup = customModal.find('#modal-form').children('.form-group').last();
    
    
    
    
    var linkurl ,
        linkname ,
        imageUrl ,
        imageAlt ,
        imageAlignment,
        codeName ;
    
    
    
    createBiankyView.controllerinfo = {
        'buttons' : [
            {
                'bold' : '<i class="fa fa-bold " aria-hidden="true"></i>',
                'italic' : '<i class="fa fa-italic fa-lg" aria-hidden="true"></i>',
                'underline' : '<i class="fa fa-underline " aria-hidden="true"></i>',
                'strikeThorough' : '<i class="fa fa-strikethrough" aria-hidden="true"></i>',
                'delete' : '<i class="fa fa-eraser " aria-hidden="true"></i>',
                'false' : 'none' ,
                'font-size' : 'font-size' ,
                '1' : 'size One',
                '2' : 'size Two',
                '3' : 'size Three',
                '4' : 'size four',
                '5' : 'size five',
                '6' : 'size six',
                'justifyLEft' : '<i class="fa fa-align-left" aria-hidden="true"></i>',
                'justifyCenter' : '<i class="fa fa-align-center" aria-hidden="true"></i>',
                'justifyRight' : '<i class="fa fa-align-right" aria-hidden="true"></i>',
                'justifyFull' : '<i class="fa fa-align-justify" aria-hidden="true"></i>',
                'indent' : '<i class="fa fa-indent" aria-hidden="true"></i>',
                'outdent' : '<i class="fa fa-outdent" aria-hidden="true"></i>',
                'copy' : '<i class="fa fa-clipboard " aria-hidden="true"></i>',
                'CreateLink' : '<i class="fa fa-link " aria-hidden="true"></i>' ,
                'insertImage' : '<i class="fa fa-file-image-o" aria-hidden="true"></i>',
                'code' : '<i class="fa fa-code" aria-hidden="true"></i>',
                'InsertOrderedList' : '<i class="fa fa-list-ol" aria-hidden="true"></i>', 
                'InsertUnorderedList' : '<i class="fa fa-list-ul" aria-hidden="true"></i>',
                'code' : '<i class="fa fa-code" aria-hidden="true"></i>',
                'cut' : '<i class="fa fa-scissors" aria-hidden="true"></i>',
                'undo' : '<i class="fa fa-undo" aria-hidden="true"></i>' ,
                'redo' : '<i class="fa fa-repeat" aria-hidden="true"></i>' , 
                '#EC595E' : 'dim-Red'
            },
            
            {
                'bold' : 'Write In Bold style',
                'italic' : 'Write In italic style',
                'underline' : 'write words with underline',
                'justifyLEft' : 'Alignment Left',
                'justifyCenter' : 'Alignment Center' ,
                'justifyRight' : 'Alignment Right' ,
                'justifyFull' : 'Alignment Full' ,
                'delete' : 'delete Last Char',
                'copy' : 'copy current Text',
                'cut' : 'Cut Selected Content',
                'InsertOrderedList' : 'Insert Orderd-list',
                'InsertUnorderedList' : 'Insert un Orderd-list',
                'CreateLink' : 'Insert Link ',
                'insertImage' : 'Insert Image',
                'code' : 'Insert Programming Code',
                'indent' : 'Tab Right',
                'outdent' : 'Tab left',
                'undo' : 'Undo Last Move' ,
                'redo' : 'Redo Last Move'
                
            }
            
        ]
    }
    
    createBiankyView.selectList = function  (itemControlValue , list , counter){
        var getIcon = createBiankyView.controllerinfo.buttons[0][""+itemControlValue[counter]+""];
        var selectItem = $('<option></option>').attr({
            'value' : itemControlValue[counter] ,
            'data-control' : itemControlValue[counter] 
        }).text(getIcon); 
        list.children('select').append(selectItem);
    }
    

    createBiankyView.normalList = function(itemControlValue , list , counter){
        var getIcon = createBiankyView.controllerinfo.buttons[0][""+itemControlValue[counter]+""];
        var getToolTip = createBiankyView.controllerinfo.buttons[1][""+itemControlValue[counter]+""];  
        var ControlButton = $('<a></a>').append(getIcon).addClass('btn binaky-btn').attr({
            'id' : itemControlValue[counter] ,
            'data-control' : itemControlValue[counter] ,
            'data-toggle' : 'tooltip' ,
            'data-placement' : 'top' ,
            'title' : getToolTip
        }); 
        
         list.append(ControlButton);
    }
    
    createBiankyView.createControlbar = function  (controlContainer , blockUl ,  controlValue , listType){
        var index ;
        if (listType == 'bianky-inpur-box'){
            alert('a7a');
        }
        for (index = 0 ; index < controlValue.length ; index++){
            if(listType == 'normal-bianky-list'){
                createBiankyView.normalList(controlValue , blockUl , index);
            }
            else {
                createBiankyView.selectList(controlValue , blockUl , index);
            }
        }
        
        $(controlContainer).append(blockUl);
        $('[data-toggle="tooltip"]').tooltip().show();
        return 'Mission done' ;
    }
    
    
    function OpenModal (commandType){
        customModal.addClass('active');
        customModal.find('.form-group').empty();
        customModal.find('#modal-form').attr('data-type' , commandType);
    };
    function closeModal(){
        customModal.removeClass('active');
        customModal.removeAttr('data-type');
    }
    
    linkModule.createView = {
         linkurlLable : $('<label></label>').addClass('.normal-label').text('Modal Link Input').attr('for' , 'modal-link-url'),
         linkurlBox : $('<input>').addClass('form-control urllink').attr({
            'placeholder' : 'EX : WWW.GOOGLE.COM',  
            'data-length' : '250' ,
            'data-focus' : '',
        }),
         linkNameLable : $('<label></label>').addClass('.normal-label').text('Modal Link Input').attr('for' , 'modal-link-name'),
         linkNameBox : $('<input>').addClass('form-control').attr({
            'placeholder' : 'hticssu.com',  
            'data-length' : '30' ,
            'data-focus' : '',
        })
          
    }
    linkModule.addLink = function (){
        formGroup1.append(linkModule.createView.linkurlLable).append(linkModule.createView.linkurlBox);
        formGroup2.append(linkModule.createView.linkNameLable).append(linkModule.createView.linkNameBox);
    };
    linkModule.getLinkVal = function(){
        linkurl = linkModule.createView.linkurlBox.val();
        linkname = linkModule.createView.linkNameBox.val();
        return '<a href="'+linkurl+'" target="_blank">'+linkname+'</a>';
    }
    
    
    imageModule.createView = {
        imageUrlLabel : $('<label></label>').addClass('.normal-label').text('Image Url ').attr('for' , 'bianky-editor-image-url'),
        imageUrlBox : $('<input/>').addClass('form-control urllink').attr({
            'placeholder' : 'Insert The Image Url',
            'data-length' : '250' ,
            'data-focus' : '',
        }),
        imageAltLabel : $('<label></label>').addClass('.normal-label').text('Image Alternative Text').attr('for' , 'bianky-editor-image-alt'),
        imageAltBox : $('<input/>').addClass('form-control headline').attr({
             'placeholder' : 'wtite The Image alternative Text ',
            'data-length' : '70' ,
            'data-focus' : '',  
        }),
        ImageAlignLabel : $('<label><label>').addClass('lg-label').text('Choose how This Image Would to be Alignment').attr('for' , 'bianky-editor-image-alignment'),
        checkBoxsOptions : '<label class="checkbox-inline"><input type="checkbox" id="inlineCheckbox1" value="center">Center</label>'
                           +'<label class="checkbox-inline"><input type="checkbox" id="inlineCheckbox2" value="left">Left</label>'
                            +'<label class="checkbox-inline"><input type="checkbox" id="inlineCheckbox3" value="right">Right</label ',
        
    }
    imageModule.addImage = function(){
        formGroup1.append(imageModule.createView.imageUrlLabel).append(imageModule.createView.imageUrlBox);
        formGroup2.append(imageModule.createView.imageAltLabel).append(imageModule.createView.imageAltBox);
        extrnalFormGroup.append(imageModule.createView.ImageAlignLabel).append(imageModule.createView.checkBoxsOptions);
    }
    imageModule.getImageVal = function(){
        imageUrl = imageModule.createView.imageUrlBox.val();
        imageAlt = imageModule.createView.imageAltBox.val();
        return  '<figure class="text-'+imageAlignment+'">'
                +'<img alt="'+imageAlt+'" src="'+imageUrl+'" class="img-responsive"/>'
                +'<figcaption>'+imageAlt+'</figcaption></figure>';
    }
    
    codeModule.createView = {
        progrmmingLanguageNameLabel : $('<label></label>').text('Name Of Language That Contain Code').attr({
            'for' : 'language-name' ,
            'class' : 'lg-label'
        }),
        programmingLanguageNameInput : $('<input>').addClass('form-control').attr({
          'placeholder' : 'Java Script' ,
          'data-length' : '25' ,
          'data-focus' : ''
        }),
    }
    codeModule.addCode = function(){
        formGroup1.append(codeModule.createView.progrmmingLanguageNameLabel).append(codeModule.createView.programmingLanguageNameInput);
    }
    codeModule.getCodeName = function(){
        codeName = codeModule.createView.programmingLanguageNameInput.val();
        return '<pre style= "background-color : #F6F6F6; margin : 10px auto ; border-left : 5px solid #002E3B; border-radius: 3px ;">'
                +'<h4 style="color : #EC595E ; background : #002E3B ; padding : 6px 4px">'+codeName+'</h4>'
                +'<code style="padding : 2px 4px;">'
                +'<strong style="color:#EC595E">Code Start</strong>.... <br/>'
                +'Your Code Go right here  .....' 
                +'<br/> <strong style="color :#EC595E;">code End<strong></code></pre>';
    }
    

    return {
        viewModule : createBiankyView.createControlbar ,
        openModal : OpenModal ,
        closeModal : closeModal ,
        linkControl : linkModule ,
        imageControl : imageModule ,
        codeControl : codeModule 
    };
	
})();





function biankyEditor (userConatiner, controllerBar , ControllersArray , formName , textareaname){

	this.container = false || userConatiner ; 
    this.controlpanel = false || controllerBar ;
	this.controllersButtons = null || ControllersArray;
    this.formName = null || formName ;
    this.vrTextArea = null || textareaname ;
    
}


biankyEditor.prototype.fireDesignMode = function(){
    var editor = this.container ;
    editor.document.designMode = 'On';
}

biankyEditor.prototype.biankyView = function(){
    var index ,
        indexj , 
        toolBar = $('<nav></nav>').addClass('align-default bianky-toolbar').attr('id' , this.controlpanel);
    //Append ToolBar Before Our Main iFrame
    $('#'+this.container.name+'').before(toolBar);
    
    
    for (index = 0 ; index < this.controllersButtons.length ; index++){
            
        var listClassName = this.controllersButtons[index][0],
            controllerButtons = this.controllersButtons[index][1],
            listType = this.controllersButtons[index][2],
            customBiankyList ;
            
            
        var controllerButtons = this.controllersButtons[index][1];
            
            
        if (listType == 'select-bianky-list'){
                customBiankyList = $('<div></div>').addClass('bianky-select-list').attr('data-select' , 'bianky-select');
                customBiankyList.append('<select></select>');
            }
        else if (listType == 'bianky-input-box'){
            customBiankyList = $('<input>').addClass('listsss').attr({
                'type' : 'color' ,
            })
        }
        else {
                customBiankyList = $('<ul></ul>').addClass('list-inline bianky-list '+this.controllersButtons[index][1]);
            }

        var returnedMessage = BiankyEditorHelperMethods.viewModule(toolBar , customBiankyList ,  controllerButtons , listType);    
        console.log(returnedMessage);
        }
}

biankyEditor.prototype.execCom = function (element , command){
    var commandType = command ;
    element.toggleClass('active');
    
    if (commandType == 'CreateLink'){
        BiankyEditorHelperMethods.openModal(commandType);
        BiankyEditorHelperMethods.linkControl.addLink();
    }
    else if (commandType == 'insertImage'){
        BiankyEditorHelperMethods.openModal(commandType);
        BiankyEditorHelperMethods.imageControl.addImage();
    }
    else if (commandType == 'code') {
        BiankyEditorHelperMethods.openModal(commandType);
        BiankyEditorHelperMethods.codeControl.addCode();
    }
    else {
         this.container.document.execCommand(commandType , false , null);
    }
} 

biankyEditor.prototype.controlModal = function(commandType){
    if (commandType == 'CreateLink'){
        var link = BiankyEditorHelperMethods.linkControl.getLinkVal();
        BiankyEditorHelperMethods.closeModal();
        this.container.document.execCommand( "insertHTML" , false , link);

    }
    
    else if (commandType == 'insertImage'){
        var image = BiankyEditorHelperMethods.imageControl.getImageVal();
        BiankyEditorHelperMethods.closeModal();
        this.container.document.execCommand("insertHTML" , false , image);
    }
    
    else if (commandType == 'code'){
        var codeBlock = BiankyEditorHelperMethods.codeControl.getCodeName();
        BiankyEditorHelperMethods.closeModal();
        this.container.document.execCommand('insertHTML' , false , codeBlock );
    }
    
    else {
        alert('You Choose Wrong Control ,, Or unExpected Erorr happen');
    }
}

//Cearte Api To Get Content Via Editor in Html Or Text Format
biankyEditor.prototype.getContent = function (formatType ){
    var editorBox = window.frames[''+this.container.name+''].document.body;
    var vrTextArea = document.createElement('textarea');
    vrTextArea.setAttribute('name' , this.vrTextArea);
    vrTextArea.setAttribute('class' , 'hidden');
    $('#'+this.container.name+'').after(vrTextArea);
    

    
    if (formatType == 'html') {
        var contentHtml =  editorBox.innerHTML;
        vrTextArea.value = contentHtml;
        console.log(vrTextArea.value);
        return contentHtml ;
    }
    else if (formatType == 'json'){
        var contentJson =  editorBox.innerHTML;
        vrTextArea.value = contentJson;
        return JSON.stringify(contentJson);
    }
    else {
        var contentText = editorBox.textContent ;
        vrTextArea.value = contentText;
        return contentText ;
    }
    
    
    
}














