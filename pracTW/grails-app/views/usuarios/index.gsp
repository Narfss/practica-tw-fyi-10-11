<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Sample title</title>
  </head>
  <body>
    <img src="../images/logo.png" alt="logo de TW">
    <h1>Esta es la página principal de la práctica de TW</h1>

        <div id="login">
    <fieldset>
                    <form action="autentificar" method="post" id="login">
                            <label for="usuario">Usuario: </label>
                                    <input type="text" id="usuario" name="usuario" /> <input type="submit" value="Enviar"/><br/>
                            <label for="contraseña">Contraseña: </label>
                                    <input type="password" id="contraseña" name="contraseña"/>
                             <input type="reset"/>
                    </form>
    </fieldset><br/>
</div>
  </body>
</html>
