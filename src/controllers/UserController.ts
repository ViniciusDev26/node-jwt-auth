import { Request, Response } from "express"
import { getManager } from "typeorm";
import validator from "validator";
import { User } from "../entities/User";
import { hash } from "../utils/hash";

export class UserController {
  static async create(req: Request, res: Response) {
    const entityManager = getManager();
    const {nome, email, password} = req.body;
    const passwordValid = validator.isLength(password, {
      min: 8
    });

    if(!passwordValid)
      return res.status(401).json({message: 'Senha muito curta, pelo menos 8 caracteres'})

    const hashPassword = await hash(password);

    try{
      const user = entityManager.create(User, {
        nome,
        email,
        hashPassword
      });

      try{
        await entityManager.save(user)
      }catch(err) {
        return res.status(500).json({message: "não foi possivel cadastrar o usuario"})
      }
      
      return res.json(user);
    }catch(err){
      console.log(err);
    }
  }

  static async index(req: Request, res: Response) {
    const entityManager = getManager();

    const users = await entityManager.find(User);
    return res.status(200).json(users);
  }
}
