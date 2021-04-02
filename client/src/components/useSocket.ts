import {useEffect, useState } from "react";
import io from "socket.io-client";

interface UseSocket {
  socket: SocketIOClient.Socket;
}

export const useSocket = (onConnect: Function  = () => undefined, onDisconnected: Function  = () => undefined): UseSocket => {
  const [socket, setSocket] = useState<SocketIOClient.Socket>()
  let newSocet: SocketIOClient.Socket;

  if (!socket) {
    newSocet = io('http://localhost:8000', {transports: ['websocket']})
    setSocket(newSocet);
    newSocet.on('connect', onConnect);
    newSocet.on('disconnect', onDisconnected);
  }

  function getSocket(): SocketIOClient.Socket { 
    return socket || newSocet
  }
  

  useEffect(() => {
    return  () => {
      socket?.disconnect()
    }
  }, []);
  
  return {
      socket: getSocket()
  };

}