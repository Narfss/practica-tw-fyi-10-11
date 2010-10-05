<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Pagina de busqueda</title>
  </head>
  <body>
    <h1>Pagina de busqueda</h1>
    <div>
	<form method="get" action="buscar">
	<fieldset>
		<label for="Nombre">Nombre: </label>
			<input type="text" id="nombre" name="nombre" /><br/>
		<label for="Apellidos">Apellidos: </label>
			<input type="text" id="apellidos" name="apellidos" /><br/>
                <label for="Localidad">Localidad: </label>
			<input type="text" id="localidad" name="localidad" /><br/>
                <input type="button" value="Buscar" />
        </fieldset>
	</form>
</div>
  </body>
</html>
