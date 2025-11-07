import { useEffect, useRef } from 'react';
import React, { use, useState } from 'react';
import { io } from 'socket.io-client';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
 
interface MessageData {   //Definicion de la estructura del mensaje
    msg: string;
    username: string;
    timestamp: string;
}

export const ChatComponent: React.FC = () => {   //Componente de clase o funcion

    const [socket, setSocket] = useState<any>(null);  //Estado para la conexion del socket
    const [isConnected, setIsConnected] = useState<boolean>(false); //Estado para verificar si esta conectado
    const [messages, setMessages] = useState<string[]>([]); //Estado para almacenar los mensajes
    const [username, setUsername] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>(''); //Estado para el mensaje actual
    const toast = useRef<any>(null); //Para las notificaciones
    const messagesEndRef = useRef<null | HTMLDivElement>(null); //Referencia para hacer scroll al final del chat

    useEffect(() => {   //Efecto secundario para manejar la conexion del socket
        if(!username) return;

        console.log(`Intentando conectarse con el username: ${username}`);

        const newSocket = io('http://localhost:5000')

        newSocket.on('connect', () =>{  // Cuando el socket se conecta
            console.log('Conectado al servidor de chat');
            setIsConnected(true);
            showToast('success', 'Conexion Exitosa', `Bienvenido al chat, ${username}`);
        });

        newSocket.on('disconnect', () => { // Cuando el socket se desconecta
            console.log('Desconectado del servidor de chat');
            setIsConnected(false);
            showToast('error', 'Desconectado', `Se ha perdido la conexion con el servidor de chat, ${username}`);
        });

        newSocket.on('status', (data: { msg: string }) => { // Manejar mensajes de estado del servidor
            showToast('info', 'Estado del Servidor', data.msg);
        });

        newSocket.on('response',(data: MessageData) =>{
            const message = `${data.username}: ${data.msg} ${data.timestamp}`;
            setMessages(prev => [...prev, message]); //Agregar el nuevo mensaje al estado del historial
            showToast('info', 'Nuevo Mensaje', `${data.username} dice: ${data.msg}`);
        });

        setSocket(newSocket); //Guardar la instancia del socket en el estado
        return () =>{
            newSocket.close(); //Cerrar la conexion del socket al desmontar el componente
        }
    }, [username]);

    const scrollToBottom = () => { //Funcion para hacer scroll al final del chat
         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); //Hacer scroll suave
    }

    useEffect(() => { scrollToBottom() }, [messages]); //Efecto secundario para hacer scroll al final del chat cuando hay nuevos mensajes

    const sendMessage = () => { //Funcion para enviar un mensaje
        if(isConnected && inputValue.trim()&& socket) {
            const messageData: MessageData = {
                msg: inputValue,
                username,
                timestamp: new Date().toLocaleTimeString()
            }
            socket.emit('message', messageData); //Emitir el mensaje al servidor
            setInputValue(''); //Limpiar el campo de entrada
        }
    }

    const  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => { //Manejar la tecla presionada
            if(e.key === 'Enter' && isConnected) {
                sendMessage();
            }
       }  

       const handleUsernameSubmit = (e: React.FormEvent) => { //Manejar el envio del nombre de usuario
        e.preventDefault();  //No se recarga la pagina
        if(username.trim()) { //se dispara el useEffect para conectar el socket

        }
    }

    const showToast = (severity: string, summary: string, detail: string) => {
        toast.current?.show({ severity, summary, detail});
    };


    return (
    <Card title="Chat en Vivo" className="p-m-2">
      <Toast ref={toast} position="top-right" />
      
      {!isConnected && (
        <form onSubmit={handleUsernameSubmit} className="p-d-flex p-flex-column p-ai-center p-mb-3">
          <label htmlFor="username-input" className="p-mb-1">Ingresa tu nombre:</label>
          <div className="p-d-flex p-ai-center">
            <InputText
              id="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tu nombre..."
              className="p-mr-2"
              autoFocus
            />
            <Button label="Entrar" type="submit" icon="pi pi-sign-in" disabled={!username.trim()} />
          </div>
        </form>
      )}

      {isConnected && (
        <div className="p-d-flex p-jc-between p-ai-center p-mb-2">
          <h4>Conectado como: <strong>{username}</strong></h4>
          <Button
            label="Cambiar Nombre"
            icon="pi pi-user-edit"
            size="small"
            severity="secondary"
            text
            onClick={() => setUsername('')}
          />
        </div>
      )}

      <Divider />

      {isConnected ? (
        <div className="p-d-flex p-flex-column" style={{ height: '400px' }}>
          <div className="p-flex-1 p-overflow-auto p-mb-2" style={{ maxHeight: '300px', border: '1px solid #ccc' }}>
            {messages.map((msg, index) => (
              <div key={index} className="p-p-2 p-text-left">
                {msg}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-d-flex p-ai-center">
            <InputText
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="p-flex-1 p-mr-2"
              disabled={!isConnected}
            />
            <Button
              label="Enviar"
              icon="pi pi-send"
              onClick={sendMessage}
              disabled={!inputValue.trim() || !isConnected}
            />
          </div>
        </div>
      ) : (
        <div className="p-d-flex p-ai-center p-jc-center" style={{ height: '300px' }}>
          <p>Por favor, ingresa un nombre para unirte al chat.</p>
        </div>
      )}
    </Card>
  );
}