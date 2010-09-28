package andeandas


class LocationsController {

    def locationService

    def guardar = {
        //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached())
        u.attach();
        println(params)
        Localizacion loc = new Localizacion(lat:params.lat, lon:params.lon,
            status:params.status, fecha: new Date())
        //println loc.properties
        u.setLocalizacion(loc)
        if(u.save()) {
            render(text: "OK", contentType: "text/plain")
        }
        else
            render(text: "error", contentType: "text/plain")
        
    }

    def getLocalizacionesAmigos = {
        //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached())
            u.attach();
        def amigos = locationService.getLocalizacionesAmigos(u,params.mins as int)
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
