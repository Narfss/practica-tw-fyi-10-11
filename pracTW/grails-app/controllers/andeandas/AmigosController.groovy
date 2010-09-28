package andeandas

class AmigosController {

    def amigosService

    

    //Obtiene la lista de TODOS los amigos
    //FIXME: de verdad se necesita la lista de TODOS los amigos en algún caso de uso?
    //TODO: implementar la paginación de la lista de amigos
    def getAmigos = {
        //obtiene el usuario actual de la sesión HTTP
        Usuario u = session.user;
        //seguramente estará "dettachado", por lo que para trabajar con GORM (guardarlo, etc)
        //hay que reattacharlo
        if (!u.isAttached()) {
            u.attach();
        }
        //FIXME: necesitaríamos aquí eager fetching para optimizar el recorrido de la lista?
        //(buscando de nuevo el usuario con un dynamic finder y poniéndole fetch:)
        //chequear si Grails hace más de un select sin forzar el fetch
        render(contentType:"text/json") {
            //total = u.amistades.size()
            /*amigos = */
            array {
                for (a in u.amigos) {
                    
                    amigo(id: a.id,
                        login: a.login,
                        nombre: a.nombre,
                        apellidos: a.apellidos,
                        fechaNac: a.fechaNac,
                        sexo: a.sexo)
                        
                    //Para renderizar TODO el objeto como elemento de un array
                    //element a.amigo
                }
            }
        }
    }
}
