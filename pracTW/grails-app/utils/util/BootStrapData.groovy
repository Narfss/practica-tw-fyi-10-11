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
        //si ya hay usuarios, la BD no está vacía y por tanto no creamos los datos de prueba
        if (Usuario.count()==0) {
            println("Creando datos de prueba...")
            def u = new Usuario(login:"tw", password:"tw", nombre:"Tecnologías", apellidos:"Web de la UA", sexo:Sexo.H, localidad:"Alicante", tieneImagen:true, email:"tw@ua.es", fechaNac:new GregorianCalendar(1980, Calendar.JANUARY, 1).getTime())
            def a1 = new Usuario(login:"gus", password:"gus", nombre:"Gustavo", apellidos:"de Básica", sexo:Sexo.H, localidad: "Alicante", tieneImagen:true, email:"gus@gus.com", fechaNac: new GregorianCalendar(1985, Calendar.APRIL, 20).getTime())
            def a2 = new Usuario(login:"paris", password:"paris", nombre:"Paris", apellidos:"Hilton", sexo:Sexo.M, localidad: "Los Angeles", tieneImagen:true, email:"paris.hilton@rubias.com", fechaNac:new GregorianCalendar(1981, Calendar.FEBRUARY, 17).getTime())
            def a3 = new Usuario(login:"prueba", password:"prueba", nombre:"Prueba", apellidos: "de Mentira", sexo:Sexo.M, localidad:"Madrid", tieneImagen:true, email:"prueba@prueba.com",fechaNac:new GregorianCalendar(1990, Calendar.JANUARY, 1).getTime())
            def a4 = new Usuario(login:"luisma", password:"luisma", nombre:"Luis Mariano", apellidos:"García García",sexo:Sexo.H, localidad:"Móstoles", tieneImagen:true, email:"luisma@esperanzasur.org", fechaNac:new GregorianCalendar(1974, Calendar.OCTOBER, 4).getTime())


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
	
}

