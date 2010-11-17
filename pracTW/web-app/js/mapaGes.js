var map=null;
var usuario=null;
var MarkerUsuario;

function initialize(usu) {
	usuario=usu
	navigator.geolocation.getCurrentPosition(centrarMap);
}

var Umarker;
var Uinfowindow;
var UcontentString;
function anyadirAmigos(){
	var req = new XMLHttpRequest();
	req.open('GET', "../locations/getLocalizacionesAmigos?minutos=60", false);
	req.send(null);

	if (req.status == 200){
		var amigos = eval("{amigos: "+req.responseText+"}")
		for(i in amigos){
			var Umarker=anyadirMarker(new GLatLng(amigos[i].localizacion.lat, amigos[i].localizacion.lon), amigos[i].login)
			Umarker.draggable=false;
			Umarker.disableDragging();
			//var contentString='<div id="content">'+'<h1>'+amigos[i].nombre+'</h1>'+'<p>'+amigos[i].status+'</p></div>';
			UcontentString="<div id=\'content\'><div id=\'siteNotice\'></div><h1>Titulo</h1><div id=\'bodyContent\'><p>esto es un infowindow</p></div></div>";
			Uinfowindow=new google.maps.InfoWindow({content: contentString});
			//console.log(Uinfowindow)
			google.maps.event.addListener(Umarker, 'click', function(){
		                                              //console.log("click en marker");
		                                              Uinfowindow.open(map,Umarker);
		                                            })
		}
	}
}

function anyadirMarker(position, usuarioIcon){
	var icon = new GIcon();

	icon.image = "../images/perfiles/" + usuarioIcon + "/icono.jpg";
	icon.iconAnchor = new GPoint(32, 64);
	icon.infoWindowAnchor = new GPoint(32, 0);
	icon.iconSize = new GSize(64, 64);
	//icon.shadow = "../images/default/marco.png"; //Queria poner la forma de la Y como marco, pero la sombra empieza en al posicion 0,0. Supongo que cuando nos expliquen como se guarda en formato icono tal vez podramos incluirle un marco o recortarla
	//icon.shadowSize = new GSize(32,32);

	marker=new GMarker(position,{ icon: icon, draggable: true})
	map.addOverlay(marker)
	return marker;
}

function centrarMap(position) {
	if (GBrowserIsCompatible()) {
		map = new GMap2(document.getElementById("map_canvas"));
		map.setCenter(new GLatLng(position.coords.latitude, position.coords.longitude), 13);
		MarkerUsuario=anyadirMarker(new GLatLng(position.coords.latitude, position.coords.longitude), usuario);
		anyadirAmigos();
		setInterval(anyadirAmigos,6000);
		showinfomanual();
	}
}

function checkedRadio(radioObj){
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
        for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
        /*for each (var i in r){if(i.checked)return i.value;}return "";*/
}

function showinfomanual(){ 
	modo=checkedRadio(document.formestado.posicion)
	if((modo=="automatico") || (modo=="no mostrar")){
		document.getElementById("infomanual").style.display = 'none';
		MarkerUsuario.draggable=false;
		MarkerUsuario.disableDragging();
	}else if(modo=="manual"){
		document.getElementById("infomanual").style.display = 'block';
		MarkerUsuario.draggable=true;
		MarkerUsuario.enableDragging();
	}
}

function guardarPosicionyEstado(position){
	lat=position.coords.latitude;
	lon=position.coords.longitude;
	estado=document.getElementById("comment").value;
	posAJAX="../locations/guardar"
	params="?lat="+lat+"&lon="+lon+"&status="+estado;

	var req = new XMLHttpRequest();
	req.open('GET', posAJAX+params, false);
	req.send(null);
}

function guardarEstado(){
	estado=document.getElementById("comment").value;
	posAJAX="../locations/guardarStatus"
	params="?status="+estado;

	var req = new XMLHttpRequest();
	req.open('GET', posAJAX+params, false);
	req.send(null);
}


function posicionManual(){
	guardarPosicionyEstado({"coords" : {"latitude": ""+MarkerUsuario.B.lat(), "longitude": ""+MarkerUsuario.B.lng()}})
}


function MostrarPosicionManual(){
	//console.log(
	nameManualPos=document.getElementById("namepos").value;
	var geocoder = new google.maps.Geocoder();
	if (geocoder) {
		geocoder.geocode({ 'address': nameManualPos }, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			posicion = new GLatLng(results[0].geometry.location.ra, results[0].geometry.location.sa)
			map.setCenter(posicion, 13);
			MarkerUsuario.setLatLng(posicion);
		} else {
			console.log('No results found: ' + status); //deberiamso hacer lago si no se encuentra?
		}
	});
}
}

function guardarEstado(){
	modo=checkedRadio(document.formestado.posicion)
	if(modo=="automatico"){
		navigator.geolocation.getCurrentPosition(guardarPosicionyEstado);
		//navigator.geolocation.watchPosition()   ????
	}else if(modo=="manual"){
		posicionManual();
	}else if(modo=="no mostrar"){
		guardarEstado();
	}
}


