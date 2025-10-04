import 'express';

//interface exportada para ser usada no middleware
export interface JwtUserPayload {
    id: string;
    name: string;
    email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; 
    }
  }
}