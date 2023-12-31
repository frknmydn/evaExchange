import { Request, Response } from "express";
import { IUserService } from "../interfaces/iuser.service";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async signIn(req:Request,res:Response): Promise<void>{
    try {
      const user = await this.userService.signIn(req.body.email,req.body.password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.userService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
