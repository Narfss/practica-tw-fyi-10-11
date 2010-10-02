<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Sample title</title>
  </head>
  <body>
    <img src="../images/logo.png" alt="logo de TW">
    <h1>Fantabulandia: by Nafss and Isa </h1>
        <p>Donde todos y cada uno de nosotros , o puede que ninguno, disfrutamos de las tecnologias web</p>
        <div id="login">
    <fieldset>
                    <form action="autentificar" method="post" id="login">
                            <label for="usuario">Usuario: </label>
                                    <input type="text" id="usuario" name="usuario" /> <input type="submit" value="Enviar"/><br/>
                            <label for="contraseña">Contraseña: </label>
                                    <input type="password" id="contraseña" name="contraseña"/>
                             <input type="reset"/>
                    </form>
      <link href="comenzarRegistro">Únete a nosotros si aun no eres miembro, tus amigos te esperan...o no ^^</link>
    </fieldset><br/>
</div>
  </body>
</html>
