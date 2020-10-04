import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entities/User";
import { compareHash } from "../utils/hash";
import jwt from "jsonwebtoken"
import validator from "validator";

export class AuthController {
  static async login(req: Request, res: Response){
    const entityManager = getManager();
    const { email, password } = req.body;

    if(!validator.isEmail(email))
      return res.status(400).json({message: 'email not is valid'})

    const user = await entityManager.findOne(User, {email}, {select: ['id', 'nome', 'email', 'hashPassword']});
    if(!user)
      return res.status(401).json('User not found');
    
    const authenticated = await compareHash(password, user.hashPassword);
    if(!authenticated){
      return res.status(401).json('password is wrong');
    }

    const { id, nome } = user;
    const payload = {
      id,
      nome,
      email
    }
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: 300
    });

    return res.status(200).json({auth: true, token})
  }

  static async logout(req: Request, res: Response) {
    return res.status(200).send({auth: false, token: null});
  }
}