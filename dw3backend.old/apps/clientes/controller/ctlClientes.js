const mdlClientes = require("../model/mdlClientes");

const getAllClientes = async (req, res) => {
  let registro = await mdlClientes.getAllClientes();
  res.json({ status: "ok", registro: registro });
};

const getClienteByID = async (req, res) => {
  const clienteID = parseInt(req.body.clienteid);
  let registro = await mdlClientes.getClienteByID(clienteID);
  res.json({ status: "ok", registro: registro });
};

const insertClientes = async (req, res) => {
  const registro = req.body;
  let { msg, linhasAfetadas } = await mdlClientes.insertClientes(registro);
  res.json({ status: msg, registro: { clienteid: linhasAfetadas } });
};

const updateClientes = async (req, res) => {
  const registro = req.body;
  let { msg, linhasAfetadas } = await mdlClientes.updateClientes(registro);
  res.json({ status: msg, registro: { linhasAfetadas: linhasAfetadas } });
};

const deleteClientes = async (req, res) => {
  const registro = req.body;
  let { msg, linhasAfetadas } = await mdlClientes.deleteClientes(
    registro.clienteid
  );
  res.json({ status: msg, registro: { linhasAfetadas: linhasAfetadas } });
};

module.exports = {
  getAllClientes,
  getClienteByID,
  insertClientes,
  updateClientes,
  deleteClientes,
};
