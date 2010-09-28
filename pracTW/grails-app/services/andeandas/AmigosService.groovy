package andeandas

class AmigosService {
    static transactional = false

    void establecerAmistad(Usuario u1, Usuario u2) {
        u1.addToAmigos(u2)
        u2.addToAmigos(u1)
        u1.save()
        u2.save()
    }

}