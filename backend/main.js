//Importando as bibliotecas | Importing librarys
const express = require('express');
const cors = require('cors');
const app = express();

// Configurando as importações | Configuring the libraries 
app.use(cors()); // Permite chamadas do React | It allows the connection with React
app.use(express.json());

// Importando módulos | Importing módules
const { start } = require('./connection.js')
const getDates = require('./reqs/getDates.js')
const PostData = require('./reqs/postData.js')
const CheckBoxFunc = require('./reqs/putCheckBox.js')
const DeleteTask = require('./reqs/deleteTask.js')

start() // Iniciando aplicação | Starting aplication

// Chamada de GET para busca de dados presentes no Banco de Dados | Calling GET to get all dates on database
app.get('/', async (req, res) => {
  try {
      const data = await getDates() //Chamando módulo | Calling module
      res.status(201).send(data)
  } catch (error) {
    res.status(500).send('Get not working')
    console.log('Error on get...' + error)
  }
});

// Chamada de POST para adicionar tarefas a tabela | Caling POST to add tasks on table
app.post('/', async (req, res) => {
  try {
    await PostData(req.body)  // Passando a tafera vinda do frontend para ser adicionada | Passing the tasks from the frontend fot it be add
    res.status(201).send('Post working...')
  } catch (error) {
    res.status(500).send('Post not working')
    console.log('Error on post...' + error)
  }
});

//Chamando PUT para que a checkbox seja atualizada no banco de dados quando for marcada ou desmarcada | Calling PUT to uploading the checkbox when it be clicked
app.put('/', async (req, res) => {
  try {
    await CheckBoxFunc(req.body)
    res.status(201).send('Put working...')
  } catch (error) {
    res.status(500).send('Put not working')
    console.log('Erro on put...' + error)
  }
});

// Chamando DELETE para apagar tafera | Calling DELETE to remove task from table
app.delete('/', async (req, res) => {
  try {
    await DeleteTask(req.body)
    res.status(201).send('Delete working...')
  } catch (error) {
    res.status(500).send('Delete not working')
    console.log('Error on delete...' + error)
  }
});

// Start the Express Server
app.listen(8081, () => {
  console.log('Servidor rondando em: http://localhost:8081/');
});
