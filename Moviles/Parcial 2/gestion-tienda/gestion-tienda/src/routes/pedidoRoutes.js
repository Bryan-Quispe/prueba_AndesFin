import { Router } from "express";
import {
  crearPedido,
  listarPedidos,
  obtenerPedido,
  eliminarPedido
} from "../controllers/pedidoController.js";

const r = Router();

r.post("/", crearPedido);
r.get("/", listarPedidos);
r.get("/:id", obtenerPedido);
r.delete("/:id", eliminarPedido);

export default r;
