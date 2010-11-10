package andeandas


class LocationsController {

    def locationsService

    def guardar = {            
        //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached())
            u.attach();
        //Si el usuario ya tiene localización la borramos
        if (u.localizacion) {
            u.localizacion.delete()
        }
        
        Localizacion loc = new Localizacion(lat:params.lat, lon:params.lon, status:params.status)
        loc.fecha = new Date()
        u.setLocalizacion(loc)
        
        if(u.save()) {
            render(text: "OK", contentType: "text/plain")
        }
        else
            render(text: "error", contentType: "text/plain")
        
    }

    def guardarStatus = {
        //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached())
            u.attach();
        if (u.localizacion) {
            u.localizacion.status = params.status
            if (u.save())
                render("OK")
            else
                render("error")
        }
    }

    def ocultarPosicion = {
         //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached())
            u.attach();
        if (u.localizacion)
            u.localizacion.delete()
    }

    def getLocalizacionesAmigos = {
        if (!params.minutos) {
            render(text:"error: falta el parámetro 'minutos'", content:"text/plain")
            return
        }
        //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached())
            u.attach();
        def amigos = locationsService.getLocalizacionesAmigos(u,params.minutos as int)
        render(contentType:"text/json") {
            array {
                for (a in amigos) {
                    amigo = {
                        id = a.id
                        login = a.login
                        nombre = a.nombre
                        apellidos = a.apellidos
                        localizacion =  {
                            status = a.localizacion.status
                            lat = a.localizacion.lat
                            lon = a.localizacion.lon
                            fecha = a.localizacion.fecha
                        }
                    }
                }
            }
        }
    }
}
