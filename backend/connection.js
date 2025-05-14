//Import MySQL
const mysql = require('mysql2/promise')

var connection

//Essa função irá realizar a conexão do Express com o MySQL
//This function will make the connection of Express with MySQL
async function start() {
    try {
        //Conexão com o banco de dados | Connection with the database
        connection = await mysql.createConnection({ 
            host: 'localhost',
            user: 'root',
            password: '73045842',
            database: 'tasks'
        })
        //Criando a tabela 'taskstodo' se não existir
        //Creating 'taskstodo' table ih it not exists
        await connection.query(`
            CREATE TABLE IF NOT EXISTS taskstodo (
                taskname VARCHAR(255),
                maked BOOLEAN
            )
        `);
    } catch (error) {
        console.error('Erro ao conectar ou criar tabela:', error);
    }
}

function getConnection() {
    //Passando a conexão do MySQL para os módulos caso a conexão funcione
    //Passing the connection of the MySQL the modules if it works
    if (!connection) {
        throw new Error('Conexão ainda não foi iniciada!');
    }
    return connection;
}
//Exportando | Exporting
module.exports = { start, getConnection };
