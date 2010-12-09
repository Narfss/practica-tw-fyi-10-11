package andeandas

class SolicitudesController {

    def solicitudesService

    def enviarSolicitud = {
        if (!params.idDest) {
            render(text:"Error: falta parámetro idDest", contentType:"text/plain", status:500)
            return
        }

        //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached()) {
            u.attach();
        }
        try {
            solicitudesService.enviarSolicitud(u, params.idDest)
            render(text:"OK", contentType:"text/plain")

        }
        catch(SolicitudException se) {
            println se
            render(text:"Error: " + se, contentType:"text/plain", status:500)
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
                    solicitud(
                        id: s.id,
                        login: s.destinatario.login,
                        nombre: s.destinatario.nombre,
                        apellidos: s.destinatario.apellidos)
                }
            }
        }
    }
}
