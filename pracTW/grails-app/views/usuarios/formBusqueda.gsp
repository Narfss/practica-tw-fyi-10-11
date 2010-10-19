<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="../css/comun.css" type="text/css" rel="stylesheet" media="screen" title="principal" />
    <title>Pagina de busqueda</title>
  </head>
  <body>
   <img src="../images/default/marcaagua.png" id="marcaagua"/>
      <div id="body">
      <span id="leftspan">
            <div>
              <center>
                <a href="mapa"><img src="../images/default/compartir.png" alt="Compartir"/></a>
                <a href="perfil"><img src="../images/default/perfil.png" alt="Perfil"/></a>
                <a href="formBusqueda"><img src="../images/default/buscar.png" alt="Buscar"/></a>
                <a href="logout"><img src="../images/default/salir.png" alt="Salir"/></a>
              </center>
              <h1>Busqueda</h1>
              <form method="get" action="buscar">
              <fieldset>
                      <label for="Nombre">Nombre: </label>
                              <input type="text" id="nombre" name="nombre" /><br/>
                      <label for="Apellidos">Apellidos: </label>
                              <input type="text" id="apellidos" name="apellidos" /><br/>
                      <label for="Localidad">Localidad: </label>
                              <input type="text" id="localidad" name="localidad" /><br/>
                      <center><input type="button" value="Buscar" class="button" /></center>
              </fieldset>
              </form>
            </div>
        </span>
        <span id="rightspan">
          <a href="index"><img src="../images/default/comunlogo.png" id="generallogo" alt="Skyks"></a>
          <div>
            <table id="busqueda">
              <tr><th>Icono</th><th>Usuario</th><th>Apellidos</th><th>Localidad</th></tr>
              <tr><td>Icono</td><td>Narf</td><td>Sirvent</td><td>Alicante</td></tr>
              <tr><td>Icono</td><td>Isa</td><td>Martin</td><td>Alicante</td></tr>
            </table>
          </div>
        </span>
    </div>
  </body>
</html>
