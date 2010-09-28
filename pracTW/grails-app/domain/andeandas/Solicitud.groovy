package andeandas

class Solicitud {
    Usuario remitente
    Usuario destinatario
    Date fechaEnvio
    Date fechaRespuesta
    EstadoSolicitud estado
    static constraints = {
        fechaRespuesta(nullable:true)
    }
}
