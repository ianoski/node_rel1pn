const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('rel1pn', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql'
})
sequelize.authenticate().then(() => {
    console.log('Conexão realizada com o banco de dados!')
}).catch((err) => {
    console.error('Erro ao conectar com o banco de dados!', err)
})
module.exports = sequelize