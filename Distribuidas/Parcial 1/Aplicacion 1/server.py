import socket
import select
import time

def calculadora(op, num, num2):
    if op == 's':
        return num + num2
    elif op == 'r':
        return num - num2
    elif op == 'm':
        return num * num2
    elif op == 'd':
        if num2 != 0:
            return num / num2
        else:
            return "Error: División por cero"
    else:
        return "Error: Operación inválida"

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(('localhost', 12345))
server_socket.listen(5)
server_socket.setblocking(False)
print("Servidor escuchando en el puerto 12345...")

busy = False
current_client = None
client_data = {}

try:
    sockets_to_monitor = [server_socket]
    
    while True:
        readable, _, _ = select.select(sockets_to_monitor, [], [], 1.0)
        
        for sock in readable:
            if sock is server_socket:
                client_socket, addr = server_socket.accept()
                client_socket.setblocking(False)
                print(f"Conexión intentada de {addr}")
                
                if busy:
                    print(f"Servidor ocupado, redirigiendo cliente {addr}")
                    try:
                        client_socket.send("REDIRECT 127.0.0.1:12349".encode('utf-8'))
                        # Esperar brevemente para asegurar que el mensaje se envíe
                        time.sleep(0.01)
                    except socket.error:
                        print(f"Error al enviar redirección a {addr}")
                    finally:
                        client_socket.close()
                else:
                    print(f"Conexión aceptada de {addr}")
                    current_client = client_socket
                    busy = True
                    client_data[client_socket] = ""
                    sockets_to_monitor.append(client_socket)
            else:
                try:
                    chunk = sock.recv(1024)
                    if not chunk:
                        print(f"Cliente {sock.getpeername()} desconectado")
                        sock.close()
                        sockets_to_monitor.remove(sock)
                        if sock is current_client:
                            busy = False
                            current_client = None
                        del client_data[sock]
                    else:
                        client_data[sock] += chunk.decode('utf-8')
                        if ',' in client_data[sock] and client_data[sock].count(',') == 2:
                            data = client_data[sock]
                            print(f"Datos recibidos: {data}")
                            try:
                                op, num_str, num2_str = data.split(',')
                                num = float(num_str)
                                num2 = float(num2_str)
                                result = calculadora(op, num, num2)
                            except ValueError:
                                result = "Error: Formato de datos inválido"
                            
                            try:
                                sock.send(str(result).encode('utf-8'))
                                print(f"Resultado enviado: {result}")
                            except socket.error:
                                print(f"Error al enviar resultado a {sock.getpeername()}")
                            sock.close()
                            sockets_to_monitor.remove(sock)
                            if sock is current_client:
                                busy = False
                                current_client = None
                            del client_data[sock]
                except socket.error as e:
                    print(f"Error en cliente {sock.getpeername()}: {e}")
                    sock.close()
                    sockets_to_monitor.remove(sock)
                    if sock is current_client:
                        busy = False
                        current_client = None
                    del client_data[sock]

except KeyboardInterrupt:
    print("\nServidor detenido.")
    if current_client:
        current_client.close()
    for sock in sockets_to_monitor:
        if sock is not server_socket:
            sock.close()
    server_socket.close()