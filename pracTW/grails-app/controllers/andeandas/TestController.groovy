package andeandas
/**
 *  Controlador para hacer pruebas
 */
class TestController {

    /**
     * Nos permite modificar la posición de un usuario para poder hacer pruebas
     */
    def setUserLocation = {
        Usuario u = Usuario.findByLogin(params.login)
        if (u) {
            Localizacion loc = new Localizacion(lat:params.lat, lon:params.lon, status:params.status, fecha: new Date())
            u.setLocalizacion(loc)
            if(!u.save(flush:true)) {
                render(text: "error al intentar guardar la localización. Los parámetros no son válidos", contentType: "text/plain")
            }
            else
                render(text: "OK: " + loc, contentType: "text/plain")
        }
        else
            render(text: "El usuario " + params.login + " no se ha encontrado", contentType:"text/plain")


    }
}
