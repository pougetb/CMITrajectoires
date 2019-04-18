<?php
session_start();
unset($_SESSION["working"]);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<title>Trajectory viewer</title>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	

	<!-- Leaflet -->
	<link rel="stylesheet" href="leaflet/leaflet.css"/>
	<script src="leaflet/leaflet.js"></script>

	<!-- plug-in leaflet -->
	<!-- PolylineDecorator -->
	<script src="PolylineDecorator/leaflet.polylineDecorator.js"></script>

	<!-- JQuery -->
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>

	<!-- Bootstrap -->
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">


	<!-- Materialize -->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

	<!-- CSS Persos -->
	<link rel="stylesheet" href="styles.css">
	<link rel="stylesheet" href="styles_fenetre_fullscreen.css">

</head>

<body>
  
	<!-- nav bar -->
	<div class="">

		<ul class="nav nav-tabs">
			
			<!-- Menu des options -->
			<li class="onglet_options">
				<div class="label_nav_options">
					<img class="logo_nav_options" src="Images/Icons/file.svg">
					<div class="espace"> </div>
					<div>File</div>
				</div>

				<ul class="submenu">
					<li class="onglet_options">
						<div class="label_nav_options">
							<a href="#" data-toggle="modal" data-target="#openModal">Open</a>
						</div>
					</li>
					<li class="onglet_options">
						<div class="label_nav_options">
							<a href="#">Import</a>
						</div>
					</li>
					<li class="onglet_options">
						<div class="label_nav_options">
							<a href="#" id="downloadAnchorElem">Save</a>
						</div>
					</li>
					<li class="onglet_options">
						<div class="label_nav_options">
							<a href="#">Quit session</a>
						</div>
					</li>
				</ul>

			</li>
			<!-- string logo download: get_app -->
			<li class="onglet_options">
				<div class="label_nav_options">
					<img class="logo_nav_options" src="Images/Icons/search.svg">
					<div class="espace"> </div>
					<div>GetMove</div>
				</div>
				<ul class="submenu">
					<li class="onglet_options">
						<div class="label_nav_options">
							<a href="#" data-toggle="modal" data-target="#setParamModal">Set parameters</a>
						</div>
					</li>
					<li class="onglet_options">
						<div class="label_nav_options">
							<a href="#">View parameters</a>
						</div>
					</li>
				</ul>
			</li>
			<li class="onglet_options">
				<div class="label_nav_options">
					<img class="logo_nav_options" src="Images/Icons/info.svg">
					<div class="espace"> </div>
					<div>Help</div>
				</div>
			</li>
			<!-- Fin Menu des options -->
			<li class="disabled li_vide"></li>

			<li class="onglet_fullscreen"><a data-toggle="tab" attr_type="all" class="nav_fullscreen" id="nav_all">All Trajectories</a></li>
			<li class="active onglet_fullscreen"><a data-toggle="tab" attr_type="raw" class="nav_fullscreen" id="nav_raw">Raws</a></li>
			<li class="onglet_fullscreen"><a data-toggle="tab" attr_type="closedswarm" class="nav_fullscreen" id="nav_closedswarm">Closed Swarms</a></li>
			<li class="onglet_fullscreen"><a data-toggle="tab" attr_type="convoy" class="nav_fullscreen" id="nav_convoy">Convoys</a></li>
			<li class="onglet_fullscreen"><a data-toggle="tab" attr_type="divergent" class="nav_fullscreen" id="nav_divergent">Divergents</a></li>
			<li class="onglet_fullscreen"><a data-toggle="tab" attr_type="convergent" class="nav_fullscreen" id="nav_convergent">Convergents</a></li>			
		</ul>
	</div>
	<!-- FIN nav bar -->
	<div class="tab-content">
		
			<!-- PAGE ALL TRAJECTORIES -->
			<div id="all" class="tab-pane">
				<div id="info_fichier">
					<div class="titre_fichier">Trajectories : </div>
					<div class="param_fichier"></div>
				</div>
				<div class="container_fenetre">
					<div class="row">
			
						<div class="col- fenetre_traj" attr_estVide="false" indice="0">
							<div class="body_boite" attr_indice="0" attr_type_traj="raw">
								<div class="bouton_reduire_menu" onclick="reduire_menu(this)"><div class="logo_reduire_menu"><img src="Images/Icons/chevron-left.svg"></div></div>
								<div class="menu_boite">
			
									<div class="titre_boite">
										<strong>Raws</strong>	    				
									</div>
									
									<div class="menu_bouton_affichage">
										<div class="bouton_reduire" onclick="reduire(this)"><i class="tiny material-icons">remove</i></div>
										<div class="bouton_full_screen" onclick="full_screen()"><i class="tiny material-icons">open_in_new</i></div>
									</div>
									
									<div class="menu_bouton_mouvement">
										<div class="bouton_mouvement_haut" onclick="mouvement_haut(this)"><i class="tiny material-icons">keyboard_arrow_up</i></div>
										<div class="bouton_mouvement_lateral" onclick="mouvement_lateral(this)"><i class="tiny material-icons">code</i></div>
										<div class="bouton_mouvement_bas" onclick="mouvement_bas(this)"><i class="tiny material-icons">keyboard_arrow_down</i></div>
									</div>
									
									<div class="menu_choix_traj">
										
										<div class="bouton-select_traj" onclick="reverse_dropdown(this)"  data-toggle="collapse" data-target="#collapse_list_traj-raw" aria-expanded="true" aria-controls="collapse_list_traj-raw">
											<div class="label_select_trajectory">Select Trajectory</div>
											
											<i class="material-icons">arrow_drop_down</i>
										</div>
										<div id="collapse_list_traj-raw" class="collapse collapse_list_traj">
											<div class="card-body">
												<ul class="list_traj" attr_fullscreen="false" attr_type="raw">
													<li class="bouton_select_all-none" onclick=selectAll(this)><i class="material-icons">check_box</i><div class="label_select_traj">: All</div></li>
													<li class="bouton_select_all-none" onclick=unselectAll(this)><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">: None</div></li>
													<li class="unselectable li_search"><input type="text" placeholder="Search" class="input_bouton-select_traj" onkeyup=search(this)></li>
													<li class="unselectable li_separator"></li>
												</ul>
											</div>
										</div>
										
									</div>
									
								</div>
								<div class="map">
									<div id="map_raw" class="div_map" attr_type_traj="raw"></div>
								</div>
							</div>
						</div>
			
						<div class="col- fenetre_traj" attr_estVide="false" indice="1">
							
							<div class="body_boite" attr_indice="1" attr_type_traj="closedswarm">
								<div class="bouton_reduire_menu" onclick="reduire_menu(this)"><div class="logo_reduire_menu"><img src="Images/Icons/chevron-left.svg"></div></div>
								<div class="menu_boite">
			
									<div class="titre_boite">
										<strong>Closed Swarms</strong>	    				
									</div>
			
									
									<div class="menu_bouton_affichage">
										<div class="bouton_reduire" onclick="reduire(this)"><i class="tiny material-icons">remove</i></div>
										<div class="bouton_full_screen" onclick="full_screen()"><i class="tiny material-icons">open_in_new</i></div>
									</div>
									
									<div class="menu_bouton_mouvement">
										<div class="bouton_mouvement_haut" onclick="mouvement_haut(this)"><i class="tiny material-icons">keyboard_arrow_up</i></div>
										<div class="bouton_mouvement_lateral" onclick="mouvement_lateral(this)"><i class="tiny material-icons">code</i></div>
										<div class="bouton_mouvement_bas" onclick="mouvement_bas(this)"><i class="tiny material-icons">keyboard_arrow_down</i></div>
									</div>
															
			
									
									<div class="menu_choix_traj">
										
										<div class="bouton-select_traj" onclick="reverse_dropdown(this)"  data-toggle="collapse" data-target="#collapse_list_traj-closedswarm" aria-expanded="true" aria-controls="collapse_list_traj-closedswarm">
											<div class="label_select_trajectory">Select Trajectory</div>
											
											<i class="material-icons">arrow_drop_down</i>
										</div>
										<div id="collapse_list_traj-closedswarm" class="collapse collapse_list_traj">
											<div class="card-body">
												<ul class="list_traj" attr_fullscreen="false" attr_type="closedswarm">
													<li class="bouton_select_all-none" onclick=selectAll(this)><i class="material-icons">check_box</i><div class="label_select_traj">: All</div></li>
													<li class="bouton_select_all-none" onclick=unselectAll(this)><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">: None</div></li>
													<li class="unselectable li_search"><input type="text" placeholder="Search" class="input_bouton-select_traj" onkeyup=search(this) onkeyup=search(this)></li>
													<li class="unselectable li_separator"></li>
												</ul>
											</div>
										</div>
										
									</div>
									
								</div>
								<div class="map">
									<div id="map_closedswarm" class="div_map" attr_type_traj="closedswarm"></div>
								</div>
							</div>
						</div>
			
					</div>
			
					<div class="row">
			
						<div class="col- fenetre_traj" attr_estVide="false" indice="2">
							
							<div class="body_boite" attr_indice="2" attr_type_traj="convoy">
								<div class="bouton_reduire_menu" onclick="reduire_menu(this)"><div class="logo_reduire_menu"><img src="Images/Icons/chevron-left.svg"></div></div>
								<div class="menu_boite">
									<div class="titre_boite">
										<strong>Convoys</strong>	    				
									</div>
									
									
									<div class="menu_bouton_affichage">
										<div class="bouton_reduire" onclick="reduire(this)"><i class="tiny material-icons">remove</i></div>
										<div class="bouton_full_screen" onclick="full_screen()"><i class="tiny material-icons">open_in_new</i></div>
									</div>
									
									<div class="menu_bouton_mouvement">
										<div class="bouton_mouvement_haut" onclick="mouvement_haut(this)"><i class="tiny material-icons">keyboard_arrow_up</i></div>
										<div class="bouton_mouvement_lateral" onclick="mouvement_lateral(this)"><i class="tiny material-icons">code</i></div>
										<div class="bouton_mouvement_bas" onclick="mouvement_bas(this)"><i class="tiny material-icons">keyboard_arrow_down</i></div>
									</div>
															
			
									
									<div class="menu_choix_traj">

										
										<!-- <div class="label_select_trajectory">Select Trajectory</div> -->
										<!-- <div class="label_select_trajectory">Select Trajectory</div> -->
										
										<div class="bouton-select_traj" onclick="reverse_dropdown(this)"  data-toggle="collapse" data-target="#collapse_list_traj-convoy" aria-expanded="true" aria-controls="collapse_list_traj-convoy">
											<div class="label_select_trajectory">Select Trajectory</div>
											
											<i class="material-icons">arrow_drop_down</i>
										</div>
										<div id="collapse_list_traj-convoy" class="collapse collapse_list_traj">
											<div class="card-body">
												<ul class="list_traj" attr_fullscreen="false" attr_type="convoy">
													<li class="bouton_select_all-none" onclick=selectAll(this)><i class="material-icons">check_box</i><div class="label_select_traj">: All</div></li>
													<li class="bouton_select_all-none" onclick=unselectAll(this)><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">: None</div></li>
													<li class="unselectable li_search"><input type="text" placeholder="Search" class="input_bouton-select_traj" onkeyup=search(this)></li>
													<li class="unselectable li_separator"></li>
													<!-- <li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Convoy 1</div></li>
													<li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Convoy 2</div></li>
													<li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Convoy 3</div></li>
													<li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Convoy 4</div></li>
												</ul> -->
											</div>
										</div>
										
									</div>

								</div>
								<div class="map">
									<div id="map_convoy" class="div_map" attr_type_traj="convoy"></div>
								</div>
							</div>
						</div>
			
			
						<div class="col- fenetre_traj" attr_estVide="false" indice="3">
							
							<div class="body_boite" attr_indice="3" attr_type_traj="divergent">
			
								<div class="bouton_reduire_menu" onclick="reduire_menu(this)"><div class="logo_reduire_menu"><img src="Images/Icons/chevron-left.svg"></div></div>
								<div class="menu_boite">
									<div class="titre_boite">
										<strong>Divergents</strong>	    				
									</div>
									
									<div class="menu_bouton_affichage">
										<div class="bouton_reduire" onclick="reduire(this)"><i class="tiny material-icons">remove</i></div>
										<div class="bouton_full_screen" onclick="full_screen()"><i class="tiny material-icons">open_in_new</i></div>
									</div>
									
									<div class="menu_bouton_mouvement">
										<div class="bouton_mouvement_haut" onclick="mouvement_haut(this)"><i class="tiny material-icons">keyboard_arrow_up</i></div>
										<div class="bouton_mouvement_lateral" onclick="mouvement_lateral(this)"><i class="tiny material-icons">code</i></div>
										<div class="bouton_mouvement_bas" onclick="mouvement_bas(this)"><i class="tiny material-icons">keyboard_arrow_down</i></div>
									</div>
															
			
									
									<div class="menu_choix_traj">

										
										<!-- <div class="label_select_trajectory">Select Trajectory</div> -->
										<!-- <div class="label_select_trajectory">Select Trajectory</div> -->
										
										<div class="bouton-select_traj" onclick="reverse_dropdown(this)"  data-toggle="collapse" data-target="#collapse_list_traj-divergent" aria-expanded="true" aria-controls="collapse_list_traj-divergent">
											<div class="label_select_trajectory">Select Trajectory</div>
											
											<i class="material-icons">arrow_drop_down</i>
										</div>
										<div id="collapse_list_traj-divergent" class="collapse collapse_list_traj">
											<div class="card-body">
												<ul class="list_traj" attr_fullscreen="false" attr_type="divergent">
													<li class="bouton_select_all-none" onclick=selectAll(this)><i class="material-icons">check_box</i><div class="label_select_traj">: All</div></li>
													<li class="bouton_select_all-none" onclick=unselectAll(this)><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">: None</div></li>
													<li class="unselectable li_search"><input type="text" placeholder="Search" class="input_bouton-select_traj" onkeyup=search(this)></li>
													<li class="unselectable li_separator"></li>
													<!-- <li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Divergent 1</div></li>
													<li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Divergent 2</div></li>
													<li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Divergent 3</div></li>
													<li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Divergent 4</div></li> -->
												</ul>
											</div>
										</div>
										
									</div>
			
								</div>
								<div class="map">
									<div id="map_divergent" class="div_map" attr_type_traj="divergent"></div>
								</div>
							</div>
						</div>
			
					</div>
			
			
					<div class="row">
			
						<div class="col- fenetre_traj" attr_estVide="false" indice="4">
							
							<div class="body_boite" attr_indice = "4" attr_type_traj="convergent">
								<div class="bouton_reduire_menu" onclick="reduire_menu(this)"><div class="logo_reduire_menu"><img src="Images/Icons/chevron-left.svg"></div></div>
								<div class="menu_boite">
									<div class="titre_boite">
										<strong>Convergents</strong>	    				
									</div>
									
									<div class="menu_bouton_affichage">
										<div class="bouton_reduire" onclick="reduire(this)"><i class="tiny material-icons">remove</i></div>
										<div class="bouton_full_screen" onclick="full_screen()"><i class="tiny material-icons">open_in_new</i></div>
									</div>
									
									<div class="menu_bouton_mouvement">
										<div class="bouton_mouvement_haut" onclick="mouvement_haut(this)"><i class="tiny material-icons">keyboard_arrow_up</i></div>
										<div class="bouton_mouvement_lateral" onclick="mouvement_lateral(this)"><i class="tiny material-icons">code</i></div>
										<div class="bouton_mouvement_bas" onclick="mouvement_bas(this)"><i class="tiny material-icons">keyboard_arrow_down</i></div>
									</div>
															
			
									
									<div class="menu_choix_traj">

										
										<!-- <div class="label_select_trajectory">Select Trajectory</div> -->
										<!-- <div class="label_select_trajectory">Select Trajectory</div> -->
										
										<div class="bouton-select_traj" onclick="reverse_dropdown(this)"  data-toggle="collapse" data-target="#collapse_list_traj-convergent" aria-expanded="true" aria-controls="collapse_list_traj-convergent">
											<div class="label_select_trajectory">Select Trajectory</div>
											
											<i class="material-icons">arrow_drop_down</i>
										</div>
										<div id="collapse_list_traj-convergent" class="collapse collapse_list_traj">
											<div class="card-body">
												<ul class="list_traj" attr_fullscreen="false" attr_type="convergent">
													<li class="bouton_select_all-none" onclick=selectAll(this)><i class="material-icons">check_box</i><div class="label_select_traj">: All</div></li>
													<li class="bouton_select_all-none" onclick=unselectAll(this)><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">: None</div></li>
													<li class="unselectable li_search"><input type="text" placeholder="Search" class="input_bouton-select_traj" onkeyup=search(this)></li>
													<li class="unselectable li_separator"></li>
													<!-- <li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Convergent 1</div></li>
													<li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Convergent 2</div></li>
													<li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Convergent 3</div></li>
													<li class="li_select_traj" onclick="toggleSelected(this)"><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">Convergent 4</div></li>
												</ul> -->
											</div>
										</div>
											
										</div>
								</div>
								<div class="map">
									<div id="map_convergent" class="div_map" attr_type_traj="convergent"></div>
								</div>
							</div>
						</div>
						<div class="col- fenetre_traj" attr_estVide="true" indice="5">
						</div>
					</div>
			
				</div>
				<!-- Footer -->
				<div id="footer">
					<div class="onglet_fenetre couleur_onglet" attr_type_traj="raw" onclick="agrandire(this)">Raws</div>
					<div class="onglet_fenetre couleur_onglet" attr_type_traj="closedswarm" onclick="agrandire(this)">Closed Swarms</div>
					<div class="onglet_fenetre couleur_onglet" attr_type_traj="convoy" onclick="agrandire(this)">Convoys</div>
					<div class="onglet_fenetre couleur_onglet" attr_type_traj="divergent" onclick="agrandire(this)">Divergents</div>
					<div class="onglet_fenetre couleur_onglet" attr_type_traj="convergent" onclick="agrandire(this)">Convergents</div>
				</div>
				<!-- FIN Footer -->
			</div>

			<!-- PAGE RAW -->
			<div id="raw" class="tab-pane active">
				<div class="fenetre_fullscreen" attr_type_traj="raw">
					<div class="bouton_reduire_menu" onclick="reduire_menu(this)"><div class="logo_reduire_menu"><img src="Images/Icons/chevron-left.svg"></div></div>
					<div class="menu_boite">
						<div class="titre_boite">
							<strong>Raws</strong>	    				
						</div>
						
						
						
						<div class="newWindowButton_fullscreen" onclick="full_screen()"><i class="tiny material-icons">open_in_new</i></div>
						
												

						
						<div class="menu_choix_traj fullscreen">
							<div class="label_select_trajectory">Select Trajectory</div>
							<ul class="list_traj fullscreen" attr_fullscreen="true" attr_type="raw">
								<li class="bouton_select_all-none" onclick=selectAll(this)><i class="material-icons">check_box</i><div class="label_select_traj">: All</div></li>
								<li class="bouton_select_all-none" onclick=unselectAll(this)><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">: None</div></li>
								<li class="unselectable li_search"><input type="text" placeholder="Search" class="input_bouton-select_traj" onkeyup=search(this)></li>
								<li class="unselectable li_separator"></li>
							</ul>
								
						</div>

					</div>
					<div class="map">
						<div id="map_raw_fullscreen" class="div_map" attr_type_traj="raw"></div>
					</div>
				</div>
			</div>

			<!-- PAGE CLOSEDSWARM -->
			<div id="closedswarm" class="tab-pane">

				<div class="fenetre_fullscreen" attr_type_traj="closedswarm">
					<div class="bouton_reduire_menu" onclick="reduire_menu(this)"><div class="logo_reduire_menu"><img src="Images/Icons/chevron-left.svg"></div></div>
					<div class="menu_boite">
						<div class="titre_boite">
							<strong>Closed Swarms</strong>	    				
						</div>
						
						
						
						<div class="newWindowButton_fullscreen" onclick="full_screen()"><i class="tiny material-icons">open_in_new</i></div>
						
												

						
						<div class="menu_choix_traj fullscreen">
							<div class="label_select_trajectory">Select Trajectory</div>
							<ul class="list_traj fullscreen" attr_fullscreen="true" attr_type="closedswarm">
								<li class="bouton_select_all-none" onclick=selectAll(this)><i class="material-icons">check_box</i><div class="label_select_traj">: All</div></li>
								<li class="bouton_select_all-none" onclick=unselectAll(this)><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">: None</div></li>
								<li class="unselectable li_search"><input type="text" placeholder="Search" class="input_bouton-select_traj" onkeyup=search(this)></li>
								<li class="unselectable li_separator"></li>
							</ul>
								
						</div>

					</div>
					<div class="map">
						<div id="map_closedswarm_fullscreen" class="div_map" attr_type_traj="closedswarm"></div>
					</div>
				</div>

			</div>

			<!-- PAGE CONVOY -->
			<div id="convoy" class="tab-pane">
				<div class="fenetre_fullscreen" attr_type_traj="convoy">
					<div class="bouton_reduire_menu" onclick="reduire_menu(this)"><div class="logo_reduire_menu"><img src="Images/Icons/chevron-left.svg"></div></div>
					<div class="menu_boite">
						<div class="titre_boite">
							<strong>Convoys</strong>	    				
						</div>
						
						
						
						<div class="newWindowButton_fullscreen" onclick="full_screen()"><i class="tiny material-icons">open_in_new</i></div>
						
												

						
						<div class="menu_choix_traj fullscreen">
							<div class="label_select_trajectory">Select Trajectory</div>
							<ul class="list_traj fullscreen" attr_fullscreen="true" attr_type="convoy">
								<li class="bouton_select_all-none" onclick=selectAll(this)><i class="material-icons">check_box</i><div class="label_select_traj">: All</div></li>
								<li class="bouton_select_all-none" onclick=unselectAll(this)><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">: None</div></li>
								<li class="unselectable li_search"><input type="text" placeholder="Search" class="input_bouton-select_traj" onkeyup=search(this)></li>
								<li class="unselectable li_separator"></li>
							</ul>
								
						</div>

					</div>
					<div class="map">
						<div id="map_convoy_fullscreen" class="div_map" attr_type_traj="convoy"></div>
					</div>
				</div>
			</div>

			<!-- PAGE DIVERGENT -->
			<div id="divergent" class="tab-pane">
				<div class="fenetre_fullscreen" attr_type_traj="divergent">
					<div class="bouton_reduire_menu" onclick="reduire_menu(this)"><div class="logo_reduire_menu"><img src="Images/Icons/chevron-left.svg"></div></div>
					<div class="menu_boite">
						<div class="titre_boite">
							<strong>Divergents</strong>	    				
						</div>
						
						
						
						<div class="newWindowButton_fullscreen" onclick="full_screen()"><i class="tiny material-icons">open_in_new</i></div>
						
												

						
						<div class="menu_choix_traj fullscreen">
							<div class="label_select_trajectory">Select Trajectory</div>
							<ul class="list_traj fullscreen" attr_fullscreen="true" attr_type="divergent">
								<li class="bouton_select_all-none" onclick=selectAll(this)><i class="material-icons">check_box</i><div class="label_select_traj">: All</div></li>
								<li class="bouton_select_all-none" onclick=unselectAll(this)><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">: None</div></li>
								<li class="unselectable li_search"><input type="text" placeholder="Search" class="input_bouton-select_traj" onkeyup=search(this)></li>
								<li class="unselectable li_separator"></li>
							</ul>
								
						</div>

					</div>
					<div class="map">
						<div id="map_divergent_fullscreen" class="div_map" attr_type_traj="divergent"></div>
					</div>
				</div>
			</div>

			<!-- PAGE CONVERGENT -->
			<div id="convergent" class="tab-pane">
				<div class="fenetre_fullscreen" attr_type_traj="convergent">
					<div class="bouton_reduire_menu" onclick="reduire_menu(this)"><div class="logo_reduire_menu"><img src="Images/Icons/chevron-left.svg"></div></div>
					<div class="menu_boite">
						<div class="titre_boite">
							<strong>Convergents</strong>	    				
						</div>
						
						
						
						<div class="newWindowButton_fullscreen" onclick="full_screen()"><i class="tiny material-icons">open_in_new</i></div>
						
												

						
						<div class="menu_choix_traj fullscreen">
							<div class="label_select_trajectory">Select Trajectory</div>
							<ul class="list_traj fullscreen" attr_fullscreen="true" attr_type="convergent">
								<li class="bouton_select_all-none" onclick=selectAll(this)><i class="material-icons">check_box</i><div class="label_select_traj">: All</div></li>
								<li class="bouton_select_all-none" onclick=unselectAll(this)><i class="material-icons">check_box_outline_blank</i><div class="label_select_traj">: None</div></li>
								<li class="unselectable li_search"><input type="text" placeholder="Search" class="input_bouton-select_traj" onkeyup=search(this)></li>
								<li class="unselectable li_separator"></li>
							</ul>
								
						</div>

					</div>
					<div class="map">
						<div id="map_convergent_fullscreen" class="div_map" attr_type_traj="convergent"></div>
					</div>
				</div>
			</div>
	</div>


</body>
<!-- Modal -->
	<div class="modal fade" id="openModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h3 class="modal-title" id="exampleModalLabel">Open file</h3>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <form action="file_load.php" method="POST" enctype="multipart/form-data">
            	Your file: <input type="file" name="sheet" /><br/>
            	<div class="footer_modal">
	            	<button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Cancel</button>
	            	<input type="submit" class="btn btn-info btn-lg" name="submit" value="Upload"/>
	            </div>
       		</form>
	      </div>
	    </div>
	  </div>
	</div>

	<div class="modal fade" id="setParamModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h3 class="modal-title" id="exampleModalLabel">Set parameters</h3>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <form action="run.php" method="POST" enctype="multipart/form-data">
	            Start date (YYYY-MM-DD): <input type="text" name="start-date"/><br/>
	            End date (YYYY-MM-DD): <input type="text" name="end-date"/><br/>
	            Clustering period: <input type="text" name="interval"/><br/>
	            DBSCAN epsilon: <input type="text" name="epsilon" value="0.7"/><br/>
	            DBSCAN min_t: <input type="text" name="mint" value="5"/><br/>
	            <div class="footer_modal">
	            	<button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Cancel</button>
	            	<input type="submit" class="btn btn-info btn-lg" name="submit" value="Upload"/>
	            </div>
	        </form>
	      </div>
	    </div>
	  </div>
	</div>



<!-- SCRIPTS -->

<!-- Fonctions principales -->
<!-- <script src="data.json"></script> -->

<script src="pattern.js"></script>
<script src="raws.js"></script>
    
<script src="script.js"></script>

<!-- Fonctions d'affichage -->
<!-- <script src="spript-affichage.js"></script> -->


<!-- FIN SCRIPTS -->

</html>


