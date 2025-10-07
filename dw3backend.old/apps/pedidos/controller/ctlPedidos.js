const mdlPedidos = require("../model/mdlPedidos");

const getAllPedidos = async (req, res) => {
  let registro = await mdlPedidos.getAllPedidos();
  res.json({ status: "ok", registro: registro });
};

const getPedidoByID = async (req, res) => {
  const pedidoID = parseInt(req.body.pedidoid);
  let registro = await mdlPedidos.getPedidoByID(pedidoID);
  res.json({ status: "ok", registro: registro });
};

const insertPedidos = async (req, res) => {
  const registro = req.body;
  let { msg, linhasAfetadas } = await mdlPedidos.insertPedidos(registro);
  res.json({ status: msg, registro: { pedidoid: linhasAfetadas } });
};

const updatePedidos = async (req, res) => {
  const registro = req.body;
  let { msg, linhasAfetadas } = await mdlPedidos.updatePedidos(registro);
  res.json({ status: msg, registro: { linhasAfetadas: linhasAfetadas } });
};

const deletePedidos = async (req, res) => {
  const registro = req.body;
  let { msg, linhasAfetadas } = await mdlPedidos.deletePedidos(
    registro.pedidoid
  );
  res.json({ status: msg, registro: { linhasAfetadas: linhasAfetadas } });
};

module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  deletePedidos,
};
