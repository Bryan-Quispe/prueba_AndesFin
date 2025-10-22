const net = require('net');
const HOST = '127.0.0.1';
const PORT = 12349;

function horaActual() {
  const now = new Date();
  return `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;
}

let busy = false;  // Estado ocupado para limitar a un cliente a la vez

const server = net.createServer((socket) => {
  console.log(`${horaActual()} [+] Cliente intentando conectar al servidor secundario`);

  if (busy) {
    // Servidor ocupado: Rechazar o redirigir (aquí rechazamos con mensaje)
    console.log(`${horaActual()} [!] Servidor secundario ocupado, rechazando conexión`);
    socket.write('SERVERS_BUSY');  // Mensaje de rechazo (puedes cambiar a REDIRECT si hay un tercer servidor)
    socket.end();
    return;
  }

  busy = true;  // Marcar como ocupado
  console.log(`${horaActual()} [+] Conexión aceptada en servidor secundario`);

  socket.on('data', (data) => {
    const mensaje = data.toString().trim();
    console.log(`${horaActual()} [>] Instrucción recibida: "${mensaje}"`);

    const [op, aStr, bStr] = mensaje.split(',');
    const a = parseFloat(aStr);
    const b = parseFloat(bStr);
    let resultado;

    switch (op) {
      case 's': resultado = a + b; break;
      case 'r': resultado = a - b; break;
      case 'm': resultado = a * b; break;
      case 'd': resultado = b !== 0 ? a / b : 'Error: división por cero'; break;
      default: resultado = 'Error: Operación inválida';
    }

    console.log(`${horaActual()} [<] Resultado devuelto: ${resultado}`);
    socket.write(resultado.toString());
    socket.end();
    busy = false;  // Liberar el servidor después de procesar
  });

  socket.on('end', () => {
    console.log(`${horaActual()} [-] Cliente desconectado del servidor secundario`);
    busy = false;  // Asegurar liberación si el cliente cierra prematuramente
  });
  socket.on('error', (err) => {
    console.error(`${horaActual()} [!] Error en conexión: ${err.message}`);
    busy = false;  // Liberar en caso de error
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`${horaActual()} [!] Error: Puerto ${PORT} ya está en uso. Libere el puerto o use otro.`);
    process.exit(1);
  } else {
    console.error(`${horaActual()} [!] Error del servidor: ${err.message}`);
  }
});

process.on('SIGINT', () => {
  console.log(`${horaActual()} [i] Cerrando servidor secundario...`);
  server.close(() => {
    console.log(`${horaActual()} [i] Servidor secundario cerrado.`);
    process.exit(0);
  });
});

server.listen(PORT, HOST, () => console.log(`${horaActual()} Servidor secundario escuchando en ${HOST}:${PORT}`));