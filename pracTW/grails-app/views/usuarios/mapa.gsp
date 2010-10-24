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
    <title>Mapa</title>
  </head>
  <body>
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
                <textarea name="comment" cols="22" rows="4"></textarea><br/>
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
          <!--<a href="index"><img src="../images/default/comunlogo.png" id="generallogo" alt="Skyks"></a>-->>
          <div id="generallogo"></div>
          <div>
              <h1>Mapa</h1>
              <p>Desde este punto del sitio web puedes ver las actividades de tus amigos.</p>
              <center>
                <div id="ejemplo"  class="ejemplo" style="background-image:url('../images/ejemplos/ejemplo.jpg');  height: 320px; width: 320px;"></div>
              </center>
          </div>
        </span>
  </body>

</html>
