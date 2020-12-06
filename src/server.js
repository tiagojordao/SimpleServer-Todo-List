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
    status: "em_andamento",
    label: "Pessoal"
  },
  {
    task: "Fazer Projeto de Web 1",
    resp: "Tiago e Lucas",
    status: "em_andamento",
    label: "Academico"
  },
  {
    task: "Olhar tarefas no Sigaa",
    resp: "Maria",
    status: "em_andamento",
    label: "Academico"
  },
  {
    task: "Alterar Status de Tarefas",
    resp: "Carinha da Tesla",
    status: "done",
    label: "Profissional"
  }
];

const contas = [
  {
    email: 'email.teste@email.com',
    senha: 'senha123'
  },
  {
    email: 'teste123@email.com',
    senha: 'senha123'
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


//get auth
app.post('/auth', (req, res) => {

  console.log(req.body);

  const { email, senha } = req.body;

  console.log({email, senha});

  const accountIndex = contas.findIndex(acc => acc.email === email)

  if(accountIndex !== -1){
    console.log('Aqui');
    if (contas[accountIndex].senha === senha){
      console.log('Here');
      return res.status(200).send('Conta Encontrada!');
    }
  }

  return res.status(400).send('Conta não cadastrada!');
});


//create account
app.post('/cadastro', (req,res) => {
  const { email, senha } = req.body;

  if(contas.find(e => e.email === email)){
    return res.status(400).send('Email já cadastrado!');
  }

  contas.push(req.body);

  return res.status(200).send("Conta Cadastrada!").json(contas);

});

app.listen(3333, () => {
  console.log('🤯 Server is Running!');
});