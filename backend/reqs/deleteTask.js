//Importando conexão | Importing connection 
const db = require('../connection.js');

// Essa função irá deletar uma tarefa quando chamada
// This function will delete a task when it be called
async function DeleteTask(body) {
    try {
        const connection = db.getConnection() //Fazendo conexão com o connection.js | Making connection with connection.js

        //Caso de erro na conexão | Erro case on connection
        if (!connection) {
            throw new Error('Database connection not established.')
        }

        //Comando MySQL | MySQL command
        await connection.query(
            `DELETE FROM taskstodo WHERE taskname = ?;`,
            [body.taskname]
        );
    } catch (error) {
        console.log('Error in the delete arquive...' + error)
        throw erro
    }
}
//Exportando | Exporting
module.exports = DeleteTask;
