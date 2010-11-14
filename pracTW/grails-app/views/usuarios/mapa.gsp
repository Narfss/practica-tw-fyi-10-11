<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="../css/comun.css" type="text/css" rel="stylesheet" media="screen" title="principal" id="CSSprincipal"/>
    <link href="../css/comun2.css" type="text/css" rel="alternate stylesheet" media="screen" title="secundario" id="CSSsecundario"/>

    <link href='../images/default/favicon.png' rel='shortcut icon' type='image/x-icon'/>
    <link href='../images/default/favicon.png' rel='icon' type='image/x-icon'/>

    <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=abcdefg&sensor=true" type="text/javascript"></script>
    <script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
    <script type="text/javascript">

    var map=null;
    var usuario=null;
    var MarkerUsuario;

    function initialize(usu) {
      usuario=usu
      navigator.geolocation.getCurrentPosition(centrarMap);
    }

    function anyadirAmigos(){
      var req = new XMLHttpRequest();
      req.open('GET', "../locations/getLocalizacionesAmigos?minutos=60", false);
      req.send(null);

      if (req.status == 200){
        var amigos = eval("{amigos: "+req.responseText+"}")
        for(i in amigos){
          //var txt = document.createTextNode("hola: ");
          //document.getElementById('generallogo').appendChild(txt);
          anyadirMarker(new GLatLng(amigos[i].localizacion.lat, amigos[i].localizacion.lon), amigos[i].login)
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
          setInterval(anyadirAmigos,6000);
          showinfomanual();
      }
    }

    function checkedRadio(r){
      for each (i in r){if(i.checked)return i.value;}
    }

    function showinfomanual(){
      modo=checkedRadio(document.formestado.posicion)
      console.log(MarkerUsuario);
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
     //guardarPosicionyEstado(MarkerUsuario.getLatLng())
     guardarPosicionyEstado({"coords" : {"latitude": ""+MarkerUsuario.B.lat(), "longitude": ""+MarkerUsuario.B.lng()}})
     /*
      var geocoder = new google.maps.Geocoder();
       if (geocoder) {
         geocoder.geocode({ 'address': nameManualPos }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              posicion = new GLatLng(results[0].geometry.location.ra, results[0].geometry.location.sa)
              map.setCenter(posicion, 13);
              MarkerUsuario.setLatLng(posicion);
              guardarPosicionyEstado({"coords" : {"latitude": ""+results[0].geometry.location.ra, "longitude": ""+results[0].geometry.location.sa}})
            }
            else {
              console.log('No results found: ' + status); //deberiamso hacer lago si no se encuentra?
            }
         });
      }   */
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
            }
            else {
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

    fuction infowindow(Posicion, usuarioIcon){
      var marker=anyadirMarker(position, usuarioIcon);
      var infowindow = new google.maps.InfoWindow({
      content: });

    google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(Gmap,marker);});
    }

    </script>

    <title>Mapa</title>
  </head>
  <body onload="initialize('${usuario.login}');" onunload="GUnload()">
    <img src="../images/default/marcaagua.png" id="marcaagua"/>
      <div id="body">
      <span id="leftspan">
            <div>
              <center>
                <!--No funciona, faltara conexion la tabla <img src="../images/perfiles/${usuario.login}/perfil.jpg" id="avatar"/><br/>-->
                <!--El link no funciona <a href="mapa"><img src="../images/default/compartir.png" alt="Compartir"/></a>-->
                <a href="perfil"><img src="../images/default/perfil.png" alt="Perfil"/></a>
                <a href="formBusqueda"><img src="../images/default/buscar.png" alt="Buscar"/></a>
                <a href="logout"><img src="../images/default/salir.png" alt="Salir"/></a>
              </center>
              <h1>Bienvenido</h1>
              <h2>${usuario.nombre} comparte:</h2>

              <form name="formestado" action="" method="post">
                <textarea id="comment" name="comment" cols="33" rows="4"></textarea><br/>
                Localizacion:<br/>
                <input type="radio" name="posicion" value="automatico" checked="true" onchange="showinfomanual();"/>Automatico<br/>
                <input type="radio" name="posicion" value="manual" onclick="showinfomanual();"/>Manual<br/>
                <center id="infomanual">
                  <input type="text"  name="namepos" id="namepos"/> <input type="button" value="Mostrar" class="button" onclick="MostrarPosicionManual()"/><br/>
                </center>
                <input type="radio" name="posicion" value="no mostrar" onchange="showinfomanual();"/>No mostrar<br/>
                <input type="button" value="Actualizar estado" class="button" onclick="guardarEstado()"/>
              </form>
            </div>
        </span>
        <span id="rightspan">
          <!--<a href="index"><img src="../images/default/comunlogo.png" id="generallogo" alt="Skyks"></a>-->
          <div id="generallogo"></div>
          <div>
              <h1>Mapa</h1>
              <p>Desde este punto del sitio web puedes ver las actividades de tus amigos.</p>
              <center>
                <div id="map_canvas"  style="height: 320px; width: 320px;"></div>
              </center>
          </div>
        </span>
        
    <script type="text/javascript">
        function cambiarCSS(nombre) {
          document.getElementById("CSSprincipal").setAttribute("href",nombre);
        }
    </script>
    <center id="cambioestilo">
      Cambio de estilo<br/>
      <a href="javascript:cambiarCSS('../css/comun.css');"><img src="../images/default/cssPrimario.png"/></a>
      <a href="javascript:cambiarCSS('../css/comun2.css');"><img src="../images/default/cssSegundario.png"/></a>
    </center>
  </body>

</html>
