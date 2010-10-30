/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package andeandas

/**
 *
 * @author otto
 */
class NuevoUsuarioCommand {
    //Datos del perfil
    String login
    String password
    String password2
    String nombre
    String apellidos
    int diaNac
    int mesNac
    int anyoNac
    String sexo
    String localidad
    String email

    static constraints = {
        login(unique:true, blank: false)
        password(blank: false)
        password2(blank: false,
            //comprobar que los dos password son iguales
            validator: { pw2, nuc ->
                return pw2 == nuc.password
            })
        nombre(nullable:true)
        apellidos(nullable:true)
        localidad(nullable:true)
        fechaNac(nullable:true)
        sexo(nullable:true)
        email(nullable:true,email:true)
    }

	
}

