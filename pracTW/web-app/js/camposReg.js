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
    return Estrella("loginVal", noVacio(cadena));
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