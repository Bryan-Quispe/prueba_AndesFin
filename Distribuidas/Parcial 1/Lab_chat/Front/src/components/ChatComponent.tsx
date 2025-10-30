import { useRef } from 'react';
import React, { use, useState } from 'react';
 
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
    const [message, setMessage] = useState<string>(''); //Estado para el mensaje actual
    const toast = useRef<any>(null); //Para las notificaciones
    return (
        <div>
            
            <h2>Chat, chat sin limites</h2>
            
        </div>
        
    )
}