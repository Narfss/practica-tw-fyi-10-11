import andeandas.*
import util.*

class BootStrap {

    def init = { servletContext ->
        def bs = new BootStrapData()
        bs.createData()
    }
    def destroy = {
    }
} 