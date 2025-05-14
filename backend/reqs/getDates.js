//Importando conexão | Importing connection 
const db =  require('../connection.js')

//Essa função irá passar retornar ao frontend os dados da tabela MySQL
//This function will return to the frontend the dates of the MySQL's table
async function getDates() {
    try {
        //Fazendo conexão | Making connection
        const connection = db.getConnection()
        //Adquirindo dados | Taking dates
        const [rows] = await connection.query('SELECT * FROM taskstodo;')
        return rows;
    } catch (error) {
        console.error('Error in the get arquive...' + error)
    }
}

module.exports = getDates;
