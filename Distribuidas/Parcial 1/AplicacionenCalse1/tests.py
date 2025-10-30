import socket
from locust import HttpUser, task, between
import random

class TestCalculador(HttpUser):
    wait_time = between(0.5, 1.5)

    @task
    def test_suma(self):
        num1 = random.uniform(-100, 100)
        num2 = random.uniform(-100, 100)
        self._ejecutar_suma(num1, num2)

    @task
    def test_resta(self):
        num1 = random.uniform(-100, 100)
        num2 = random.uniform(-100, 100)
        self._ejecutar_resta(num1, num2)

    @task
    def test_multiplicacion(self):
        num1 = random.uniform(-100, 100)
        num2 = random.uniform(-100, 100)
        self._ejecutar_multiplicacion(num1, num2)

    @task
    def test_division(self):
        num1 = random.uniform(-100, 100)
        num2 = random.uniform(-100, 100)
        while num2 == 0:  # Evitar división por cero
            num2 = random.uniform(-100, 100)
        self._ejecutar_division(num1, num2)

    def _ejecutar_suma(self, num1, num2):
        client_socket = None
        try:
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client_socket.settimeout(3)
            client_socket.connect(("localhost", 12345))
            operacion = f"s,{num1},{num2}"
            client_socket.send(operacion.encode("utf-8"))
            resultado = client_socket.recv(1024).decode("utf-8")
            try:
                float(resultado)
                print(f'El resultado de la suma es: {resultado}')
            except ValueError:
                raise AssertionError("El resultado de la suma no es un número válido")
        except Exception as e:
            print(f"Error durante la comunicación con el servidor (suma): {e}")
        finally:
            if client_socket:
                client_socket.close()

    def _ejecutar_resta(self, num1, num2):
        client_socket = None
        try:
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client_socket.settimeout(3)
            client_socket.connect(("localhost", 12345))
            operacion = f"r,{num1},{num2}"
            client_socket.send(operacion.encode("utf-8"))
            resultado = client_socket.recv(1024).decode("utf-8")
            try:
                float(resultado)
                print(f'El resultado de la resta es: {resultado}')
            except ValueError:
                raise AssertionError("El resultado de la resta no es un número válido")
        except Exception as e:
            print(f"Error durante la comunicación con el servidor (resta): {e}")
        finally:
            if client_socket:
                client_socket.close()

    def _ejecutar_multiplicacion(self, num1, num2):
        client_socket = None
        try:
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client_socket.settimeout(3)
            client_socket.connect(("localhost", 12345))
            operacion = f"m,{num1},{num2}"
            client_socket.send(operacion.encode("utf-8"))
            resultado = client_socket.recv(1024).decode("utf-8")
            try:
                float(resultado)
                print(f'El resultado de la multiplicación es: {resultado}')
            except ValueError:
                raise AssertionError("El resultado de la multiplicación no es un número válido")
        except Exception as e:
            print(f"Error durante la comunicación con el servidor (multiplicación): {e}")
        finally:
            if client_socket:
                client_socket.close()

    def _ejecutar_division(self, num1, num2):
        client_socket = None
        try:
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client_socket.settimeout(3)
            client_socket.connect(("localhost", 12345))
            operacion = f"d,{num1},{num2}"
            client_socket.send(operacion.encode("utf-8"))
            resultado = client_socket.recv(1024).decode("utf-8")
            try:
                float(resultado)
                print(f'El resultado de la división es: {resultado}')
            except ValueError:
                raise AssertionError("El resultado de la división no es un número válido")
        except Exception as e:
            print(f"Error durante la comunicación con el servidor (división): {e}")
        finally:
            if client_socket:
                client_socket.close()