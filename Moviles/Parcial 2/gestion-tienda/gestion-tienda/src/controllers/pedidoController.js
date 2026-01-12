import { Pedido } from "../models/pedido.js";
import { Producto } from "../models/producto.js";

// Crear pedido
export const crearPedido = async (req, res) => {
  try {
    const { cliente, productos } = req.body;

    // Calcular total dinámicamente
    let total = 0;
    for (const item of productos) {
      const prod = await Producto.findById(item.productoId);
      if (!prod) throw new Error(`Producto ${item.productoId} no existe`);
      total += prod.precio * item.cantidad;
    }

    const pedido = await Pedido.create({ cliente, productos, total });
    res.status(201).json(pedido);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Listar pedidos (con populate)
export const listarPedidos = async (_req, res) => {
  const lista = await Pedido.find().populate("productos.productoId");
  res.json(lista);
};

// Obtener pedido por ID
export const obtenerPedido = async (req, res) => {
  const pedido = await Pedido.findById(req.params.id).populate("productos.productoId");
  if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
  res.json(pedido);
};

// Eliminar pedido
export const eliminarPedido = async (req, res) => {
  const pedido = await Pedido.findByIdAndDelete(req.params.id);
  res.json({ eliminado: !!pedido });
};
