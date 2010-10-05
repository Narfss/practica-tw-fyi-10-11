<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Perfil de Usuario</title>
  </head>
  <body>
    <form action="guardarPerfil">
      <!-- Igual que en pagina de registro -->
      <label for="nombre">Nombre: </label>
        <input type="text" id="nombre" name="nombre" value="${usuario.nombre}"/><br/>
      <label for="apellidos">Apellidos: </label>
        <input type="text" id="apellidos" name="apellidos" value="${usuario.apellido}" /><br/>
      <label for="localidad">Localidad: </label>
        <input type="text" id="localidad" name="localidad" value="${usuario.localidad}"/><br/>
      Fecha nacimiento:
         <select id="dia" name="dia">
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
            <br />
                    <label for="email" >email: </label>
                            <input type="text" id="email" name="email" value="${usuario.email}"/><br/>
                    <label for="usuario" >Usuario: </label>
                            <input type="text" id="login" name="login"/><br/>
                    <label for="password" >Contraseña: </label>
                                    <input type="password" id="password" name="password" /><br/>
                    <label for="password">Confirmacion: </label>
                                    <input type="password" id="password2" name="password2" />

                    <select id="sexo" name="sexo"/>
                      <option value="H">Hombre</option>
                      <option value="M">Mujer</option>
                    <input type="submit" value="Enviar" /> <input type="reset" /><br/>
    </form>


  </body>
</html>
