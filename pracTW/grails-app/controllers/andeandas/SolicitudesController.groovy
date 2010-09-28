package andeandas

class SolicitudesController {

    def solicitudesService
    
    def enviarSolicitud = {
        //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached()) {
            u.attach();
        }
        solicitudesService.enviarSolicitud(u, params.idDest)
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
                        apellidos: s.remitente.apellidos,
                        fechaEnvio: s.fechaEnvio)
                }
            }
        }
    }

    def responderSolicitud = {
        try {
            solicitudesService.responderSolicitud(params.id as int, params.respuesta.toBoolean())
            render(contentType:"text/json") {
                idSol = params.id
                respuesta = params.respuesta
            }
        } catch (SolicitudException se) {
            render(contentType:"text/json") {
                error = se.message
            }
        }
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
