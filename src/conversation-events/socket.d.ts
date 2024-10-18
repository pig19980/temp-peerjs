declare global {
  declare module 'socket.io' {
    interface Socket {
      roomId: string;
      userId: string;
    }
  }
}
