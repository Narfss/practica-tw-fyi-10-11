<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="../css/comun.css" type="text/css" rel="stylesheet" media="screen" title="principal" />
    <title>Mapa</title>
  </head>
  <body>
    <img src="../images/default/marcaagua.png" id="marcaagua"/>
      <div id="body">
      <span id="leftspan">
            <div>
              <center>
                <a href="perfil"><img src="../images/default/perfil.png" alt="Perfil"/></a>
                <a href="formBusqueda"><img src="../images/default/buscar.png" alt="Buscar"/></a>
                <a href="logout"><img src="../images/default/salir.png" alt="Salir"/></a>
              </center>
              <h1>${usuario.nombre}</h1>
              <!--<ul>
                <li><a href="perfil">Perfil: </a></li>
                <li><a href="formBusqueda">Busqueda: </a></li>
                <li><a href="logout">Salir por patas: </a></li>
              </ul>-->

              <form action="" method="post">
                <h1>Comparte:</h1>
                <textarea name="comments" cols="22" rows=·4"></textarea><br/>
                <!--<textbox> Comparte con nosotros:</textbox>-->
                Localizacion:<br/>
                <input type="radio" name="missing" value="automatico" checked="true"/>Automatico<br/>
                <input type="radio" name="missing" value="manual"/>Manual<br/>
                <input type="radio" name="missing" value="no mostrar"/>No mostrar<br/>
                <input type="button" value="Actualizar estado" class="button"/>
              </form>
            </div>
        </span>
        <span id="rightspan">
          <a href="index"><img src="../images/default/comunlogo.png" id="generallogo" alt="Skyks"></a>
          <div>
              <h1>Mapa</h1>
              <p>Desde este punto del sitio web puedes ver las actividades de tus amigos.</p>
          </div>
        </span>
  </body>

</html>
