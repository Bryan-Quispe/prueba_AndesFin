from flask import Flask, render_template
from flask_socketio import SocketIO, emit

chatgood = Flask(__name__) #Instanciar la aplicación Flask
chatgood.config['SECRET_KEY'] = 'MI_SUPER_CLAVE_SECRETA'
socketio = SocketIO(chatgood, cors_allowed_origins="*",async_mode='threading') #Instanciar SocketIO con la aplicación Flask

@socketio.on('connect') #Manejador de evento para la conexión de un cliente
def handle_connect():  #Funcion de gestiona el mensaje de conexion
    print("Usuario conectado") 
    emit('status',{'msg':'Conectado al chat'},broadcast=True)#Enviar mensaje de estado a todos los clientes conectados

@socketio.on('disconnect') #Manejador de evento para la desconexión de un cliente
def handle_disconnect():  #Funcion de gestiona el mensaje de desconexion
    print("Usuario desconectado")
    emit('status',{'msg':'Desconectado del chat'},broadcast=True) #Enviar mensaje de estado a todos los clientes conectados

@socketio.on('message') #Manejador de evento para recibir mensajes de los clientes
def handle_message(data):  #Funcion de gestiona el mensaje recibido
    print(f"Nuevo mensaje: {data['msg']} de {data.get('username')}")  #Deberia c ifrar el mensaje
    message_data={
        'msg':data['msg'],
        'username':data.get('username'),
        'timestamp':data.get('timestamp'),
    }
    emit('message',message_data,broadcast=True) #Reenviar el mensaje a todos los clientes conectados

@chatgood.route('/') #Ruta principal de la aplicación
def index():
    return '<h1>Bienvenidos</h1><br/><p>Ingrese a localhost:3000</p>'#Renderizar la plantilla HTML del chat

if __name__ == '__main__':
    socketio.run(chatgood, debug=True,host="0.0.0.0", port=5000)