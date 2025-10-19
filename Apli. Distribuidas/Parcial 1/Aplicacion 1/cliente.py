import socket

HOST = '127.0.0.1'
PORT = 12345

def conectar_servidor(host, port, operacion=None):
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((host, port))

    if operacion is None:
        operacion = input("Ingrese su operación (ej. s,2,4): ")
    client_socket.send(operacion.encode())

    respuesta = client_socket.recv(1024).decode().strip()

    if respuesta.startswith("REDIRECT"):
        _, direccion = respuesta.split(" ")
        host2, port2 = direccion.split(":")
        print(f"Redirigiendo al servidor secundario en {host2}:{port2}...")
        client_socket.close()
        conectar_servidor(host2, int(port2), operacion)
    else:
        print(f"El resultado es: {respuesta}")
        client_socket.close()

if __name__ == "__main__":
    conectar_servidor(HOST, PORT)