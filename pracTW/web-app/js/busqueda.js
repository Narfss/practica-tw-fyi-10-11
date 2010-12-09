/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var find=null;//variable que contendra los datos obtenidos de la busqueda;

function amigosEncontrados()
{
    //hacer la peticion ajax con jQuery

   //nombre=document.document.getElementById("nombre").value;
   //apellidos=document.document.getElementById("apellidos").value;
   //localidad=document.document.getElementById("localidad").value;

   $.ajax({
       type:"Get",
       url:"http://localhost:8080/pracTW/usuarios/buscar",
       data:$('#quest').serialize(),
       dataType:"json",
       success:function(find){
           $.each(find,function(i,amigos){
           console.log(amigos[i])
           var td1="<tr><td style=\"text-align: center\"><img src=\"../images/perfiles/"+amigos[i].nombre+"/icono.jpg\" class=\"icono\"></td>"
            var td2="<td>"+amigos[i].nombre+"</td><td>"+amigos[i].apellidos+"</td><td>"+amigos[i].localizaion+"</td></tr><br>";
            $(td1+td2).appendTo('busqueda');
            })
       },
       error:function(error){
           $("<>No hay coincidencias para los patrones introducidos</p>").appendTo('div');}
   })
}


function rellenaTabla(amigos)
{
    //meter en el html
    var td1="<tr><td style=\"text-align: center\"><img src=\"../images/perfiles/"+amigos.login+"/icono.jpg\" class=\"icono\"></td>"
    var td2="<td>"+amigos.nombre+"</td><td>"+amigos.apellidos+"</td><td>"+amigos.localizaion+"</td></tr><br>";
    $(td1+td2).appendTo('busqueda');
    
}