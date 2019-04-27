function p(truc){
	console.log(truc);
}
/* variables globales */

//type
var type = $(".fenetre_fullscreen").attr("attr_type_traj");

//données
var data = new Array();

//map leaflet
var global_map = L.map('map_'+type);
//tab polylines
var global_polylines = new Array();
//tab polyline decorators
var global_decorators = new Array();

//array of all polyline
var global_all_polyline = new Array();
/* FIN variables globales */

function genereListeTrajectoires(p_type,p_fullscreen=false){

	// verif s'il s'agit d'un pattern
	let isPattern = true;
	let str_fullscreen ="";
	if(p_fullscreen){
		str_fullscreen = "_fullscreen";
	}
	if(p_type==="raw"){
		isPattern = false;
	}
	let tab_traj=data[p_type];
	if(tab_traj){//verif si la colonne json existe
		
		//on recherche la liste correspondante
		let list = $(".list_traj").filter("[attr_type='"+p_type+"']").filter("[attr_fullscreen='"+p_fullscreen+"']");

		for(let obj_id in tab_traj){
			//generation d'une couleur aléatoire
			let letters = '0123456789ABCDEF';
			let color = '#';
			for (let i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			//icon material-icon
			let icon = $("<i class='material-icons'>check_box_blank</i>");
			/* /!\ bug d'affichage du material-icon, chnagement de width pour ocrriger /!\ */
			icon.css("max-width","25px").css("max-height","25px");
			//label
			let label = $("<div></div>").addClass("label_select_traj").html(obj_id);

			//generation de la li
			let li = $("<li></li>");
			//attribut
			li.attr("attr_id",obj_id);
			li.attr("attr_color",color);
			li.attr("onclick","hideShowTraj(this)");
			//classes
			li.addClass("li_select_traj selected");
			//ajout icon et label
			li.append(icon);
			li.append(label);

			//ajout a la liste
			list.append(li);

			//affichage de la traj
			generePolyline(p_type,obj_id,color,isPattern,p_fullscreen);
		}

		//fait concorder la map avec l'ensemble des traj
		// global_tabMap["map_"+p_type+str_fullscreen].setView(global_tab_all_polyline[p_type+str_fullscreen][0][0],13);
		global_map.fitBounds(L.polyline(global_all_polyline).getBounds(),{
			maxZoom : 13,
		});
	}
}

function generePolyline(p_type_traj,p_id_traj, p_color_traj,p_isPattern,p_fullscreen){


	//fullscreen
	let str_fullscreen = "";
	if(p_fullscreen){
		str_fullscreen="_fullscreen";
	}

	
	//verif s'il s'agit d'un patern
	if(p_isPattern){//Methode de generation des patterns

		let latlngs = new Array();

		var objet_src_trgt = new Array();

		objet_src_trgt[0] = data[p_type_traj][p_id_traj].source_id;
		objet_src_trgt[1] = data[p_type_traj][p_id_traj].target_id;

		latlngs.push([data.clusters[objet_src_trgt[0]].lat, data.clusters[objet_src_trgt[0]].lon]);
		latlngs.push([data.clusters[objet_src_trgt[1]].lat, data.clusters[objet_src_trgt[1]].lon]);
		global_all_polyline.push(latlngs);

		global_polylines[p_id_traj]=L.polyline(latlngs, {
			color: p_color_traj,
			weight:3,
			clickable:true,
			attr_id:p_id_traj,
		});

		global_polylines[p_id_traj].addTo(global_map);

		var dateDebut = new Date(data[p_type_traj][p_id_traj].start_date / 1000000);
		dateDebut = dateDebut.toLocaleString();
		var dateFin = new Date(data[p_type_traj][p_id_traj].end_date / 1000000);
		dateFin = dateFin.toLocaleString();

		global_polylines[p_id_traj].on('click', function(event) {

			let popupContent = 
			"<div class='popup_content'>"
			+ "<div class='popup_infos'><div class='popup_labels'>id : </div> " + event.sourceTarget.options.attr_id + "</div>"
			+ "<div class='container_textInfoTraj'><div class='popup_labels'>Infos :</div> Objects : " + data[p_type_traj][p_id_traj].objects.join(", ") + "</br>Start date : " + dateDebut + "</br>End date : " + dateFin + " </div>"
			+ "<div class='popup_boutonHide' onclick='hideTraj(this)' attr_id_traj='" + p_id_traj + "' attr_type_traj='" + p_type_traj + "' attr_fullscreen='" + p_fullscreen + "'>Hide this trajectorie</div>"
			+ "</div>";
			event.target.bindPopup(popupContent).openPopup();
		});

		global_decorators[p_id_traj] = L.polylineDecorator(global_polylines[p_id_traj], {
			patterns: [
				{
					offset: '100%',
					repeat: 0,
					symbol: L.Symbol.arrowHead({pixelSize: 5, polygon: false, pathOptions: {stroke: true}})
				}
			]
		});
  
		global_decorators[p_id_traj].addTo(global_map);
	}
	else{//Methode de generation des trajectoires simples
		let latlngs = new Array();
		let tab_traj=data[p_type_traj][p_id_traj].positions;
		for(let pos in tab_traj){
			latlngs.push([tab_traj[pos].lat,tab_traj[pos].lon]);
		}

		global_all_polyline.push(latlngs);
		global_polylines[p_id_traj]=L.polyline(latlngs, {
			color: p_color_traj,
			weight:3,
			clickable:true,
			attr_id:p_id_traj,
		});
    
		global_polylines[p_id_traj].addTo(global_map);
		global_polylines[p_id_traj].on('click', function(event) {
			let popupContent = 
			"<div class='popup_content'>"
			+ "<div class='popup_infos'><div class='popup_labels'>id : </div> " + event.sourceTarget.options.attr_id + "</div>"
			+ "<div class='container_textInfoTraj'><div class='popup_labels'>Infos :</div><textarea id='story' name='story' rows='5' cols='20'></textarea></div>"
			+ "<div class='popup_boutonHide' onclick='hideTraj(this)' attr_id_traj='" + p_id_traj + "' attr_type_traj='" + p_type_traj + "' attr_fullscreen='" + p_fullscreen + "'>Hide this trajectorie</div>"
			+ "</div>";
			
			event.target.bindPopup(popupContent).openPopup();
		});

		global_decorators[p_id_traj] = L.polylineDecorator(global_polylines[p_id_traj], {
			patterns: [
				{
					offset: '100%',
					repeat: 0,
					symbol: L.Symbol.arrowHead({pixelSize: 5, polygon: false, pathOptions: {stroke: true}})
				}
			]
		});

		global_decorators[p_id_traj].addTo(global_map);
	}
	

}


//affichage
function hideTraj(p_this){
	/**
	 * action : affiche ou cache la trajectoire correspondante
	 * trigger : au click du bouton "hide this trajectory" de la pop-up
	 */

	let id_traj = $(p_this).attr("attr_id_traj");
	let type_traj = $(p_this).attr("attr_type_traj");
	let is_fullscreen = $(p_this).attr("attr_fullscreen");
	let list_traj = $(".list_traj").filter("[attr_type='" + type_traj + "']").filter("[attr_fullscreen='" + is_fullscreen + "']");
	let li_traj = list_traj.find(".li_select_traj").filter("[attr_id='" + id_traj + "']");

	hideShowTraj(li_traj);
}


function hideShowTraj(div_li){
	/**
	 * action : affiche ou cache la trajectoire correspondante
	 * trigger : au click de la li de la liste des traj correspondantes
	 */

	let li = $(div_li);

	//verrif fullscren
	let is_fullscreen = li.parent().attr("attr_fullscreen");
	let str_fullscreen="";
	if(is_fullscreen==="true"){
		str_fullscreen="_fullscreen";
	}

	//affichage leaflet
	
	let type_traj = li.parent().attr("attr_type");
	let id = li.attr("attr_id");
	if(li.hasClass("selected")){//hide
		//polyline
		global_map.removeLayer(global_polylines[id]);
		//arrowHeader
		global_map.removeLayer(global_decorators[id]);
	}
	else{//show
		//polyline
		global_polylines[id].addTo(global_map);
		//arrowHeader
		global_decorators[id].addTo(global_map);
	}

	//chanagement de l'affichage de l'élement li
	toggleSelected(div_li);
}

function reduire_menu(div_reduire_menu){
	//on recupere le bon menu à réduire
	let menu = $(div_reduire_menu).parent().find(".menu_boite");
	
	
	if($(div_reduire_menu).hasClass("bouton_reduire_menu_actif")){//le menu est déjà réduit, on l'augmente
		menu.show();
		$(div_reduire_menu).removeClass("bouton_reduire_menu_actif");
		$(div_reduire_menu).children().empty().html("<img src='Images/Icons/chevron-left.svg'>");
	}
	else{//lon réduit le menu
		menu.hide();
		$(div_reduire_menu).addClass("bouton_reduire_menu_actif");
		$(div_reduire_menu).children().empty().html("<img src='Images/Icons/chevron-right.svg'>");
	}
	global_map.invalidateSize();
}
function toggleClassActive(p_this){
	$(p_this).toggleClass("bouton-select_traj_active");
}
//fin affichage

function recupJSON(p_type="raws"){
	$.ajax({
		url: "get_data.php?type=" + p_type, 
		success: function(result){
            initMaps();
            p(type+":");
            p(result);
            if(p_type === "raws"){
                data.raw = result;
                genereListeTrajectoires(type,true);
            }
            else{
                for(let obj in result){
                    data[obj] = result[obj];
                }
                genereListeTrajectoires(type,true);
            }
        },
        fail: function(){
            p("erreur ajax lors du chargement des données");
        }
    });
}
recupJSON();
recupJSON("patterns");
/* Ajout de class selected au li */
function toggleSelected(p_this){

	let li = $(p_this);
	let li_icon = li.children(".material-icons");
	if(li.hasClass("selected")){
		li.removeClass("selected");
		li_icon.html("check_box_outline_blank");
	}
	else{
		li.addClass("selected");
		li_icon.html("check_box");

	}
}
/* select All/None */
function selectAll(p_this){
	let bouton_selectAll = $(p_this);
	let tab_li = bouton_selectAll.siblings(".li_select_traj");
	for(let i=0;i<tab_li.length;i++){
		let div_li = $(tab_li[i]);
		if(!(div_li.hasClass("selected"))){
			hideShowTraj(div_li);
		}
	}
}
function unselectAll(p_this){
	let bouton_unselectAll = $(p_this);
	let tab_li = bouton_unselectAll.siblings(".li_select_traj");
	for(let i=0;i<tab_li.length;i++){
		let div_li = $(tab_li[i]);
		if(div_li.hasClass("selected")){
			hideShowTraj(div_li);
		}
	}
}

/* Search */
function search(p_this){
	let search_bar = $(p_this);
	let content = search_bar.val()
	let tab_li = search_bar.parent().siblings(".li_select_traj");
	for(let i=0;i<tab_li.length;i++){
		let li = $(tab_li[i]);
		let content_li = $(li).children(".label_select_traj").html();
		if(!(content_li.match(new RegExp(content,'i')))){
			li.hide();
		}
		else{
			li.show();
		}
	}
}
function initMaps(){
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}").addTo(global_map);
    global_map.setView([43.637069, 3.840364], 13);
}
