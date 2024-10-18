import { Socket } from 'socket.io';
import { PeerDto } from '../dto/join-room-request.dto';

export interface PeerSocket extends Socket {
  roomId: string;
  userId: string;
  isInRoom(): boolean;
  joinRoom(joinRoomRequest: PeerDto): void;
  leaveRoom(): PeerDto;
}

export function initPeerSocket(socket: PeerSocket) {
  socket.isInRoom = () => {
    return socket.roomId != undefined;
  };
  socket.joinRoom = ({ roomId, userId }) => {
    socket.join(roomId);
    socket.roomId = roomId;
    socket.userId = userId;
    console.log('join', socket.roomId, socket.userId);
  };
  socket.leaveRoom = () => {
    const retDto = { roomId: socket.roomId, userId: socket.userId };
    socket.roomId = undefined;
    socket.userId = undefined;
    return retDto;
  };
}

// Not good method
// export interface PeerSocket extends Socket {
//   roomId: string;
//   userId: string;
//   isInRoom(): boolean {
//     return this.roomId != undefined;
//   }
//   joinRoom({ roomId, userId }: PeerDto): void {
//     super.join(roomId);
//     this.roomId = roomId;
//     this.userId = userId;
//     console.log('join', this.roomId, this.userId);
//   }
//   leaveRoom(): PeerDto {
//     const retDto = { roomId: this.roomId, userId: this.userId };
//     this.roomId = undefined;
//     this.userId = undefined;
//     return retDto;
//   }
// }
