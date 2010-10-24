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
    <title>Pagina de registro para nuevos usuarios</title>
  </head>
  <body>
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
       <a href="index"><img src="../images/default/intrologo.png" id="intrologo" alt="Skyks"></a>
        <div>
        <h1>Formulario</h1>
	<form action="registro" method="post">
          <table>
            <tr><td class="left"><label for="nombre">Nombre:</label></td>
                <td><input type="text" id="nombre" name="nombre"/></td></tr>
            <tr><td class="left"><label for="apellidos">Apellidos:</label></td>
                <td><input type="text" id="apellidos" name="apellidos"/></td></tr>
            <tr><td class="left"><label for="localidad">Localidad: </label></td>
                <td><input type="text" id="localidad" name="localidad"/></td></tr>
            <tr><td class="left"><label for="dia">Fecha nacimiento:</label></td>
                <td><select id="dia" name="dia">
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                      <option value="4">04</option>
                      <option value="5">05</option>
                      <option value="6">06</option>
                      <option value="7">07</option>
                      <option value="8">08</option>
                      <option value="9">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </select>

                    <select id="mes" name="mes">
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

                    <select id="anyo" name="anyo">
                      <option value="1990">1990</option>
                      <option value="1991">1991</option>
                      <option value="1992">1992</option>
                      <option value="1993">1993</option>
                      <option value="1994">1994</option>
                      <option value="1995">1995</option>
                      <option value="1996">1996</option>
                      <option value="1997">1997</option>
                      <option value="1998">1998</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                    </select>
                </td></tr>

              <tr><td class="left"><label for="email" >Correo electronico: </label></td>
                  <td><input type="text" id="email" name="email"/><img src="../images/default/estrella.png"></td></tr>

              <tr><td class="left"><label for="usuario" >Usuario: </label></td>
                  <td><input type="text" id="login" name="login"/><img src="../images/default/estrella.png"></td></tr>

              <tr><td class="left"><label for="password" >Contraseña: </label></td>
                  <td><input type="password" id="password" name="password" /><img src="../images/default/estrella.png"></td></tr>

              <tr><td class="left"><label for="password">Confirmación: </label></td>
                  <td><input type="password" id="password2" name="password2" /><img src="../images/default/estrella.png"></td></tr>

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


  </body>
</html>
