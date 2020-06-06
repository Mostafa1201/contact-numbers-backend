module.exports = {
  "development": {
    "username": process.env.database_user,
    "password": process.env.database_password,
    "database": process.env.database_name,
    "host": process.env.database_host,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.database_user,
    "password": process.env.database_password,
    "database": process.env.database_name,
    "host": process.env.database_host,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.database_user,
    "password": process.env.database_password,
    "database": process.env.database_name,
    "host": process.env.database_host,
    "dialect": "mysql",
    "operatorsAliases": false
  }
}