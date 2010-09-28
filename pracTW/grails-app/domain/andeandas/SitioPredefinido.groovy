/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package andeandas

/**
 *
 * @author otto
 *
 * Un sitio en el que el usuario está habitualmente (casa, trabajo, ...)
 * Así se puede especificar la localización más fácilmente
 */
class SitioPredefinido {
    Double lat
    Double lon
    String descripcion

    static belongsTo = [usuario:Usuario]
    static constraints = {
    }
}

