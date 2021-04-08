import { WebSocketGateway, WebSocketServer, SubscribeMessage,
          OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, MessageBody, WsResponse } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { GameService } from './app.service';

import { MoveRequest, MoveResponse } from './types/games';


@WebSocketGateway({ transports: ['websocket'] })
export class AppGateway {
  constructor(private readonly gameService: GameService) {}
   @WebSocketServer()
   server: Server

  @SubscribeMessage('player_turn')
  playingGame(client: Socket, data: MoveRequest): void {
    const result = this.gameService.playingGame(data.index, data.token);
    this.server.emit('game_move', result);
  }

  
  handleConnection(client: Socket, ...args: any[]) {
    console.log('connect');
  }

  handleDisconnect(client: Socket): any {
    console.log('disconnect');
  }
}