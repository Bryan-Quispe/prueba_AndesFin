import asyncio
import websockets #pip install websockets
import json

clients = set()  #creo un set de clientes

async def handle_message(websocket):
    clients.add(websocket)  #agrego el cliente al set

    try:
        async for message in websocket:
            data = json.loads(message) #parseo el mensaje recibido

            if clients: #Si hay clientes conectados reenvio
                await asyncio.gather( #reenvio el mensaje a todos los clientes conectados simultaneamente
                    *[client.send(json.dumps(data)) for client in clients if client != websocket] #no le reenvio el mensaje al cliente que lo envio

                )        
    except websockets.exceptions.ConnectionClosedOK:
        pass
    
    finally:
       clients.discard(websocket)  #elimino el cliente del set al desconectarse

async def main():
    server = await websockets.serve(handle_message, "localhost", 8765) #creo el servidor en localhost:8765
    print("Servidor escuchando en : localhost:8765")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())