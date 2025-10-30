import socket

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect(("localhost", 12345))

operacion = input("Ingrese su operacion: (ej. s,2,4.5)")
client_socket.send(operacion.encode("utf-8"))

resultado = client_socket.recv(1024).decode("utf-8")
print(f"El resultado es: {resultado}")

client_socket.close()
