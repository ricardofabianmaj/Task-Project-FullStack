//Importando conexão | Importing connection 
const db = require('../connection.js')

async function CheckBoxFunc(body) {
    try {
        //Fazendo conexão | Making connection
        const connection = db.getConnection()
        if (!connection) {
            throw new Error('Database connection not established.')
        }

        //Mudando o estado da CheckBox no banco de dados | Changind the CheckBox's state in the database
        await connection.query(
            `UPDATE taskstodo SET maked = ? WHERE taskname = ?;`,
            [body.maked, body.taskname]
        )
    } catch (error) {
        console.error('Error in the putCheckBox arquive...' + error)
    }
}

module.exports = CheckBoxFunc;
