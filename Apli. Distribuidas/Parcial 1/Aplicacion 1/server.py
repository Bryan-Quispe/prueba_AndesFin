import socket 

def calculadora(op,num,num2):
    if op == 'suma':
        return num + num2
    elif op == 'resta':
        return num - num2
    elif op == 'multiplicacion':
        return num * num2
    elif op == 'divisao':
        if num2 != 0:
            return num / num2
        else:
            return "Error: Division por cero"
    else:
        return "Error: Operacion inválida"

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #Crear socket TCP
server_socket.bind(('localhost', 12345)) #Vincular el socket a una dirección y puerto
server_socket.listen(1) #Escuchar conexiones entrantes
print("Servidor escuchando en el puerto 12345...")

try:
    while True:
        client_socket, addr = server_socket.accept() #Aceptar una conexión entrante
        print(f"Conexión aceptada de {addr}")
        data = client_socket.recv(1024).decode('utf-8') #Recibir datos del cliente
        
        if data:
            print(f"Datos recibidos: {data}")
            try:
                op, num, num2 = data.split(',')
                num = float(num)
                num2 = float(num2)
                result = calculadora(op, num, num2)

            except ValueError:
                result = "Error: Formato de datos inválido"
            
            client_socket.send(str(result).encode('utf-8')) #Enviar resultado al cliente
            print(f"Resultado enviado: {result}")
        client_socket.close() #Cerrar la conexión con el cliente
          

except KeyboardInterrupt:
    print("\nServidor detenido.")
    server_socket.close() #Cerrar el socket del servidor
finally:
    server_socket.close() #Cerrar el socket del servidor