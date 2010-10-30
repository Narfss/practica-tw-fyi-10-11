package andeandas

import grails.converters.JSON
import org.apache.commons.io.FileUtils

class UsuariosController {

    private static final String DIR_PERFILES = "web-app/images/perfiles/"
    private static final String DIR_DEFAULT = "web-app/images/default/"
    private static final String NOM_PERFIL = "perfil.jpg"
    private static final String NOM_ICONO = "icono.jpg"

    def solicitudesService
    def usuariosService
    def imagenService

    def index = {
    }

    def autentificar = {
        Usuario u = Usuario.findByLoginAndPassword(params.login, params.password)
        if (u==null) {
            flash.message = "Usuario y/o contraseña incorrectos"
            render(view:"index")
        }
        else {
            session.user = u
            int numSolsRecibidas = solicitudesService.getNumSolicitudesRecibidas(u)
            int numSolsOK = solicitudesService.getNumSolicitudesAceptadas(u)
            render(view:"mapa", model: [numSolsOK: numSolsOK, numSolsRecibidas: numSolsRecibidas, usuario:u])
        }
    }

    def mapa = {
        Usuario u = session.user;
        if (!u.isAttached())
            u.attach();
        int numSolsRecibidas = solicitudesService.getNumSolicitudesRecibidas(u)
        int numSolsOK = solicitudesService.getNumSolicitudesAceptadas(u)
        render(view:"mapa", model: [numSolsOK: numSolsOK, numSolsRecibidas: numSolsRecibidas, usuario:u])
    }


    def registro = {
        //TODO: cambiar esto para hacer uso de un "command object", que nos da validación declarativa
        if (params.password == params.password2) {
            //FIXME: qué pasa si pasáramos un parámetro HTTP "id"?? podemos manipular el id del usuario??
            Usuario u = new Usuario(params)
            u.fechaNac = Date.parse("dd/MM/yyyy", "${params.dia}/${params.mes}/${params.anyo}")
            u.sexo = Sexo.valueOf(params.sexo)
            if (u.validate()) {
                u.tieneImagen = false
                u.save()
                //crear directorio para almacenar imagenes del usuario
                new File(DIR_PERFILES+u.login).mkdir()
                render(view:"registroOK", model:[usuario: u])
            }
            else
            render(view:"registro")

        }
    }



    def comenzarRegistro = {
        render(view:"registro")
    }


    def perfil = {
        render(view:"perfil", model: [usuario: session.user])
    }

    def logout = {
        session.invalidate()
        render(view:"index")
    }

    def cambiarImagenPerfil =  {
        def u = session.user
        if (!u.isAttached()) {
            u.attach();
        }

        def f = request.getFile('foto')
        def okcontents = ['image/png', 'image/jpeg', 'image/gif']
        if (f.size< 1024*200 && okcontents.contains(f.getContentType())) {
            imagenService.saveImageAndThumbnail(f.getInputStream(), DIR_PERFILES+u.login, NOM_PERFIL, NOM_ICONO, 50)
            u.tieneImagen = true
            u.save()
        }
        else {
            flash.message = "Solo se permiten imágenes JPG, GIF o PNG con un máximo de 200 Kb"
        }
        render(view:"perfil", model: [usuario: u])
    }

    def buscar = {
        Sexo sexo
        if (!params.sexo)
        sexo = Sexo.I
        else
        sexo = Sexo.valueOf(params.sexo)
        def result = usuariosService.buscar(params.nombre, params.apellidos, params.localidad, sexo)

        render(contentType:"text/json") {
            array {
                for (u in result) {
                    usuario(login: u.login,
                        nombre:u.nombre,
                        apellidos:u.apellidos,
                        localidad:u.localidad) 
                }
            }
        }
    }

    def formBusqueda = {

    }

    def loginDisponible = {
        if (!params.login)
            render(text:"error: falta parámetro 'login' ", contentType:"text/plain")
        render(usuariosService.loginDisponible(params.login))
    }
}
