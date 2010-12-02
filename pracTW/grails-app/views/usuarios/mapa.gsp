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
    <!-- <script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script> -->
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="../js/mapaGes.js"></script>
    <title>Mapa</title>
  </head>
  <body onload="initialize('${usuario.login}'); showinfomanual();comprobarPeticiones();" onunload="GUnload()">
    <img src="../images/default/marcaagua.png" id="marcaagua"/>
      <div id="body" class="div">
      <span id="leftspan">
            <div class="div">
              <center>
                <!--No funciona, faltara conexion la tabla <img src="../images/perfiles/${usuario.login}/perfil.jpg" id="avatar"/><br/>-->
                <!--El link no funciona <a href="mapa"><img src="../images/default/compartir.png" alt="Compartir"/></a>-->
                <a href="perfil"><img src="../images/default/perfil.png" alt="Perfil"/></a>
                <a href="formBusqueda"><img src="../images/default/buscar.png" alt="Buscar"/></a>
                <a href="logout"><img src="../images/default/salir.png" alt="Salir"/></a>
              </center>
              <h1>Bienvenido</h1>
              <p id="areaNotificacion" class="div"></p>
              <h2>${usuario.nombre} comparte:</h2>

              <form name="formestado" action="" method="post">
                <textarea id="comment" name="comment" cols="33" rows="4" onKeyUp="showinfomanual()"></textarea><br/>
                Localizacion:<br/>
                <input type="radio" name="posicion" value="automatico" checked="true" onchange="showinfomanual();"/>Automatico<br/>
                <input type="radio" name="posicion" value="manual" onchange="showinfomanual();"/>Manual<br/>
                <center id="infomanual">
                  <input type="text"  name="namepos" id="namepos"/> <input type="button" value="Mostrar" class="button" onclick="MostrarPosicionManual()"/><br/>
                </center>
                <input type="radio" name="posicion" value="no mostrar" onchange="showinfomanual();"/>No mostrar<br/>
                <input type="button" id="actualizarEstado" value="¿Algo que decir?" class="button" disabled="disabled" onclick="guardarEstado()"/>
              </form>
            </div>
        </span>
        <span id="rightspan">
          <!--<a href="index"><img src="../images/default/comunlogo.png" id="generallogo" alt="Skyks"></a>-->
          
            <a href="index"><div id="generallogo" class="div"></div></a>
          
          <div class="div">
              <h1>Mapa</h1>
              <!--<p>Desde este punto del sitio web puedes ver las actividades de tus amigos.</p>-->
              <div id="map_canvas" class="div" style="height: 450px; width: 425px;"></div>
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
