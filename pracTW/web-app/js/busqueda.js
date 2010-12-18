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

   $(".fila").remove();
   $.ajax({
       type:"Get",
       url:"../usuarios/buscar",
       data:$('#quest').serialize(),
       dataType:"json",
       success:function(find){
           $.each(find,function(i,amigo){
                //amigo tiene un bool de tieneimagen
               var td1="<tr class=\"fila\"><td style=\"text-align: center\"><img src=\"../images/perfiles/"+amigo.login+"/icono.jpg\" class=\"icono\"></td>"
               var td2="<td>"+amigo.nombre+"</td><td>"+amigo.apellidos+"</td><td>"+amigo.localizaion+"</td><td><input type=\"button\" value=\"peticion\" onclick=javascript:solicitarAmistad(\""+amigo.login+"\")></tr><br>";
               //$(td1+td2).appendTo('busqueda');
               $('#busqueda').append(td1+td2)
            })
       },
       error:function(error){
           alert("error");
           $("<>No hay coincidencias para los patrones introducidos</p>").appendTo('div');}
   })
}


function solicitarAmistad(idDest)
{
    alert(idDest);
    $.ajax({
        url: "../solicitudes/enviarSolicitud",
        dataType: "json",
        data:idDest,
        success:function(){
            var p="<p>Peticion realizada</p>";
            $('#busqueda').append(p)},
        error: function(){alert('No puede realizarse la peticion'); }
        })

}