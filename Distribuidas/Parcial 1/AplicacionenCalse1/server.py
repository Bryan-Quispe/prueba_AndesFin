import socket

def calculadora(op,num1,num2):
    if op == 's':
        return num1 + num2
    elif op == 'r':
        return num1 - num2
    elif op == 'm':
        return num1 * num2
    elif op == 'd':
        if num2 != 0:
            return num1 / num2
        else:
            return "Error: Division por zero"
    else:
        return "Error: Operacion inválida"
    
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # Crear socket TCP
server_socket.bind(('localhost', 12345)) # Enlazar el socket a una dirección y puerto
server_socket.listen(1) # Escuchar conexiones entrantes
print("Servidor escuchando en el puerto 12345")

try:
    while True:
        client_socket, addr = server_socket.accept() # Aceptar una conexión entrante
        print(f"Cliente conectado desde {addr}")
        data = client_socket.recv(1024).decode('utf-8') # Recibir datos del cliente
        
        if data:
            print(f"Datos recibidos: {data}")
            try:
                op, num1, num2 = data.split(',')
                num1 = float(num1)
                num2 = float(num2)
                resultado = calculadora(op, num1, num2)

            except ValueError:
                resultado = "Error: Formato de datos inválido"
            
            client_socket.send(str(resultado).encode('utf-8')) # Enviar resultado al cliente
        client_socket.close() # Cerrar la conexión con el cliente
        print("Cliente desconectado")
except KeyboardInterrupt:
    print("Servidor cerrado.")
finally:
    server_socket.close()
