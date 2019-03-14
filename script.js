function p(truc){
	console.log(truc);
}

/*Variables Globales*/
var tab_fenetre_red = Array();
/*FIN Variables Globales*/

var map = L.map('divmap');
map.setView([41.147519, -8.610814], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var map2 = L.map('divmap2');
map2.setView([41.147519, -8.610814], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map2);

var map3 = L.map('divmap3');
map3.setView([41.147519, -8.610814], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map3);



let myJSON = '{"DonneesBrut" : {"1" : {"positions" : [{"x":41.154473,"y":-8.644918,"date":"01/01/01"},{"x":41.166420,"y":-8.643001,"date":"02/01/01"},{"x":41.172972,"y":-8.625212,"date":"03/01/01"}]},"2" : {"positions" : [{"x":41.172103,"y":-8.605885,"date":"04/01/01"},{"x":41.162420,"y":-8.607168,"date":"05/01/01"},{"x":41.153670,"y":-8.604588,"date":"06/01/01"}]},"3" : {"positions" : [{"x":41.149048,"y":-8.585653,"date":"07/01/01"},{"x":41.156342,"y":-8.594473,"date":"08/01/01"},{"x":41.153428,"y":-8.610291,"date":"09/01/01"},{"x":41.155698,"y":-8.621481,"date":"10/01/01"}]}}}';


let myNewJSON = JSON.parse(myJSON);
var latlngs = new Array();

var i=1;

while(1){
	if (typeof myNewJSON.DonneesBrut[i] === 'undefined'){
		break;
	}
	latlngs[i-1] = new Array();
	for(var j=0 ; j<myNewJSON.DonneesBrut[i].positions.length ; j++){
		latlngs[i-1][j] = [myNewJSON.DonneesBrut[i].positions[j].x, myNewJSON.DonneesBrut[i].positions[j].y];
	}

	i++;
}

var polyline = L.polyline(latlngs, {color: 'blue', weight:4}).addTo(map);

// function reduire(div_reduire){

// 	//on recupère la div fenetre
// 	let obj_reduire = $(div_reduire);
// 	let obj_fenetre = obj_reduire.parent().parent();

// 	//on récupère le type de trajectoire
// 	let type_traj = obj_fenetre.attr("attr_type_traj");
// 	p(type_traj);

// 	//on cherche la div footer correspondante et on change sa couleur
// 	let div_footer = $("#footer>div").filter("[attr_type_traj='" + type_traj + "']");
// 	div_footer.addClass("onglet_fenetre_reduit");

// 	//on cache la div fenetre
// 	obj_fenetre.parent().hide();
// }

function reduire(div_red){

	//on recupere la fenetre
	let obj_fenetre = $(div_red).parent().parent();
	// p(obj_fenetre);
	//on recupere le type traj
	let type_traj = obj_fenetre.attr("attr_type_traj");
	// p(type_traj);
	//on recupere l'indice de la fenetre
	let indice_fenetre = obj_fenetre.parent().attr("indice");
	// p(indice_fenetre);

	//on chnage la couleur de la barre de tache
	p("[attr_type_traj='" + type_traj + "']");
	let onglet_fenetre = $(".onglet_fenetre").filter("[attr_type_traj='" + type_traj + "']");
	onglet_fenetre.removeClass("couleur_onglet");
	onglet_fenetre.addClass("onglet_fenetre_reduit");

	//on recupere toute les fenetres
	let tab_fenetre = $(".body_boite");
	// p(tab_fenetre);

	//on stock la fenetre dans la var globale
	tab_fenetre_red.push(obj_fenetre);
	
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
	// p(tab_fenetre_red);
}

// function initFenetreLeaflet(ind_map){
// 	let map_add = L.map(ind_map);
// 	map_add.setView([41.147519, -8.610814], 13);
// 	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map_add);
// }

function agrandire(div_footer){

	//on récupère le type
	let obj_footer = $(div_footer);
	let type_traj = obj_footer.attr("attr_type_traj");

	//on récupère la fenetre correspondante
	let obj_fenetre = $(".map_fenetre").filter("[attr_type_traj='" + type_traj + "']");

	//on l'affiche
	obj_fenetre.parent().show();

	//on retire la couleur du footer
	obj_footer.removeClass("onglet_fenetre_reduit");
}