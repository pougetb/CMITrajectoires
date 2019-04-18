function p(truc){
	console.log(truc);
}


/* ---===Variables Globales===---*/

/* ---JSON--- */
//data : variable json contenant toutes les données

function recupJSON(type="raws"){
	$.ajax({
		url: "get_data.php?type=" + type, 
		success: function(result){
			if(type === "raws"){
				remplieData(result, true);
				saveButton();
				ajoutFichier();
				ajoutParam();
			}else{
				remplieData(result);
			}
	}});
}


var data = new Array();
function remplieData(p_json,is_raws=false){
	p(typeof p_json);
	if(is_raws){
		data.raw=p_json;
		genereListeTrajectoires("raw");
		genereListeTrajectoires("raw", true);
	}
	else{
		for(let obj in p_json){
			data[obj] = p_json[obj];
		}
		genereListeTrajectoires("convoy");
		genereListeTrajectoires("closedswarm");
		genereListeTrajectoires("convergent");
		genereListeTrajectoires("divergent");

		genereListeTrajectoires("convoy",true);
		genereListeTrajectoires("closedswarm",true);
		genereListeTrajectoires("convergent",true);
		genereListeTrajectoires("divergent",true);
	}

}

recupJSON();
recupJSON("patterns");

function saveButton(){
	var filenameDL = data.raw.filename + ".json";
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
	var dlAnchorElem = document.getElementById('downloadAnchorElem');
	dlAnchorElem.setAttribute("href", dataStr);
	dlAnchorElem.setAttribute("download", filenameDL);
}


/* ---tableau contenant les objets fenetres réduites--- */
var gloabl_tabFenetreReduite = Array();

/* ---Tab Polyline--- */

//global_tabPolyline : indexé  par le type_traj
var global_tabPolyline=new Array();

//global_tabPolyline[type_traj]["traj"] : contient les objets polylines, indéxé par leur id
//global_tabPolyline[type_traj]["decorator"] : contient les objets polylineDecorator, indéxé par les id des traj correspondantes
global_tabPolyline["raw"]=new Array();
global_tabPolyline["raw"]["traj"]=new Array();
global_tabPolyline["raw"]["decorator"]=new Array();

global_tabPolyline["closedswarm"]=new Array();
global_tabPolyline["closedswarm"]["traj"]=new Array();
global_tabPolyline["closedswarm"]["decorator"]=new Array();

global_tabPolyline["convoy"]=new Array();
global_tabPolyline["convoy"]["traj"]=new Array();
global_tabPolyline["convoy"]["decorator"]=new Array();

global_tabPolyline["divergent"]=new Array();
global_tabPolyline["divergent"]["traj"]=new Array();
global_tabPolyline["divergent"]["decorator"]=new Array();

global_tabPolyline["convergent"]=new Array();
global_tabPolyline["convergent"]["traj"]=new Array();
global_tabPolyline["convergent"]["decorator"]=new Array();

/* **fullscreen** */
global_tabPolyline["raw_fullscreen"]=new Array();
global_tabPolyline["raw_fullscreen"]["traj"]=new Array();
global_tabPolyline["raw_fullscreen"]["decorator"]=new Array();

global_tabPolyline["closedswarm_fullscreen"]=new Array();
global_tabPolyline["closedswarm_fullscreen"]["traj"]=new Array();
global_tabPolyline["closedswarm_fullscreen"]["decorator"]=new Array();

global_tabPolyline["convoy_fullscreen"]=new Array();
global_tabPolyline["convoy_fullscreen"]["traj"]=new Array();
global_tabPolyline["convoy_fullscreen"]["decorator"]=new Array();

global_tabPolyline["divergent_fullscreen"]=new Array();
global_tabPolyline["divergent_fullscreen"]["traj"]=new Array();
global_tabPolyline["divergent_fullscreen"]["decorator"]=new Array();

global_tabPolyline["convergent_fullscreen"]=new Array();
global_tabPolyline["convergent_fullscreen"]["traj"]=new Array();
global_tabPolyline["convergent_fullscreen"]["decorator"]=new Array();

/* ---FIN Tab Polyline--- */

//global_tabMap : contient les objets maps des différentes cartes
var global_tabMap=new Array();

global_tabMap["map_raw"] = L.map('map_raw');

global_tabMap["map_closedswarm"] = L.map('map_closedswarm');

global_tabMap["map_convoy"] = L.map('map_convoy');

global_tabMap["map_divergent"] = L.map('map_divergent');

global_tabMap["map_convergent"] = L.map('map_convergent');

/* **fulscreen** */
global_tabMap["map_raw_fullscreen"] = L.map('map_raw_fullscreen');

global_tabMap["map_closedswarm_fullscreen"] = L.map('map_closedswarm_fullscreen');;

global_tabMap["map_convoy_fullscreen"] = L.map('map_convoy_fullscreen');

global_tabMap["map_divergent_fullscreen"] = L.map('map_divergent_fullscreen');

global_tabMap["map_convergent_fullscreen"] = L.map('map_convergent_fullscreen');

/* ---===FIN variables globales===--- */





function initMaps(){
	/* **maps all traj** */
	global_tabMap["map_raw"].setView([41.147519, -8.610814], 12);
	L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}").addTo(global_tabMap["map_raw"]);
	
	global_tabMap["map_closedswarm"].setView([41.147519, -8.610814], 13);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(global_tabMap["map_closedswarm"]);
	
	global_tabMap["map_convoy"].setView([41.147519, -8.610814], 13);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(global_tabMap["map_convoy"]);
	
	global_tabMap["map_divergent"].setView([41.147519, -8.610814], 13);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(global_tabMap["map_divergent"]);
	
	global_tabMap["map_convergent"].setView([41.147519, -8.610814], 13);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(global_tabMap["map_convergent"]);

	/* **maps fullscreen** */
	global_tabMap["map_raw_fullscreen"].setView([41.147519, -8.610814], 12);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(global_tabMap["map_raw_fullscreen"]);

	global_tabMap["map_closedswarm_fullscreen"].setView([41.147519, -8.610814], 13);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(global_tabMap["map_closedswarm_fullscreen"]);
	
	global_tabMap["map_convoy_fullscreen"].setView([41.147519, -8.610814], 13);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(global_tabMap["map_convoy_fullscreen"]);
	 
	global_tabMap["map_divergent_fullscreen"].setView([41.147519, -8.610814], 13);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(global_tabMap["map_divergent_fullscreen"]);
	
	global_tabMap["map_convergent_fullscreen"].setView([41.147519, -8.610814], 13);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(global_tabMap["map_convergent_fullscreen"]);

}


function ajoutFichier(){
	$(".titre_fichier").append(data.raw.filename);
}

function ajoutParam(){
	var start = new Date(data.raw.start / 1000000);
	var end = new Date (data.raw.end / 1000000);
	var timestep = 15;
	var timestep_unit = "seconds";
	$(".param_fichier").html("Start date : " + start.toLocaleString() + " | End date : " + end.toLocaleString() + "</br> Timestep : " + timestep +" " + timestep_unit);

}


/* Test Leaflet Simon*/
function genereListeTrajectoires(p_type,p_fullscreen=false){

	// verif s'il s'agit d'un pattern
	let isPattern = true;
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
		// p("il s'agit d'un pattern");
		let latlngs = new Array();

		var objet_src_trgt = new Array();

		objet_src_trgt[0] = data[p_type_traj][p_id_traj].source_id;
		objet_src_trgt[1] = data[p_type_traj][p_id_traj].target_id;

		latlngs.push([data.clusters[objet_src_trgt[0]].lat, data.clusters[objet_src_trgt[0]].lon]);
		latlngs.push([data.clusters[objet_src_trgt[1]].lat, data.clusters[objet_src_trgt[1]].lon]);
		
		global_tabPolyline[p_type_traj+str_fullscreen]["traj"][p_id_traj]=L.polyline(latlngs, {
			color: p_color_traj,
			weight:3,
			clickable:true,
			attr_id:p_id_traj,
		});

		global_tabPolyline[p_type_traj+str_fullscreen]["traj"][p_id_traj].addTo(global_tabMap["map_" + p_type_traj+str_fullscreen]);

		var dateDebut = new Date(data[p_type_traj][p_id_traj].start_date / 1000000);
		dateDebut = dateDebut.toLocaleString();
		var dateFin = new Date(data[p_type_traj][p_id_traj].end_date / 1000000);
		dateFin = dateFin.toLocaleString();

		global_tabPolyline[p_type_traj+str_fullscreen]["traj"][p_id_traj].on('click', function(event) {

			let popupContent = 
			"<div class='popup_content'>"
			+ "<div class='popup_infos'><div class='popup_labels'>id : </div> " + event.sourceTarget.options.attr_id + "</div>"
			+ "<div class='container_textInfoTraj'><div class='popup_labels'>Infos :</div> Taxis : " + data[p_type_traj][p_id_traj].objects.join(", ") + "</br>Start date : " + dateDebut + "</br>End date : " + dateFin + " </div>"
			+ "<div class='popup_boutonHide' onclick='hideTraj(this)' attr_id_traj='" + p_id_traj + "' attr_type_traj='" + p_type_traj + "' attr_fullscreen='" + p_fullscreen + "'>Hide this trajectorie</div>"
			+ "</div>";
			event.target.bindPopup(popupContent).openPopup();
		});

		global_tabPolyline[p_type_traj+str_fullscreen]["decorator"][p_id_traj] = L.polylineDecorator(global_tabPolyline[p_type_traj+str_fullscreen]["traj"][p_id_traj], {
			patterns: [
				{
					offset: '100%',
					repeat: 0,
					symbol: L.Symbol.arrowHead({pixelSize: 5, polygon: false, pathOptions: {stroke: true}})
				}
			]
		});
  
		global_tabPolyline[p_type_traj+str_fullscreen]["decorator"][p_id_traj].addTo(global_tabMap["map_" + p_type_traj + str_fullscreen]);
	}
	else{//Methode de generation des trajectoires simples
		let latlngs = new Array();
		let tab_traj=data[p_type_traj][p_id_traj].positions;
		for(let pos in tab_traj){
			latlngs.push([tab_traj[pos].lat,tab_traj[pos].lon]);
		}
		
		global_tabPolyline[p_type_traj+str_fullscreen]["traj"][p_id_traj]=L.polyline(latlngs, {
			color: p_color_traj,
			weight:3,
			clickable:true,
			attr_id:p_id_traj,
		});
    
		global_tabPolyline[p_type_traj+str_fullscreen]["traj"][p_id_traj].addTo(global_tabMap["map_" + p_type_traj+str_fullscreen]);
		global_tabPolyline[p_type_traj+str_fullscreen]["traj"][p_id_traj].on('click', function(event) {
			let popupContent = 
			"<div class='popup_content'>"
			+ "<div class='popup_infos'><div class='popup_labels'>id : </div> " + event.sourceTarget.options.attr_id + "</div>"
			+ "<div class='container_textInfoTraj'><div class='popup_labels'>Infos :</div><textarea id='story' name='story' rows='5' cols='20'></textarea></div>"
			+ "<div class='popup_boutonHide' onclick='hideTraj(this)' attr_id_traj='" + p_id_traj + "' attr_type_traj='" + p_type_traj + "' attr_fullscreen='" + p_fullscreen + "'>Hide this trajectorie</div>"
			+ "</div>";
			
			event.target.bindPopup(popupContent).openPopup();
		});

		global_tabPolyline[p_type_traj+str_fullscreen]["decorator"][p_id_traj] = L.polylineDecorator(global_tabPolyline[p_type_traj+str_fullscreen]["traj"][p_id_traj], {
			patterns: [
				{
					offset: '100%',
					repeat: 0,
					symbol: L.Symbol.arrowHead({pixelSize: 5, polygon: false, pathOptions: {stroke: true}})
				}
			]
		});

		global_tabPolyline[p_type_traj+str_fullscreen]["decorator"][p_id_traj].addTo(global_tabMap["map_" + p_type_traj+str_fullscreen]);
	}
	

}

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
		global_tabMap["map_"+type_traj+str_fullscreen].removeLayer(global_tabPolyline[type_traj+str_fullscreen]["traj"][id]);
		//arrowHeader
		global_tabMap["map_"+type_traj+str_fullscreen].removeLayer(global_tabPolyline[type_traj+str_fullscreen]["decorator"][id]);
	}
	else{//show
		//polyline
		global_tabPolyline[type_traj+str_fullscreen]["traj"][id].addTo(global_tabMap["map_"+type_traj+str_fullscreen]);
		//arrowHeader
		global_tabPolyline[type_traj+str_fullscreen]["decorator"][id].addTo(global_tabMap["map_"+type_traj+str_fullscreen]);
	}

	//chanagement de l'affichage de l'élement li
	toggleSelected(div_li);
}

/* FIN Test Leaflet Simon*/

function reduire(div_red){

	//on recupere la fenetre
	let obj_fenetre = $(div_red).parent().parent().parent();
	//on recupere le type traj
	let type_traj = obj_fenetre.attr("attr_type_traj");
	//on recupere l'indice de la fenetre
	let indice_fenetre = obj_fenetre.parent().attr("indice");

	//on chnage la couleur de la barre de tache
	let onglet_fenetre = $(".onglet_fenetre").filter("[attr_type_traj='" + type_traj + "']");
	onglet_fenetre.removeClass("couleur_onglet");
	onglet_fenetre.addClass("onglet_fenetre_reduit");

	//on recupere toute les fenetres
	let tab_fenetre = $(".body_boite");
	// p(tab_fenetre);

	//on stock la fenetre dans la var globale
	gloabl_tabFenetreReduite.push(obj_fenetre);
	
	if(indice_fenetre == (tab_fenetre.length - 1)){
		//c'est le dernier element, on le display none
		obj_fenetre.parent().empty();
	}
	else{
		for(let i=indice_fenetre; i<(tab_fenetre.length - 1); i++){
			//colone a remplacer
			let col_cible = $(".fenetre_traj").filter("[indice='" + i + "']");
			//fenetre qui ira dans la colone a remplacer
			let fenetre_cible = $(".fenetre_traj").filter("[indice='"+ (parseInt(i)+1) + "']").children();

			col_cible.empty();
			col_cible.append(fenetre_cible);
		}
	}

	//on met l'attribut estVide au col vide
	var tab_col = $(".fenetre_traj");
	// p(tab_col);
	for(let i=0;i<tab_col.length;i++){
		if($(tab_col[i]).has("div").length){
			$(tab_col[i]).attr("attr_estVide","false");
		}
		else{
			$(tab_col[i]).attr("attr_estVide","true");
		}
	}
}

function agrandire(div_onglet){
	//on récupère le type
	let obj_onglet = $(div_onglet);
	if(!(obj_onglet.hasClass("onglet_fenetre_reduit"))){//fenetre déjà augmentée, on la réduit
		let type_traj = obj_onglet.attr("attr_type_traj");
		//recherche de la bonne fenetre
		let obj_bouton_reduire = $(".body_boite").filter("[attr_type_traj=" + type_traj + "]").find(".menu_boite").find(".menu_bouton_affichage").find(".bouton_reduire");
		reduire(obj_bouton_reduire);
		return;
	}
	let type_traj = obj_onglet.attr("attr_type_traj");

	//recherche de la bonne fenetre
	let obj_fenetre;
	for(let i=0; i<gloabl_tabFenetreReduite.length;i++){
		if(type_traj.localeCompare(gloabl_tabFenetreReduite[i].attr("attr_type_traj"))==0){
			obj_fenetre = gloabl_tabFenetreReduite[i];
		}
	}

	//on recupere l'indice de la fenetre
	let indice_fenetre = obj_fenetre.attr("attr_indice");

	//on recupere toute les fenetres
	let tab_fenetre = $(".body_boite");
	let indice_tab=0;
	let nb_fenetre = 0;
	let bool_place = false;
	while(nb_fenetre<tab_fenetre.length+1){

		let col_cible = $(".fenetre_traj").filter("[indice='" + (parseInt(nb_fenetre)) + "']");
		let temp_obj_fenetre = $(tab_fenetre[indice_tab]);
		// p("indice temp_obj_f:");
		// p(parseInt(temp_obj_fenetre.attr("attr_indice")));
		// p("temp_obj_f:");
		// p(temp_obj_fenetre);
		if(!bool_place){
			if((parseInt(temp_obj_fenetre.attr("attr_indice")) < indice_fenetre)){
				col_cible.empty();
				col_cible.append(temp_obj_fenetre);
				indice_tab++;
				nb_fenetre++;
			}
			else{
				col_cible.empty();
				col_cible.append(obj_fenetre);
				nb_fenetre++;
				bool_place=true;
			}
		}
		else{
			col_cible.empty();
			col_cible.append(temp_obj_fenetre);
			indice_tab++;
			nb_fenetre++;
		}
		
	}

	//on retire l'attribut estVide au col vide
	var tab_col = $(".fenetre_traj");
	for(let i=0;i<tab_col.length;i++){
		if($(tab_col[i]).has("div").length){
			$(tab_col[i]).attr("attr_estVide","false");
		}
		else{
			$(tab_col[i]).attr("attr_estVide","true");
		}
	}
	
	//on retire la couleur de l'onglet
	let onglet_fenetre = $(".onglet_fenetre").filter("[attr_type_traj='" + type_traj + "']");
	onglet_fenetre.removeClass("onglet_fenetre_reduit");
	onglet_fenetre.addClass("couleur_onglet");
}

//Fonctions menu boutons mouvement
function mouvement_haut(p_this){
	
	let obj_fenetre = $(p_this).parent().parent().parent();
	let obj_col = obj_fenetre.parent();
	let obj_type = obj_fenetre.attr("attr_type_traj");
	let col_indice = obj_col.attr("indice");

	//on verifie si la fenetre est au bord
	if(obj_col.attr("indice") == 0 || obj_col.attr("indice") == 1){
		return ;
	}

	//onrecupere la col cible à echanger
	let col_cible =  $(".fenetre_traj").filter("[indice='" + (parseInt(col_indice) - 2) + "']");
	if(col_cible.attr("attr_estVide")==="true"){
		return;
	}
	//on recupere la fenetre cible à echanger
	let fenetre_cible = col_cible.children();
	let type_cible = fenetre_cible.attr("attr_type_traj");
	//on met la fenetre dans la col cible
	col_cible.empty().append(obj_fenetre);
	//on met la fenetre cible dans la col
	obj_col.empty().append(fenetre_cible);


	//on remet les bon indices
	obj_fenetre.attr("attr_indice",(parseInt(col_indice) - 2));
	fenetre_cible.attr("attr_indice",col_indice);

	//on change de place les boutons footer
	let div_footer_cible = $(".onglet_fenetre").filter("[attr_type_traj='"+type_cible+"']");
	let div_footer_obj = $(".onglet_fenetre").filter("[attr_type_traj='"+obj_type+"']");
	let prev_footer_cible=div_footer_cible.prev();
	let prev_footer_obj=div_footer_obj.prev();
	if(prev_footer_cible.length==0){//pas de previous
		$("#footer").prepend(div_footer_obj);
	}
	else{
		div_footer_obj.insertAfter(prev_footer_cible);
	}

	if(prev_footer_obj.length==0){//pas de previous
		$("#footer").prepend(div_footer_cible);
	}
	else{
		div_footer_cible.insertAfter(prev_footer_obj);
		
	}
}

function mouvement_lateral(p_this){
	let obj_fenetre = $(p_this).parent().parent().parent();
	let obj_col = obj_fenetre.parent();
	let col_indice = obj_col.attr("indice");

	let col_cible;
	let fenetre_cible;
	//deplacement à droite
	if((parseInt(col_indice)%2) == 0){
		col_cible =  $(".fenetre_traj").filter("[indice='" + (parseInt(col_indice) + 1) + "']");
		if(col_cible.attr("attr_estVide")==="true"){
			return;
		}
		obj_fenetre.attr("attr_indice",(parseInt(col_indice) + 1));
		fenetre_cible = col_cible.children();	
		fenetre_cible.attr("attr_indice",(parseInt(col_indice)));
	}
	else{//deplacement à gauche
		col_cible =  $(".fenetre_traj").filter("[indice='" + (parseInt(col_indice) - 1) + "']");
		if(col_cible.attr("attr_estVide")==="true"){
			return;
		}
		obj_fenetre.attr("attr_indice",(parseInt(col_indice) - 1));
		fenetre_cible = col_cible.children();
		fenetre_cible.attr("attr_indice",(parseInt(col_indice)));
	}

	col_cible.empty().append(obj_fenetre);
	obj_col.empty().append(fenetre_cible);

	//on change de place les boutons footer
	let obj_type = obj_fenetre.attr("attr_type_traj");
	let type_cible = fenetre_cible.attr("attr_type_traj");
	let div_footer_cible = $(".onglet_fenetre").filter("[attr_type_traj='"+type_cible+"']");
	let div_footer_obj = $(".onglet_fenetre").filter("[attr_type_traj='"+obj_type+"']");
	let prev_footer_cible=div_footer_cible.prev();
	let prev_footer_obj=div_footer_obj.prev();
	if(prev_footer_cible.length==0){//pas de previous
		$("#footer").prepend(div_footer_obj);
	}
	else{
		div_footer_obj.insertAfter(prev_footer_cible);
	}

	if(prev_footer_obj.length==0){//pas de previous
		$("#footer").prepend(div_footer_cible);
	}
	else{
		div_footer_cible.insertAfter(prev_footer_obj);
		
	}

}

function mouvement_bas(p_this){
	let obj_fenetre = $(p_this).parent().parent().parent();
	let obj_col = obj_fenetre.parent();
	let col_indice = obj_col.attr("indice");
	if(obj_col.attr("indice") == 4 || obj_col.attr("indice") == 5){
		return ;
	}

	let col_cible =  $(".fenetre_traj").filter("[indice='" + (parseInt(col_indice) + 2) + "']");
	if(col_cible.attr("attr_estVide")==="true"){
		return;
	}
	let fenetre_cible = col_cible.children();

	col_cible.empty().append(obj_fenetre);
	obj_col.empty().append(fenetre_cible);

	obj_fenetre.attr("attr_indice",(parseInt(col_indice) + 2));
	fenetre_cible.attr("attr_indice",col_indice);

	//on change de place les boutons footer
	let obj_type = obj_fenetre.attr("attr_type_traj");
	let type_cible = fenetre_cible.attr("attr_type_traj");
	let div_footer_cible = $(".onglet_fenetre").filter("[attr_type_traj='"+type_cible+"']");
	let div_footer_obj = $(".onglet_fenetre").filter("[attr_type_traj='"+obj_type+"']");
	let prev_footer_cible=div_footer_cible.prev();
	let prev_footer_obj=div_footer_obj.prev();
	if(prev_footer_cible.length==0){//pas de previous
		// div_footer_obj.remove();
		$("#footer").prepend(div_footer_obj);
	}
	else{
		// div_footer_obj.remove();
		div_footer_obj.insertAfter(prev_footer_cible);
	}

	if(prev_footer_obj.length==0){//pas de previous
		// div_footer_cible.remove();
		$("#footer").prepend(div_footer_cible);
	}
	else{
		// div_footer_cible.remove();
		div_footer_cible.insertAfter(prev_footer_obj);
		
	}
}
//FIN Fonctions menu boutons mouvement

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

	//la taille à changer, on update mapleaflet
	//map leaflet correspondante
	let type_traj = "map_" + $(div_reduire_menu).parent().attr("attr_type_traj");
	global_tabMap[type_traj].invalidateSize();
}
function full_screen(){
	window.open('full_screen.html', 'window name', 'window settings');
}


/*MODIF*/
function toggleClassActive(p_this){
	$(p_this).toggleClass("bouton-select_traj_active");
}
/*FIN MODIF*/
// function initFenetreLeaflet(ind_map){
	// let map_add = L.map(ind_map);
	// map_add.setView([41.147519, -8.610814], 13);
// 	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}').addTo(map_add);
// }


/*--===Fonctions d'affichage===--*/

/* --Menu select traj--*/

/* Reverse bouton dropdown */
function reverse_dropdown(p_this){

	let bouton_choix_traj = $(p_this);

	//on recupere l'image
	let image_dropdown = bouton_choix_traj.children(".material-icons");

	//rotation de 180°
	image_dropdown.toggleClass("rotated-180");
}

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

initMaps();

/*FIX REFRESH FULLSCREEN MAP NAV*/
$(".nav_fullscreen").on("click",function(p_this){
	let type = $(p_this.currentTarget).attr("attr_type");
	let tab_page_content = $(".tab-content>.tab-pane");
	for(let i=0;i<tab_page_content.length;i++){
		$(tab_page_content[i]).hide();
	}
	$("#"+type).fadeIn(200,function(){
		for(let map in global_tabMap){
			global_tabMap[map].invalidateSize();
		}
	});
});
/*FIN FIX REFRESH FULLSCREEN MAP NAV*/
