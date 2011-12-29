
  var Searcher = {};
  Searcher.SearchPage = function() {
    // --- default values
    this.searchDefaultText = "Search on this page";
    this.startSearchingLength = 3;
    this.textWrapper = "#body";
    this.searchBoxWrapper = "#pageSearcher";
    this.searchBoxId = "pageSearcherTextBox";
    this.activeCssClass = "active";
    this.highlightCssClass = "highlight";
    
    // --- prive variables
    var originalText = "";
    
    // --- public methods
    this.getOriginalText = function() {
      return originalText;
    }
    
    this.init = function() {
      var instance = this;
      
      $(this.searchBoxWrapper).html('<input type="text" id="' + this.searchBoxId + '"/>');
      originalText = $(this.textWrapper).html();
      var searchBox = "#" + this.searchBoxId;
      
      $(searchBox).attr("value", this.searchDefaultText)
      .focus(function() {
        if (this.value == instance.searchDefaultText) {
          this.value = "";
          $(this).addClass(instance.activeCssClass);
        }
      }).
      blur(function() {
        if (this.value == "") {
          $(this).removeClass(instance.activeCssClass);
          this.value = instance.searchDefaultText;
        }
      }).
      keyup(function() {
        $(instance.textWrapper).html(instance.getOriginalText());
        //make sure that all div's are expanded/hidden accordingly
        setSectionsNSelections();
        if (this.value.length >= instance.startSearchingLength) {
          
          var searchText = escape(this.value);
          //Spaces are encoded, remove all space encoding and replace replace with a space character
          searchText = searchText.replace(/%20/g,' ');
          var regx = new RegExp("(" + searchText + ")", 'gi');
                 
          $(instance.textWrapper).each(function() {
            //Get the entire content between the <div id="body"> tag
            var text = $(this).html();
            //We should only deal with text not between tags
            var index=0;
            var currentIndex=index;
            var end=text.length;
            var stop=false;
            while(!stop && currentIndex!=-1 && currentIndex<text.length){
              index=text.indexOf("<",currentIndex);
              
              //There are no more < parens in the text
              if(index==-1){
                  stop=true;
              }
              //There is s a left paren
              else{
                  var closingTagCharIndex=text.indexOf(">",index);
                  var dontSearchText=text.substring(index,(closingTagCharIndex+1));
                  currentIndex=closingTagCharIndex;
                  //We are now at the closing greater than char
                  if(-1!=closingTagCharIndex){
                    
                      var prevIndex=index;
                      //find the next left less than char
                      index=text.indexOf("<",closingTagCharIndex);
                      
                      var substrToSearch = "";
                      //find where the next html tag begins
                      if(-1!=index){
                          currentIndex=closingTagCharIndex;
                          //index now points to the beginning of the next html tag
                          //closingTagCharIndex now points to the end of the previous html tag
                          substrToSearch=text.substring((closingTagCharIndex+1),index);
                          //Now highlight the substring properly with matched searches
                          substrToSearch = substrToSearch.replace(regx, '<span class="' + instance.highlightCssClass + '">$1</span>');
                          
                          //Now we have to get everything the flanks text area which we just highlighted 
                          var firstPart=text.substring(0,prevIndex);                     
                          var lastPart=text.substring(index);
                          
                          //Now sticth everything together
                          text=firstPart+dontSearchText+substrToSearch+lastPart;   
                          
                          currentIndex=(index-1);                  
                      }
                      //There are no more opening html tags
                      else{
                          var firstPart=text.substring(0,prevIndex); 
                          substrToSearch=text.substring(prevIndex);
                          substrToSearch = substrToSearch.replace(regx, '<span class="' + instance.highlightCssClass + '">$1</span>');
                          text=firstPart+substrToSearch;
                          stop=true;
                      }
                  } 
              }
            }
            $(this).html(text);
            processDetailsBtn(text);
          });
        
        }
        
      })
    }
  }
  
 //Get the text between commentStart and CommentEnd and see if there is at least one highlighted text
 //If there is, make sure that the area in sectionId is expanded 
function processADetailBtn(theText, commentStart, commentEnd, sectionId){
    var start_index=theText.indexOf(commentStart);
    var end_index=-1;
    var theSubstr='';
    var high_light_index=-1;
    
    if(-1!=start_index){
        end_index=theText.indexOf(commentEnd);
        if(-1!=end_index){
            theSubstr=theText.substring(start_index, end_index);
            high_light_index=theSubstr.indexOf('<span class=\"highlight\">');
            if(-1!=high_light_index){
                $("#"+sectionId).show();
                return true;
            }                        
        }
    }    
    return false;
}

//Get the text between commentStart and commentEnd and see if there is at least one highlighted text
//If there is, then make sure that the are in the selectionId is expanded
function processSelection(theText, commentStart, commentEnd, parentId, selectionId){
    var retVal=processADetailBtn(theText,commentStart,commentEnd,selectionId);
    if(retVal==true){
        $("#"+parentId).show();
        $("#"+selectionId).show();
    }  
}


function processDetailsBtn(theText){

    //process summary_form_btn
    processADetailBtn(theText,'<!--summary_form_btn_section START-->','<!--summary_form_btn_section END-->','summary_form');
    
    //process all_server_details_btn
    processADetailBtn(theText,'<!--all_server_details_section START-->','<!--all_server_details_section END-->','all_server_details');
    
    //process specific_server_details_btn
    processADetailBtn(theText,'<!--specific_server_details_section START-->','<!--specific_server_details_section END-->','specific_server_details');   
    
    //process specific_server_details_btn
    processADetailBtn(theText,'<!--available_flavors_section START-->','<!--available_flavors_section END-->','available_flavors');       

    //process available_flavors_section 
    processADetailBtn(theText,'<!--additional_details_section START-->','<!--additional_details_section END-->','additional_details');    
    
    //process available_flavors_details_section
    processADetailBtn(theText,'<!--available_flavors_details_section START-->','<!--available_flavors_details_section END-->','available_flavors_details');
    
    //process supported_extensions_section
    processADetailBtn(theText,'<!--supported_extensions_section START-->','<!--supported_extensions_section END-->','supported_extensions'); 
    
    //process generate_token_section
    processADetailBtn(theText,'<!--generate_token_section START-->','<!--generate_token_section END-->','generate_token');
    
    //process auth_user_name_req_xml_selection
    processSelection(theText,'<!--auth_user_name_req_xml_selection START-->','<!--auth_user_name_req_xml_selection END-->','generate_token','auth_user_name_req_xml');
    
    //process auth_user_name_req_json_selection
    processSelection(theText,'<!--auth_user_name_req_json_selection START-->','<!--auth_user_name_req_json_selection END-->','generate_token','auth_user_name_req_json');

    //process auth_user_name_req_xml_selection
    processSelection(theText,'<!--auth_token_req_xml_selection START-->','<!--auth_token_req_xml_selection END-->','generate_token','auth_token_req_xml');    

    //process auth_user_name_req_json_selection
    processSelection(theText,'<!--auth_token_req_json_selection START-->','<!--auth_token_req_json_selection END-->','generate_token','auth_token_req_json');

    //process auth_user_name_req_json_selection
    processSelection(theText,'<!--auth_resp_xml_selection START-->','<!--auth_resp_xml_selection END-->','generate_token','auth_resp_xml');

    //process auth_user_name_req_json_selection
    processSelection(theText,'<!--auth_resp_json_selection START-->','<!--auth_resp_json_selection END-->','generate_token','auth_resp_json');
    
    //process user_by_name_xml_selection
    processSelection(theText,'<!--user_by_name_xml_selection START-->','<!--user_by_name_xml_selection END-->','users','user_by_name_xml');    

    //process user_by_name_xml_selection
    processSelection(theText,'<!--user_by_name_json_selection START-->','<!--user_by_name_json_selection END-->','users','user_by_name_json');    

    //process user_by_name_xml_selection
    processSelection(theText,'<!--get_list_tenants_xml_selection START-->','<!--get_list_tenants_xml_selection END-->','tenants','get_list_tenants_xml');    

    //process user_by_name_xml_selection
    processSelection(theText,'<!--get_list_tenants_json_selection START-->','<!--get_list_tenants_json_selection END-->','tenants','get_list_tenants_json');    

    //process user_by_name_xml_selection
    processSelection(theText,'<!--get_tenants_by_name_xml_selection START-->','<!--get_tenants_by_name_xml_selection END-->','v2_tenants','get_tenants_by_name_xml');    

    //process user_by_name_json_selection
    processSelection(theText,'<!--get_tenants_by_name_json_selection START-->','<!--get_tenants_by_name_json_selection END-->','v2_tenants','get_tenants_by_name_json');    

}
 
function setSectionsNSelections(){
    //Hide all the necessary sections
    $("#summary_form").hide();
    $("#all_server_details").hide();
    $("#specific_server_details").hide();
    $("#available_flavors").hide();
    $("#additional_details").hide();
    $("#available_flavors_details").hide();
    $("#supported_extensions").hide();
    $("#generate_token").hide();
    $("#auth_user_name_req_json").hide();
    $("#auth_token_req_json").hide();
    $("#auth_resp_json").hide();
    $("#users").hide();
    $("#user_by_name_json").hide();
    $("#tenants").hide();
    $("#get_list_tenants_json").hide();
    $("#v2_tenants").hide();
    $("#get_tenants_by_name_json").hide();
    $("#v2_tenants").hide();
    
    //Make sure that the xml selections are selected
    $("#auth_user_name_req_select").val("xml");
    $("#user_by_name_select").val("xml");
    $("#get_tenants_by_name_select").val("xml");
}


function showSelected(selectorId, optionId){
    if(selectorId=='get_list_tenants_select'){
        if(optionId=='xml'){
            $("#get_list_tenants_json").hide();
            $("#get_list_tenants_xml").show();
        }
        else{
            $("#get_list_tenants_xml").hide();
            $("#get_list_tenants_json").show();                     
        }
    }
    else if(selectorId=='get_tenants_by_name_select'){
        if(optionId=='xml'){
            $("#get_tenants_by_name_json").hide();
            $("#get_tenants_by_name_xml").show();
        }
        else{
            $("#get_tenants_by_name_xml").hide();
            $("#get_tenants_by_name_json").show();                     
        }                  
    }
    else if(selectorId=='user_by_name_select'){
        if(optionId=='xml'){
            $("#user_by_name_json").hide();
            $("#user_by_name_xml").show();
        }
        else{
            $("#user_by_name_xml").hide();
            $("#user_by_name_json").show();                     
        }                  
    }    
    else if(selectorId=='auth_user_name_req_select'){
        if(optionId=='xml'){
            $("#auth_user_name_req_json").hide();
            $("#auth_user_name_req_xml").show();
        }
        else{
            $("#auth_user_name_req_xml").hide();
            $("#auth_user_name_req_json").show();                     
        }                   
    }              
    else if(selectorId=='auth_token_req_select'){
        if(optionId=='xml'){
            $("#auth_token_req_json").hide();
            $("#auth_token_req_xml").show();
        }
        else{
            $("#auth_token_req_xml").hide();
            $("#auth_token_req_json").show();                      
        }
    }  
    else if(selectorId=='auth_resp_select'){
        if(optionId=='xml'){
            $("#auth_resp_json").hide();
            $("#auth_resp_xml").show();
        }
        else{
            $("#auth_resp_xml").hide();
            $("#auth_resp_json").show();
        }
    }       
                  
} 


function toggleSelection(selectedId){
    var optionId =  $('#'+selectedId+ ' :selected').val();
    showSelected(selectedId,optionId);
}

  
function toggleDetailsBtn(event, btnId, toggleId, focusId){
    $("#"+toggleId).toggle();
    event.preventDefault();
    if($("#"+toggleId).is(":visible")){
        $("#"+focusId).focus();
    }
    else{
        $('#'+btnId).focus();
    }   
}