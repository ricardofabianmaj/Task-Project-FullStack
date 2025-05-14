//Importando conexão | Importing connection 
const db = require('../connection.js')

//Essa função vai adicionar uma tarefa na tabela, de acordo com que for passado para o input no frontend
//This function will add a task to the table, acording the input at the frontend pass
async function PostData(body) {
    try {
        //Fazendo conexão | Making connection
        const connection = db.getConnection()
        if (!connection) {
            throw new Error('Database connection not established.')
        }

        const taskToAdd = body.task;

        // Adicionando tarefa ao banco de dados | Adding tasks in database
        await connection.query(
            `INSERT INTO taskstodo (taskname, maked) VALUES (?, FALSE)`,
            [taskToAdd]
        )
    } catch (error) {
        console.log('Erro in the post arquive...' + error)
    }
}

module.exports = PostData;
