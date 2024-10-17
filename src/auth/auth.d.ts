declare global {
  declare module 'express' {
    interface Response {
      user: string;
    }
  }
}
