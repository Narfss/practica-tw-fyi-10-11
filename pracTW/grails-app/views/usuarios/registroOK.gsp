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
    <title>Registro Correcto</title>
  </head>
  <body>
   <img src="../images/default/marcaagua.png" id="marcaagua"/>
    <div id="body">
            <span style="float:left;">
		<div>
			<h1>Bienvenido</h1>
			<p>Ahora formas parte del servicio Skyks, puedes comenzar a disfrutar de la comunidad y tus amigos más localizada.</p>
                        <h1>¿Que hacer ahora?</h1>
                        <p>Comienza revisando tu perfil, tus amigos y saludados a todos, para que sepan que un nuevo usuario ha llegado a la ciudad.</p>
                </div>
	   </span>
	   <span style="float:right;">
		<div id="generallogo"></div>
                <div>
                  <h1>Registro Correcto</h1>
                  <link href="index">El registro como ${usuario.nombre} a finalizado con éxito.</link>
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
