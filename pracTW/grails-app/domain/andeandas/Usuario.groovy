package andeandas

class Usuario {
    //Datos del perfil
    String login
    String password
    String nombre
    String apellidos
    Date fechaNac
    Sexo sexo
    String localidad
    String email
    boolean tieneImagen
    
    //posición geográfica
    Localizacion localizacion
    static hasMany = [  sitios : SitioPredefinido,
        amigos: Usuario ]

    //TODO: completar la validación especificando más restricciones si procede
    static constraints = {
        localizacion(nullable:true)
        login(unique:true)
        nombre(nullable:true)
        apellidos(nullable:true)
        localidad(nullable:true)
        fechaNac(nullable:true)
        sexo(nullable:true)
        email(nullable:true,email:true)
    }
}
