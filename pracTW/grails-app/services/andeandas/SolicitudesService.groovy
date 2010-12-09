package andeandas

class SolicitudesService {

    static transactional = false
    def amigosService

    int getNumSolicitudesRecibidas(Usuario dest) {
        return Solicitud.countByDestinatarioAndEstado(dest, EstadoSolicitud.PENDIENTE)
    }

    List getSolicitudesRecibidas(Usuario dest) {
        return Solicitud.findAllByDestinatarioAndEstado(dest, EstadoSolicitud.PENDIENTE)

    }

    int getNumSolicitudesAceptadas(Usuario u) {
        return Solicitud.countByRemitenteAndEstado(u, EstadoSolicitud.ACEPTADA)
    }

    List getSolicitudesAceptadas(Usuario u) {
        def sols = Solicitud.findAllByRemitenteAndEstado(u, EstadoSolicitud.ACEPTADA)
        //borramos las solicitudes de la BD, ya que el usuario las va a ver 
        //FIXME: siendo puntillosos, habría que borrarlas solo después de estar SEGUROS de que el usuario las ha visto
        for (sol in sols) {
            sol.delete()
        }
        return sols
    }


    void responderSolicitud(int id, boolean aceptar) {
        def sol = Solicitud.get(id)
        if (sol) {
            if (aceptar) {
                amigosService.establecerAmistad(sol.remitente, sol.destinatario)
                sol.estado = EstadoSolicitud.ACEPTADA
                sol.fechaRespuesta = new Date()
                sol.save()
            }
            else {
                //por piedad borramos la solicitud, no notificamos que ha sido rechazada
                sol.delete(flush:true)
                //En vez de esto anterior, se podría hacer
                //sol.estado = EstadoSolicitud.RECHAZADA
                //sol.fechaRespuesta = new Date()
            }
        }
        else throw new SolicitudException("Solicitud no encontrada: " + id)
    }

    void enviarSolicitud(Usuario u, String login) {
        def dest = Usuario.findByLogin(login)
        if (dest) {
             //comprobar que la solicitud no exista ya. Si ya existe no hacemos nada
             def solAnterior = Solicitud.findByRemitenteAndDestinatario(u,dest)
             if (!solAnterior) {
                def sol = new Solicitud(remitente: u, destinatario: dest, fechaEnvio: new Date(), estado:EstadoSolicitud.PENDIENTE)
                if (!sol.save())
                    throw new SolicitudException("Error intentando guardar solicitud")
             }
             else
                println "Ya existía una solicitud de " + u.login + " para " + dest.login
        }
        else throw new SolicitudException("Usuario no encontrado: " + login)
    }
}
