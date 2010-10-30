package andeandas

class SecurityFilters {
    def filters = {
        SeguridadUsuariosController(controller:'usuarios', action:'mapa|perfil|logout|cambiarImagenPerfil|buscar|formBusqueda') {
            before = {
                if  (!session.user) {
                    redirect(controller:'usuarios', action:'index')
                    return false
                }
            }
        }
        SeguridadControllers(controller:'locations|amigos|solicitudes', action:'*') {
            before = {
                if  (!session.user) {
                    redirect(controller:'usuarios', action:'index')
                    return false
                }
            }
        }
    }
    
}
