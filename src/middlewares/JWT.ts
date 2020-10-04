import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type IDecoded = {
  id: any,
  nome: String,
  email: String
}

interface IRequest extends Request {
  userId: any,
  userNome: String,
  userEmail: String
}

export const verifyJWT = (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token']
  if(!token)
    return res.status(401).json({auth: false, message: 'no token provided'});

  jwt.verify(token.toString(), process.env.SECRET, (err, decoded: IDecoded) => {
    if(err)
      return res.status(500).json({ auth: false, message: 'failed to authenticate token'})

    req.userId = decoded.id;
    req.userNome = decoded.nome;
    req.userEmail = decoded.email;

    next();
  })
};

type IPayload = string | {
  id?: number,
  nome?: string,
  email?: string,
  iat?: number,
  exp?: number
}

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];
  if(!token)
    return res.status(401).json({auth: false, message: 'no token provided'});

  const payload: IPayload = jwt.verify(token.toString() , process.env.SECRET);

  if(typeof payload == 'string')
    return
  
  delete payload.iat;
  delete payload.exp

  const tokenRefreshed = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 30
  });

  next();
}
