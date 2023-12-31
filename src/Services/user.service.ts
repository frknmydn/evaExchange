import { IUserService } from "../interfaces/iuser.service";
import User from "../Model/user.model";
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config'

export class UserService implements IUserService {
  async createUser(userData: any): Promise<any> {
    const saltRounds = 10;

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Replace the plain text password with the hashed one
    userData.password = hashedPassword;

    // Create the user with the hashed password
    const user = await User.create(userData);

    return user;
  }

  async getUserById(userId: number): Promise<any> {
    const user = await User.findByPk(userId);
    return user;
  }

  async decreaseUserBalance(
    userId: number,
    decreasedBalance: number
  ): Promise<any> {
    const findingUser = await this.getUserById(userId);
    if (!findingUser) {
      throw new Error("User not found");
    }

    // Update the user's balance
    findingUser.balance = findingUser.balance - decreasedBalance;

    await findingUser.save();

    return findingUser;
  }

  async increaseUserBalance(
    userId: number,
    decreasedBalance: number
  ): Promise<any> {
    const findingUser = await this.getUserById(userId);
    if (!findingUser) {
      throw new Error("User not found");
    }
    console.log(decreasedBalance);
    // Update the user's balance
    findingUser.balance = +findingUser.balance + +decreasedBalance;
    console.log(findingUser.balance);

    await findingUser.save();

    return findingUser;
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Ensure that JWT_SECRET is defined
    const jwtSecret: Secret = process.env.JWT_SECRET as Secret;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined. Please set the JWT_SECRET environment variable.");
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

    return { user, token };
  }
  
  
}
