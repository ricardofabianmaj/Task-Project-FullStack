//Importando bibliotecas 
//Importing libraries
import React, { useState, useEffect } from 'react'
import axios from 'axios' 

function App() {
  //Essa variavel será a usada como base para os dados que serão renderizados na tela
  //This var will be used like base to the dates that will render at screen
  var [date, setDate] = useState([])

  //Esta variavel será usada para enviar o nome da tarefa para se adicionar na função Post
  //This var will be used to send the task's name to be added in Post function
  var [task, setTask] = useState('')

  //Essa variavel será usada para alterar display de um alerta abaixo
  //This var will be used to change the display of a alert window above
  var [showAlert, setShowAlert] = useState(false)

  //Endereço do servidor backend
  //Adress of the backend's server
  const serverBackend = 'http://localhost:8081'

  //Esta função atualizará o dados, quando qualquer alteração for feita ela é chamada
  //This function update the var date, when any modification happens it is called
  async function handleConnectionServer() {
    try {
      //Get para o banco de dados
      //Get to the database
      const response = await axios.get(serverBackend)
      setDate([...response.data]) //Atualizando dados | Updating dates
    } catch (error) {
      console.log('Erro ao buscar dados:' + error)
    }
  }
  //Essa função será chamada para atualizar o estado da checkbox no backend quando for alterado no frontend
  //This function will be called to update the checkbox's state on backend when it be modificated on frontend
  async function HandleCheckCheckbox(name, ifMaked) {
    //Enviando o valor já atualizado
    //Sending value just updated
    var NewMakedVar = ifMaked === 1 ? 0 : 1
    try {
      //Axios connection
      await axios.put(serverBackend, { taskname: name, maked: NewMakedVar })
    }
    catch (erro) {
      console.log('Error on try upgrade the check box')
    }
  }
  //Essa função irá adicionar a tarefa vinda do frontend para o banco de dados
  //This function will add the task from the frontend to the database
  async function handlePostFunction() {
    try {
      let alreadyExists = false
  
      for (let key in date) {
        if (date[key].taskname === task) {
          alreadyExists = true
          break
        }
      }
      if (alreadyExists) {
        setShowAlert(true)
      } else {
        await axios.post(serverBackend, { task })
        await handleConnectionServer() //Atualizando dados na tela | Updating dates in the screen
      }
    } catch (error) {
      console.error('Erro ao enviar a tarefa:', error)
    }
  }
  
  //Essa função mandara a requisição de deletar a tafera para o backend
  //This function will send que delete requisition the task to the backend
  async function handleDeleteTask(task) {
    try {
      //Conexão do Axios | Axios connection
      await axios.delete(serverBackend, {
        data: { taskname: task }
      });
      await handleConnectionServer() //Atualizando dados na tela | Updating dates in the screen
    } catch (erro) {
      console.log(erro)
    }
  }
  //Esse useEffect pega os dados assim que a aplicação inicia
  //This useEffect take date when the aplication starts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleConnectionServer() //Enviando dados que serão usados na tela | Sending dates that will be used in screen
      } catch (error) {
        console.log('Erro no front: ' + error)
      }
    }
    fetchData() //Chamando a própria função | Calling the function 
  }, [])

  return (
    <div id='back'>
      <main>

        <h1>To Do WebPage</h1>

        <div id='divInputAdd'>
          <input
            id='inputAdd'
            onChange={(e) => setTask(e.target.value)}
            placeholder='Put your task name here'
          />

          <button onClick={handlePostFunction}>ADD TASK</button>

          <p
            id='alertMenssage'
            style={{ display: showAlert ? 'block' : 'none' }}
          > THIS TASK WAS ALREDY ADDED </p>
        </div>

        <h1>TASKS</h1>

        <ul type='none'>
          {date.map((item) => (
            <li key={item.taskname}>
              <p
              className='text-gray'
              >{item.taskname}</p>
              <input
                type='checkbox'
                checked={item.maked === 1}
                onChange={async () => {
                  await HandleCheckCheckbox(item.taskname, item.maked);
                  await handleConnectionServer();
                }}
              />

              <button
                onClick={async () => {
                  await handleDeleteTask(item.taskname);
                  await handleConnectionServer();
                }}
              >DELETE</button>
            </li>
          ))}

        </ul>

      </main>
    </div >
  );
}

export default App;
