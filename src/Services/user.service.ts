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

  async changeUserBalance(userId: number, decreasedBalance: number): Promise<any> {
  const findingUser = await this.getUserById(userId);
  if (!findingUser) {
    throw new Error('User not found');
  }

  // Update the user's balance
  findingUser.balance = findingUser.balance-decreasedBalance;

  await findingUser.save();

  return findingUser;
}
}
