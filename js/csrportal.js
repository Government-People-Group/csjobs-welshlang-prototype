
function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
// http://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).ASPx
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

function isInternetExplorer6() {
    var ver = getInternetExplorerVersion();
    if ( (ver > -1) && (ver < 7.0) ) {
        return true;
    } else {
        return false;
    }
}

function csrClearDiv( setdivid ) {
    $(setdivid).html('');
    return 1;
}

function csrPortalQuery( jobsid, setdivid ) {
    
    var i;
    var divname;
    var divmessage;
    $("body").css("cursor","wait");
    $.post('/csr/portalquery.cgi',
        {
            SID:jobsid,
            querycleardivid:setdivid
        },
        function( data, status ){
            $("body").css("cursor","auto");
            if ( status === "success" ) {
            
                if( data.result === 'failed') {
                    alert(data.message);
                    return 1;
                }
                
                for ( i = 0; i < data.divupdates.length; i++) {
                    divname    = data.divupdates[i].divname;
                    divmessage = data.divupdates[i].divmessage;
                    $(divname).html(divmessage);
                }                
                
                // $(setdivid).html(data.divmessage);
                
            } else {
                // this is a server error ???
                alert("The service could not handle your request.");
                
            }
            
            return 1;
        }
    );
    
    return 1;
}

$(document).ready(function()
{       
        $(".topnavmenu").accessibleDropDown();
});

$.fn.accessibleDropDown = function ()
{
        var el = $(this);
        
        /* Setup dropdown menus for IE 6 */
        
        $("li", el).mouseover(function() {
            if ($(this).hasClass("fly_diag")){ 
                    // if you open a dialogue flyout, close any others
                    $('.fly_diag').removeClass("hover");
            }      
            $(this).addClass("hover");
        }).mouseout(function() {
                if ($(this).hasClass("register") && ($('#ID_email').val() || $('#ID_email').is(":focus"))){ 
                        // started to enter email, or focused there so mouseout should not trigger close
                } else if ($(this).hasClass("login") && ($('#ID_username').val() || $('#ID_username').is(":focus"))){
                        // entered or started to enter username
                } else {
                        $(this).removeClass("hover");
                }
        });
       
        
        /* Make dropdown menus keyboard accessible */
        
        $("a", el).focus(function() {
                if ( $(this).parents("li").hasClass("fly_diag")){
                        // if you open a dialogue flyout, close any others
                        $('.fly_diag').removeClass("hover");
                }
                $(this).parents("li").addClass("hover");
        }).blur(function() {
           if ($(this).hasClass("register") || $(this).hasClass("login")){
                // don't do anythign on blur as i have just tabbed into the form so don't hide it!
           } else {
                $(this).parents("li").removeClass("hover");
           }
        });

}

function submitFormWithValue( formname, valname, val ) {
    document.getElementById(valname).value = val;
    document.getElementById(formname).submit();
    return false;
}

function submitFormById( formname ) {
    document.getElementById(formname).submit();
    return false;
}


// use the chosen plugin to make multi-select lists nice
$(document).ready(function(){
  
    var multitextdefault = 'Enter one or more search criteria';
    if ( $('#id_chosen_placeholder_text_multiple').length ) {
      if ( $('#id_chosen_placeholder_text_multiple').val() === 'homepage') {
        multitextdefault = 'Search all';
      }
    }
    
    $(".search-select-list").chosen({
        inherit_select_classes: true,
        placeholder_text_multiple: multitextdefault,
        width: 'none' // this breaks it on purpose so css takes over for responsive design
    });
});   

// disable search or create alert until something is selected
$(document).ready(function(){
    if ($('#submitSearch').length){ // check if we are on a field with a submit button of appropriate class
        $('#postcodeinclusive').addClass('enableSearchField');
        checkSearchSubmitButton(); // check for prefilled values on page load
        $('form').on('keyup change', function() { // or when something changes
            checkSearchSubmitButton();
       });
    };
});


function checkSearchSubmitButton(){
    var hasValue = false;
    $('.enableSearchField').each(function() { // classname given to fields to be required to activate button
        if (($(this).attr('type') == 'checkbox' && $(this).attr('checked') == 'checked') || 
            ($(this).attr('type') != 'checkbox' && $(this).val() != '' && $(this).val() != 'NULL' && $(this).val())) {
            hasValue = true;
        }
    });
    if (hasValue) {
        $('#submitSearch').removeAttr('disabled');
    } else {
        $('#submitSearch').attr('disabled', 'disabled');
    }
}


