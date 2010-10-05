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
        <p>Donde todos y cada uno de nosotros , o puede que ninguno, disfrutamos de las tecnologias web este donde este...</p>
        <div id="login">
    <fieldset>
                    <form action="autentificar" method="post" id="login">
                            <label for="login">Usuario: </label>
                                    <input type="text" id="login" name="login" /> <input type="submit" value="Enviar"/><br/>
                            <label for="password">Contraseña: </label>
                                    <input type="password" id="password" name="password"/>
                             <input type="reset"/>
                    </form>
      <a href="comenzarRegistro">Únete a nosotros si aun no eres miembro, tus amigos te esperan...o no ^^</a>
    </fieldset><br/>
</div>
  </body>
</html>
