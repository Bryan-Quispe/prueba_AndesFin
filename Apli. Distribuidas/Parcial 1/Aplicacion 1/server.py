import socket
import threading
from datetime import datetime
import signal
import sys

HOST = '127.0.0.1'
PORT = 12346
BACKUP_SERVER = ('127.0.0.1', 12349)
clientes_activos = 0
MAX_CLIENTES = 1
server_socket = None

def hora_actual():
    return datetime.now().strftime("[%H:%M:%S]")

def procesar_operacion(data):
    try:
        partes = data.decode().strip().split(',')
        op = partes[0]
        a = float(partes[1])
        b = float(partes[2])
        print(f"{hora_actual()} [>] Instrucción recibida: {op},{a},{b}")

        if op == 's':
            resultado = a + b
        elif op == 'r':
            resultado = a - b
        elif op == 'm':
            resultado = a * b
        elif op == 'd':
            resultado = a / b if b != 0 else "Error: división por cero"
        else:
            resultado = "Operación no válida"

        print(f"{hora_actual()} [<] Resultado devuelto: {resultado}")
        return str(resultado)
    except Exception as e:
        return f"Error: {e}"

def manejar_cliente(conn, addr):
    global clientes_activos
    clientes_activos += 1
    print(f"{hora_actual()} [+] Cliente conectado desde {addr}. Clientes activos: {clientes_activos}")

    try:
        data = conn.recv(1024)
        if not data:
            return

        if clientes_activos > MAX_CLIENTES:
            print(f"{hora_actual()} [!] Servidor ocupado. Enviando al servidor secundario...")
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as backup:
                    backup.settimeout(2)
                    backup.connect(BACKUP_SERVER)
                    backup.sendall(data)
                    resultado = backup.recv(1024).decode()
                    print(f"{hora_actual()} [<] Resultado recibido del secundario: {resultado}")
                    conn.send(resultado.encode())
            except Exception as e:
                print(f"{hora_actual()} [!] Error al conectar con el secundario: {e}")
                conn.send(f"Error: Servidor secundario no disponible".encode())
        else:
            resultado = procesar_operacion(data)
            conn.send(resultado.encode())
    except Exception as e:
        print(f"{hora_actual()} [!] Error con {addr}: {e}")
    finally:
        conn.close()
        clientes_activos -= 1
        print(f"{hora_actual()} [-] Conexión cerrada con {addr}. Clientes activos: {clientes_activos}")

def cerrar_servidor(signum, frame):
    print(f"{hora_actual()} [i] Cerrando servidor principal...")
    if server_socket:
        server_socket.close()
    print(f"{hora_actual()} [i] Servidor principal cerrado.")
    sys.exit(0)

def iniciar_servidor():
    global server_socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        server_socket.bind((HOST, PORT))
        server_socket.listen(5)
        print(f"{hora_actual()} Servidor principal escuchando en {HOST}:{PORT}\n")
    except socket.error as e:
        print(f"{hora_actual()} [!] Error al iniciar el servidor: {e}")
        sys.exit(1)

    signal.signal(signal.SIGINT, cerrar_servidor)

    while True:
        try:
            conn, addr = server_socket.accept()
            threading.Thread(target=manejar_cliente, args=(conn, addr), daemon=True).start()
        except KeyboardInterrupt:
            cerrar_servidor(None, None)

if __name__ == "__main__":
    iniciar_servidor()