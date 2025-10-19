const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const HOST = '127.0.0.1';  // Servidor principal
const PORT = 12346;        // Puerto principal

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  rl.question('Ingrese su operación (ej. s,2,4): ', (operacion) => {
    client.write(operacion);
  });
});

client.on('data', (data) => {
  console.log(`El resultado es: ${data.toString()}`);
  client.destroy();
  rl.close();
});

client.on('error', (err) => {
  console.error('Error de conexión:', err.message);
  rl.close();
});
