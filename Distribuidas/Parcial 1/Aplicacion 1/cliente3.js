const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let operacionGlobal = null;

function conectarServidor(host, port, operacion) {
  const client = new net.Socket();
  
  client.connect(port, host, () => {
    console.log(`Conectado a ${host}:${port}`);
    client.write(operacion + '\n'); // Añadir \n para asegurar fin de mensaje
  });

  let buffer = ''; // Buffer para acumular datos

  client.on('data', (data) => {
    buffer += data.toString();
    // Verificar si el mensaje está completo (buscar \n o asumir mensaje completo)
    if (buffer.includes('\n') || buffer.startsWith('REDIRECT') || !isNaN(parseFloat(buffer))) {
      const respuesta = buffer.trim();
      if (respuesta.startsWith('REDIRECT')) {
        const [, direccion] = respuesta.split(' ');
        const [host2, port2] = direccion.split(':');
        console.log(`Redirigiendo al servidor secundario en ${host2}:${port2}...`);
        client.destroy();
        conectarServidor(host2, parseInt(port2), operacion);
      } else {
        console.log(`El resultado es: ${respuesta}`);
        client.destroy();
        rl.close();
      }
    }
  });

  client.on('error', (err) => {
    console.error(`Error de conexión a ${host}:${port}: ${err.message}`);
    client.destroy();
    rl.close();
  });

  client.on('close', () => {
    console.log(`Conexión cerrada con ${host}:${port}`);
  });
}

rl.question('Ingrese su operación (ej. s,2,4): ', (operacion) => {
  operacionGlobal = operacion;
  conectarServidor('127.0.0.1', 12345, operacion);
});