var map=null; //identificador de mapa
var usuario=null; //login del usuario
var MarkerUsuario=null; //identificador marker del usuario
var infowindowUsuario; //texto dle infowindow del usuario
var amigosArray=new Array(); //array de amigos, en cada posicion existira un segudno array con nombre, marker, infowindow y fecha
var lapsoMin=1440; //primero 24 horas 24*60=1440
var callbackGetPos; //identificador del proceso de geolocalizacion


/*Funcion initialize
 *param usu
 *Funcion encargada de inicializar el usuario e iniciar el mapa con la posicion obtenida actual.
 **/
function initialize(usu) {
	usuario=usu
	navigator.geolocation.getCurrentPosition(centrarMap);
}


/*Funcion existeMarker
 *param login
 *Busca saber si ya existe el marker del usuario pasado por parametro en el array de amigos.
 *Devolviendo el indice del mismo en el array.
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
        var antes=amigosArray[i][3].getTime()+(24*60*1000); //se eliminan los que actualizaron hace mas de 24 horas
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
 *Genera el contenido que mostrara el infowindow para cada amigo con el que se llame a la funcion.
 *La ventana infowindow tiene codigo javascript incluido para que el campo del tiempo sea actualizado
 *cada minuto. Esta funcion de intervalo es finalizada al eliminar el marker y solo latente desde que
 *se muestra el infowindow
 *return UcontentString: contenido del infowindow
 */
function generarinfowindow(amigo){
        UcontentString="<div id=content><div id=siteNotice></div><h1>"+amigo.nombre+"</h1><div id=bodyContent><p>"+amigo.localizacion.status+"</p>";
        UcontentString+="<p id=\"timer-"+amigo.login+"\">"+calcularTiempo(amigo.localizacion.fecha.getTime())+"</p>"
        UcontentString+="<script>if(window['timer"+amigo.login+"'] != undefined) clearInterval(timer"+amigo.login+");"
        UcontentString+="timer"+amigo.login+"=setInterval(\"if(document.getElementById('timer-"+amigo.login+"')!=null){"
        UcontentString+="document.getElementById('timer-"+amigo.login+"').innerHTML=calcularTiempo("+amigo.localizacion.fecha.getTime()+"); "
        //UcontentString+="console.log('actualizado"+amigo.localizacion.status+"')"
        //UcontentString+="}else{"
        //UcontentString+="console.log('NO SE pudo actualizado"+amigo.localizacion.status+"')"
        UcontentString+="}\",6000)"
        UcontentString+="</script></div></div>";

        return UcontentString;
}

/*Funcion anyadirAmigos
 *Añade amigos al mapa, que hayan actualizado hace menos de 24 horas en la primera llamada, a continuacion las sucesibas
 *seran de los usuarios que actualizaran en ese minuto de intervalo entre llamadas.
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
                            clearInterval("timer"+amigos[i].login)


                            var newAmigoArray=new Array(amigos[i].login,markerAmigo,generarinfowindow(amigos[i]),amigos[i].localizacion.fecha)
                            amigosArray.push(newAmigoArray)
                            nAmigo=existeMarker(amigos[i].login)

                            GEvent.addListener(amigosArray[nAmigo][1], 'click', function(){
                                                                    amigosArray[nAmigo][1].openInfoWindowHtml(amigosArray[nAmigo][2]);
                                                                });

                            markerAmigo.draggable=false;
                            markerAmigo.disableDragging();
                        }else if (amigosArray[nAmigo][3] < amigos[i].localizacion.fecha){
                            amigosArray[nAmigo][1].setLatLng(new GLatLng(amigos[i].localizacion.lat, amigos[i].localizacion.lon))

                            amigosArray[nAmigo][2]=generarinfowindow(amigos[i])

                            amigosArray[nAmigo][3]=amigos[i].localizacion.fecha

                        }
                }
                borrarAmigosViejos()
	}
}


/*Function calcularTiempo
 *param now
 *Funcion que calcula hace cuanto tiempo se actualizo (maximo 24 horas y 60 minutos)
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
        case 1 : if (retorno!="") retorno+="y "; retorno+=act.getMinutes()+" minuto "; break;
        default: if (retorno!="") retorno+="y "; retorno+=act.getMinutes()+" minutos "; break;
    }
    if (retorno=="")
            retorno="Menos de un minuto"
    return retorno;
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
 *y comienza el una funcion con un intervalo de un minuto para añadir los amigos.
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

/*checkedRadio
 *param radioObj
 *Esta funcion devuelve el value del primer seleccionado en un grupo de radio buttons.
 *return: cadena value del radio.
 */

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
        /*for each (var i in r){if(i.checked)return i.value;}return ""; //funcion mas corta que funciona en firefox pero no chrome*/
}

/*Funcion showinfomanual
 *Funcion que modifica el javascript que cambia el aspecto y acceso formulario de envio de estado y el marker del usuario
 *en funcion del estado seleccionado en los radio button.
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
 *Realiza la peticion ajax, para guardar el estado y la posicion.
 *Posicion no siempre sera una llamada directa de geolocalizacion, por lo tanto no tendra todos los valores, vease 'posicionManual'
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

            GEvent.trigger(MarkerUsuario, 'click')
                    {
                       MarkerUsuario.openInfoWindow(infowindowUsuario);
                    }
            
            document.getElementById("actualizarEstado").value="Estado actualizado"
      }else{
            document.getElementById("actualizarEstado").value="Fallo en la actualizacion"
      }
}

/*Funcion  posicionManual
 *Pasa a la funcion encargada de hacer la peticion ajax, la posicion a guardar en funcion de donde se situe el marker de usuario
 *en uan extructura similar a uan llamada de geolocalizacion
 */
function posicionManual(){
        guardarPosicionyEstado({"coords" : {"latitude": ""+MarkerUsuario.B.lat(), "longitude": ""+MarkerUsuario.B.lng()}})                
}

/*Funcion MostrarPosicionManual
 *Busca la posicion por Geocoder del nombre que se le proporciona por el campo.
 *Mueve el Marker del usuario a esa posicion. Y muestra en un infowindow la informacion de si ha podido encontrarla o no.
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

/*Funcion guardarEstado
 *Dependiendo dle modo de guardado de estado que este seleccionado se gestiona en este punto
 *que funcion debe ser llamada.
 */
function guardarEstado(){
	modo=checkedRadio(document.formestado.posicion)
        document.getElementById("actualizarEstado").disable=false
	if(modo=="automatico"){
		//navigator.geolocation.getCurrentPosition(guardarPosicionyEstado);
                callbackGetPos=navigator.geolocation.watchPosition(guardarPosicionyEstado,function(){document.getElementById("actualizarEstado").value="No ha podido reconocerse la posicion";});
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


/*PRACTICA 3
*/
//$(document).ready(function(){
//        $.ajax({
//        });
//});

function comprobarPeticiones(){
    $.ajax({
        url: "../solicitudes/getSolicitudesRecibidas",
        //context: $("#areaNotificacion"),
        //type: "GET",
        dataType: "json",
        success: function(solicitudes){
                   $.each(solicitudes,function(i,value){$("#areaNotificacion").append("<p id='solicitud"+value.id+"'>"+value.nombre+" "+value.apellidos+" <a href='javascript:responderASolicitudDe("+value.id+",true)'>Si</a> <a href='javascript:responderASolicitudDe("+value.id+",false)'>No</a></p>")})
          },
        error: function(e){ console.log(e); alert('Update failed!'+e); }
        })
}

//<editor-dold desc="ResponderASolicitud">
function responderASolicitudDe(id,respuesta){
    $.ajax({
        url: "../solicitudes/responderSolicitud",
        data: ({"id": id,"respuesta": respuesta}),
        //context: $("#areaNotificacion"),
        type: "POST",
        dataType: "json",
        success: function(){$("#solicitud"+id).remove()},
        error:   function(){$("#solicitud"+id).html("No ha sido aceptado, intentelo más tarde.")}
        })
}
//</editor-fold>
