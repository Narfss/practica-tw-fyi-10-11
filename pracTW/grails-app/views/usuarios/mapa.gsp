<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="../css/usuario.css" type="text/css" rel="stylesheet" media="screen" title="principal" />
    <title>Mapa</title>
  </head>
  <body>
    <h1>Mapa</h1>

    <div id="sidebar">

      <p>Bienvenido a nuestros dominios, pobre mortal, tu nombre sera recordad
        por los siglos de los siglos ${usuario.nombre}
      </p>
      <fieldset>

        <ul>

          <li><a href="perfil">Perfil: </a></li>

          <li><a href="formBusqueda">Busqueda: </a></li>

          <li><a href="logout">Salir por patas: </a></li>

        </ul>

      </fieldset><br/>

      
      <img src="../images/pika.jpg"/>


      <form action="" method="post">

        <textbox> Comparte con nosotros:</textbox>

        <input type="button" value="Actualizar estado"/><br/>
        <input type="radio" name="missing" value="automatico" checked="true"/>Automatico<br/>
        <input type="radio" name="missing" value="manual"/>Manual<br/>
        <input type="radio" name="missing" value="no mostrar"/>no mostrar<br/>
    </div>

  </body>

</html>
