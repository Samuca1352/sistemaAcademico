const axios = require("axios");

// Função para renderizar a página principal de manutenção de cursos
const manutCursos = (req, res) => {
  const token = req.session.token;
  const userName = req.session.userName;
  axios
    .post(process.env.SERVIDOR_DW3Back + "/getAllCursos", {
      token,
    })
    .then((response) => {
      // Sucesso
      let resCursos = response.data;
      res.render("cursos/view/vwManutCursos.njk", { // CORRIGIDO
        title: "Manutenção de Cursos",
        data: resCursos.registro,
        userName: userName,
      });
    })
    .catch((error) => {
      // Erro
      let resCursos = { registro: "" };
      res.render("cursos/view/vwManutCursos.njk", { // CORRIGIDO
        title: "Manutenção de Cursos",
        data: resCursos.registro,
        userName: userName,
      });
    });
};

// Função para exibir o formulário de inserção (GET) e para salvar (POST)
const insertCursos = (req, res) => {
  const token = req.session.token;
  const userName = req.session.userName;
  if (req.method == "GET") {
    res.render("cursos/view/vwFCrCursos.njk", { // CORRIGIDO
      title: "Cadastro de Cursos",
      userName: userName,
    });
  } else {
    axios
      .post(process.env.SERVIDOR_DW3Back + "/InsertCursos", {
        descricao: req.body.descricao,
        cargahoraria: req.body.cargahoraria,
        periodo: req.body.periodo,
        token: token,
      })
      .then(() => {
        res.redirect("/cursos/ManutCursos");
      })
      .catch((error) => {
        console.error(error);
        res.redirect("/cursos/ManutCursos");
      });
  }
};

// Função para visualizar os dados de um curso
const ViewCursos = (req, res) => {
  const token = req.session.token;
  const userName = req.session.userName;
  axios
    .post(process.env.SERVIDOR_DW3Back + "/getCursoByID", {
      cursoid: req.params.id,
      token: token,
    })
    .then((response) => {
      let curso = response.data;
      res.render("cursos/view/vwFRUDrCursos.njk", { // CORRIGIDO
        title: "Visualização de Curso",
        data: curso.registro[0],
        disabled: "disabled",
        userName: userName,
      });
    })
    .catch((error) => {
      console.error(error);
      res.redirect("/cursos/ManutCursos");
    });
};

// Função para exibir o formulário de atualização (GET) e para salvar (POST)
const UpdateCurso = (req, res) => {
  const token = req.session.token;
  const userName = req.session.userName;
  if (req.method == "GET") {
    axios
      .post(process.env.SERVIDOR_DW3Back + "/getCursoByID", {
        cursoid: req.params.id,
        token: token,
      })
      .then((response) => {
        let curso = response.data;
        res.render("cursos/view/vwFRUDrCursos.njk", { // CORRIGIDO
          title: "Atualização de Curso",
          data: curso.registro[0],
          userName: userName,
        });
      })
      .catch((error) => {
        console.error(error);
        res.redirect("/cursos/ManutCursos");
      });
  } else {
    axios
      .post(process.env.SERVIDOR_DW3Back + "/UpdateCursos", {
        cursoid: req.body.cursoid,
        descricao: req.body.descricao,
        cargahoraria: req.body.cargahoraria,
        periodo: req.body.periodo,
        token: token,
      })
      .then(() => {
        res.redirect("/cursos/ManutCursos");
      })
      .catch((error) => {
        console.error(error);
        res.redirect("/cursos/ManutCursos");
      });
  }
};

// Função para deletar um curso
const DeleteCurso = (req, res) => {
  const token = req.session.token;
  axios
    .post(process.env.SERVIDOR_DW3Back + "/DeleteCursos", {
      cursoid: req.body.cursoid,
      token: token,
    })
    .then(() => {
      res.redirect("/cursos/ManutCursos");
    })
    .catch((error) => {
      console.error(error);
      res.redirect("/cursos/ManutCursos");
    });
};

module.exports = {
  manutCursos,
  insertCursos,
  ViewCursos,
  UpdateCurso,
  DeleteCurso,
};

