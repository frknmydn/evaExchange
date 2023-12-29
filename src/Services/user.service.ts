import { IUserService } from "../interfaces/iuser.service";
import User from "../Model/user.model";

export class UserService implements IUserService {

  async createUser(userData: any): Promise<any> {
    const user = await User.create(userData);
    return user;
  }

  async getUserById(userId: number): Promise<any> {
    const user = await User.findByPk(userId);
    return user;
  }
}
