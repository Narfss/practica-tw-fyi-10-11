/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var usu=null;
var find=null;//variable que contendra los datos obtenidos de la busqueda;

function amigosEncontrados()
{
    //hacer la peticion ajax con jQuery

   //nombre=document.document.getElementById("nombre").value;
   //apellidos=document.document.getElementById("apellidos").value;
   //localidad=document.document.getElementById("localidad").value;
   //
   //primero se ha de vacair la tabla

   $('#busqueda tbody').html("");
   $.ajax({
       type:"Get",
       url:"../usuarios/buscar",
       data:$('#quest').serialize(),
       dataType:"json",
       success:function(find){
           $.each(find,function(i,amigo){
                //amigo tiene un bool de tieneimagen
               fila="<tr class=\"fila\">"
               fila+="<td style=\"text-align: center\"><img src=\"../images/perfiles/"+amigo.login+"/icono.jpg\" class=\"icono\"></td>"
               fila+="<td>"+amigo.nombre+"</td>"
               fila+="<td>"+amigo.apellidos+"</td>"
               fila+="<td>"+amigo.localizaion+"</td>"
               fila+='<td><a href="javascript:solicitarAmistad(\''+amigo.login+'\')">Solicitar</a></td>'
               fila+="</tr>";
               $('#busqueda tbody').append(fila)
               $("#busqueda").tablesorter();
            })
       },
       error:function(error){
           alert("error");
           $("<>No hay coincidencias para los patrones introducidos</p>").appendTo('div');}
   })
}


function solicitarAmistad(idDest)
{
    $.ajax({
        url: "../solicitudes/enviarSolicitud",
        data:({"idDest":idDest}),
        type: "GET",
        dataType:"json",
        success:function(){
            var p="<p>Peticion realizada</p>";
            $('#busqueda').append(p)},
        error: function(){alert('No puede realizarse la peticion');}
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