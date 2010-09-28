package andeandas

class Localizacion {
    Double lat
    Double lon
    String status
    Date fecha

    static belongsTo = [usuario:Usuario]
    static constraints = {
    }
}
