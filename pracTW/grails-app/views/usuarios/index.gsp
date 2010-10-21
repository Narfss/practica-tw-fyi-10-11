<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="../css/comun2.css" type="text/css" rel="stylesheet" media="screen" title="secundario" />
    <link href="../css/comun.css" type="text/css" rel="stylesheet" media="screen" title="principal" />

    <link href='../images/default/favicon.png' rel='shortcut icon' type='image/x-icon'/>
    <link href='../images/default/favicon.png' rel='icon' type='image/x-icon'/>
    <title>Skyks</title>

    <script type="text/javascript">
	/*Animacion para las 3 imagenes de ejemplo*/
	var imagen='';
	var opacidad=0;
	var refresco=0.5;
	function reaparecer(nombre,intervalo){
		var div = document.getElementById(nombre);
		div.style.opacity = opacidad;
		opacidad = opacidad + intervalo;

		if ( (opacidad>1) && (intervalo>0) ){
			clearInterval(imagen);
			if(nombre=="ejemplo2"){
				opacidad=0;
				imagen=setInterval("reaparecer(\"ejemplo3\",0.01);", refresco);
			}else if(nombre=="ejemplo3"){
				imagen=setInterval("reaparecer(\"ejemplo3\",-0.01);", refresco);
			}
		}

		if ( (opacidad<0) && (intervalo<0) ){
			clearInterval(imagen);
			if(nombre=="ejemplo2"){
				imagen=setInterval("reaparecer(\"ejemplo2\",0.01);", refresco);
			}else if(nombre=="ejemplo3"){
				opacidad=1;
				imagen=setInterval("reaparecer(\"ejemplo2\",-0.01);", refresco);
			}
		}
	}

       function animacionejemplos(){
		imagen=setInterval("reaparecer(\"ejemplo2\",0.005,imagen);", refresco);
       }

     </script>

  </head>
  <body onload="animacionejemplos();">
	<img src="../images/default/marcaagua.png" id="marcaagua"/>
	<div id="body">
	    <span id="floatleft">
		<div id="introtexto">
			<h1>¿Que es esto?</h1>
			<p>Bienvenidos al este servicio web, skyks es un servicio "socio localizador de comentarios". Su sistema de funcionamiento se basa en la localización por medio de coordenadas los comentarios de los usuarios del sistema.</p>
			<h1>¿Para que sirve?</h1>
			<p>Por este método siempre podrás conocer las opiniones o comentarios de tus amigos o familiares estén donde estén y siempre en el contexto de su situación.</p>
			<h1>¿Cuando podre utilizarlo?</h1>
			<p>Si siempre has querido poder colocar en lo alto de la torre Eifel una nota diciendo yo estuve aquí, o simplemente quedar para ver una película en tu propia casa, skyks te proporciona una manera sencilla de poder darle un lugar a todos estos y mas cosas que quieras decir a la red.
			El equipo de skyks espera que disfrute de la experiencia.</p>
			<h1>¿Cuanto cuesta?</h1>
			<p>El servicio es gratuito, tan solo hay que registrarse.</p>
			<h1>¿Necesito algún aparato especial?</h1>
			<p>No es necesario, ya que la conexión de internet da tu localización aproximada, pero es recomendable y mucho mas exacto tener un dispositivo con capacidades geolicalizadoras (GPS)</p>
		</div>
	   </span>
	   <span id="floatright">
		<a href="index"><img src="../images/default/intrologo.png" id="intrologo" alt="Skyks"></a>
		<div id="intrologin">
			<fieldset>
				    <form action="autentificar" method="post">
					    <label for="login">Usuario: </label>
						    <input type="text" id="login" name="login"/><br/>
					    <label for="password">Contraseña: </label>
						    <input type="password" id="password" name="password"/><br/>
					    <input type="submit" value="Enviar" class="button"/> <a href="comenzarRegistro"><img src="../images/default/nuevousuario.png" id="nuevousuario"/></a>
						<!--<input type="reset" class="button"/>-->
				    </form>
			<!--<a href="comenzarRegistro">Crear nuevo usuario</a>-->
			</fieldset>
		</div>
		<div id="ejemplo"  class="ejemplo" style="background-image:url('../images/ejemplos/ejemplo.jpg');"></div>
		<div id="ejemplo2" class="ejemplo" style="opacity: 0; margin-top: -400px; background-image:url('../images/ejemplos/ejemplo2.jpg'); -moz-box-shadow: none;-webkit-box-shadow: none;"></div>
		<div id="ejemplo3" class="ejemplo" style="opacity: 0; margin-top: -400px; background-image:url('../images/ejemplos/ejemplo3.jpg'); -moz-box-shadow: none;-webkit-box-shadow: none;"></div>
	    </span>
 	</div>
  </body>
</html>
