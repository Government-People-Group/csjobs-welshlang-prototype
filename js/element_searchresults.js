

function submitNewSearchSortOrder() {
    document.getElementById("results_sort_form").submit();
}

$(document).ready(function(){
    
    var resbutton = document.getElementById("refresh-sort-results-button");
    if (resbutton) {
        resbutton.style.display = "none";
    }
    
    var sselector = document.getElementById("id_search_params_selector");
    if(sselector) {
      sselector.className += sselector.className ? " toggle-search-selector" : "toggle-search-selector";
    }
    
    $("#id_search_selector_toggler").className += $("#id_search_selector_toggler").className ? " js-enabled-search-toggler" : "js-enabled-search-toggler";
      
    $("#id_search_selector_uparrow").hide();
    
    $("#id_search_selector_toggler").click(function(){
        
        if ( $("#id_search_params_selector").is(":visible") ) {
            $("#id_search_params_selector").hide();
            
            $("#id_search_selector_downarrow").show();
            $("#id_search_selector_uparrow").hide();
        } else {
            $("#id_search_params_selector").show();
            
            $("#id_search_selector_downarrow").hide();
            $("#id_search_selector_uparrow").show();
        }
        
    });
    
    $("#id_search_params_selector").hide();
    
});

