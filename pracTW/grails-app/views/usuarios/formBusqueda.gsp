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
    
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="http://tablesorter.com/jquery.tablesorter.min.js"></script>
    <script type="text/javascript" src="../js/busqueda.js"></script>

    <title>Pagina de busqueda</title>
  </head>
  <body>
   <img src="../images/default/marcaagua.png" id="marcaagua"/>
      <div id="body" class="div">
      <span id="leftspan">
            <div class="div">
              <center>
                <!--<a href="mapa"><img src="../images/default/compartir.png" alt="Compartir"/></a>-->
                <a href="perfil"><img src="../images/default/perfil.png" alt="Perfil"/></a>
                <a href="formBusqueda"><img src="../images/default/buscar.png" alt="Buscar"/></a>
                <a href="logout"><img src="../images/default/salir.png" alt="Salir"/></a>
              </center>
              <h1>Busqueda</h1>
              <form id="quest" method="get" action="busqueda" onSubmit="return amigosEncontrados(null)">
              <fieldset>
                      <label for="Nombre">Nombre: </label><br/>
                              <input type="text" id="nombre" name="nombre" /><br/>
                      <label for="Apellidos">Apellidos: </label><br/>
                              <input type="text" id="apellidos" name="apellidos" /><br/>
                      <label for="Localidad">Localidad: </label><br/>
                              <input type="text" id="localidad" name="localidad" /><br/>
                      <center><input type="button" value="Buscar" class="button" onclick="javascript:amigosEncontrados(null)"/></center>
              </fieldset>
              </form>
            </div>
        </span>
        <span id="rightspan">
          <div id="generallogo" class="div"</div>
          <div class="div">
            <table id="busqueda" class="tablesorter">
              <thead>
              <tr>
                <th align="center">Icono</th>
                <th>Usuario</th>
                <th>Apellidos</th>
                <th>Localidad</th>
                <th align="center">Petición</th>
              </tr>
              </thead>
              <tbody>
              <!--tr><td style="text-align: center"><img src="../images/perfiles/paris/icono.jpg" class="icono"></td><td>Narf</td><td>Sirvent</td><td>Alicante</td></tr><br>
              <tr><td style="text-align: center"><img src="../images/perfiles/luisma/icono.jpg" class="icono"></td><td>Isa</td><td>Martin</td><td>Alicante</td></tr><br>
              <tr><td style="text-align: center"><img src="../images/perfiles/paris/icono.jpg" class="icono"></td><td>Narf</td><td>Sirvent</td><td>Alicante</td></tr><br>
              <tr><td style="text-align: center"><img src="../images/perfiles/luisma/icono.jpg" class="icono"></td><td>Isa</td><td>Martin</td><td>Alicante</td></tr><br-->
              </tbody>
            </table>
          </div>
        </span>
    </div>
   <!-- <script type="text/javascript">
        function cambiarCSS(nombre) {
          document.getElementById("CSSprincipal").setAttribute("href",nombre);
        }
    </script>
    <center id="cambioestilo">
      Cambio de estilo<br/>
      <a href="javascript:cambiarCSS('../css/comun.css');"><img src="../images/default/cssPrimario.png"/></a>
      <a href="javascript:cambiarCSS('../css/comun2.css');"><img src="../images/default/cssSegundario.png"/></a>
    </center>-->
  </body>
</html>