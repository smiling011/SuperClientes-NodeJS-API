const Cliente = require("../models/models");

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error });
  }
};

// Obtener cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cliente", error });
  }
};

// Crear cliente
exports.createCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, direccion } = req.body;
    if (!nombre || !email) {
      return res.status(400).json({ message: "El nombre y el email son obligatorios" });
    }
    const cliente = await Cliente.create({ nombre, email, telefono, direccion });
    res.status(201).json(cliente);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "El email ya existe" });
    }
    res.status(500).json({ message: "Error al crear cliente", error });
  }
};

// Actualizar cliente
exports.updateCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, direccion } = req.body;
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

    if (!nombre || !email) {
      return res.status(400).json({ message: "El nombre y el email son obligatorios" });
    }

    await cliente.update({ nombre, email, telefono, direccion });
    res.json(cliente);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "El email ya existe" });
    }
    res.status(500).json({ message: "Error al actualizar cliente", error });
  }
};

// Eliminar cliente
exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

    await cliente.destroy();
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cliente", error });
  }
};
