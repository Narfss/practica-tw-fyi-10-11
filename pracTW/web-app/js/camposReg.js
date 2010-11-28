estrellaError="../images/default/estrellaError.png";
estrellaValido="../images/default/estrella.png";

/*Funcion Estrella
 *param id, validez
 *Mostrara una imagen distinta si es correcto
 *return valides: imagen que se mostrara (DOM)
 */
function Estrella(id,validez){
    if(validez){
        document.getElementById(id).src=estrellaValido;
    }else{
        document.getElementById(id).src=estrellaError;
    }
    return validez;
}

/*Funcion noVacio
 *param cadena
 *Indica si una cadena esta vacia
 *return bool
 */
function noVacio(cadena){
    if(cadena!= "")
        return true;
    return false
}

/*Funcion esMail
 *param cadena
 *Comprueba si el formato de un mail es correcto
 *return cadena
 */
function esEmail(cadena){
    var filter=/^.+@.+\..{2,3}$/;

    return filter.test(cadena);
}

/*Function emailValidacion
 *Valida el mail, y pone la imagen correcta
 */
function emailValidacion(cadena){
    return Estrella("emailVal",noVacio(cadena) && esEmail(cadena));
}

/*Funcion loginValidacion
 *param cadena
 *Compreba si el login es valido
 */
function loginValidacion(cadena){
    var req = new XMLHttpRequest();
    req.open('GET', "./loginDisponible?login=" + cadena, false);
    req.send(null);

    return Estrella("loginVal", noVacio(cadena) && (req.status == 200) && (req.responseText == "true") );/*Falta por login repetido loginDisponible(cadena)*/
}

/*Funcion passValidacion
 *param cadena
 *Coloca la imagen adecuada
 */
function passValidacion(cadena){
    return Estrella("passVal", noVacio(cadena));
}

/*Funcion pass2Validacion
 *param cadena
 *Valida la contraseña
 */
function pass2Validacion(cadena){
    return Estrella("pass2Val", noVacio(cadena) && (cadena = document.getElementById("passVal").value));
}

/*Funcion formValidacion
 *param usuario
 *Encargada de validar los campos de registro
 *return datos
 */
function formValidacion(usuario){
    email = emailValidacion(document.getElementById("email").value);
    login = true;
    if (usuario != document.getElementById("login").value)
        login = loginValidacion(document.getElementById("login").value);
    pass  = passValidacion(document.getElementById("password").value);
    pass2 = pass2Validacion(document.getElementById("password2").value);
    return email && login && pass && pass2;
}

/*Funcion daysInFebruary
 *param year
 *Valida si el año bisiesto
 */
function daysInFebruary (year){
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}

/*Funcion diasenMes
 *param mes, anyo
 *valida los meses que tienen o no 31 dias
 *return dias
 */
function diasenMes(mes,anyo){
    dias = 31
    if (mes==4 || mes==6 || mes==9 || mes==11) { dias = 30}
    if (mes==2) {dias = daysInFebruary(anyo)}
    return dias;
}

/*Funcion rellenarSelect
 *param minimo, maximo, elSel
 *Rellena con html los option de unselect
 */
function rellenarSelect(minimo,maximo,elSel){
    elSel.length=0;
    for ( var i = minimo; i<=maximo ; i++ ){
	var elOptNew = document.createElement('option');
	elOptNew.text = ""+i;
	elOptNew.value = i;

	try {
		elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
	}
	catch(ex) {
		elSel.add(elOptNew); // IE only
	}
    }
}

/*Funcion rellenarDias
 *Rellena en javascript los campos del select del dia
 */
function rellenarDias(){
    diaprevio=document.getElementById("dia").value;
    mes=document.getElementById("mes").value;
    anyo=document.getElementById("anyo").value;
    dias=diasenMes(mes,anyo);
    var elSel = document.getElementById('dia');

    rellenarSelect(1,dias,elSel);
    document.getElementById("dia").value=diaprevio;
}

/*Funcion rellenarAnyos
 *Rellena en javascript los campos del select del anyo
 */
function rellenarAnyos(){
    var elSel = document.getElementById('anyo');
    var minAnyo=1980;
    var maxAnyo=2010; //estaria bien la fecha actual o 18 años menos de la actual

    elSel.length=0;
    rellenarSelect(minAnyo,maxAnyo,elSel);
}

/*Funcion rellenarAnyos
 *Rellena en javascript el select de la fecha
 */
function rellenarFechas(){
    rellenarAnyos();
    rellenarDias();
}

/*Funcion testtamimagen
 *Validacion del formato y tamaño de imagen
 */
function testtamimagen(){
          var valido=true;
          var file = document.getElementById("imagentest").src="file:"+document.getElementById("foto").value;

          if(document.getElementById("foto").files[0].size>204800){
            valido=false;
          }

          var mime = file.substr(file.lastIndexOf('.'));
          if (mime!= '.gif' && mime!= '.jpg' && mime!= '.png'){
            valido=false;
          }

          if (valido){
            document.getElementById("imagenvalida").style.visibility = "hidden";
          }else{
            document.getElementById("imagenvalida").style.visibility = "visible";
          }
}

/*Funcion rellenarCampos
 *param dia,mes,anyo,sexo
 *rellena los elementos html con valores pasados por paramtro
 */
function rellenarCampos(dia,mes,anyo,sexo){
    document.getElementById("anyo").value=anyo;
    document.getElementById("mes").value=mes;
    document.getElementById("dia").value=dia;
    document.getElementById("sexo").value=sexo;
}