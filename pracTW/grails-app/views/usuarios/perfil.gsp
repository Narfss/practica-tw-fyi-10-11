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

    <script type="text/javascript" src="../js/camposReg.js"></script>

    <title>Perfil de Usuario</title>
  </head>
  <body onload="rellenarFechas();rellenarCampos('${usuario.fechaNac.day}','${usuario.fechaNac.month}','${usuario.fechaNac.year}','${usuario.sexo}');">
    <img src="../images/default/marcaagua.png" id="marcaagua"/>
    <div id="body">
      <span id="leftspan">
        <div>
          <center>
                <img src="../images/perfiles/${usuario.login}/perfil.jpg" style="padding: 10px;"/><br/>
                <!--<a href="mapa"><img src="../images/default/compartir.png" alt="Compartir"/></a>-->
                <a href="perfil"><img src="../images/default/perfil.png" alt="Perfil"/></a>
                <a href="formBusqueda"><img src="../images/default/buscar.png" alt="Buscar"/></a>
                <a href="logout"><img src="../images/default/salir.png" alt="Salir"/></a>
          </center>
          <h1>Modificaciones</h1>
          Como usuario de nuestro servicio tienes derecho a cambiar y modificar cualquier dato incluso finalizar el servicio. Desde aquí puedes modificar tanto tu nombre como la contraseña.
          <h1>Imagen</h1>
          Por favor, haga un uso responsable de la imagen publica que tome, en caso de ser obscena, ilegal, racista... Skyks se reserva el derecho de retirar la imagen para una mejor convivencia de la comunidad.
          La imagen tiene un limite de tamaño de 200kb y solo esta permitido de lso formatos gif, png y jpg.
          <h1>Protección de datos</h1>
          Skyks reservara para uso personal los datos de registro, no serán utilizados por ningún otro grupo. De la misma forma para la mejora del sistema se recibirá información anónima del uso y funcionamiento.
        </div>
      </span>
      <span id="rightspan">
        <div id="generallogo"></div>
        <div>
        <h1>Cambiar perfil</h1>
            <form action="guardarPerfil" method="post" onSubmit="return formValidacion()">
            <!-- Igual que en pagina de registro -->
            <table>
            <tr><td class="left"><label for="nombre">Nombre:</label></td>
                <td><input type="text" id="nombre" name="nombre" value="${usuario.nombre}"/></td></tr>
            <tr><td class="left"><label for="apellidos">Apellidos:</label></td>
                <td><input type="text" id="apellidos" name="apellidos" value="${usuario.apellidos}"/></td></tr>
            <tr><td class="left"><label for="localidad">Localidad: </label></td>
                <td><input type="text" id="localidad" name="localidad" value="${usuario.localidad}"/></td></tr>
            <tr><td class="left"><label for="dia">Fecha nacimiento:</label></td>
                <td><select id="dia" name="dia"></select>
                    <select id="mes" name="mes" onchange="javascript:rellenarDias()">
                      <option value="1">Enero</option>
                      <option value="2">Febrero</option>
                      <option value="3">Marzo</option>
                      <option value="4">Abril</option>
                      <option value="5">Mayo</option>
                      <option value="6">Junio</option>
                      <option value="7">Julio</option>
                      <option value="8">Agosto</option>
                      <option value="9">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                    <select id="anyo" name="anyo" onchange="javascript:rellenarDias()"></select>
                </td></tr>

              <tr><td class="left"><label for="email" >Correo electronico: </label></td>
                  <td><input type="text" id="email" name="email"  value="${usuario.email}"/><img src="../images/default/estrella.png"></td></tr>

              <tr><td class="left"><label for="usuario" >Usuario: </label></td>
                  <td><input type="text" id="login" name="login" value="${usuario.login}"/><img src="../images/default/estrella.png"></td></tr>

              <tr><td class="left"><label for="password" >Contraseña: </label></td>
                  <td><input type="password" id="password" name="password" /><img src="../images/default/estrella.png"></td></tr>

              <tr><td class="left"><label for="password">Confirmación: </label></td>
                  <td><input type="password" id="password2" name="password2" /><img src="../images/default/estrella.png"></td></tr>

              <tr><td class="left"><label for="sexo">Sexo: </label></td>
                  <td><select id="sexo" name="sexo"/>
                        <option value="H">Hombre</option>
                        <option value="M">Mujer</option>
                      </select></td></tr>
            </table>
            <center><input type="submit" value="Cambiar perfil" class="button"/></center>
          </form>
        <h1>Imagen de perfil</h1>
          <form action="cambiarImagenPerfil" method="post" enctype="multipart/form-data">
            <center>
               <!-- Es algo redundnate, ya se ve arriba<img src="../images/perfiles/${usuario.login}/perfil.jpg" id="imagentest" alt="imagen de perfil de ${usuario.login}"/><br/>-->
               <input class="cambia-img" type="file" name="foto" id="foto" onChange="testtamimagen()"/> <img src="../images/default/Error.png" style="visibility:hidden;" id="imagenvalida"/>
               <td class="left"><input class="cambia-img" type="submit" value="Cambiar imagen" class="button"/>
            </center>
          </form>
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
