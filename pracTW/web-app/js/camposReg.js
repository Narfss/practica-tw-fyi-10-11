estrellaError="../images/default/estrellaError.png";
estrellaValido="../images/default/estrella.png";

function Estrella(id,validez){
    if(validez){
        document.getElementById(id).src=estrellaValido;
    }else{
        document.getElementById(id).src=estrellaError;
    }
    return validez;
}

function noVacio(cadena){
    if(cadena!= "")
        return true;
    return false
}

function esEmail(cadena){
    var filter=/^.+@.+\..{2,3}$/;

    return filter.test(cadena);
}

function emailValidacion(cadena){
    return Estrella("emailVal",noVacio(cadena) && esEmail(cadena));
}

function loginValidacion(cadena){
    var req = new XMLHttpRequest();
    req.open('GET', "./loginDisponible?login=" + cadena, false);
    req.send(null);

    return Estrella("loginVal", noVacio(cadena) && (req.status == 200) && (req.responseText == "true") );/*Falta por login repetido loginDisponible(cadena)*/
}

function passValidacion(cadena){
    return Estrella("passVal", noVacio(cadena));
}

function pass2Validacion(cadena){
    return Estrella("pass2Val", noVacio(cadena) && (cadena = document.getElementById("passVal").value));
}

function formValidacion(){
    email = emailValidacion(document.getElementById("email").value);
    login = loginValidacion(document.getElementById("login").value);
    pass  = passValidacion(document.getElementById("password").value);
    pass2 = pass2Validacion(document.getElementById("password2").value);
    return email && login && pass && pass2;
}

function daysInFebruary (year){
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}

function diasenMes(mes,anyo){
    dias = 31
    if (mes==4 || mes==6 || mes==9 || mes==11) { dias = 30}
    if (mes==2) {dias = daysInFebruary(anyo)}
    return dias;
}

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

function rellenarDias(){
    diaprevio=document.getElementById("dia").value;
    mes=document.getElementById("mes").value;
    anyo=document.getElementById("anyo").value;
    dias=diasenMes(mes,anyo);
    var elSel = document.getElementById('dia');

    rellenarSelect(1,dias,elSel);
    document.getElementById("dia").value=diaprevio;
}

function rellenarAnyos(){
    var elSel = document.getElementById('anyo');
    var minAnyo=1990;
    var maxAnyo=2010; //estaria bien la fecha actual o 18 años menos de la actual

    elSel.length=0;
    rellenarSelect(minAnyo,maxAnyo,elSel);
}

function rellenarFechas(){
    rellenarAnyos();
    rellenarDias();
}

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

function rellenarCampos(dia,mes,anyo,sexo){
    document.getElementById("anyo").value=anyo;
    document.getElementById("mes").value=mes;
    document.getElementById("dia").value=dia;
    document.getElementById("sexo").value=sexo;
}