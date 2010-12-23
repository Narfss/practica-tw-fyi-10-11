/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var usu=null;
var find=null;//variable que contendra los datos obtenidos de la busqueda;

function rutadeimagen(login, tieneImagen){
    if(tieneImagen)
        return "../images/perfiles/"+login+"/icono.jpg"
    return "../images/default/perfil.jpg"
}

function amigosEncontrados()
{

   $('#busqueda tbody').html("");
   $.ajax({
       type:"Get",
       url:"../usuarios/buscar",
       data:$('#quest').serialize(),
       dataType:"json",
       success:function(find){
           $.each(find,function(i,amigo){
               fila="<tr class=\"fila\">"
               fila+="<td align='center'><img src='"+rutadeimagen(amigo.login, amigo.tieneImagen)+"'class=\"icono\"></td>"
               fila+="<td>"+amigo.nombre+"</td>"
               fila+="<td>"+amigo.apellidos+"</td>"
               fila+="<td>"+amigo.localidad+"</td>"
               fila+='<td align="center" id="solicitud'+amigo.login+'"><a href="javascript:solicitarAmistad(\''+amigo.login+'\')"><img src="../images/default/enviasolicitud.png" alt="Solicitar amistad"/></a></td>'
               fila+="</tr>";
               $('#busqueda tbody').append(fila)
               $("#busqueda").tablesorter();
            })
            if(find.length==0) $('#busqueda tbody').append("<tr><td colspan='5' align='center'>No hay coincidencias para los patrones introducidos.</td></tr>")
       },
       error:function(error){$('#busqueda tbody').append("<tr><td colspan='5' align='center'>Ha habido un error en el servidor, intentelo mas tarde.</td></tr>")}
   })
}


function solicitarAmistad(idDest)
{
    $.ajax({
        url: "../solicitudes/enviarSolicitud",
        data:({"idDest":idDest}),
        type: "GET",
        dataType:"json",
        success:function(){$("#solicitud"+idDest).html('<img src="../images/default/enviadasolicitud.png" alt="Esperando aceptación"/>')},
        error:  function(){$("#solicitud"+idDest).html('<img src="../images/default/enviadasolicitudFallo.png" alt="Ha ocurrido algun error en el servidor, intentelo más tarde."/>')}
    })

}

/*
//Funcion que se usa para ordenar las fichas en el DOM
function ordenarFichas(valor)
{
    var nombreAsc = true;
    var apellidosAsc = true;
    var localidadAsc = true;

	var fichas = document.getElementsByTagName("table")[0].getElementsByTagName("tr");
	var cuerpo = document.getElementsByTagName("tbody")[0];
	for(var i=2;i<fichas.length;i++)
	{
		var ficha = fichas[i];
		var j = i-1;

		if(valor == "nombre")
		{
			if(nombreAsc)
			{
				while (j >= 0 && fichas[j].getElementsByTagName("td")[1].firstChild.firstChild.nodeValue > ficha.getElementsByTagName("td")[1].firstChild.firstChild.nodeValue)
				{
					cuerpo.insertBefore(fichas[j+1],fichas[j]);
					j--;
				}
				cuerpo.insertBefore(fichas[j+1],ficha);
			}
			else
			{
				while (j >= 0 && fichas[j].getElementsByTagName("td")[1].firstChild.firstChild.nodeValue < ficha.getElementsByTagName("td")[1].firstChild.firstChild.nodeValue)
				{
					cuerpo.insertBefore(fichas[j+1],fichas[j]);
					j--;
				}
				cuerpo.insertBefore(fichas[j+1],ficha);
			}
		}

		if(valor == "apellidos")
		{
			if(apellidosAsc)
			{
				while (j > 0 && parseInt(fichas[j].getElementsByTagName("td")[2].firstChild.firstChild.nodeValue) > parseInt(ficha.getElementsByTagName("td")[2].firstChild.firstChild.nodeValue))
				{
					cuerpo.insertBefore(fichas[j+1],fichas[j]);
					j--;
				}
				cuerpo.insertBefore(fichas[j+1],ficha);
			}
			else
			{
				while (j > 0 && parseInt(fichas[j].getElementsByTagName("td")[2].firstChild.firstChild.nodeValue) < parseInt(ficha.getElementsByTagName("td")[2].firstChild.firstChild.nodeValue))
				{
					cuerpo.insertBefore(fichas[j+1],fichas[j]);
					j--;
				}
				cuerpo.insertBefore(fichas[j+1],ficha);
			}
		}

		if(valor == "localidad")
		{
			if(localidadAsc)
			{
				while (j >= 0 && fichas[j].getElementsByTagName("td")[3].firstChild.firstChild.nodeValue > ficha.getElementsByTagName("td")[3].firstChild.firstChild.nodeValue)
				{
					cuerpo.insertBefore(fichas[j+1],fichas[j]);
					j--;
				}
				cuerpo.insertBefore(fichas[j+1],ficha);
			}
			else
			{
				while (j >= 0 && fichas[j].getElementsByTagName("td")[3].firstChild.firstChild.nodeValue < ficha.getElementsByTagName("td")[3].firstChild.firstChild.nodeValue)
				{
					cuerpo.insertBefore(fichas[j+1],fichas[j]);
					j--;
				}
				cuerpo.insertBefore(fichas[j+1],ficha);
			}
		}

        }
	if(valor == "nombre")
	{
		if(nombreAsc)
		{
			nombreAsc = false;
			fichas[0].getElementsByTagName("td")[1].getElementsByTagName("img")[0].src = "arrowup.gif";
		}
		else
		{
			nombreAsc = true;
			fichas[0].getElementsByTagName("td")[1].getElementsByTagName("img")[0].src = "arrowdown.gif";
		}
		fichas[0].getElementsByTagName("td")[2].getElementsByTagName("img")[0].src = "../images/default/arrownone.gif";
		fichas[0].getElementsByTagName("td")[3].getElementsByTagName("img")[0].src = "../images/default/arrownone.gif";
		fichas[0].getElementsByTagName("td")[4].getElementsByTagName("img")[0].src = "../images/default/arrownone.gif";
	}
	if(valor == "apellidos")
	{
		if(apellidosAsc)
		{
			apellidosAsc = false;
			fichas[0].getElementsByTagName("td")[2].getElementsByTagName("img")[0].src = "arrowup.gif";
		}
		else
		{
			apellidosAsc = true;
			fichas[0].getElementsByTagName("td")[2].getElementsByTagName("img")[0].src = "arrowdown.gif";
		}
		fichas[0].getElementsByTagName("td")[1].getElementsByTagName("img")[0].src = "../images/default/arrownone.gif";
		fichas[0].getElementsByTagName("td")[3].getElementsByTagName("img")[0].src = "../images/default/arrownone.gif";
		fichas[0].getElementsByTagName("td")[4].getElementsByTagName("img")[0].src = "../images/default/arrownone.gif";
	}
	if(valor == "localidad")
	{
		if(localidadAsc)
		{
			localidadAsc = false;
			fichas[0].getElementsByTagName("td")[3].getElementsByTagName("img")[0].src = "arrowup.gif";
		}
		else
		{
			localidadAsc = true;
			fichas[0].getElementsByTagName("td")[3].getElementsByTagName("img")[0].src = "arrowdown.gif";
		}
		fichas[0].getElementsByTagName("td")[1].getElementsByTagName("img")[0].src = "../images/default/arrownone.gif";
		fichas[0].getElementsByTagName("td")[2].getElementsByTagName("img")[0].src = "../images/default/arrownone.gif";
		fichas[0].getElementsByTagName("td")[4].getElementsByTagName("img")[0].src = "../images/default/arrownone.gif";
	}
}*/