package andeandas

class UsuariosService {

    static transactional = false

    def registrar() {
        
    }

    boolean loginDisponible(String login) {
        return (!Usuario.findByLogin(login))
    }

    def buscar(String nombre, String apellidos, String localidad, Sexo sexo) {
        def result = Usuario.createCriteria().list{
            and {
                if (nombre)
                    ilike('nombre',"%${nombre}%")
                if (apellidos)
                    ilike('apellidos',"%${apellidos}%")
                if (localidad)
                    ilike('localidad',"%${localidad}%")
                if (!sexo || sexo != Sexo.I) {
                    eq('sexo', sexo)
                }
            }
            //join 'amigos' //para evitar repeticion
        }
        return result
    }
}
