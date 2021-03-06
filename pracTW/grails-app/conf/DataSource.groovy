dataSource {
    pooled = true
    driverClassName = "org.hsqldb.jdbcDriver"
    username = "sa"
    password = ""
}
hibernate {
    cache.use_second_level_cache=true
    cache.use_query_cache=true
    cache.provider_class='net.sf.ehcache.hibernate.EhCacheProvider'
}
// environment specific settings
environments {
    development {
        dataSource {
            dbCreate = "update"
            url = "jdbc:mysql://localhost/test"
            driverClassName = "com.mysql.jdbc.Driver"
            username = "root"
            password = ""
            pooled = true
            }

    }
    test {
        dataSource {
            dbCreate = "update"
            url = "jdbc:mysql://localhost/test"
            driverClassName = "com.mysql.jdbc.Driver"
            username = "root"
            password = ""
            pooled = true
            logSql = "false"
        }
    }
    production {
        dataSource {
            dbCreate = "update"
            url = "jdbc:mysql://localhost/test"
            driverClassName = "com.mysql.jdbc.Driver"
            username = "root"
            password = ""
            pooled = true
            logSql = "false"
        }
    }
}