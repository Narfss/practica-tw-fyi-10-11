package andeandas

class LocationsService {

    static transactional = false

    //Obtiene la lista de amigos del usuario u que tienen una localización
    //con una antigüedad máxima del número de minutos especificado
    List getLocalizacionesAmigos(Usuario u, int mins) {
        def ahora = new Date()
        return Usuario.createCriteria().list {
            localizacion {
                between('fecha', new Date(ahora.getTime()-1000*60*mins), ahora)
            }
            amigos {
                eq('login', u.login)
            }
        }
    }
}
