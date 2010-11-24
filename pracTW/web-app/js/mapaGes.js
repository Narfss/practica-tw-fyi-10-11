var map=null;
var usuario=null;
var MarkerUsuario;
var amigosArray=new Array();
var lapsoMin=60;

function initialize(usu) {
	usuario=usu
	navigator.geolocation.getCurrentPosition(centrarMap);
}

function existeMarker(login){
    for (i in amigosArray)
        if (amigosArray[i][0]==login)
            return i
    return -1
}

function borrarAmigosViejos(){
    var d=new Date()
    var ahora=d.getTime()
    for (i in amigosArray){
        var antes=amigosArray[i][3].getTime()+(lapsoMin*60*1000)
        if (antes<ahora){
            amigosArray[i][1].remove()
            //eliminar infowindow
            delete amigosArray[i]
        }
    }
}

function anyadirAmigos(){
	var req = new XMLHttpRequest();
	req.open('GET', "../locations/getLocalizacionesAmigos?minutos="+lapsoMin, false); /*reducido el tiempo para test (60)*/
	req.send(null);

	if (req.status == 200){
		var amigos = eval("{amigos: "+req.responseText+"}")
		for(i in amigos){
                        var nAmigo=existeMarker(amigos[i].login)
                        if (nAmigo<0){
                            var markerAmigo=anyadirMarker(new GLatLng(amigos[i].localizacion.lat, amigos[i].localizacion.lon), amigos[i].login)

                            UcontentString="<div id=content><div id=siteNotice></div><h1>"+amigos[i].nombre+"</h1><div id=bodyContent><p>"+amigos[i].localizacion.status+"</p>";
                            UcontentString+="<p id=\"timer-"+amigos[i].nombre+"\">"+calcularTiempo(amigos[i].localizacion.fecha.getTime())+"</p>"
                            UcontentString+="<script>setInterval(\"document.getElementById('timer-"+amigos[i].nombre+"').innerHTML=calcularTiempo("+amigos[i].localizacion.fecha.getTime()+")\",6000)</script>"
                            UcontentString+="</div></div>";

                            var newAmigoArray=new Array(amigos[i].login,markerAmigo,UcontentString,amigos[i].localizacion.fecha)
                            amigosArray.push(newAmigoArray)
                            nAmigo=existeMarker(amigos[i].login)

                            GEvent.addListener(amigosArray[nAmigo][1], 'click', function(){
                                                                    amigosArray[nAmigo][1].openInfoWindowHtml(amigosArray[nAmigo][2]);
                                                                });
                            GEvent.trigger(amigosArray[nAmigo][1], 'click')
                                                    {
                                                       amigosArray[nAmigo][1].openInfoWindow(amigosArray[nAmigo][2]);
                                                    }
                            
                            markerAmigo.draggable=false;
                            markerAmigo.disableDragging();
                        }else if (amigosArray[nAmigo][3] < amigos[i].localizacion.fecha){ /*si cuela esto fiesta*/
                            amigosArray[nAmigo][1].setLatLng(new GLatLng(amigos[i].localizacion.lat, amigos[i].localizacion.lon))
                            
                            UcontentString="<div id=content><div id=siteNotice></div><h1>"+amigos[i].nombre+"</h1><div id=bodyContent><p>"+amigos[i].localizacion.status+"</p>";
                            UcontentString+="<p id=\"timer-"+amigos[i].nombre+"\">"+calcularTiempo(amigos[i].localizacion.fecha.getTime())+"</p>"
                            UcontentString+="<script>setInterval(\"document.getElementById('timer-"+amigos[i].nombre+"').innerHTML=calcularTiempo("+amigos[i].localizacion.fecha.getTime()+")\",6000)</script>"
                            UcontentString+="</div></div>";
                            amigosArray[nAmigo][2]=UcontentString

                            amigosArray[nAmigo][3]=amigos[i].localizacion.fecha

                            GEvent.trigger(amigosArray[nAmigo][1], 'click')
                                                    {
                                                       amigosArray[nAmigo][1].openInfoWindow(amigosArray[nAmigo][2]);
                                                    }
                        }
                }
                borrarAmigosViejos()
	}
}

function calcularTiempo(now){
    var hoy=new Date();
    var act=new Date(hoy.getTime()-now);
    console.log(act)
    var retorno="";
    switch (act.getHours()-1){
        case 0 : retorno+=""; break;
        case 1 : retorno+=act.getHours()+" hora "; break;
        default: retorno+=act.getHours()+" horas "; break;
    }
    switch (act.getMinutes()){
        case 0 : retorno+=""; break;
        case 1 : retorno+=act.getMinutes()+" minuto "; break;
        default: retorno+=act.getMinutes()+" minutos "; break;
    }
    if (retorno=="")
            retorno="Menos de un minuto"
    return retorno;

    /*
    var retorno;
    if(act<3600000){retorno=act/60000;}//minutos
    else{
        retorno=act/(3600000);//horas
    }

    return Math.floor(retorno);*/
}
function anyadirMarker(position, usuarioIcon){
	var icon = new GIcon();

	icon.image = "../images/perfiles/" + usuarioIcon + "/icono.jpg";
	icon.iconAnchor = new GPoint(32, 64);
	icon.infoWindowAnchor = new GPoint(42, 32);
	icon.iconSize = new GSize(64, 64);
	//icon.shadow = "../images/default/marco.png"; //Queria poner la forma de la Y como marco, pero la sombra empieza en al posicion 0,0. Supongo que cuando nos expliquen como se guarda en formato icono tal vez podramos incluirle un marco o recortarla
	//icon.shadowSize = new GSize(32,32);

	marker=new GMarker(position,{icon: icon, draggable: true})
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
                //mapa.show(MarkerUsuario.myInfowindow);
                UcontentString="<div id=content><div id=siteNotice></div><h1>"+usuario.nombre+"</h1><div id=bodyContent><p>"+usuario.status+"</p></div></div>";
                MarkerUsuario.title=UcontentString;
                
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
        if(document.getElementById("comment").value!=""){
            document.getElementById("actualizarEstado").disabled=false;
            if (modo=="no mostrar"){
                //document.getElementById("comment").value=""
                document.getElementById("comment").disabled=true
                document.getElementById("actualizarEstado").value="Ocultar posición"
            }else{
                document.getElementById("comment").disabled=false
                document.getElementById("actualizarEstado").value="Actualizar estado"
            }
        }else{
            document.getElementById("actualizarEstado").disable=true
            document.getElementById("actualizarEstado").value="¿Y el estado?"
        }
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
        
        mostrarinfowindow(MarkerUsuario);
        /*Aqui se actualiza el Infowindows?*/
        mostrarInfowindowUsuario()
}


function guardarEstado(){
	estado=document.getElementById("comment").value;
	posAJAX="../locations/guardarStatus"
	params="?status="+estado;

	var req = new XMLHttpRequest();
	req.open('GET', posAJAX+params, false);
	req.send(null);

        mostrarinfowindow(MarkerUsuario);
}

function mostrarinfowindow(marker){
        GEvent.trigger(marker, 'click')
                    {
                       marker.openInfoWindow(marker.title);
                    }
}

function clickinfowindow(marker){
    GEvent.addListener(marker, 'click', function(){
                              marker.openInfoWindowHtml(marker.title);
                           });
}

function posicionManual(){
	guardarPosicionyEstado({"coords" : {"latitude": ""+MarkerUsuario.B.lat(), "longitude": ""+MarkerUsuario.B.lng()}})
}


function MostrarPosicionManual(){
	//console.log(
	nameManualPos=document.getElementById("namepos").value;
	var geocoder = new google.maps.Geocoder();
	if (geocoder) {
		geocoder.geocode({'address': nameManualPos}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			posicion = new GLatLng(results[0].geometry.location.ra, results[0].geometry.location.sa)
			map.setCenter(posicion, 13);
			MarkerUsuario.setLatLng(posicion);
		} else {
			console.log('No results found: ' + status); //deberiamso hacer lago si no se encuentra?
		}
            });
        }
    GEvent.trigger(MarkerUsuario, 'click')
    {
       //console.log("dentro de trigger");
       MarkerUsuario.openInfoWindow(MarkerUsuario.title);
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


