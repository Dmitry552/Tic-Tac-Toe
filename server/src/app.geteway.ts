import { WebSocketGateway, WebSocketServer, SubscribeMessage,
          OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, MessageBody, WsResponse } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway({ transports: ['websocket'] })
export class AppGateway {
   @WebSocketServer()
   server: Server

  @SubscribeMessage('my-ping')
  findAll(client: Socket, data: any): void {
    console.log(data)
    this.server.emit('my-pong', {});
  }

  
  handleConnection(client: Socket, ...args: any[]) {
    console.log('connect');
  }
}