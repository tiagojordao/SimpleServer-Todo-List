const { response } = require('express');
const express = require ('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const tarefas = [
  {
    task: "Ir ao médico",
    resp: "Joao",
    status: "em_andamento"
  },
  {
    task: "Fazer Projeto de Web 1",
    resp: "Tiago e Lucas",
    status: "em_andamento"
  },
  {
    task: "Olhar tarefas no Sigaa",
    resp: "Maria",
    status: "em_andamento"
  },
  {
    task: "Alterar Status de Tarefas",
    resp: "Carinha da Tesla",
    status: "done"
  }
];

app.get("/", (req, res) => {
  return res.json(tarefas);
});

app.post('/addnewtask', (req, res) => {
  tarefas.push(req.body);
  return res.json(tarefas);
});

app.put('/checktask/:task', (req, res) => {
  const { task } = req.params;

  const tarefaIndex = tarefas.findIndex(t => t.task === task);

  tarefas[tarefaIndex].status = 'done';

  return res.json(tarefas);
});

app.delete('/deletetask/:task', (req, res) => {
  const { task } = req.params;

  const tarefaIndex = tarefas.findIndex(t => t.task === task);
  
  tarefas.splice(tarefaIndex, 1);

  return res.json(tarefas);
});

app.listen(3333, () => {
  console.log('🤯 Server is Running!');
});