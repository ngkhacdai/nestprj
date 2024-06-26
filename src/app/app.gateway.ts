import { MessageService } from './../message/message.service';
import { RoomService } from './../room/room.service';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  constructor(
    private readonly roomService: RoomService,
    private readonly messageService: MessageService,
  ) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinroom')
  async handleJoinRoom(client: Socket, payload: { userId: string, shopId: string }): Promise<void> {

    const roomName = `${payload.userId}-${payload.shopId}`;

    try {
      client.join(roomName);
      const room = await this.roomService.findOne(payload.userId, payload.shopId);
      this.server.to(roomName).emit('getallmessage', room.messageId);
    } catch (error) {
      client.emit('error', 'An error occurred while joining the room');
      console.error(`Error joining room: ${roomName}`, error);
    }
  }

  @SubscribeMessage('getListUser')
  async handleGetListUser(client: Socket, payload: { userId: string }): Promise<void> {
    const listRoom = await this.roomService.getListUser(payload.userId);
    this.server.to(client.id).emit('listUserResponse', listRoom);
  }
  @SubscribeMessage('getListUserbyShop')
  async handleGetListUserByShop(client: Socket, payload: { userId: string }): Promise<void> {
    try {
      const listRoom = await this.roomService.getListUserByShop(payload.userId);
      this.server.to(client.id).emit('listUserByShopResponse', listRoom);
    } catch (error) {

    }
  }

  @SubscribeMessage('chat')
  async handleChat(client: Socket, payload: { userId: string, shopId: string, message: string, senderID: string }): Promise<void> {
    const newMessage = await this.messageService.createMessage(payload.message, payload.senderID, payload.userId, payload.shopId);
    this.server.to(`${payload.userId}-${payload.shopId}`).emit('newmessage', newMessage);
  }
}
