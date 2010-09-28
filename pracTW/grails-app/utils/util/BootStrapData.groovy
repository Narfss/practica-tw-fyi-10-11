/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package util

import andeandas.*

/**
 *
 * @author otto
 */
public class BootStrapData {
    public static void createData() {
        def u = new Usuario(login:"tw", password:"tw", nombre:"Tecnologías", apellidos:"Web de la UA", sexo:Sexo.H, localidad:"Alicante", tieneImagen:true)
         def a1 = new Usuario(login:"gus", password:"gus", nombre:"Gustavo", apellidos:"de Básica", sexo:Sexo.H, localidad: "Alicante", tieneImagen:true)
         def a2 = new Usuario(login:"paris", password:"paris", nombre:"Paris", apellidos:"Hilton", sexo:Sexo.M, localidad: "Los Angeles", tieneImagen:true)
         def a3 = new Usuario(login:"prueba", password:"prueba", nombre:"Prueba", apellidos: "de Mentira", sexo:Sexo.M, localidad:"Madrid", tieneImagen:true)
         def a4 = new Usuario(login:"luisma", password:"luisma", nombre:"Luis Mariano", apellidos:"García García",sexo:Sexo.H, localidad:"Móstoles", tieneImagen:true)

         u.setLocalizacion(new Localizacion(lat:38.4,lon:-0.514744, status:"hola a todos!!",fecha: new Date()))
         a1.setLocalizacion(new Localizacion(lat:38.382199,lon:-0.514744, status:"probando la práctica de TW",fecha: new Date()))
         a2.setLocalizacion(new Localizacion(lat:38.372886,lon:-0.413704,status:"de paseo",fecha: new Date()))

         a1.save()
         a2.save()
         a3.save()
         a4.save()
         
         u.addToAmigos(a1)
         u.addToAmigos(a2)
         a1.addToAmigos(u)
         a2.addToAmigos(u)
         u.save(flush:true)

         def s = new Solicitud(remitente:a3, destinatario:u, fechaEnvio:new Date(), estado:EstadoSolicitud.PENDIENTE)
         s.save(flush:true)
         def s2 = new Solicitud(remitente:a4, destinatario:u, fechaEnvio:new Date(), estado:EstadoSolicitud.PENDIENTE)
         s2.save(flush:true)
         a1.save()
         a2.save()
    }
	
}

