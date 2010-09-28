package andeandas

import grails.converters.JSON
import org.apache.commons.io.FileUtils

class UsuariosController {

    def solicitudesService
    def usuariosService
    def imagenService

    def index = {
    }

    //TODO: implementar seguridad declarativa con algún plugin de Grails
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

    private static final String DIR_PERFILES = "web-app/images/perfiles/"
    private static final String DIR_DEFAULT = "web-app/images/default/"
    private static final String NOM_PERFIL = "perfil.jpg"
    private static final String NOM_ICONO = "icono.jpg"



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
                /*
                //copia imágenes por defecto para perfil e icono
                FileUtils.copyFile(new File(DIR_DEFAULT + "/" + NOM_PERFIL), new File(DIR_PERFILES + u.login + "/" + NOM_PERFIL))
                FileUtils.copyFile(new File(DIR_DEFAULT + "/" + NOM_ICONO), new File(DIR_PERFILES + u.login + "/" + NOM_ICONO))
                 */
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
    }

    def cambiarImagenPerfil =  {
        def u = session.user
        if (!u.isAttached()) {
            u.attach();
        }

        def f = request.getFile('foto')
        def okcontents = ['image/png', 'image/jpeg', 'image/gif']
        if (f.size< 1024*200 && okcontents.contains(f.getContentType())) {
            imagenService.saveImageAndThumbnail(f.getInputStream(), "web-app/images/perfiles/"+u.login, "perfil.jpg", "icono.jpg", 50)
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
                    //FIXME: se podría serializar directamente el usuario sin tener que poner los campos?
                    usuario(login: u.login,
                        nombre:u.nombre,
                        apellidos:u.apellidos,
                        localidad:u.localidad)
                    /*
                    if (u.amistades.contains(session.user))
                    println u.login + " es amigo tuyo"
                    else
                    println u.login + " no es amigo tuyo"
                     */
                    u.amigos.each { println it.login}
                }
            }
        }
    }

    def formBusqueda = {

    }

    def loginDisponible = {
        render(usuariosService.loginDisponible(params.login))
    }
}
