const axios = require("axios");

// Função para renderizar a página principal de manutenção de cursos
const manutCursos = async (req, res) => {
  const token = req.session.token;
  const userName = req.session.userName;
  try {
    const response = await axios.get(process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    res.render("cursos/view/vwManutCursos.njk", {
      title: "Manutenção de Cursos",
      data: response.data.registro,
      userName: userName,
      erro: null
    });
  } catch (error) {
    console.error(error);
    res.render("cursos/view/vwManutCursos.njk", {
      title: "Manutenção de Cursos",
      data: [],
      userName: userName,
      erro: error.message
    });
  }
};


// Função para exibir o formulário de inserção (GET) e para salvar (POST)
const insertCursos = async (req, res) => {
  const token = req.session.token;
  const userName = req.session.userName;
  if (req.method === "GET") {
    res.render("cursos/view/vwFCrCursos.njk", {
      title: "Cadastro de Cursos",
      userName: userName,
      erro: null,
      data: null
    });
  } else {
    const cursoData = req.body;
    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/InsertCursos", cursoData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      res.json({
        status: response.data.status,
        msg: "Curso inserido com sucesso!",
        data: response.data
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        msg: error.response ? error.response.data.msg : error.message,
        data: error.response ? error.response.data : null
      });
    }
  }
};

// Função para visualizar os dados de um curso
const ViewCursos = (req, res) => {
  const token = req.session.token;
  const userName = req.session.userName;
  axios
    .post(process.env.SERVIDOR_DW3Back + "/getCursoByID", {
      cursoid: req.params.id,
    }, { headers: { Authorization: `Bearer ${token}` } })
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
      }, { headers: { Authorization: `Bearer ${token}` } })
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
      .post(process.env.SERVIDOR_DW3Back + "/UpdateCursos", req.body,
      { headers: { Authorization: `Bearer ${token}` } }
      )
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
    .post(process.env.SERVIDOR_DW3Back + "/DeleteCursos", req.body,
    { headers: { Authorization: `Bearer ${token}` } }
    )
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
