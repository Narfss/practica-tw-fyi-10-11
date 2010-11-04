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

    <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=abcdefg&sensor=true_or_false" type="text/javascript"></script>
    <script type="text/javascript">

    var map = null;
    
    function initialize() {
      if (GBrowserIsCompatible()) {
        map = new GMap2(document.getElementById("map_canvas"));
        map.setCenter(new GLatLng(0, 0), 10);
      }
    }

    function anyadirMarker(position, usuario){
       var icon = new GIcon();

        icon.image = "../images/perfiles/" + usuario + "/icono.jpg";
        icon.iconAnchor = new GPoint(32, 64);
        icon.infoWindowAnchor = new GPoint(32, 0);
        icon.iconSize = new GSize(64, 64);
        //icon.shadow = "../images/default/marco.png"; //Queria poner la forma de la Y como marco, pero la sombra empieza en al posicion 0,0. Supongo que cuando nos expliquen como se guarda en formato icono tal vez podramos incluirle un marco o recortarla
        //icon.shadowSize = new GSize(32,32);

        map.addOverlay(new GMarker(new GLatLng(position.coords.latitude, position.coords.longitude),icon))
        //map.addOverlay(new GMarker(new GLatLng(position.coords.latitude, position.coords.longitude))) //simplemente es un test
    }

    function centrarMap(position) {
      if (map != null){
        map.setCenter(new GLatLng(position.coords.latitude, position.coords.longitude), 13);
        anyadirMarker(position, "tw");
      }
    }

    navigator.geolocation.getCurrentPosition(centrarMap);

    </script>

    <title>Mapa</title>
  </head>
  <body onload="initialize()" onunload="GUnload()">
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

              <form action="" method="post">
                <textarea name="comment" cols="33" rows="4"></textarea><br/>
                Localizacion:<br/>
                <input type="radio" name="posicion" value="automatico" checked="true"/>Automatico<br/>
                <input type="radio" name="posicion" value="manual"/>Manual
                <center id="infomanual">
                  <input type="text"  name="namepos" id="namepos"/> <input type="button" value="Mostrar" class="button"/><br/>
                </center>
                <input type="radio" name="posicion" value="no mostrar"/>No mostrar<br/>
                <input type="button" value="Actualizar estado" class="button"/>
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
