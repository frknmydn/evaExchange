import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface UserPayload {
  email: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    //firstly check decoded is jwtpayload or string to valideate
    if (typeof decoded === 'object' && decoded !== null) {
      req.user = decoded as UserPayload; // Tip dönüşümü
      next();
    } else {
      return res.sendStatus(403);
    }
  });
};

export default authenticateToken;
