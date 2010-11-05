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

    <title>Pagina de registro para nuevos usuarios</title>
  </head>
  <body onload="javascript:rellenarFechas()" >
    <img src="../images/default/marcaagua.png" id="marcaagua"/>
    <div id="body">
      <span style="float:left;">
        <div>
          <h1>Bienvenido</h1>
          Esta a punto de formar parte de al comunidad Skyks, por favor tome tiempo y complete los datos de registro correctamente. Los campos marcados con una estrella son de especial importancia.
          <h1>Servicio</h1>
          El servicio es gratuito, tan solo podrán ser cargados las cuotas o conexiones a internet a las que estés abonado, por favor consultes su proveedor telefónico.
          <h1>Protección de datos</h1>
          Skyks reservara para uso personal los datos de registro, no serán utilizados por ningún otro grupo. De la misma forma para la mejora del sistema se recibirá información anónima del uso y funcionamiento.
        </div>
      </span>
      <span style="float:right;">
        <div id="generallogo"></div>
        <div>
        <h1>Formulario</h1>
	<form name="registro" action="registro" method="post" onSubmit="return formValidacion(null)">
          <table>
            <tr><td class="left"><label for="nombre">Nombre:</label></td>
                <td><input type="text" id="nombre" name="nombre"/></td></tr>
            <tr><td class="left"><label for="apellidos">Apellidos:</label></td>
                <td><input type="text" id="apellidos" name="apellidos"/></td></tr>
            <tr><td class="left"><label for="localidad">Localidad: </label></td>
                <td><input type="text" id="localidad" name="localidad"/></td></tr>
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
                  <td><input type="text" id="email" name="email" onchange="javascript:emailValidacion(this.value)"/><img src="../images/default/estrella.png" id="emailVal"></td></tr>

              <tr><td class="left"><label for="usuario" >Usuario: </label></td>
                  <td><input type="text" id="login" name="login" onchange="javascript:loginValidacion(this.value,null)"/><img src="../images/default/estrella.png" id="loginVal"></td></tr>

              <tr><td class="left"><label for="password" >Contraseña: </label></td>
                  <td><input type="password" id="password" name="password" onchange="javascript:passValidacion(this.value)"/><img src="../images/default/estrella.png" id="passVal"></td></tr>

              <tr><td class="left"><label for="password">Confirmación: </label></td>
                  <td><input type="password" id="password2" name="password2" onchange="javascript:pass2Validacion(this.value)"/><img src="../images/default/estrella.png" id="pass2Val"></td></tr>

              <tr><td class="left"><label for="sexo">Sexo: </label></td>
                  <td><select id="sexo" name="sexo"/>
                        <option value="H">Hombre</option>
                        <option value="M">Mujer</option>
                      </select></td></tr>

              <tr><td class="left"><input type="submit" value="Enviar" class="button"/></td>
                  <td><input type="reset" class="button"/></td></tr>
            </table>
          </form>
        </div>
      </span>
    </div>
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
