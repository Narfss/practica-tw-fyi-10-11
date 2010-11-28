var map=null;
var usuario=null;
var MarkerUsuario=null;
var infowindowUsuario;
var amigosArray=new Array();
var lapsoMin=20//1440; //primero 24 horas 24*60=1440
var callbackGetPos;


/*Funcion initialize
 *param usu
 *Funcion encargada de inicializar el usuario y obtener su posicion actual
 **/
function initialize(usu) {
	usuario=usu
	navigator.geolocation.getCurrentPosition(centrarMap);
}


/*Funcion existeMarker
 *param login
 *Busca saber si ya existe el marker del usuario pasado por parametro en el array de amigos
 *return i
 **/
function existeMarker(login){
    for (i in amigosArray)
        if (amigosArray[i][0]==login)
            return i
    return -1
}

/*Funcion borrarAmigosViejos
 *Elimina del array de amigos aquellos que no actualizaron en las ultimas 24 horas
 */
function borrarAmigosViejos(){
    var d=new Date()
    var ahora=d.getTime()
    for (i in amigosArray){
        var antes=amigosArray[i][3].getTime()+(24*60*1000); //se eliminan los que actualizaron hace mas de 24 horas(lapsoMin*60*1000)
        if (antes<ahora){
            if(window['timer'+amigosArray[i][0]] != undefined)
                clearInterval("timer"+amigosArray[i][0])
            amigosArray[i][1].remove()
            amigosArray[i][2]=""
            delete amigosArray[i]
        }
    }
}

/*Function generarinfowindow
 *param amigo
 *Genera el contenido que mostrara el infowindow para cada amigo con el que se llame a la funcion
 *return UcontentString: contenido del infowindow
 */
function generarinfowindow(amigo){
        UcontentString="<div id=content><div id=siteNotice></div><h1>"+amigo.nombre+"</h1><div id=bodyContent><p>"+amigo.localizacion.status+"</p>";
        UcontentString+="<p id=\"timer-"+amigo.login+"\">"+calcularTiempo(amigo.localizacion.fecha.getTime())+"</p>"
                                //typeof timer"+amigos[i].nombre+" != 'undefined'   window['timer"+amigos[i].nombre+"'] != undefined
        UcontentString+="<script>if(window['timer"+amigo.nombre+"'] != undefined) clearInterval(timer"+amigo.nombre+");"
        UcontentString+="timer"+amigo.nombre+"=setInterval(\"if(document.getElementById('timer-"+amigo.login+"')!=null){"
        UcontentString+="document.getElementById('timer-"+amigo.login+"').innerHTML=calcularTiempo("+amigo.localizacion.fecha.getTime()+"); "
        //UcontentString+="console.log('actualizado"+amigo.localizacion.status+"')"
        //UcontentString+="}else{"
        //UcontentString+="console.log('NO SE pudo actualizado"+amigo.localizacion.status+"')"
        UcontentString+="}\",6000)"
        UcontentString+="</script></div></div>";

        return UcontentString;
}

/*Funcion anyadirAmigos
 *Añade amigos al mapa, que hayan actualizado hace menos de 24 horas
 */
function anyadirAmigos(){
	var req = new XMLHttpRequest();
	req.open('GET', "../locations/getLocalizacionesAmigos?minutos="+lapsoMin, false);
        lapsoMin=1; //el tiempo de amigos actualizados pasa a ser de un minuto remplazando la primera peticion de 24 horas
	req.send(null);

	if (req.status == 200){
		var amigos = eval("{amigos: "+req.responseText+"}")
		for(i in amigos){
                        var nAmigo=existeMarker(amigos[i].login)
                        if (nAmigo<0){
                            var markerAmigo=anyadirMarker(new GLatLng(amigos[i].localizacion.lat, amigos[i].localizacion.lon), amigos[i].login)
                            //he de utilizar login
                            clearInterval("timer"+amigos[i].nombre)


                            var newAmigoArray=new Array(amigos[i].login,markerAmigo,generarinfowindow(amigos[i]),amigos[i].localizacion.fecha)
                            amigosArray.push(newAmigoArray)
                            nAmigo=existeMarker(amigos[i].login)

                            GEvent.addListener(amigosArray[nAmigo][1], 'click', function(){
                                                                    amigosArray[nAmigo][1].openInfoWindowHtml(amigosArray[nAmigo][2]);
                                                                });

                            markerAmigo.draggable=false;
                            markerAmigo.disableDragging();
                        }else if (amigosArray[nAmigo][3] < amigos[i].localizacion.fecha){ /*si cuela esto fiesta*/
                            amigosArray[nAmigo][1].setLatLng(new GLatLng(amigos[i].localizacion.lat, amigos[i].localizacion.lon))

                            amigosArray[nAmigo][2]=generarinfowindow(amigos[i])

                            amigosArray[nAmigo][3]=amigos[i].localizacion.fecha

                        }
                       console.log(nAmigo);
                }
                borrarAmigosViejos()
	}
}


/*Function calcularTiempo
 *param now
 *Funcion que calcula hace cuanto tiempo se actualizo
 *return retorno: hace cuanto tiempo en minutos que se actualizo
 */
function calcularTiempo(now){
    var hoy=new Date();
    var act=new Date(hoy.getTime()-now);
    
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

/*anyadirMarker
 *param position, usuarioIcon
 *Añade un markador en la posicion y con la imagen pasada por parametros
 *return marker: marcador ya ubicado en el mapa
 */
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


/*Funcion centrarMap
 *param position
 *Funcion que situa el mapa en el canvas indivado, y añade el marcador de usuario
 */
function centrarMap(position) {
	if (GBrowserIsCompatible()) {
		map = new GMap2(document.getElementById("map_canvas"));
		map.setCenter(new GLatLng(position.coords.latitude, position.coords.longitude), 13);
		MarkerUsuario=anyadirMarker(new GLatLng(position.coords.latitude, position.coords.longitude), usuario);
		anyadirAmigos();
		setInterval(anyadirAmigos,6000);
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

/*Funcion showinfomanual
 *Funcion que modifica el javascript en funcion del estado a actualizar.
 */
function showinfomanual(){
    modo=checkedRadio(document.formestado.posicion)

    infomanual=document.getElementById("infomanual");
    comment=document.getElementById("comment");
    actualizarEstado=document.getElementById("actualizarEstado");

    //Modificacion de los elementos del form segun el modo de actualizacion
    switch(modo){
        case "automatico":  infomanual.style.display = 'none';
                            comment.disabled=false;
                            if(comment.value == ""){
                                actualizarEstado.disabled="disabled";
                                actualizarEstado.value="¿Y el estado?";
                            }else{
                                actualizarEstado.removeAttribute("disabled");
                                actualizarEstado.value="Actualizar estado";
                            }; break;
        case "manual":      infomanual.style.display = 'block';
                            comment.disabled=false;
                            if(comment.value == ""){
                                actualizarEstado.disabled="disabled";
                                actualizarEstado.value="¿Y el estado?";
                            }else{
                                actualizarEstado.removeAttribute("disabled");
                                actualizarEstado.value="Actualizar estado";
                            }; break;
        case "no mostrar":  infomanual.style.display = 'none';
                            comment.disabled=true;
                            actualizarEstado.removeAttribute("disabled");
                            actualizarEstado.value="Ocultar posicion";
                            break;
    }

    //modificacion del marker
    if(window['MarkerUsuario'] != undefined){
       switch(modo){
        case "no mostrar":  MarkerUsuario.hide();
                            MarkerUsuario.draggable=false;
                            MarkerUsuario.disableDragging(); break;
        case "automatico":  MarkerUsuario.show();
                            MarkerUsuario.draggable=false;
                            MarkerUsuario.disableDragging(); break;
        case "manual":      MarkerUsuario.show();
                            MarkerUsuario.draggable=true;
                            MarkerUsuario.enableDragging(); break;
       }
     }
}

/*Funcion guardarPosicionyEstado
 *param posicion
 *Realiza la peticion ajax, para guardar el estado y la posicion
 */
function guardarPosicionyEstado(position){
	lat=position.coords.latitude;
	lon=position.coords.longitude;
	estado=document.getElementById("comment").value;
	posAJAX="../locations/guardar"
	params="?lat="+lat+"&lon="+lon+"&status="+estado;

	var req = new XMLHttpRequest();
	req.open('GET', posAJAX+params, false);
	req.send(null);

        if(req.status == 200){
            infowindowUsuario=generarinfowindow({"nombre":usuario, "login": usuario, "localizacion":{"status":estado, "fecha" :new Date()}})
            mostrarinfowindow(MarkerUsuario);
            
            document.getElementById("actualizarEstado").value="Estado actualizado"
      }else{
            document.getElementById("actualizarEstado").value="Fallo en la actualizacion"
      }
}

/* //funcion de pruebas, ahora en desuso
function guardarEstado(){
	estado=document.getElementById("comment").value;
	posAJAX="../locations/guardarStatus"
	params="?status="+estado;

	var req = new XMLHttpRequest();
	req.open('GET', posAJAX+params, false);
	req.send(null);

        mostrarinfowindow(MarkerUsuario);
}
*/

/*Funcion mostrarinfowindow
 *param marker
 *Abre el infowindow para el marcador pasado por parametro
 */
function mostrarinfowindow(marker){
        GEvent.trigger(marker, 'click')
                    {
                       marker.openInfoWindow(infowindowUsuario);
                    }
}

/*Funcion clickinfowindow
 *Lanza un evento click sobre el markador pasado por parametro, abrira el infowindow asociado
 */
function clickinfowindow(marker){
    GEvent.addListener(marker, 'click', function(){
                              marker.openInfoWindowHtml(marker.title);
                           });
}

/*Funcion  posicionManual
 *Pasa a la funcion encargada de hacer la peticion ajax, la posicion a guardar en funcion de donde se situe el marker de usuario
 */
function posicionManual(){
        guardarPosicionyEstado({"coords" : {"latitude": ""+MarkerUsuario.B.lat(), "longitude": ""+MarkerUsuario.B.lng()}})                
}

/*Funcion MostrarPosicionManual
 *Muestrala posicion del usuario mediante un infowindow
 */
function MostrarPosicionManual(){
        nameManualPos=document.getElementById("namepos").value;
        var geocoder = new GClientGeocoder();
        geocoder.getLatLng(nameManualPos, function(point) {
                                                  if (point){
                                                    map.setCenter(point, 13);
                                                    MarkerUsuario.setLatLng(point);
                                                    MarkerUsuario.openInfoWindowHtml("Ahora estas situado en: "+nameManualPos);
                                                  }else{
                                                    MarkerUsuario.openInfoWindowHtml("Lo siento no he encontrado: "+nameManualPos);
                                                  }
                                                })
}

/*Funcion ocultarPosicion
 *Oculta la posicion del usuario, borrando la posicion en la bd.
 */
function ocultarPosicion(){
	posAJAX="../locations/ocultarPosicion"

	var req = new XMLHttpRequest();
	req.open('GET', posAJAX, false);
	req.send(null);

        if(req.status == 200)
            document.getElementById("actualizarEstado").value="Posicion ocultada"
        else
            document.getElementById("actualizarEstado").value="Fallo en ocultar posicion"
}

/*Funcion noActualizado
 *Pone como texto del boton de actualizar.
 */
function noActualizado(){
    document.getElementById("actualizarEstado").value="No ha podido reconocerse la posicion";
}

/*Funcion guardarEstado
 *Guarda el estado en funcion del modo
 */
function guardarEstado(){
	modo=checkedRadio(document.formestado.posicion)
        document.getElementById("actualizarEstado").disable=false
	if(modo=="automatico"){
		//navigator.geolocation.getCurrentPosition(guardarPosicionyEstado);
                callbackGetPos=navigator.geolocation.watchPosition(guardarPosicionyEstado,noActualizado);
	}else if(modo=="manual"){
                if(window['callbackGetPos'] != undefined)
                     navigator.geolocation.clearWatch(callbackGetPos);
		posicionManual();
	}else if(modo=="no mostrar"){
                if(window['callbackGetPos'] != undefined)
                     navigator.geolocation.clearWatch(callbackGetPos);
		ocultarPosicion();
	}
}


