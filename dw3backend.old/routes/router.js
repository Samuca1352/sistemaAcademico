const express = require("express");
const routerApp = express.Router();

const appAlunos = require("../apps/alunos/controller/ctlAlunos");
const appCursos = require("../apps/cursos/controller/ctlCursos");
const appLogin = require("../apps/login/controller/ctlLogin");
const appClientes = require("../apps/clientes/controller/ctlClientes"); // Adicionado
const appPedidos = require("../apps/pedidos/controller/ctlPedidos");   // Adicionado

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de Alunos
routerApp.get("/getAllAlunos", appAlunos.getAllAlunos);
routerApp.post("/getAlunoByID", appLogin.AutenticaJWT, appAlunos.getAlunoByID);
routerApp.post("/insertAlunos", appLogin.AutenticaJWT, appAlunos.insertAlunos);
routerApp.post("/updateAlunos", appAlunos.updateAlunos);
routerApp.post("/DeleteAlunos", appAlunos.DeleteAlunos);

//Rotas de Cursos
routerApp.get("/GetAllCursos", appCursos.GetAllCursos);
routerApp.post("/GetCursoByID", appCursos.GetCursoByID);
routerApp.post("/InsertCursos", appCursos.InsertCursos);
routerApp.post("/UpdateCursos", appCursos.UpdateCursos);
routerApp.post("/DeleteCursos", appCursos.DeleteCursos);

//Rotas de Clientes (Novo)
routerApp.get("/GetAllClientes", appClientes.getAllClientes);
routerApp.post("/GetClienteByID", appLogin.AutenticaJWT, appClientes.getClienteByID);
routerApp.post("/InsertClientes", appLogin.AutenticaJWT, appClientes.insertClientes);
routerApp.post("/UpdateClientes", appLogin.AutenticaJWT, appClientes.updateClientes);
routerApp.post("/DeleteClientes", appLogin.AutenticaJWT, appClientes.deleteClientes);

//Rotas de Pedidos (Novo)
routerApp.get("/GetAllPedidos", appLogin.AutenticaJWT, appPedidos.getAllPedidos);
routerApp.post("/GetPedidoByID", appLogin.AutenticaJWT, appPedidos.getPedidoByID);
routerApp.post("/InsertPedidos", appLogin.AutenticaJWT, appPedidos.insertPedidos);
routerApp.post("/UpdatePedidos", appLogin.AutenticaJWT, appPedidos.updatePedidos);
routerApp.post("/DeletePedidos", appLogin.AutenticaJWT, appPedidos.deletePedidos);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
