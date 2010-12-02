package andeandas

class SolicitudesController {

    def solicitudesService
    
    def enviarSolicitud = {
        //obtiene el usuario actual de la sesión HTTP
        try {
            //chequeo de parámetros HTTP
            if (!params.idDest)
                throw new Exception("Falta el parámetro idDest")
            Usuario u = session.user;
            //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
            //hay que reattacharlo
            if (!u.isAttached()) {
               u.attach();
            }
            solicitudesService.enviarSolicitud(u, params.idDest)
            render(text:"OK", contentType:"text/plain")
        }
        catch(Exception e) {
            render(text:"error: " + e.message, contentType:"text/plain", status:500)
        }
    }

    def getSolicitudesRecibidas = {
        //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached()) {
            u.attach();
        }
        def sols = solicitudesService.getSolicitudesRecibidas(u)
        render(contentType:"text/json") {
            array {
                for (s in sols) {
                    solicitud(
                        id: s.id,
                        login: s.remitente.login,
                        nombre: s.remitente.nombre,
                        apellidos: s.remitente.apellidos)
                }
            }
        }
        render(text: "OK", contentType: "text/plain")
    }

    def responderSolicitud = {
        try {
            solicitudesService.responderSolicitud(params.id as int, params.respuesta.toBoolean())
            render(contentType:"text/json") {
                idSol = params.id
                respuesta = params.respuesta
            }
            render(text:"OK", contentType:"text/plain")
        } catch (SolicitudException se) {
            render(contentType:"text/json") {
                error = se.message
            }
        }
        render(text:"OK", contentType:"text/plain")
    }

    def getSolicitudesAceptadas = {
        //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached()) {
            u.attach();
        }
        def sols = solicitudesService.getSolicitudesAceptadas(u)
        render(contentType:"text/json") {
            array {
                for (s in sols) {
                    //FIXME: el serializador JSON serializa los enums de forma "rara". Ver si se puede cambiar
                    solicitud(
                        id: s.id,
                        login: s.destinatario.login,
                        nombre: s.destinatario.nombre,
                        apellidos: s.destinatario.apellidos,
                        estado: s.estado,
                        fecha: s.fecha)
                }
            }
        }
    }
}
