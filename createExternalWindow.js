function p(truc){
	console.log(truc);
}
function full_screen(p_this){
    let type = $(p_this).attr("attr_type_traj");
    //on recupère les paramètres (type traj, données);
    p(type);
    let str_page =
    "<?php"+
    "session_start();"+
    "unset($_SESSION['working']);"+
    "?>"+
    "<!DOCTYPE html>"+
    "<html lang='fr'>"+
        "<head>"+
	    "<meta charset='utf-8'>"+
        "<title>Trajectoires</title>"+
        "<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' integrity='sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO' crossorigin='anonymous'>"+        
        "<!-- Leaflet -->"+
        "<link rel='stylesheet' href='leaflet/leaflet.css'/>"+
        "<script src='leaflet/leaflet.js'></script>"+
        "<!-- plug-in leaflet -->"+
        "<!-- PolylineDecorator -->"+
        "<script src='PolylineDecorator/leaflet.polylineDecorator.js'></script>"+
        "<!-- JQuery -->"+
        "<script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script>"+
        "<!-- Bootstrap -->"+
        "<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js' integrity='sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy' crossorigin='anonymous'></script>"+
        "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css'>"+
        "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>"+
        "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js'></script>"+
        "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous'>"+
        "<!-- Materialize -->"+
        "<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>"+
        "<!-- CSS Persos -->"+
        "<link rel='stylesheet' href='styles.css'>"+
        "<link rel='stylesheet' href='styles_fenetre_fullscreen.css'>"+
    "</head>"+
    "<body>"+
        "<div class='fenetre_fullscreen' attr_type_traj='"+type+"'>"+
            "<div class='bouton_reduire_menu' onclick='reduire_menu(this)'><div class='logo_reduire_menu'><img src='Images/Icons/chevron-left.svg'></div></div>"+
            "<div class='menu_boite'>"+
                "<div class='titre_boite'>"+
                    "<strong>"+type+"</strong>"+   				
                "</div>"+
                "<div class='menu_choix_traj fullscreen'>"+
                    "<div class='label_select_trajectory'>Select Trajectory</div>"+
                    "<ul class='list_traj fullscreen' attr_fullscreen='true' attr_type='"+type+"'>"+
                        "<li class='bouton_select_all-none' onclick=selectAll(this)><i class='material-icons'>check_box</i><div class='label_select_traj'>: All</div></li>"+
                        "<li class='bouton_select_all-none' onclick=unselectAll(this)><i class='material-icons'>check_box_outline_blank</i><div class='label_select_traj'>: None</div></li>"+
                        "<li class='unselectable li_search'><input type='text' placeholder='Search' class='input_bouton-select_traj' onkeyup=search(this)></li>"+
                        "<li class='unselectable li_separator'></li>"+
                    "</ul>"+                        
                "</div>"+
            "</div>"+
            "<div class='map'>"+
                "<div id='map_"+type+"' class='div_map' attr_type_traj='"+type+"'></div>"+
            "</div>"+
        "</div>"+           
    "</body>"+
    "<script src='scriptExtWind.js'></script>";

	window.open('full_screen.php', '_blank').document.write(str_page);
}